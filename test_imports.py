#!/usr/bin/env python3
"""
Test script to verify all imports work correctly after reorganization
"""

import sys
import os

# Add src to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

def test_core_imports():
    """Test core tokenizer imports"""
    try:
        from core.core_tokenizer import tokenize_text, reconstruct_from_tokens
        print("✅ Core tokenizer imports successful")
        return True
    except ImportError as e:
        print(f"❌ Core tokenizer import failed: {e}")
        return False

def test_compression_imports():
    """Test compression imports"""
    try:
        from compression.compression_algorithms import compose_backend_number
        print("✅ Compression imports successful")
        return True
    except ImportError as e:
        print(f"❌ Compression import failed: {e}")
        return False

def test_utils_imports():
    """Test utils imports"""
    try:
        from utils.unique_identifier import assign_uids
        print("✅ Utils imports successful")
        return True
    except ImportError as e:
        print(f"❌ Utils import failed: {e}")
        return False

def test_basic_functionality():
    """Test basic tokenization functionality"""
    try:
        from core.core_tokenizer import tokenize_text, reconstruct_from_tokens
        
        text = "Hello, world!"
        tokens = tokenize_text(text, "word")
        reconstructed = reconstruct_from_tokens(tokens, "word")
        
        if reconstructed == text:
            print("✅ Basic functionality test passed")
            return True
        else:
            print("❌ Basic functionality test failed")
            return False
    except Exception as e:
        print(f"❌ Functionality test failed: {e}")
        return False

def main():
    """Main test function"""
    print("🧪 Testing SanTOK Imports and Functionality")
    print("=" * 50)
    
    tests = [
        test_core_imports,
        test_compression_imports,
        test_utils_imports,
        test_basic_functionality
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print(f"📊 Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! SanTOK is working correctly.")
        return True
    else:
        print("❌ Some tests failed. Check the errors above.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
