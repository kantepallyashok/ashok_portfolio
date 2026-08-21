#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

STEP=1
TOTAL=3

banner() {
  echo ""
  echo "============================================================"
  echo "  STEP $STEP/$TOTAL: $1"
  echo "============================================================"
  STEP=$((STEP+1))
}

ok() { echo "  [OK]   $1"; }

export RENDER_DEPLOY_START="$(date +%s)"

echo "============================================================"
echo "  DEPLOY STARTED: $(date '+%Y-%m-%d %H:%M:%S')"
echo "============================================================"

banner "Checking local changes"
if [ -n "$(git status --porcelain)" ]; then
  echo "  Uncommitted changes found:"
  git status --short | sed 's/^/    /'
  read -r -p "  Commit all and continue? [y/N] " answer
  if [[ "$answer" =~ ^[Yy]$ ]]; then
    read -r -p "  Commit message: " msg
    git add -A
    git commit -m "${msg:-update}"
    ok "Changes committed"
  else
    echo "  Aborted. Commit or stash your changes first."
    exit 1
  fi
else
  echo "  [INFO] Nothing to commit - working tree clean"
fi

banner "Pushing to GitHub"
echo "  Running: git push origin HEAD"
if git push origin HEAD 2>&1 | sed 's/^/    /'; then
  ok "PUSHED TO GITHUB successfully"
else
  echo "  [FAIL] Push failed - stopping."
  exit 1
fi

banner "Render: create service, wait for build, health check"
PYTHON_BIN="$(command -v python3 || command -v python)"
"$PYTHON_BIN" scripts/render_deploy.py "$@"
