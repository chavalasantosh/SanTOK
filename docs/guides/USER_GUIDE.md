# SanTOK User Guide

## 🚀 Quick Start

### Installation

```bash
pip install santok
```

### Basic Usage

```python
from santok import tokenize_text

# Simple tokenization
result = tokenize_text("Hello World!")
print(result)
```

## ⚠️ Important Notes

- **Always use `compute_features=True`** with the `tokenize()` method to get features
- **Available features**: `entropy_index`, `balance_index`, `length_factor`, `mean`, `variance`, `frontend_digits`
- **Not available**: `essence_digit`, `signature_runes` (not implemented in current version)
- **Method structure**: `tokenize()` returns direct features, `analyze_text_comprehensive()` returns nested structure

## 📚 Complete Guide

### 1. Simple Text Tokenization

```python
from santok import tokenize_text

# Basic tokenization
text = "Hello World! This is a test."
result = tokenize_text(text)
print(result)
```

**Output:**
```
SanTOK Results
==================================================

WHITESPACE TOKENIZATION:
------------------------------
Original Text: Hello World! This is a test.
Preprocessed Text: hello world! this is a test.
Tokenized Units: ['hello', 'world!', 'this', 'is', 'a', 'test.']
Unit Count: 6
Frontend Digit Values: [3, 3, 2, 1, 1, 2]
```

### 2. Advanced Text Analysis

```python
from santok import TextTokenizationEngine

# Create engine with custom settings
engine = TextTokenizationEngine(
    random_seed=12345,
    normalize_case=True,
    remove_punctuation=False,
    collapse_repetitions=0
)

# Comprehensive analysis
text = "The quick brown fox jumps over the lazy dog."
result = engine.analyze_text_comprehensive(text)
print(result)
```

### 3. Different Tokenization Methods

```python
from santok import TextTokenizationEngine

engine = TextTokenizationEngine()

# Whitespace tokenization
result1 = engine.tokenize("Hello World Test", tokenization_method="whitespace")
print("Whitespace:", result1['tokens'])

# Word tokenization
result2 = engine.tokenize("Hello, World! Test.", tokenization_method="word")
print("Word:", result2['tokens'])

# Character tokenization
result3 = engine.tokenize("Hello", tokenization_method="character")
print("Character:", result3['tokens'])

# Subword tokenization
result4 = engine.tokenize("tokenization", tokenization_method="subword")
print("Subword:", result4['tokens'])
```

### 4. Mathematical Analysis Features

```python
from santok import TextTokenizationEngine

engine = TextTokenizationEngine()
text = "SanTOK provides advanced text analysis capabilities."

# Get mathematical features using tokenize method
result = engine.tokenize(text, compute_features=True)

# Access features directly from result
print("Mathematical Features:")
print(f"Length Factor: {result['features']['length_factor']}")
print(f"Entropy Index: {result['features']['entropy_index']}")
print(f"Balance Index: {result['features']['balance_index']}")
print(f"Mean: {result['features']['mean']}")
print(f"Variance: {result['features']['variance']}")
print(f"Frontend Digits: {result['frontend_digits']}")
```

### 5. Configuration Options

```python
from santok import TextTokenizationEngine

# Custom configuration
engine = TextTokenizationEngine(
    random_seed=54321,           # Different seed for variation
    embedding_bit=True,          # Enable embedding bit
    normalize_case=False,        # Keep original case
    remove_punctuation=True,     # Remove punctuation
    collapse_repetitions=1       # Collapse repeated characters
)

text = "Hello!!! This is a TEST with repeated letters: aaaa bbbb"
result = engine.analyze_text_comprehensive(text)
print(result)
```

### 6. Batch Processing

```python
from santok import TextTokenizationEngine

engine = TextTokenizationEngine()

# Process multiple texts
texts = [
    "First document content here.",
    "Second document with different content.",
    "Third document for analysis."
]

results = []
for text in texts:
    result = engine.tokenize(text, compute_features=True)
    results.append({
        'text': text,
        'length_factor': result['features']['length_factor'],
        'entropy_index': result['features']['entropy_index']
    })

for result in results:
    print(f"Text: {result['text'][:30]}...")
    print(f"Length Factor: {result['length_factor']}, Entropy: {result['entropy_index']}")
    print()
```

### 7. File Processing

```python
from santok import TextTokenizationEngine
import os

engine = TextTokenizationEngine()

# Process text file
def process_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            result = engine.tokenize(content, compute_features=True)
            return result
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return None

# Example usage
file_path = "sample.txt"
if os.path.exists(file_path):
    result = process_file(file_path)
    if result:
        print(f"File analysis complete!")
        print(f"Length factor: {result['features']['length_factor']}")
```

### 8. Command Line Usage

```bash
# Basic usage
santok "Hello World" --method whitespace

# Advanced usage
santok "Hello World" --method word --features --analyze

# File processing
santok --file input.txt --method character --output results.json

# Help
santok --help
```

