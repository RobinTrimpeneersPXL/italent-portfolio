# Teardown Script for Portfolio Project
# Run this script in PowerShell

Write-Host "Starting Teardown..." -ForegroundColor Red

if (k3d cluster list | Select-String "portfolio") {
    Write-Host "Deleting 'portfolio' cluster..." -ForegroundColor Yellow
    k3d cluster delete portfolio
} else {
    Write-Host "'portfolio' cluster not found."
}

Write-Host "`nTeardown Complete!" -ForegroundColor Green
