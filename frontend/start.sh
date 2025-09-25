#!/bin/bash

echo "Starting Krishna Tokenizer Frontend..."
echo

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Failed to install dependencies"
        exit 1
    fi
fi

# Start the development server
echo "Starting development server..."
npm run dev
