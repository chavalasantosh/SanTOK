#!/usr/bin/env python3
"""
SanTOK Decoding Demo
===================

This script demonstrates how to decode tokenized text back to its original form
using SanTOK's reversible tokenization algorithms.

Usage:
    python decode_demo.py
"""

import sys
import json
from core_tokenizer import tokenize_text, reconstruct_from_tokens

def demo_decoding():
    """Demonstrate text tokenization and decoding"""
    
    print("🔄 SanTOK Decoding Demo")
    print("=" * 50)
    
    # Example text
    original_text = "Hello, world! This is a test of SanTOK's reversible tokenization."
    print(f"📝 Original Text: {original_text}")
    print()
    
    # Different tokenizer types to test
    tokenizers = ['word', 'char', 'space', 'byte']
    
    for tokenizer_type in tokenizers:
        print(f"🔧 Testing {tokenizer_type.upper()} Tokenization:")
        print("-" * 30)
        
        # Tokenize
        tokens = tokenize_text(original_text, tokenizer_type)
        print(f"📊 Generated {len(tokens)} tokens")
        
        # Show first few tokens
        if tokens:
            print("🔤 First 5 tokens:")
            for i, token in enumerate(tokens[:5]):
                print(f"  {i+1}. '{token.get('text', token.get('token', ''))}' (index: {token.get('index', i)})")
            if len(tokens) > 5:
                print(f"  ... and {len(tokens) - 5} more tokens")
        
        # Decode back to original
        decoded_text = reconstruct_from_tokens(tokens, tokenizer_type)
        print(f"🔄 Decoded Text: {decoded_text}")
        
        # Verify perfect reconstruction
        is_perfect = (original_text == decoded_text)
        status = "✅ PERFECT" if is_perfect else "❌ IMPERFECT"
        print(f"🎯 Reconstruction: {status}")
        
        if not is_perfect:
            print(f"   Original length: {len(original_text)}")
            print(f"   Decoded length: {len(decoded_text)}")
            print(f"   Difference: {len(original_text) - len(decoded_text)}")
        
        print()

def demo_compression_decoding():
    """Demonstrate compression and decompression"""
    
    print("🗜️  Compression & Decompression Demo")
    print("=" * 50)
    
    # Text with repeated patterns
    text_with_patterns = "hello hello hello world world world test test test"
    print(f"📝 Text with patterns: {text_with_patterns}")
    
    # Tokenize
    tokens = tokenize_text(text_with_patterns, 'word')
    print(f"📊 Generated {len(tokens)} tokens")
    
    # Show compression potential
    from core_tokenizer import compress_tokens, decompress_tokens
    
    # Compress tokens
    compressed = compress_tokens(tokens)
    print(f"🗜️  Compressed to {len(compressed)} tokens")
    
    # Show compression ratio
    compression_ratio = len(compressed) / len(tokens) if tokens else 1
    print(f"📈 Compression ratio: {compression_ratio:.2f}")
    
    # Decompress
    decompressed = decompress_tokens(compressed)
    print(f"🔄 Decompressed to {len(decompressed)} tokens")
    
    # Reconstruct original text
    reconstructed = reconstruct_from_tokens(decompressed, 'word')
    print(f"🔄 Reconstructed: {reconstructed}")
    
    # Verify perfect reconstruction
    is_perfect = (text_with_patterns == reconstructed)
    status = "✅ PERFECT" if is_perfect else "❌ IMPERFECT"
    print(f"🎯 Final reconstruction: {status}")

def interactive_decode():
    """Interactive decoding session"""
    
    print("🎮 Interactive Decoding Session")
    print("=" * 50)
    print("Enter text to tokenize and decode (or 'quit' to exit):")
    
    while True:
        try:
            text = input("\n📝 Enter text: ").strip()
            
            if text.lower() in ['quit', 'exit', 'q']:
                print("👋 Goodbye!")
                break
            
            if not text:
                print("⚠️  Please enter some text")
                continue
            
            # Choose tokenizer
            print("\n🔧 Available tokenizers:")
            tokenizers = ['word', 'char', 'space', 'byte', 'grammar']
            for i, t in enumerate(tokenizers, 1):
                print(f"  {i}. {t}")
            
            try:
                choice = int(input("Choose tokenizer (1-5): ")) - 1
                if 0 <= choice < len(tokenizers):
                    tokenizer_type = tokenizers[choice]
                else:
                    tokenizer_type = 'word'
            except ValueError:
                tokenizer_type = 'word'
            
            print(f"\n🔧 Using {tokenizer_type} tokenization...")
            
            # Tokenize
            tokens = tokenize_text(text, tokenizer_type)
            print(f"📊 Generated {len(tokens)} tokens")
            
            # Show tokens
            print("🔤 Tokens:")
            for i, token in enumerate(tokens):
                token_text = token.get('text', token.get('token', ''))
                print(f"  {i+1:2d}. '{token_text}' (index: {token.get('index', i)})")
            
            # Decode
            decoded = reconstruct_from_tokens(tokens, tokenizer_type)
            print(f"\n🔄 Decoded: {decoded}")
            
            # Verify
            is_perfect = (text == decoded)
            status = "✅ PERFECT" if is_perfect else "❌ IMPERFECT"
            print(f"🎯 Reconstruction: {status}")
            
        except KeyboardInterrupt:
            print("\n👋 Goodbye!")
            break
        except Exception as e:
            print(f"❌ Error: {e}")

def main():
    """Main function"""
    
    if len(sys.argv) > 1 and sys.argv[1] == '--interactive':
        interactive_decode()
    else:
        demo_decoding()
        print()
        demo_compression_decoding()
        print()
        print("💡 Run with --interactive for interactive mode:")
        print("   python decode_demo.py --interactive")

if __name__ == "__main__":
    main()
