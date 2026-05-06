# Port Forwarding Script for Portfolio Project
# Run this script in PowerShell

Write-Host "Starting Port Forwards..." -ForegroundColor Cyan

$jobs = @()

function Start-PF ($name, $ns, $res, $port) {
    Write-Host "Starting $name ($port)..." -NoNewline
    $j = Start-Job -Name $name -ScriptBlock { 
        param($n, $r, $p) 
        kubectl -n $n port-forward $r $p 2>&1
    } -ArgumentList $ns, $res, $port
    
    Start-Sleep -Seconds 2
    if ($j.State -eq 'Failed' -or $j.State -eq 'Stopped') {
        Write-Host " [FAILED]" -ForegroundColor Red
    } else {
        Write-Host " [OK]" -ForegroundColor Green
    }
    return $j
}

$jobs += Start-PF "Portfolio App" "portfolio-prod" "svc/frontend-service" "8080:80"
$jobs += Start-PF "ArgoCD Server" "argocd"         "svc/argocd-server"     "8085:443"
$jobs += Start-PF "Locust UI"     "locust"         "svc/locust"            "8090:8089"
$jobs += Start-PF "Grafana"       "monitoring"     "svc/kube-prometheus-stack-grafana" "3000:80"

Write-Host "`n----------------------------------------------------------------"
Write-Host "Port forwards are running in the background."
Write-Host "Portfolio: http://localhost:8080"
Write-Host "ArgoCD:    https://localhost:8085 (Accept certificate warning)"
Write-Host "Locust:    http://localhost:8090"
Write-Host "Grafana:   http://localhost:3000 (admin / prom-operator)"
Write-Host "----------------------------------------------------------------"
Write-Host "Press Enter to stop all forwards and close this window..."
Read-Host

Write-Host "Stopping jobs..."
Stop-Job $jobs
Remove-Job $jobs
