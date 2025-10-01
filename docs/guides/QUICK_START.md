# SanTOK Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Installation

```bash
pip install santok
```

### 2. Basic Usage

```python
from santok import tokenize_text

# Simple tokenization
result = tokenize_text("Hello World!")
print(result)
```

### 3. Advanced Analysis

```python
from santok import TextTokenizationEngine

# Create engine
engine = TextTokenizationEngine()

# Analyze text
text = "SanTOK provides powerful text analysis capabilities."
result = engine.analyze_text_comprehensive(text)

print(f"Essence Digit: {result['features']['essence_digit']}")
print(f"Entropy Index: {result['features']['entropy_index']}")
print(f"Balance Index: {result['features']['balance_index']}")
```

### 4. Different Tokenization Methods

```python
from santok import TextTokenizationEngine

engine = TextTokenizationEngine()

# Whitespace tokenization
result1 = engine.tokenize("Hello World Test", tokenization_method="whitespace")
print("Whitespace tokens:", result1['tokens'])

# Word tokenization
result2 = engine.tokenize("Hello, World! Test.", tokenization_method="word")
print("Word tokens:", result2['tokens'])

# Character tokenization
result3 = engine.tokenize("Hello", tokenization_method="character")
print("Character tokens:", result3['tokens'])
```

### 5. Command Line Usage

```bash
# Basic usage
santok "Hello World" --method whitespace

# Advanced usage
santok "Hello World" --method word --features --analyze

# Help
santok --help
```

## 🎯 Common Use Cases

### Text Preprocessing
```python
from santok import TextTokenizationEngine

engine = TextTokenizationEngine(normalize_case=True, remove_punctuation=True)
result = engine.analyze_text_comprehensive("Hello, World!")
print("Processed:", result['preprocessed_text'])
```

### Document Fingerprinting
```python
from santok import TextTokenizationEngine

engine = TextTokenizationEngine()
result = engine.analyze_text_comprehensive("Document content here")
print("Signature:", result['features']['signature_runes'])
```

### Batch Processing
```python
from santok import TextTokenizationEngine

engine = TextTokenizationEngine()
texts = ["Text 1", "Text 2", "Text 3"]

for text in texts:
    result = engine.analyze_text_comprehensive(text)
    print(f"{text}: Essence {result['features']['essence_digit']}")
```

## 🔧 Configuration Options

```python
from santok import TextTokenizationEngine

# Custom configuration
engine = TextTokenizationEngine(
    random_seed=12345,           # Reproducible results
    embedding_bit=True,          # Additional variation
    normalize_case=True,          # Convert to lowercase
    remove_punctuation=True,     # Remove punctuation
    collapse_repetitions=1       # Collapse repeated chars
)
```

## 📊 Output Format

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

### Import Error
```bash
pip install santok
```

### Empty Text
```python
if text and text.strip():
    result = engine.analyze_text_comprehensive(text)
```

### Memory Issues
```python
# Process large texts in chunks
chunk_size = 1000
chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
```

## 📚 Next Steps

- Read the [Complete User Guide](./USER_GUIDE.md)
- Check out [Databricks Integration](./DATABRICKS_GUIDE.md)
- Explore [API Reference](./API_REFERENCE.md)
- Visit [GitHub Repository](https://github.com/chavalasantosh/SanTOK)

**You're ready to start analyzing text with SanTOK!** 🎉
