# SanTOK Tokenizer

A **universal, stable, reversible, and high-performance** tokenization system with **unique IDs by design**.

## 🌟 Features

- ✅ **Universal File Input/Output** - Handles ANY file type (text, binary, images, etc.)
- ✅ **Fully Reversible** - Perfect reconstruction guaranteed, no OOV issues
- ✅ **Compression Efficiency** - Multiple algorithms with space savings
- ✅ **Unique IDs by Design** - Sequential, deterministic IDs
- ✅ **Stable & Reliable** - Consistent, error-free operation
- ✅ **Production Ready** - Fast, efficient, and robust

## 🚀 Quick Start

```bash
# Run the tokenizer
python SanTOK_tokenizer.py

# Run comprehensive tests
cd tests
python run_tests.py
```

## 📁 Project Structure

```
SanTOK Tokenization/
├── SanTOK_tokenizer.py      # Main tokenizer implementation
├── main.py                   # Entry point
├── tokenizer.py              # Core tokenization logic
├── token_math.py             # Mathematical utilities
├── uid.py                    # Unique ID generation
├── docs/                     # Documentation
│   ├── SanTOK_Tokenizer_Documentation.md
│   ├── SanTOK_Tokenizer_Simple_Guide.md
│   ├── STABLE_REVERSIBLE_TOKENIZATION.md
│   ├── FULL_REVERSIBILITY_OOV_ELIMINATION.md
│   ├── COMPRESSION_EFFICIENCY.md
│   └── UNIVERSAL_FILE_HANDLING.md
├── examples/                 # Demo scripts and tutorials
│   ├── demo_enhanced_tokenization.py
│   ├── demo_stable_system.py
│   ├── demo_universal_files.py
│   └── SanTOKTokenizer_Tutorial.ipynb
├── tests/                    # Comprehensive test suite
│   ├── test_data/           # Test input files
│   ├── test_scripts/        # Test implementations
│   ├── test_results/        # Test outputs
│   └── run_tests.py         # Test runner
└── README.md                # This file
```

## 🎯 Tokenization Strategies

### 1. **Space Tokenization**
- Splits text by spaces
- Preserves original spacing
- Perfect for word-level processing

### 2. **Word Tokenization** 
- Identifies word boundaries
- Handles punctuation and special characters
- Maintains word integrity

### 3. **Character Tokenization**
- Character-level tokenization
- Handles Unicode and special characters
- No OOV issues

### 4. **Grammar Tokenization**
- Grammar-aware tokenization
- Separates words, punctuation, and spaces
- Linguistic structure preservation

### 5. **Subword Tokenization**
- **Fixed**: Fixed-length chunks
- **BPE-like**: Byte Pair Encoding style
- **Syllable**: Syllable-based splitting
- **Frequency**: Frequency-based splitting

### 6. **Byte Tokenization**
- UTF-8 byte-level tokenization
- Handles any binary content
- Universal compatibility

## 🔧 Compression Algorithms

### 1. **Run-Length Encoding (RLE)**
- Compresses consecutive identical tokens
- Efficient for repetitive content

### 2. **Pattern-Based Compression**
- Identifies and compresses recurring patterns
- Advanced pattern recognition

### 3. **Frequency-Based Compression**
- Uses shorter representations for frequent tokens
- Optimized for common patterns

### 4. **Adaptive Compression**
- Automatically selects best compression method
- Dynamic optimization

## 📊 Usage Examples

### Basic Usage
```python
from SanTOK_tokenizer import all_tokenizations

text = "Hello World!"
tokens = all_tokenizations(text)

# Access different tokenization strategies
space_tokens = tokens["space"]
word_tokens = tokens["word"] 
char_tokens = tokens["char"]
byte_tokens = tokens["byte"]
```

### File Processing
```python
# Process any file type
python SanTOK_tokenizer.py
# Select: 2 (file path)
# Enter: path/to/your/file
# Choose: y (show readable content)
```

### Testing
```python
# Run comprehensive tests
cd tests
python run_tests.py
```

## 🧪 Testing

The project includes a comprehensive test suite:

```bash
# Run all tests
cd tests
python run_tests.py

# Run specific tests
python test_scripts/test_comprehensive.py
python test_scripts/test_stable_tokenization.py
python test_scripts/test_full_reversibility.py
python test_scripts/test_compression_efficiency.py
```

## 📈 Performance

