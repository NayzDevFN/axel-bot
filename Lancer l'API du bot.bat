@echo off
setlocal
title Axel Bot - API du bot Discord
cd /d "%~dp0"
cls

echo.
echo   =============================================
echo      Axel Bot - API du bot (token local)
echo   =============================================
echo.

if not exist ".env.local" (
  echo   [!] Fichier .env.local introuvable.
  echo       Copie .env.example vers .env.local et mets
  echo       DISCORD_BOT_TOKEN= dans dedans.
  echo.
  pause
  goto :end
)

if not exist "node_modules" (
  echo   [1/2] Installation des dependances...
  call npm install
  if errorlevel 1 goto :failed
)

echo   [2/2] Demarrage de l'API...
echo.
echo   ---------------------------------------------
echo    Statut : http://localhost:8787/api/bot/status
echo    Serveurs : http://localhost:8787/api/bot/guilds
echo    Arreter : ferme simplement cette fenetre
echo   ---------------------------------------------
echo.

call npm run bot:api
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
