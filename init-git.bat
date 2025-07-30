@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

echo ========================================
echo Git Repository Initialization and Remote Configuration
echo ========================================

:: Check if Git repository already exists
if exist ".git" (
    echo Git repository already exists, skipping initialization...
) else (
    echo Initializing Git repository...
    git init
    echo Git repository initialization completed!
)

:: Configure user information
echo.
echo Please choose whether to configure Git user information:
echo 1. Configure user information
echo 2. Skip user information configuration
set /p choice=Please enter your choice (1/2): 

if "%choice%"=="1" (
    echo.
    set /p username=Please enter username: 
    set /p email=Please enter email: 
    git config user.name "%username%"
    git config user.email "%email%"
    echo User information configuration completed!
) else (
    echo Skipping user information configuration...
)

:: Configure remote repository
echo.
echo Please choose remote repository configuration method:
echo 1. Use HTTPS
echo 2. Use SSH
echo 3. Enter full URL manually
set /p remote_choice=Please enter your choice (1/2/3): 

if "%remote_choice%"=="1" goto use_https
if "%remote_choice%"=="2" goto use_ssh
if "%remote_choice%"=="3" goto use_custom
goto skip_remote

:use_https
set /p repo_name=Please enter GitHub repository name (e.g., username/repo-name): 
git remote add origin https://github.com/%repo_name%.git
echo HTTPS remote repository configuration completed!
goto continue

:use_ssh
set /p repo_name=Please enter GitHub repository name (e.g., username/repo-name): 
git remote add origin git@github.com:%repo_name%.git
echo SSH remote repository configuration completed!
goto continue

:use_custom
set /p repo_url=Please enter the full repository URL: 
git remote add origin %repo_url%
echo Custom remote repository configuration completed!
goto continue

:skip_remote
echo Invalid choice, skipping remote repository configuration...

:continue

:: Check remote configuration
echo.
echo Checking remote repository configuration...
git remote -v

:: Create .gitignore if not exists
if not exist ".gitignore" (
    echo.
    echo Creating .gitignore file...
    (
        echo # Dependencies
        echo node_modules/
        echo dist/
        echo .env
        echo .env.local
        echo .env.*.local
        echo npm-debug.log*
        echo yarn-debug.log*
        echo yarn-error.log*
        echo .DS_Store
        echo .vscode/
        echo *.log
    ) > .gitignore
    echo .gitignore file creation completed!
)

:: First commit prompt
echo.
set /p first_commit=Do you want to perform the first commit? (y/n): 

if /i "%first_commit%"=="y" (
    echo Adding all files...
    git add .
    echo Performing first commit...
    git commit -m "Initial commit"
    echo First commit completed!
) else (
    echo Skipping initial commit...
)

echo ========================================
echo Git repository configuration completed!
echo ========================================
echo.
echo Next steps:
echo 1. If remote repository is configured, you can run push.bat to push to GitHub
echo 2. Or manually execute: git push -u origin main
echo.

pause