- **Speed**: < 1ms tokenization for typical text
- **Memory**: Efficient memory usage
- **Scalability**: Handles large files
- **Reliability**: 100% deterministic behavior

## 🔒 Stability & Reversibility

- **Deterministic**: Same input always produces same output
- **Reversible**: Perfect reconstruction of original text
- **Unique IDs**: Sequential, deterministic identifiers
- **No OOV**: Handles all characters without unknown tokens

## 📚 Documentation

### **📋 Complete Documentation Index**
- [**📚 Documentation Index**](docs/00-DOCUMENTATION_INDEX.md) - Complete documentation overview and navigation

### **📋 Requirements Documentation**
- [**01-FSR Full System Requirements**](docs/01-requirements/01-FSR_Full_System_Requirements.md) - Complete functional and non-functional requirements
- [**02-TSR Technical System Requirements**](docs/01-requirements/02-TSR_Technical_System_Requirements.md) - Detailed technical specifications and implementation details
- [**03-FSR TSR Summary**](docs/01-requirements/03-FSR_TSR_Summary.md) - Overview of both FSR and TSR documents

### **📖 User Documentation**
- [**01-Complete User Manual**](docs/02-user-guides/01-Complete_User_Manual.md) - Full user manual and API reference
- [**02-Quick Start Guide**](docs/02-user-guides/02-Quick_Start_Guide.md) - Quick start guide for new users
- [**03-Beginner Complete Guide**](docs/02-user-guides/03-Beginner_Complete_Guide.md) - Super simple, step-by-step guide for complete beginners

### **🔧 Technical Documentation**
- [**01-Stable Reversible Tokenization**](docs/03-technical-specs/01-Stable_Reversible_Tokenization.md) - Stability and reversibility deep-dive
- [**02-Full Reversibility OOV Elimination**](docs/03-technical-specs/02-Full_Reversibility_OOV_Elimination.md) - Perfect reconstruction and OOV handling
- [**03-Compression Efficiency**](docs/03-technical-specs/03-Compression_Efficiency.md) - Compression algorithms and efficiency analysis
- [**04-Universal File Handling**](docs/03-technical-specs/04-Universal_File_Handling.md) - Universal file input/output capabilities

### **🧮 Mathematics Documentation**
- [**01-Mathematics For Beginners**](docs/04-mathematics/01-Mathematics_For_Beginners.md) - Complete mathematical guide with step-by-step explanations
- [**02-Tokenization Mathematics**](docs/04-mathematics/02-Tokenization_Mathematics.md) - Complete mathematical guide for tokenization concepts and calculations
- [**03-Math Reference Card**](docs/04-mathematics/03-Math_Reference_Card.md) - Quick reference for basic math while using SanTOK Tokenizer

### **📊 Project Documentation**
- [**01-Enhanced Tokenization Summary**](docs/05-project-docs/01-Enhanced_Tokenization_Summary.md) - Feature overview and benefits
- [**02-Original Project Requirements**](docs/05-project-docs/02-Original_Project_Requirements.md) - Original project requirements and specifications
- [**03-Beginner Documentation Summary**](docs/05-project-docs/03-Beginner_Documentation_Summary.md) - Summary of beginner-friendly documentation
- [**04-Tokenization Math Summary**](docs/05-project-docs/04-Tokenization_Math_Summary.md) - Summary of tokenization mathematics documentation

## 🎮 Examples & Demos

- [Enhanced Tokenization Demo](examples/demo_enhanced_tokenization.py)
- [Stable System Demo](examples/demo_stable_system.py)
- [Universal Files Demo](examples/demo_universal_files.py)
- [Jupyter Tutorial](examples/SanTOKTokenizer_Tutorial.ipynb)

## 🏆 Key Benefits

1. **Universal Compatibility** - Works with any file type
2. **Perfect Reversibility** - No information loss
3. **High Performance** - Fast and efficient
4. **Production Ready** - Stable and reliable
5. **Comprehensive Testing** - Thoroughly validated
6. **Rich Documentation** - Complete guides and examples

## 🤝 Contributing

This is a complete, production-ready tokenization system. The codebase is well-organized with comprehensive tests and documentation.

## 📄 License

This project represents a complete implementation of a universal tokenization system with advanced features including reversibility, compression, and universal file handling.

---

**SanTOK Tokenizer** - Universal, Stable, Reversible, High-Performance Tokenization System
