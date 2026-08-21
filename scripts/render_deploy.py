#!/usr/bin/env python3
"""
Render.com auto-deploy with blue/green style cleanup.

Flow:
  1. Creates a NEW web service on Render from this repo (Docker runtime).
  2. Waits for the build/deploy to finish (live status logs).
  3. Health-checks the live URL (HTTP 200 + expected page content).
  4. Asks: delete previous service(s)?  -> yes: removes old ones
  5. Asks: delete the new service too?  -> yes: removes it, no: keeps it

Usage:
  python3 scripts/render_deploy.py            # full flow
  python3 scripts/render_deploy.py --check    # only list existing services

API key is read from $RENDER_API_KEY or a .env.render file in the repo root.
"""

import json
import os
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

CONFIG = {
    "service_prefix": "portfolio-preview",
    "repo": "https://github.com/kantepallyashok/ashok_portfolio.git",
    "branch": "main",
    "root_dir": "frontend-app",
    "dockerfile_path": "./Dockerfile",
    "plan": "free",
    "region": "singapore",
    "health_check_path": "/",
    "content_marker": "Kantepally Venkata Ashok",
    "deploy_timeout_sec": 25 * 60,
    "health_timeout_sec": 10 * 60,
}

API_BASE = "https://api.render.com/v1"
TERMINAL_DEPLOY_STATES = {"live", "build_failed", "canceled", "deactivated"}

T_SCRIPT_START = time.time()


def now_hms():
    return datetime.now().strftime("%H:%M:%S")


def fmt_elapsed(seconds):
    seconds = int(seconds)
    if seconds < 60:
        return f"{seconds}s"
    return f"{seconds // 60}m {seconds % 60:02d}s"


def total_elapsed():
    start = os.environ.get("RENDER_DEPLOY_START")
    if start:
        return time.time() - float(start)
    return time.time() - T_SCRIPT_START


def log(msg):
    print(f"  [{now_hms()}] {msg}", flush=True)


def ok(msg):
    print(f"  [OK]   {msg}", flush=True)


def warn(msg):
    print(f"  [WARN] {msg}", flush=True)


def fail(msg):
    print(f"  [FAIL] {msg}", flush=True)
    sys.exit(1)


def step(n, total, title):
    print()
    print("============================================================")
    print(f"  RENDER STEP {n}/{total}: {title}")
    print("============================================================")


def save_api_key(key):
    answer = input("  ? Save key to .env.render so you won't be asked again? [Y/n] ").strip().lower()
    if answer in ("n", "no"):
        return
    env_file = REPO_ROOT / ".env.render"
    env_file.write_text(f"RENDER_API_KEY={key}\n")
    try:
        env_file.chmod(0o600)
    except OSError:
        pass
    ok(f"Key saved to {env_file} (git-ignored)")


def load_api_key():
    key = os.environ.get("RENDER_API_KEY", "").strip()
    if key:
        return key
    env_file = REPO_ROOT / ".env.render"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            line = line.strip()
            if line.startswith("RENDER_API_KEY="):
                return line.split("=", 1)[1].strip()

    print()
    print("  No Render API key found.")
    print("  NOTE: Render does NOT support email/password login for automation.")
    print("  One-time setup (2 minutes):")
    print("    1. Log in at https://dashboard.render.com with your Gmail account")
    print("    2. Go to Account Settings -> API Keys")
    print("       https://dashboard.render.com/settings#api-keys")
    print("    3. Click 'Create API Key' and copy it (starts with rnd_)")
    import getpass
    try:
        key = getpass.getpass("  Enter Render API key (input hidden): ").strip()
    except (KeyboardInterrupt, EOFError):
        print()
        fail("No key entered.")
    if not key.startswith("rnd_"):
        warn("Key does not start with 'rnd_' - it may be invalid.")
    if not key:
        fail("No key entered.")
    save_api_key(key)
    return key


def api(method, path, api_key, body=None):
    url = f"{API_BASE}{path}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            text = resp.read().decode()
            return json.loads(text) if text else {}
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")[:500]
        raise RuntimeError(f"{method} {path} -> HTTP {e.code}: {detail}")


def unwrap(item):
    if isinstance(item, dict) and "id" not in item:
        for key in ("service", "deploy", "owner", "envVar", "secretFile"):
            if key in item and isinstance(item[key], dict):
                return item[key]
    return item


