@echo off
chcp 65001 >nul
echo ========================================
echo Auto commit and push to GitHub
echo ========================================

:: Get current time for commit message
for /f "tokens=1-6 delims=/ " %%a in ('date /t') do set today=%%a%%b%%c
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set time=%%a%%b
set commit_msg=Auto commit: %today%_%time%

echo Adding all files to staging area...
git add .

echo Committing code...
git commit -m "%commit_msg%"

echo Pushing to GitHub...
git push origin main

echo ========================================
echo Code successfully pushed to GitHub!
echo Commit message: %commit_msg%
echo ========================================

pause  