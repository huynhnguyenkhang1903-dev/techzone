@echo off
title TECHZONE Local Server - Test Mobile iOS & Android
cd /d "%~dp0"
echo ========================================================
echo   KHOI DONG TECHZONE LOCAL WEB SERVER CHO MOBILE & PC
echo ========================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
