$ErrorActionPreference = "Stop"
$repo = "C:\Users\Venkata.Kantepally\Desktop\DevOps\preparation"

$gitExe = Get-ChildItem "$env:LOCALAPPDATA\GitHubDesktop\app-*\resources\app\git\cmd\git.exe" |
  Sort-Object Name -Descending | Select-Object -First 1 -ExpandProperty FullName
if (-not $gitExe) {
  Write-Host "[FAIL] Git not found (GitHub Desktop required)." -ForegroundColor Red
  exit 1
}

function Step($n, $msg) {
  Write-Host ""
  Write-Host "============================================================" -ForegroundColor Cyan
  Write-Host "  STEP $n/3: $msg" -ForegroundColor Cyan
  Write-Host "============================================================" -ForegroundColor Cyan
}

Set-Location $repo
Write-Host "============================================================"
Write-Host "  DEPLOY STARTED: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Host "============================================================"

Step 1 "Checking local changes"
$changes = & $gitExe status --short
if ($changes) {
  $changes | ForEach-Object { Write-Host "    $_" }
  $answer = Read-Host "  Commit all and continue? [y/N]"
  if ($answer -match '^[Yy]') {
    $msg = Read-Host "  Commit message"
    if (-not $msg) { $msg = "update" }
    & $gitExe add -A
    & $gitExe commit -m $msg
    Write-Host "  [OK]   Changes committed" -ForegroundColor Green
  } else {
    Write-Host "  Aborted. Commit or stash your changes first."
    exit 1
  }
} else {
  Write-Host "  [INFO] Nothing to commit - working tree clean"
}

Step 2 "Pushing to GitHub"
Write-Host "  Running: git push origin HEAD"
Write-Host "  (first time only: a GitHub login window may open)"
& $gitExe -c credential.helper=manager push origin HEAD
if ($LASTEXITCODE -ne 0) {
  Write-Host "  [FAIL] Push failed. If remote has new commits, run:" -ForegroundColor Red
  Write-Host "     & `"$gitExe`" pull --rebase origin main"
  exit 1
}
Write-Host "  [OK]   PUSHED TO GITHUB successfully" -ForegroundColor Green

Step 3 "Render: create service, build logs, health check"
wsl --cd $repo bash ./scripts/render-only.sh
exit $LASTEXITCODE
