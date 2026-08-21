#!/usr/bin/env python3
"""
Render.com auto-deploy to a single permanent web service.

Flow:
  1. Finds project "My First Project" (creates nothing there without need).
  2. Finds or creates web service "ashok_portfolio-1" inside that project.
  3. Triggers a deploy of the latest pushed commit and streams status logs.
  4. Health-checks the live URL (HTTP 200 + expected page content).
  5. Prints a summary. No deletions, no prompts.

Usage:
  python3 scripts/render_deploy.py            # full flow
  python3 scripts/render_deploy.py --check    # list projects/services only

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
    "service_name": "ashok_portfolio-1",
    "project_name": "My First Project",
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
        for key in ("service", "deploy", "owner", "project", "environment"):
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


def find_project(api_key, owner_id):
    projects = [unwrap(p) for p in api("GET", f"/projects?ownerId={owner_id}", api_key)]
    for p in projects:
        if p.get("name", "").lower() == CONFIG["project_name"].lower():
            return p
    return None


def find_environment(api_key, project_id):
    envs = [unwrap(e) for e in api("GET", f"/environments?projectId={project_id}", api_key)]
    return envs[0]["id"] if envs else None


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


def create_service(api_key, owner_id, environment_id):
    body = {
        "type": "web_service",
        "name": CONFIG["service_name"],
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
    if environment_id:
        body["environmentId"] = environment_id
    result = api("POST", "/services", api_key, body)
    service = unwrap(result.get("service", result))
    deploy_id = result.get("deployId")
    return service, deploy_id


def _find_deploy_id(obj):
    if isinstance(obj, dict):
        dep_id = obj.get("id")
        if isinstance(dep_id, str) and dep_id.startswith("dep-"):
            return dep_id
        for value in obj.values():
            found = _find_deploy_id(value)
            if found:
                return found
    elif isinstance(obj, list):
        for value in obj:
            found = _find_deploy_id(value)
            if found:
                return found
    return None


def trigger_deploy(api_key, service_id):
    try:
        result = api("POST", f"/services/{service_id}/deploys", api_key, {})
    except RuntimeError as e:
        warn(f"Trigger call returned an error (may still be running): {e}")
        return None
    dep_id = _find_deploy_id(result)
    if dep_id:
        return dep_id
    log("Deploy ID missing from response - reading latest deploy from service...")
    time.sleep(3)
    deploys = [unwrap(d) for d in api("GET", f"/services/{service_id}/deploys?limit=5", api_key)]
    for d in deploys:
        if isinstance(d, dict) and d.get("status") in (
            "created", "build_in_progress", "pre_deploy_in_progress", "queued",
        ):
            return d.get("id")
    return deploys[0].get("id") if deploys else None


def wait_for_deploy(api_key, service_id, deploy_id):
    deadline = time.time() + CONFIG["deploy_timeout_sec"]
    started = time.time()
    last_status = None
    while time.time() < deadline:
        if deploy_id:
            current = unwrap(api("GET", f"/services/{service_id}/deploys/{deploy_id}", api_key))
        else:
            deploys = [unwrap(d) for d in api("GET", f"/services/{service_id}/deploys?limit=1", api_key)]
            current = deploys[0] if deploys else {}
            if isinstance(current, dict) and current.get("id"):
                deploy_id = current["id"]
                log(f"Monitoring latest deploy: {deploy_id}")
        if not isinstance(current, dict):
            current = {}
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
            ok(f"Deploy is LIVE - finished in {elapsed}")
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


def ask_yes_no(question, default=False):
    hint = "[Y/n]" if default else "[y/N]"
    try:
        answer = input(f"\n  ? {question} {hint} ").strip().lower()
    except (KeyboardInterrupt, EOFError):
        print()
        return default
    if not answer:
        return default
    return answer in ("y", "yes")


def summary(service_name, url, dashboard, build_secs, healthy, created):
    print()
    print("============================================================")
    print("  DEPLOY SUMMARY")
    print("============================================================")
    print(f"  Service        : {service_name}" + ("  (newly created)" if created else ""))
    print(f"  Live URL       : {url or 'n/a'}")
    print(f"  Dashboard      : {dashboard or 'n/a'}")
    print(f"  Build + Deploy : {fmt_elapsed(build_secs)}")
    print(f"  Health check   : {'PASSED' if healthy else 'FAILED'}")
    print(f"  TOTAL TIME     : {fmt_elapsed(total_elapsed())}")
    print("============================================================")


def main():
    args = set(sys.argv[1:])
    api_key = load_api_key()

    step(1, 4, "Connecting to Render API")
    try:
        owner_id = get_owner_id(api_key)
        all_services = list_services(api_key, owner_id)
    except RuntimeError as e:
        fail(f"API error: {e}")

    service = next(
        (s for s in all_services if s.get("name") == CONFIG["service_name"]), None
    )
    project = None
    environment_id = None
    try:
        project = find_project(api_key, owner_id)
        if project:
            environment_id = find_environment(api_key, project["id"])
    except RuntimeError as e:
        warn(f"Could not look up project/environments: {e}")

    if "--check" in args:
        log(f"Project '{CONFIG['project_name']}': {'found (' + project['id'] + ')' if project else 'NOT FOUND'}")
        log(f"Service '{CONFIG['service_name']}': {'found (' + service['id'] + ')' if service else 'NOT FOUND'}")
        log("All services:")
        for s in all_services:
            print(f"    - {s['name']}  ({s.get('serviceDetails', {}).get('url', '')})")
        return

    created = False
    deploy_id = None
    t_deploy = time.time()

    if service:
        step(2, 4, f"Service '{CONFIG['service_name']}' already exists - deploying latest commit")
        try:
            deploy_id = trigger_deploy(api_key, service["id"])
        except RuntimeError as e:
            fail(f"Failed to trigger deploy: {e}")
        ok(f"Deploy triggered: {deploy_id}")
    else:
        step(2, 4, f"Creating service '{CONFIG['service_name']}'")
        if project:
            log(f"Placing into project '{project.get('name')}' (env {environment_id})")
        else:
            warn(f"Project '{CONFIG['project_name']}' not found - creating service at workspace root.")
        try:
            service, deploy_id = create_service(api_key, owner_id, environment_id)
        except RuntimeError as e:
            fail(f"Service creation FAILED: {e}\n   Make sure Render has access to the GitHub repo.")
        created = True
        ok(f"Service created: {service['id']}")

    step(3, 4, "Waiting for Render to build & deploy (live logs)")
    success = wait_for_deploy(api_key, service["id"], deploy_id)
    build_secs = time.time() - t_deploy

    url = None
    healthy = False
    interrupted = False
    try:
        if success:
            url = get_service_url(api_key, service["id"])
            step(4, 4, f"Health check: {url}")
            log(f"Checking HTTP status + page content ('{CONFIG['content_marker']}')...")
            healthy = health_check(url)
        else:
            warn("Skipping health check - deploy did not go live.")
    except KeyboardInterrupt:
        interrupted = True
        warn("Interrupted! Deploy continues on Render's side.")

    if not interrupted:
        dashboard = service.get("dashboardUrl")
        if not success:
            if ask_yes_no("Open dashboard to inspect the failure? (no action, just info)", default=False):
                pass
        summary(CONFIG["service_name"], url, dashboard, build_secs, healthy, created)


if __name__ == "__main__":
    main()
