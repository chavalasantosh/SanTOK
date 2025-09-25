@echo off
echo Starting SanTOK Tokenizer Frontend...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Start the development server
echo Starting development server...
npm run dev

pause