def get_owner_id(api_key):
    pinned = os.environ.get("RENDER_OWNER_ID", "").strip()
    if pinned:
        log(f"Using workspace from RENDER_OWNER_ID: {pinned}")
        return pinned
    owners = [unwrap(o) for o in api("GET", "/owners", api_key)]
    owners = [o for o in owners if isinstance(o, dict) and o.get("id")]
    if not owners:
        fail("No workspaces found on your Render account.")
    owner = owners[0]
    ok(f"Connected to Render workspace: {owner.get('name', owner['id'])}")
    return owner["id"]


def list_services(api_key, owner_id):
    services = []
    cursor = None
    while True:
        path = f"/services?ownerId={owner_id}&limit=100"
        if cursor:
            path += f"&cursor={cursor}"
        batch = api("GET", path, api_key)
        items = [unwrap(s) for s in batch]
        services.extend(items)
        if len(batch) < 100:
            break
        cursor = items[-1]["id"]
    return services


def create_service(api_key, owner_id, name):
    body = {
        "type": "web_service",
        "name": name,
        "ownerId": owner_id,
        "repo": CONFIG["repo"],
        "branch": CONFIG["branch"],
        "autoDeploy": "no",
        "rootDir": CONFIG["root_dir"],
        "serviceDetails": {
            "runtime": "docker",
            "plan": CONFIG["plan"],
            "region": CONFIG["region"],
            "numInstances": 1,
            "envSpecificDetails": {
                "dockerfilePath": CONFIG["dockerfile_path"],
                "dockerContext": "./",
            },
        },
    }
    result = api("POST", "/services", api_key, body)
    service = unwrap(result.get("service", result))
    deploy_id = result.get("deployId")
    return service, deploy_id


def wait_for_deploy(api_key, service_id, deploy_id):
    deadline = time.time() + CONFIG["deploy_timeout_sec"]
    started = time.time()
    last_status = None
    while time.time() < deadline:
        deploys = api("GET", f"/services/{service_id}/deploys?limit=1", api_key)
        current = unwrap(deploys[0]) if deploys else {}
        status = current.get("status", "unknown")
        elapsed = fmt_elapsed(time.time() - started)
        if status != last_status:
            print(flush=True)
            log(f"Deploy status: {status}  (elapsed {elapsed})")
            last_status = status
        elif int(time.time() - started) % 30 == 0:
            print(
                f"\r  [{now_hms()}] waiting... {status}  (elapsed {elapsed})   ",
                end="",
                flush=True,
            )
        if status == "live":
            print(flush=True)
            ok(f"Deploy is LIVE - build finished in {elapsed}")
            return True
        if status in TERMINAL_DEPLOY_STATES:
            print(flush=True)
            warn(f"Deploy ended with status: {status} after {elapsed}")
            return False
        time.sleep(15)
    print(flush=True)
    warn(f"Timed out after {fmt_elapsed(CONFIG['deploy_timeout_sec'])}.")
    return False


def get_service_url(api_key, service_id):
    service = unwrap(api("GET", f"/services/{service_id}", api_key))
    return service.get("serviceDetails", {}).get("url")


def health_check(url):
    deadline = time.time() + CONFIG["health_timeout_sec"]
    started = time.time()
    target = url.rstrip("/") + CONFIG["health_check_path"]
    marker = CONFIG["content_marker"]
    attempt = 0
    while time.time() < deadline:
        attempt += 1
        elapsed = fmt_elapsed(time.time() - started)
        try:
            req = urllib.request.Request(target, method="GET")
            req.add_header("User-Agent", "render-deploy-check/1.0")
            with urllib.request.urlopen(req, timeout=45) as resp:
                body = resp.read().decode(errors="replace")
                if resp.status == 200 and marker.lower() in body.lower():
                    ok(f"HTTP 200 + page content verified ({elapsed}, attempt {attempt})")
                    print(f"\n  SITE IS UP AND CORRECT: {target}\n")
                    return True
                if resp.status == 200:
                    warn(f"HTTP 200 but expected content ('{marker}') NOT found on page.")
                    return False
        except urllib.error.HTTPError as e:
            log(f"Attempt {attempt}: HTTP {e.code} - retrying (elapsed {elapsed})")
        except Exception as e:
            log(f"Attempt {attempt}: {type(e).__name__} - retrying (elapsed {elapsed})")
        time.sleep(20)
    warn(f"Health check timed out after {fmt_elapsed(CONFIG['health_timeout_sec'])}.")
    return False


