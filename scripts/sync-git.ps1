# Surveillance automatique : commit + push des modifications vers GitHub
param(
    [int]$PollSeconds = 5,
    [int]$QuietSeconds = 15,
    [string]$Branch = ""
)

$ErrorActionPreference = "Continue"
$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo
$logFile = Join-Path $PSScriptRoot "sync.log"

function Log([string]$msg) {
    $line = "{0}  {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $msg
    Add-Content -Path $logFile -Value $line -Encoding UTF8
    Write-Host $line
}

if (-not (Test-Path ".git")) {
    Write-Host "Dossier git introuvable : $repo"
    exit 1
}

if (-not $Branch) {
    $Branch = (git rev-parse --abbrev-ref HEAD 2>$null | Out-String).Trim()
    if (-not $Branch) { $Branch = "main" }
}

$remote = (git remote 2>$null | Out-String).Trim().Split("`n")[0].Trim()
if (-not $remote) { $remote = "origin" }

Log "Surveillance active - branche $Branch vers $remote (pause $QuietSeconds s apres chaque modif)"

$pendingSince = $null

while ($true) {
    Start-Sleep -Seconds $PollSeconds

    if (Test-Path ".git\index.lock") { continue }

    $status = (git status --porcelain 2>&1 | Out-String).Trim()

    if ($status -eq "") {
        $pendingSince = $null
        continue
    }

    if (-not $pendingSince) {
        $pendingSince = Get-Date
        Log "Modification detectee, attente de stabilisation..."
        continue
    }

    if (((Get-Date) - $pendingSince).TotalSeconds -lt $QuietSeconds) { continue }

    git add -A 2>&1 | Out-Null

    $stagedNames = @(git diff --cached --name-only 2>$null)
    if ($stagedNames.Count -eq 0) {
        $pendingSince = $null
        continue
    }

    $msg = "Sync automatique : {0} fichier(s)" -f $stagedNames.Count
    $out = git commit -q -m $msg 2>&1 | Out-String
    if ($LASTEXITCODE -ne 0) {
        Log "Commit impossible : $out"
        $pendingSince = $null
        continue
    }

    Log "Commit cree : $msg"

    $push = (git push $remote $Branch 2>&1 | Out-String).Trim()
    if ($LASTEXITCODE -ne 0) {
        Log "Push refuse, synchronisation du remote..."
        git pull --rebase --autostash $remote $Branch 2>&1 | Out-Null
        $push = (git push $remote $Branch 2>&1 | Out-String).Trim()
        if ($LASTEXITCODE -ne 0) {
            Log "Push echoue (reessaiera plus tard) : $push"
        }
    }

    if ($LASTEXITCODE -eq 0) {
        Log "Push OK sur $remote/$Branch"
    }

    $pendingSince = $null
}
