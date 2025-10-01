# SanTOK Complete Guide Collection

## 📚 Comprehensive Documentation for SanTOK

Welcome to the complete guide collection for SanTOK - A comprehensive text tokenization system with mathematical analysis and statistical features.

## 🚀 Quick Links

### 📖 Essential Guides
- **[Quick Start Guide](docs/guides/QUICK_START.md)** - Get started in 5 minutes
- **[User Guide](docs/guides/USER_GUIDE.md)** - Complete usage documentation
- **[Examples Collection](docs/guides/EXAMPLES.md)** - Comprehensive examples for all use cases

### 🔧 Platform-Specific Guides
- **[Databricks Guide](docs/guides/DATABRICKS_GUIDE.md)** - Complete Databricks integration guide

## 📦 Installation

```bash
pip install santok
```

## 🎯 What is SanTOK?

SanTOK is a powerful text tokenization engine that provides:

- **Multiple Tokenization Methods**: Whitespace, word, character, subword, grammar, and byte-level tokenization
- **Mathematical Analysis**: Weighted character sums, digital roots, and hash-based calculations
- **Statistical Features**: Entropy index, balance index, length factor, and signature runes
- **Configurable Processing**: Case normalization, punctuation removal, repetition collapsing
- **Command Line Interface**: Easy-to-use CLI for quick text analysis
- **Python API**: Comprehensive Python library for integration

## 🚀 Quick Start

### Basic Usage

```python
from santok import tokenize_text

# Simple tokenization
result = tokenize_text("Hello World!")
print(result)
```

### Advanced Analysis

```python
from santok import TextTokenizationEngine

# Create engine with custom settings
engine = TextTokenizationEngine(
    normalize_case=True,
    remove_punctuation=True
)

# Comprehensive analysis
text = "SanTOK provides powerful text analysis capabilities."
result = engine.analyze_text_comprehensive(text)

print(f"Essence Digit: {result['features']['essence_digit']}")
print(f"Entropy Index: {result['features']['entropy_index']}")
print(f"Balance Index: {result['features']['balance_index']}")
```

### Command Line Usage

```bash
# Basic usage
santok "Hello World" --method whitespace

# Advanced usage
santok "Hello World" --method word --features --analyze

# File processing
santok --file input.txt --method character --output results.json
```

## 📊 Key Features

### 1. Multiple Tokenization Methods
- **Whitespace**: Split on spaces
- **Word**: Filter punctuation, keep words
- **Character**: Each character as token
- **Subword**: Syllable-based splitting
- **Grammar**: Words + punctuation separately
- **Byte**: Character to byte conversion

### 2. Mathematical Analysis
- **Weighted Character Sum**: Position-weighted character values
- **Digital Root**: Repeated digit sum until single digit
- **Hash Calculations**: 64-bit backend hashes
- **Frontend Digits**: Small bounded numeric representations

### 3. Statistical Features
- **Essence Digit**: Core text fingerprint
- **Entropy Index**: Variance-based randomness measure
- **Balance Index**: Mean-based balance measure
- **Length Factor**: Text length normalization
- **Signature Runes**: First 10 backend hash digits

### 4. Configuration Options
- **Random Seed**: Reproducible results
- **Embedding Bit**: Additional variation
- **Case Normalization**: Convert to lowercase
- **Punctuation Removal**: Strip special characters
- **Repetition Collapsing**: Merge repeated characters

## 🎯 Use Cases

### Text Preprocessing
```python
engine = TextTokenizationEngine(normalize_case=True, remove_punctuation=True)
result = engine.analyze_text_comprehensive("Hello, World!")
print("Processed:", result['preprocessed_text'])
```

### Document Fingerprinting
```python
engine = TextTokenizationEngine()
result = engine.analyze_text_comprehensive("Document content")
print("Signature:", result['features']['signature_runes'])
```

### Text Similarity
```python
def compare_texts(text1, text2):
    engine = TextTokenizationEngine()
    result1 = engine.analyze_text_comprehensive(text1)
    result2 = engine.analyze_text_comprehensive(text2)
    
    return result1['features']['essence_digit'] == result2['features']['essence_digit']
```

### Batch Processing
```python
engine = TextTokenizationEngine()
texts = ["Text 1", "Text 2", "Text 3"]

for text in texts:
    result = engine.analyze_text_comprehensive(text)
    print(f"{text}: Essence {result['features']['essence_digit']}")
```

## 🔧 Configuration Examples

### Basic Configuration
```python
engine = TextTokenizationEngine()  # Default settings
```

### Custom Configuration
```python
engine = TextTokenizationEngine(
    random_seed=12345,           # Reproducible results
    embedding_bit=True,          # Additional variation
    normalize_case=True,         # Convert to lowercase
    remove_punctuation=True,     # Remove punctuation
    collapse_repetitions=1       # Collapse repeated chars
)
```

### Databricks Configuration
```python
# In Databricks notebook
%pip install santok

from santok import TextTokenizationEngine
engine = TextTokenizationEngine(normalize_case=True, remove_punctuation=True)
```

## 📈 Output Format

```python
{
    'original_text': 'Hello World!',
    'preprocessed_text': 'hello world!',
    'tokens': {
        'whitespace': ['hello', 'world!'],
        'word': ['hello', 'world'],
        'character': ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', '!'],
        'subword': ['hel', 'lo', 'wor', 'ld']
    },
    'features': {
        'essence_digit': 3,
        'entropy_index': 7,
        'balance_index': 5,
        'length_factor': 2,
        'signature_runes': [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    }
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Import Error**
   ```bash
   pip install santok
   ```

2. **Empty Text Handling**
   ```python
   if text and text.strip():
       result = engine.analyze_text_comprehensive(text)
   ```

3. **Memory Issues with Large Texts**
   ```python
   # Process in chunks
   chunk_size = 1000
   chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
   ```

4. **Databricks Installation**
   ```python
   %pip install santok
   ```

## 📚 Guide Descriptions

### Quick Start Guide
- **Purpose**: Get up and running in 5 minutes
- **Audience**: Beginners, quick reference
- **Content**: Installation, basic usage, common examples

### User Guide
- **Purpose**: Comprehensive usage documentation
- **Audience**: All users, detailed reference
- **Content**: Complete API reference, advanced features, configuration options

### Examples Collection
- **Purpose**: Real-world usage examples
- **Audience**: Developers, data scientists
- **Content**: 10+ comprehensive examples covering all use cases

### Databricks Guide
- **Purpose**: Databricks-specific integration
- **Audience**: Databricks users, data engineers
- **Content**: Installation, DataFrame integration, performance optimization

## 🔗 Additional Resources

- **[PyPI Package](https://pypi.org/project/santok/)** - Install from PyPI
- **[GitHub Repository](https://github.com/chavalasantosh/SanTOK)** - Source code and issues
- **[Project Documentation](docs/)** - Complete project documentation

## 🤝 Contributing

We welcome contributions! Please see our GitHub repository for:
- Bug reports
- Feature requests
- Code contributions
- Documentation improvements

## 📄 License

SanTOK is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🎉 Get Started Now!

1. **Install SanTOK**: `pip install santok`
2. **Read Quick Start**: [Quick Start Guide](docs/guides/QUICK_START.md)
3. **Explore Examples**: [Examples Collection](docs/guides/EXAMPLES.md)
4. **Deep Dive**: [User Guide](docs/guides/USER_GUIDE.md)

**Happy analyzing with SanTOK!** 🚀