def delete_service(api_key, service_id, name):
    try:
        api("DELETE", f"/services/{service_id}", api_key)
        ok(f"Deleted: {name}")
        return True
    except RuntimeError as e:
        warn(f"Could not delete {name}: {e}")
        return False


def ask_yes_no(question, default=False):
    hint = "[Y/n]" if default else "[y/N]"
    while True:
        try:
            answer = input(f"\n  ? {question} {hint} ").strip().lower()
        except (KeyboardInterrupt, EOFError):
            print()
            return default
        if not answer:
            return default
        if answer in ("y", "yes"):
            return True
        if answer in ("n", "no"):
            return False
        print("  Please answer y or n.")


def summary(new_name, url, dashboard, build_secs, healthy, kept_old, new_kept):
    print()
    print("============================================================")
    print("  DEPLOY SUMMARY")
    print("============================================================")
    print(f"  New service    : {new_name}")
    print(f"  Live URL       : {url or 'n/a'}")
    print(f"  Dashboard      : {dashboard or 'n/a'}")
    print(f"  Build + Deploy : {fmt_elapsed(build_secs)}")
    print(f"  Health check   : {'PASSED' if healthy else 'FAILED'}")
    print(f"  Old services   : {'deleted' if kept_old and existing_count else ('kept' if existing_count else 'none existed')}")
    print(f"  New service    : {'kept' if new_kept else 'deleted'}")
    print(f"  TOTAL TIME     : {fmt_elapsed(total_elapsed())}")
    print("============================================================")


existing_count = 0


def main():
    global existing_count
    args = set(sys.argv[1:])
    api_key = load_api_key()

    step(1, 4, "Connecting to Render API")
    try:
        owner_id = get_owner_id(api_key)
        all_services = list_services(api_key, owner_id)
    except RuntimeError as e:
        fail(f"API error: {e}")

    prefix = CONFIG["service_prefix"]
    existing = [
        s for s in all_services
        if s.get("name", "").startswith(prefix) and s.get("suspended") != "suspended"
    ]
    existing_count = len(existing)

    log(f"Found {len(all_services)} service(s) in workspace, {existing_count} previous preview(s)")
    if existing:
        for s in existing:
            print(f"    - {s['name']}  ({s.get('serviceDetails', {}).get('url', '')})")

    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    new_name = f"{prefix}-{stamp}"

    step(2, 4, f"Creating new service: {new_name}")
    log(f"Asking Render to create web service from repo (Docker runtime)...")
    t_create = time.time()
    try:
        service, deploy_id = create_service(api_key, owner_id, new_name)
    except RuntimeError as e:
        fail(f"Service creation FAILED: {e}\n   Make sure Render has access to the GitHub repo.")
    new_id = service["id"]
    ok(f"Service created: {new_id}")

    step(3, 4, "Waiting for Render to build & deploy (live logs)")
    success = wait_for_deploy(api_key, new_id, deploy_id)
    build_secs = time.time() - t_create

    url = None
    healthy = False
    interrupted = False
    try:
        if success:
            url = get_service_url(api_key, new_id)
            step(4, 4, f"Health check: {url}")
            log(f"Checking HTTP status + page content ('{CONFIG['content_marker']}')...")
            healthy = health_check(url)
        else:
            warn("Skipping health check - deploy did not go live.")
    except KeyboardInterrupt:
        interrupted = True
        warn("Interrupted! New service left running:")
        print(f"    Dashboard: {service.get('dashboardUrl')}")

    kept_old = False
    new_kept = True
    if not interrupted:
        if existing:
            if ask_yes_no(f"Delete ALL {existing_count} previous service(s)?"):
                kept_old = True
                for s in existing:
                    delete_service(api_key, s["id"], s["name"])
            else:
                log("Previous service(s) KEPT.")

        label = "working correctly" if healthy else "NOT working correctly"
        if ask_yes_no(f"The NEW service is {label}. Delete it too?", default=False):
            delete_service(api_key, new_id, new_name)
            new_kept = False
        else:
            log(f"New service KEPT: {url}")

    summary(new_name, url, service.get("dashboardUrl"), build_secs, healthy, kept_old, new_kept)


if __name__ == "__main__":
    main()