### 9. Integration with DataFrames (Pandas)

```python
import pandas as pd
from santok import TextTokenizationEngine

# Create sample data
data = {
    'text': [
        "This is the first document.",
        "Here is another document with different content.",
        "Third document for analysis purposes."
    ],
    'category': ['A', 'B', 'A']
}

df = pd.DataFrame(data)

# Initialize engine
engine = TextTokenizationEngine()

# Process texts
def analyze_text(text):
    result = engine.tokenize(text, compute_features=True)
    return {
        'length_factor': result['features']['length_factor'],
        'entropy_index': result['features']['entropy_index'],
        'balance_index': result['features']['balance_index']
    }

# Apply analysis
df[['length_factor', 'entropy_index', 'balance_index']] = df['text'].apply(
    lambda x: pd.Series(analyze_text(x))
)

print(df)
```

### 10. Error Handling

```python
from santok import TextTokenizationEngine

engine = TextTokenizationEngine()

def safe_tokenize(text):
    try:
        if not text or not isinstance(text, str):
            return None
        
        result = engine.tokenize(text, compute_features=True)
        return result
    except Exception as e:
        print(f"Error processing text: {e}")
        return None

# Example with error handling
texts = ["Valid text", "", None, "Another valid text"]

for text in texts:
    result = safe_tokenize(text)
    if result:
        print(f"Processed: {text} -> Length Factor: {result['features']['length_factor']}")
    else:
        print(f"Failed to process: {text}")
```

## 🎯 Use Cases

### 1. Text Preprocessing for ML
```python
from santok import TextTokenizationEngine

engine = TextTokenizationEngine(normalize_case=True, remove_punctuation=True)

def preprocess_for_ml(text):
    result = engine.analyze_text_comprehensive(text)
    return {
        'processed_text': result['preprocessed_text'],
        'features': result['features']
    }
```

### 2. Document Fingerprinting
```python
from santok import TextTokenizationEngine

engine = TextTokenizationEngine()

def create_document_fingerprint(text):
    result = engine.tokenize(text, compute_features=True)
    return {
        'frontend_digits': result['frontend_digits'],
        'length_factor': result['features']['length_factor']
    }
```

### 3. Text Similarity Analysis
```python
from santok import TextTokenizationEngine

engine = TextTokenizationEngine()

def compare_texts(text1, text2):
    result1 = engine.tokenize(text1, compute_features=True)
    result2 = engine.tokenize(text2, compute_features=True)
    
    # Compare length factors
    length_similarity = result1['features']['length_factor'] == result2['features']['length_factor']
    
    return {
        'length_similar': length_similarity,
        'text1_length_factor': result1['features']['length_factor'],
        'text2_length_factor': result2['features']['length_factor']
    }
```

## 🔧 Troubleshooting

### Common Issues

1. **Import Error**: Make sure SanTOK is installed
   ```bash
   pip install santok
   ```

2. **Empty Text**: Handle empty or None inputs
   ```python
   if text and text.strip():
       result = engine.analyze_text_comprehensive(text)
   ```

3. **Memory Issues**: For large texts, process in chunks
   ```python
   def process_large_text(text, chunk_size=1000):
       chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
       results = []
       for chunk in chunks:
           result = engine.analyze_text_comprehensive(chunk)
           results.append(result)
       return results
   ```

## 📖 API Reference

### Main Functions

- `tokenize_text(text, tokenization_method="whitespace")` - Simple tokenization
- `analyze_text_comprehensive(text)` - Full analysis with multiple methods
- `generate_text_summary(text)` - Generate summary

### TextTokenizationEngine Class

#### Constructor Parameters
- `random_seed` (int): Seed for reproducible results
- `embedding_bit` (bool): Enable embedding bit variation
- `normalize_case` (bool): Convert to lowercase
- `remove_punctuation` (bool): Remove punctuation
- `collapse_repetitions` (int): Collapse repeated characters

#### Methods
- `tokenize(text, tokenization_method="whitespace", compute_features=True)` - Main tokenization method
- `analyze_text(text, tokenization_methods=None)` - Analyze with multiple methods
- `generate_summary(text)` - Generate text summary

#### Available Features
- `entropy_index` - Variance-based randomness measure (0-9)
- `balance_index` - Mean-based balance measure (0-9)
- `length_factor` - Text length normalization (0-9)
- `mean` - Average of frontend digits
- `variance` - Variance of frontend digits
- `frontend_digits` - Array of digit values for each token

## 🎉 Examples Summary

SanTOK provides powerful text analysis capabilities with mathematical features. Use it for:

- **Text preprocessing** in machine learning pipelines
- **Document fingerprinting** and similarity analysis
- **Statistical text analysis** with mathematical features
- **Tokenization** for NLP applications
- **Text quality assessment** using entropy and balance indices

Start with simple tokenization and gradually explore advanced features as needed!
