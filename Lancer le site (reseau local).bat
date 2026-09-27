@echo off
setlocal enabledelayedexpansion
title Axel Bot - Site sur le reseau local
cd /d "%~dp0"
cls

echo.
echo   ==============================================
echo      Axel Bot - hebergement sur ton PC
echo   ==============================================
echo.

rem --- Detection de l'adresse IP locale ---
set "IP="
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /c:"IPv4"') do (
  set "IP=%%A"
)
set "IP=%IP: =%"

if not exist "node_modules" (
  echo   [1/3] Installation des dependances...
  call npm install
  if errorlevel 1 goto :failed
)

if not exist ".next\BUILD_ID" (
  echo   [2/3] Construction du site...
  call npm run build
  if errorlevel 1 goto :failed
)

echo   [3/3] Demarrage du serveur...
echo.
echo   --------------------------------------------------
echo    Sur cet ordinateur  : http://localhost:3000
if defined IP echo    Sur ton reseau     : http://%IP%:3000
echo.
echo    Phone / autre PC : ouvre l'adresse "reseau"
echo    Windows peut demander l'autorisation du pare-feu
echo    ==^> clique sur "Autoriser"
echo.
echo    Pour arreter : ferme cette fenetre
echo   --------------------------------------------------
echo.

start "" /b powershell -NoProfile -WindowStyle Hidden -Command "for($i=0;$i -lt 90;$i++){ try { Invoke-WebRequest 'http://localhost:3000' -UseBasicParsing -TimeoutSec 2 | Out-Null; Start-Process 'http://localhost:3000'; exit 0 } catch { Start-Sleep -Seconds 1 } }"

call npm start -- -H 0.0.0.0
goto :end

:failed
echo.
echo   Une erreur est survenue. Referme cette fenetre
echo   et relance le fichier.
echo.
pause
goto :end

:end
endlocal
