# SanTOK API Reference

## 📚 Complete API Documentation

### Installation

```bash
pip install santok
```

### Import

```python
from santok import TextTokenizationEngine, tokenize_text, analyze_text_comprehensive, generate_text_summary
```

## 🔧 TextTokenizationEngine Class

### Constructor

```python
TextTokenizationEngine(
    random_seed=12345,
    embedding_bit=False,
    normalize_case=True,
    remove_punctuation=False,
    collapse_repetitions=0
)
```

#### Parameters

- **random_seed** (int): Deterministic seed for reproducible tokenization
- **embedding_bit** (bool): Enable embedding bit for additional variation in calculations
- **normalize_case** (bool): Convert input text to lowercase for case-insensitive processing
- **remove_punctuation** (bool): Strip punctuation and special characters from input
- **collapse_repetitions** (int): Collapse repeated character sequences (0=disabled, 1=run-aware, N=collapse to N)

### Methods

#### `tokenize(text, tokenization_method="whitespace", compute_features=True)`

Main tokenization method for text processing.

**Parameters:**
- **text** (str): Input text to tokenize
- **tokenization_method** (str): Tokenization strategy ("whitespace", "word", "character", "subword")
- **compute_features** (bool): Whether to compute and return statistical features

**Returns:**
- **dict**: Dictionary containing tokens, frontend digits, and features

**Example:**
```python
engine = TextTokenizationEngine()
result = engine.tokenize("Hello World!", tokenization_method="whitespace")
print(result['tokens'])  # ['hello', 'world!']
print(result['features']['essence_digit'])  # 3
```

#### `analyze_text(text, tokenization_methods=None)`

Analyze text using multiple tokenization methods.

**Parameters:**
- **text** (str): Input text to analyze
- **tokenization_methods** (list): List of tokenization methods to use (default: all methods)

**Returns:**
- **dict**: Dictionary containing analysis results for all methods

**Example:**
```python
engine = TextTokenizationEngine()
result = engine.analyze_text("Hello World!")
print(result.keys())  # ['whitespace', 'word', 'character', 'subword']
```

#### `generate_summary(text)`

Generate a summary of text analysis.

**Parameters:**
- **text** (str): Input text to summarize

**Returns:**
- **dict**: Summary containing key insights

**Example:**
```python
engine = TextTokenizationEngine()
summary = engine.generate_summary("Hello World!")
print(summary['key_features'])
```

## 🚀 Convenience Functions

### `tokenize_text(text, tokenization_method="whitespace")`

Simple tokenization function.

**Parameters:**
- **text** (str): Input text to tokenize
- **tokenization_method** (str): Tokenization strategy

**Returns:**
- **dict**: Tokenization results

**Example:**
```python
from santok import tokenize_text
result = tokenize_text("Hello World!", tokenization_method="word")
print(result)
```

### `analyze_text_comprehensive(text)`

Comprehensive text analysis function.

**Parameters:**
- **text** (str): Input text to analyze

**Returns:**
- **dict**: Complete analysis results

**Example:**
```python
from santok import analyze_text_comprehensive
result = analyze_text_comprehensive("Hello World!")
print(result['features']['essence_digit'])
```

### `generate_text_summary(text)`

Generate text summary function.

**Parameters:**
- **text** (str): Input text to summarize

**Returns:**
- **dict**: Text summary

**Example:**
```python
from santok import generate_text_summary
summary = generate_text_summary("Hello World!")
print(summary)
```

## 📊 Output Format

### Tokenization Result

```python
{
    'original_text': 'Hello World!',
    'preprocessed_text': 'hello world!',
    'tokens': ['hello', 'world!'],
    'frontend_digits': [3, 3],
    'backend_digits': [782938472938472, 839281992381923],
    'features': {
        'essence_digit': 3,
        'entropy_index': 7,
        'balance_index': 5,
        'length_factor': 2,
        'signature_runes': [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    }
}
```

### Comprehensive Analysis Result

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

## 🎯 Tokenization Methods

### Available Methods

1. **"whitespace"**: Split text on whitespace characters
2. **"word"**: Extract words, filtering out punctuation
3. **"character"**: Each character as individual token
4. **"subword"**: Split into subword chunks (3-4 characters)

