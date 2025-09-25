#!/usr/bin/env python3
"""
Start the Krishna Tokenizer Backend Server
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    print("📦 Installing backend requirements...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Requirements installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing requirements: {e}")
        return False
    return True

def start_server():
    """Start the FastAPI server"""
    print("🚀 Starting Krishna Tokenizer Backend Server...")
    print("📡 Server will be available at: http://localhost:8000")
    print("📚 API Documentation at: http://localhost:8000/docs")
    print("🔄 Press Ctrl+C to stop the server")
    print("-" * 50)
    
    try:
        subprocess.run([sys.executable, "backend_server.py"])
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")

if __name__ == "__main__":
    print("🎯 Krishna Tokenizer Backend Setup")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not os.path.exists("krishna_tokenizer.py"):
        print("❌ Error: krishna_tokenizer.py not found!")
        print("Please run this script from the project root directory.")
        sys.exit(1)
    
    # Install requirements
    if not install_requirements():
        sys.exit(1)
    
    # Start server
    start_server()
