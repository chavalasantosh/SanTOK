#!/usr/bin/env python3
"""
SanTOK - Advanced Text Tokenization Framework
Main entry point for the application
"""

import sys
import os

# Add src to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from src.core.core_tokenizer import tokenize_text, reconstruct_from_tokens
from src.cli.main import main as cli_main
from src.servers.main_server import app as main_app
from src.servers.lightweight_server import app as lightweight_app

def main():
    """Main entry point"""
    print("🚀 SanTOK - Advanced Text Tokenization Framework")
    print("=" * 50)
    print("Available modes:")
    print("1. CLI Mode - Command line interface")
    print("2. Server Mode - Web API server")
    print("3. Lightweight Mode - Minimal server")
    print("4. Direct Mode - Direct function calls")
    
    choice = input("\nSelect mode (1-4): ").strip()
    
    if choice == "1":
        cli_main()
    elif choice == "2":
        print("Starting main server...")
        import uvicorn
        uvicorn.run(main_app, host="0.0.0.0", port=8000)
    elif choice == "3":
        print("Starting lightweight server...")
        import uvicorn
        uvicorn.run(lightweight_app, host="0.0.0.0", port=8001)
    elif choice == "4":
        demo_direct_mode()
    else:
        print("Invalid choice. Exiting.")

def demo_direct_mode():
    """Demo direct function calls"""
    print("\n🔧 Direct Mode Demo")
    print("-" * 30)
    
    # Test text
    text = "Hello, world! This is a test."
    print(f"Input text: {text}")
    
    # Test different tokenizers
    tokenizers = ["space", "word", "char", "grammar"]
    
    for tokenizer_type in tokenizers:
        print(f"\n📝 {tokenizer_type.upper()} Tokenization:")
        tokens = tokenize_text(text, tokenizer_type)
        print(f"  Tokens: {len(tokens)}")
        print(f"  Sample: {[t['text'] for t in tokens[:5]]}")
        
        # Test reconstruction
        reconstructed = reconstruct_from_tokens(tokens, tokenizer_type)
        print(f"  Reconstructed: {reconstructed}")
        print(f"  Perfect: {'✅' if reconstructed == text else '❌'}")

if __name__ == "__main__":
    main()
