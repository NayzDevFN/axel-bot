@echo off
setlocal
title Axel Bot - Site local
cd /d "%~dp0"
cls

echo.
echo   =============================================
echo      Axel Bot - demarrage du site local
echo   =============================================
echo.

rem --- Si le serveur tourne deja, ouvre juste le navigateur ---
netstat -ano | findstr /c:":3000 " | findstr /c:"LISTENING" >nul
if not errorlevel 1 goto :already_running

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
echo   ---------------------------------------------
echo    Site      : http://localhost:3000
echo    Arreter   : ferme simplement cette fenetre
echo   ---------------------------------------------
echo.

start "" /b powershell -NoProfile -WindowStyle Hidden -Command "for($i=0;$i -lt 90;$i++){ try { Invoke-WebRequest 'http://localhost:3000' -UseBasicParsing -TimeoutSec 2 | Out-Null; Start-Process 'http://localhost:3000'; exit 0 } catch { Start-Sleep -Seconds 1 } }"

call npm start
goto :end

:already_running
echo   Le serveur tourne deja. Ouverture du navigateur...
start "" http://localhost:3000
goto :end

:failed
echo.
echo   Une erreur est survenue.
echo   Referme cette fenetre, verifie ta connexion internet
echo   puis relance le fichier.
echo.
pause
goto :end

:end
endlocal
