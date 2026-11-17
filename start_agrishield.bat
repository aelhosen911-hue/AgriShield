@echo off
title AgriShield (AgroVision) - Web & 3D Experience
echo ============================================================
echo   Starting AgriShield (AgroVision) Interactive Web Platform
echo   Precision Agriculture & Foliar Protection Decision Support
echo ============================================================
echo.
echo Launching local server on http://localhost:8080 ...
start "" "http://localhost:8080/index.html"
python -m http.server 8080
pause
