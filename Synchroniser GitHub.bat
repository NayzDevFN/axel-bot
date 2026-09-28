@echo off
setlocal
title Axel Bot - Synchro GitHub
cd /d "%~dp0"
cls

echo.
echo   =============================================
echo      Synchro automatique GitHub
echo   =============================================
echo.
echo   Toute modification est envoyee sur GitHub
echo   apres ~15 secondes d'inactivite.
echo.
echo   Pour arreter : ferme cette fenetre.
echo   ---------------------------------------------
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\sync-git.ps1"

pause
endlocal
