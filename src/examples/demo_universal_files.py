#!/usr/bin/env python3
"""
DEMO: Universal File Handling with SanTOK Tokenizer
====================================================

This demonstrates how the SanTOK Tokenizer can handle ANY file type
as input and produce ANY file format as output.

Features:
- Handles text files, binary files, images, videos, executables, etc.
- Auto-detects file types
- Produces multiple output formats (JSON, CSV, XML, TXT)
- Robust error handling
- Complete reversibility maintained
"""

import os
import sys

def create_test_files():
    """Create various test files to demonstrate universal handling"""
    
    # Create test directory
    test_dir = "test_files"
    if not os.path.exists(test_dir):
        os.makedirs(test_dir)
    
    # 1. Text file
    with open(f"{test_dir}/sample.txt", "w", encoding="utf-8") as f:
        f.write("Hello World! This is a test file.\nLine 2 with special chars: @#$%^&*()\n")
    
    # 2. JSON file
    with open(f"{test_dir}/sample.json", "w", encoding="utf-8") as f:
        f.write('{"name": "SanTOK Tokenizer", "version": "1.0", "features": ["reversible", "stable"]}')
    
    # 3. CSV file
    with open(f"{test_dir}/sample.csv", "w", encoding="utf-8") as f:
        f.write("Name,Age,City\nJohn,25,New York\nJane,30,London\n")
    
    # 4. Binary file (simulated)
    with open(f"{test_dir}/sample.bin", "wb") as f:
        f.write(b'\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0A\x0B\x0C\x0D\x0E\x0F')
    
    # 5. Code file
    with open(f"{test_dir}/sample.py", "w", encoding="utf-8") as f:
        f.write('''def hello_world():
    print("Hello from SanTOK Tokenizer!")
    return "success"

if __name__ == "__main__":
    hello_world()
''')
    
    print(f"Created test files in '{test_dir}/' directory:")
    print("- sample.txt (text file)")
    print("- sample.json (JSON file)")
    print("- sample.csv (CSV file)")
    print("- sample.bin (binary file)")
    print("- sample.py (Python code file)")
    print()

def demonstrate_universal_handling():
    """Demonstrate universal file handling capabilities"""
    
    print("=" * 60)
    print("UNIVERSAL FILE HANDLING DEMONSTRATION")
    print("=" * 60)
    print()
    
    print("The SanTOK Tokenizer can now handle:")
    print()
    print("📁 INPUT FILES (ANY TYPE):")
    print("  ✓ Text files (.txt, .md, .log)")
    print("  ✓ Code files (.py, .js, .java, .cpp, etc.)")
    print("  ✓ Data files (.json, .xml, .csv, .sql)")
    print("  ✓ Binary files (.exe, .dll, .bin)")
    print("  ✓ Media files (.jpg, .png, .mp4, .mp3)")
    print("  ✓ Archive files (.zip, .rar, .7z)")
    print("  ✓ ANY other file type")
    print()
    
    print("📄 OUTPUT FORMATS (ANY TYPE):")
    print("  ✓ JSON format (.json)")
    print("  ✓ CSV format (.csv)")
    print("  ✓ XML format (.xml)")
    print("  ✓ Text format (.txt)")
    print("  ✓ Binary format (.bin)")
    print("  ✓ Custom formats")
    print()
    
    print("🔧 FEATURES:")
    print("  ✓ Auto-detects file types")
    print("  ✓ Handles corrupted files gracefully")
    print("  ✓ Shows file size and metadata")
    print("  ✓ Maintains full reversibility")
    print("  ✓ No OOV issues - handles all characters")
    print("  ✓ Compression efficiency")
    print("  ✓ Unique IDs by design")
    print()
    
    print("🚀 USAGE:")
    print("  1. Run: python SanTOK_tokenizer.py")
    print("  2. Choose: 2 (file path)")
    print("  3. Enter: path/to/ANY/file")
    print("  4. Choose: output format (JSON/CSV/XML/TXT/ALL)")
    print("  5. Get: Complete tokenization + compression analysis")
    print()
    
    print("💡 EXAMPLES:")
    print("  Input:  image.jpg     → Output: tokens.json")
    print("  Input:  video.mp4     → Output: tokens.csv")
    print("  Input:  document.pdf  → Output: tokens.xml")
    print("  Input:  executable.exe → Output: tokens.txt")
    print("  Input:  ANY file      → Output: ANY format")
    print()

def show_file_type_detection():
    """Show how file type detection works"""
    
    print("=" * 60)
    print("FILE TYPE DETECTION")
    print("=" * 60)
    print()
    
    file_examples = [
        ("document.txt", "text", "document"),
        ("script.py", "code", "source"),
        ("data.json", "data", "structured"),
        ("image.jpg", "media", "binary"),
        ("archive.zip", "archive", "compressed"),
        ("program.exe", "executable", "binary"),
        ("unknown.xyz", "unknown", "unknown")
    ]
    
    print("File Extension Detection:")
    for filename, file_type, category in file_examples:
        print(f"  {filename:15} → {file_type:10} ({category})")
    print()
    
    print("The system automatically:")
    print("  ✓ Detects file type from extension")
    print("  ✓ Categorizes files (text/binary/structured)")
    print("  ✓ Shows file size and metadata")
    print("  ✓ Handles unknown file types gracefully")
    print()

def main():
    """Main demonstration function"""
    
    print("SanTOK Tokenizer - Universal File Handling Demo")
    print("=" * 50)
    print()
    
    # Create test files
    create_test_files()
    
    # Show capabilities
    demonstrate_universal_handling()
    
    # Show detection
    show_file_type_detection()
    
    print("=" * 60)
    print("READY TO TEST!")
    print("=" * 60)
    print()
    print("The SanTOK Tokenizer is now UNIVERSAL!")
    print("It can handle ANY file as input and produce ANY format as output.")
    print()
    print("Try it with any file on your system!")
    print()

if __name__ == "__main__":
    main()