### Method Examples

```python
engine = TextTokenizationEngine()

# Whitespace tokenization
result = engine.tokenize("Hello World Test", tokenization_method="whitespace")
# Result: ['hello', 'world', 'test']

# Word tokenization
result = engine.tokenize("Hello, World! Test.", tokenization_method="word")
# Result: ['hello', 'world', 'test']

# Character tokenization
result = engine.tokenize("Hello", tokenization_method="character")
# Result: ['h', 'e', 'l', 'l', 'o']

# Subword tokenization
result = engine.tokenize("tokenization", tokenization_method="subword")
# Result: ['tok', 'eni', 'zat', 'ion']
```

## 🔍 Features Explained

### Mathematical Features

- **essence_digit**: Core text fingerprint (0-9)
- **entropy_index**: Variance-based randomness measure (0-9)
- **balance_index**: Mean-based balance measure (0-9)
- **length_factor**: Text length normalization (0-9)
- **signature_runes**: First 10 backend hash digits

### Feature Calculation

```python
# Example feature calculation
text = "Hello World!"
engine = TextTokenizationEngine()
result = engine.tokenize(text, compute_features=True)

print(f"Essence Digit: {result['features']['essence_digit']}")
print(f"Entropy Index: {result['features']['entropy_index']}")
print(f"Balance Index: {result['features']['balance_index']}")
print(f"Length Factor: {result['features']['length_factor']}")
print(f"Signature Runes: {result['features']['signature_runes']}")
```

## 🚨 Error Handling

### Common Errors

1. **TypeError: unexpected keyword argument**
   ```python
   # Wrong
   engine.tokenize("text", method="whitespace")
   
   # Correct
   engine.tokenize("text", tokenization_method="whitespace")
   ```

2. **Empty Text Handling**
   ```python
   if text and text.strip():
       result = engine.tokenize(text)
   ```

3. **Invalid Tokenization Method**
   ```python
   # Valid methods: "whitespace", "word", "character", "subword"
   result = engine.tokenize("text", tokenization_method="whitespace")
   ```

## 🎯 Best Practices

### 1. Initialize Engine Once
```python
# Good
engine = TextTokenizationEngine()
for text in texts:
    result = engine.tokenize(text)

# Avoid
for text in texts:
    engine = TextTokenizationEngine()  # Unnecessary recreation
    result = engine.tokenize(text)
```

### 2. Use Appropriate Methods
```python
# For simple tokenization
result = engine.tokenize(text, tokenization_method="whitespace")

# For comprehensive analysis
result = engine.analyze_text(text)

# For quick analysis
result = analyze_text_comprehensive(text)
```

### 3. Handle Large Texts
```python
# Process large texts in chunks
def process_large_text(text, chunk_size=1000):
    chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
    results = []
    for chunk in chunks:
        result = engine.tokenize(chunk)
        results.append(result)
    return results
```

## 📚 Examples

### Basic Usage
```python
from santok import TextTokenizationEngine

engine = TextTokenizationEngine()
result = engine.tokenize("Hello World!", tokenization_method="whitespace")
print(result['tokens'])
```

### Advanced Usage
```python
from santok import TextTokenizationEngine

engine = TextTokenizationEngine(
    normalize_case=True,
    remove_punctuation=True,
    collapse_repetitions=1
)

result = engine.analyze_text("Hello, World! This is a test.")
print(result['features']['essence_digit'])
```

### Batch Processing
```python
from santok import TextTokenizationEngine

engine = TextTokenizationEngine()
texts = ["Text 1", "Text 2", "Text 3"]

for text in texts:
    result = engine.tokenize(text, tokenization_method="word")
    print(f"{text}: {result['features']['essence_digit']}")
```

## 🔗 Related Resources

- [Quick Start Guide](QUICK_START.md)
- [User Guide](USER_GUIDE.md)
- [Examples Collection](EXAMPLES.md)
- [Databricks Guide](DATABRICKS_GUIDE.md)

This API reference provides complete documentation for all SanTOK functions and methods. Use it as a reference when developing with SanTOK!
