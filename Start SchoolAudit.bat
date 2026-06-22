@echo off
title SchoolAudit — Northern Cape
echo ====================================================
echo   SchoolAudit — Northern Cape
echo   Starting local server...
echo   Press Ctrl+C or close this window to stop.
echo ====================================================
python server.py
if %errorlevel% neq 0 (
  echo.
  echo Python not found. Trying py launcher...
  py server.py
)
pause
