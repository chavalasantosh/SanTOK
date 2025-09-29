# SanTOK

A comprehensive text tokenization system with mathematical analysis and statistical features.

## Features

- **Multiple Tokenization Strategies**: Whitespace, word boundary, character, and subword tokenization
- **Mathematical Analysis**: Weighted sum calculation, digital root computation, and hash-based algorithms
- **Statistical Features**: Mean, variance, entropy index, and balance index calculations
- **Configurable**: Customizable preprocessing and processing parameters
- **Pure Python**: No external dependencies required
- **CLI Support**: Command-line interface for easy usage

## Installation

### From Source
   ```bash
git clone https://github.com/chavalasantosh/SanTOK.git
cd SanTOK
pip install -e .
   ```

### Development Installation
   ```bash
pip install -e .[dev]
```

## Quick Start

### Basic Usage

```python
from santok import TextTokenizationEngine

# Create tokenization engine instance
tokenization_engine = TextTokenizationEngine(random_seed=12345, embedding_bit=False)

# Tokenize text
result = tokenization_engine.tokenize("Hello World!", "whitespace")

print(f"Tokenized Units: {result['tokens']}")
print(f"Frontend Digit Values: {result['frontend_digits']}")
print(f"Statistical Features: {result['features']}")
```

### Convenience Functions

```python
from santok import tokenize_text, analyze_text_comprehensive, generate_text_summary

# Quick tokenization
result = tokenize_text("Hello World!")

# Comprehensive analysis with all methods
analysis = analyze_text_comprehensive("Hello World!")

# Text summary generation
summary = generate_text_summary("Hello World!")
```

### Command Line Usage

```bash
# Basic tokenization
santok "Hello World!" --method whitespace

# With statistical features
santok "Hello World!" --method word --features

# Comprehensive analysis with all methods
santok "Hello World!" --analyze

# From file
santok --file input.txt --method character

# Save to file
santok "Hello World!" --analyze --output results.json
```

## API Reference

### TextTokenizationEngine Class

#### Constructor
```python
TextTokenizationEngine(random_seed=12345, embedding_bit=False, normalize_case=True, remove_punctuation=False, collapse_repetitions=0)
```

**Parameters:**
- `random_seed` (int): Deterministic seed for reproducible tokenization
- `embedding_bit` (bool): Enable embedding bit for additional variation in calculations
- `normalize_case` (bool): Convert input text to lowercase for case-insensitive processing
- `remove_punctuation` (bool): Strip punctuation and special characters from input
- `collapse_repetitions` (int): Collapse repeated character sequences (0=disabled, 1=run-aware, N=collapse to N)

#### Methods

##### `tokenize(text, tokenization_method="whitespace", compute_features=True)`
Tokenize text with specified method.

**Parameters:**
- `text` (str): Input text to tokenize
- `tokenization_method` (str): Tokenization strategy ("whitespace", "word", "character", "subword")
- `compute_features` (bool): Whether to compute statistical features

**Returns:**
- `dict`: Dictionary containing tokenized units, frontend digit values, and statistical features

##### `analyze_text(text, tokenization_methods=None)`
Analyze text using multiple tokenization strategies.

**Parameters:**
- `text` (str): Input text for analysis
- `tokenization_methods` (list): List of tokenization methods to apply

**Returns:**
- `dict`: Dictionary containing analysis results for each tokenization method

##### `generate_summary(text)`
Generate comprehensive summary statistics for text analysis.

**Parameters:**
- `text` (str): Input text for summary generation

**Returns:**
- `dict`: Dictionary containing summary statistics

## Tokenization Strategies

### Whitespace Tokenization
Splits text by whitespace delimiters.
```python
result = tokenization_engine.tokenize("Hello World!", "whitespace")
# Tokenized Units: ["Hello", "World!"]
```

### Word Boundary Tokenization
Splits text into words (alphabetic characters only, removes punctuation).
```python
result = tokenization_engine.tokenize("Hello World!", "word")
# Tokenized Units: ["Hello", "World"]
```

### Character Tokenization
Splits text into individual character units.
```python
result = tokenization_engine.tokenize("Hello", "character")
# Tokenized Units: ["H", "e", "l", "l", "o"]
```

### Subword Tokenization
Splits text into fixed-size subword units.
```python
result = tokenization_engine.tokenize("Hello", "subword")
# Tokenized Units: ["Hel", "lo"] (with default chunk_size=3)
```

## Mathematical Features

### Frontend Digits
Small numbers (1-9) calculated using:
1. Weighted sum: ASCII value × position
2. Digital root: Reduced to single digit
3. Hash method: Hash value mod 10
4. Combined: (weighted_digit × 9 + hash_digit) % 9 + 1

### Statistical Features
- **Length Factor**: Number of tokens mod 10
- **Balance Index**: Mean of frontend digits mod 10
- **Entropy Index**: Variance of frontend digits mod 10

## Configuration Options

### Sanitization
- **Lowercase**: Convert all text to lowercase
- **Drop Specials**: Remove punctuation and special characters
- **Collapse Spaces**: Reduce multiple spaces to single space
- **Collapse Repeats**: Handle repeated letters

### Processing
- **Seed**: Deterministic random seed
- **Embedding Bit**: Add controlled variation to calculations

## Examples

### Basic Tokenization
```python
from krisna_tokenizer import KrisnaTokenizer

tokenizer = KrisnaTokenizer()
result = tokenizer.tokenize("We want a new television", "space")

print(f"Tokens: {result['tokens']}")
# Output: ['We', 'want', 'a', 'new', 'television']

print(f"Frontend Digits: {result['frontend_digits']}")
# Output: [1, 3, 8, 1, 1]

print(f"Features: {result['features']}")
# Output: {'length_factor': 5, 'balance_index': 2, 'entropy_index': 7}
```

### Advanced Analysis
```python
# Analyze with all tokenization methods
analysis = tokenizer.analyze_text("Hello World!")

for method, result in analysis.items():
    print(f"{method}: {len(result['tokens'])} tokens")
    print(f"  Features: {result['features']}")
```

### Custom Configuration
```python
# Custom tokenizer with specific settings
tokenizer = KrisnaTokenizer(
    seed=99999,
    embedding_bit=True,
    use_lower=True,
    drop_specials=True,
    collapse_repeats_to=1
)

result = tokenizer.tokenize("HELLO!!! World!!!", "word")
```

## Command Line Interface

### Basic Commands
```bash
# Tokenize text
krisna-tokenizer "Hello World!" --type space

# Analyze with all methods
krisna-tokenizer "Hello World!" --analyze

# From file
krisna-tokenizer --file input.txt --type word

# Save results
krisna-tokenizer "Hello World!" --analyze --output results.json
```

### Advanced Options
```bash
# Custom configuration
krisna-tokenizer "Hello World!" --seed 99999 --embedding-bit --drop-specials

# Subword tokenization with custom chunk size
krisna-tokenizer "Hello World!" --type subword --chunk-size 2

# Quiet mode
krisna-tokenizer "Hello World!" --quiet
```

## Mathematical Background

The tokenizer uses several mathematical concepts:

1. **Weighted Sum**: Each character's ASCII value multiplied by its position
2. **Digital Root**: Repeated digit sum until single digit (9-centric)
3. **Hash Function**: h = h * 31 + char_code
4. **Statistical Analysis**: Mean, variance, and entropy calculations

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For questions and support, please open an issue on GitHub.