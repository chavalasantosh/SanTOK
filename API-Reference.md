# API Reference

Complete reference for SanTOK's Python API and web interface.

## Python API

### TextTokenizationEngine

Main tokenization engine class.

```python
from santok import TextTokenizationEngine

tokenization_engine = TextTokenizationEngine(
    random_seed=12345,
    embedding_bit=False,
    normalize_case=True,
    remove_punctuation=False,
    collapse_repetitions=0
)
```

#### Parameters

- `random_seed` (int): Random seed for reproducible results
- `embedding_bit` (bool): Enable embedding bit calculation
- `normalize_case` (bool): Convert text to lowercase
- `remove_punctuation` (bool): Remove punctuation marks
- `collapse_repetitions` (int): Collapse repeated characters (0 = disabled)

#### Methods

##### tokenize(text, method, **kwargs)

Tokenize input text using specified method.

**Parameters:**
- `text` (str): Input text to tokenize
- `method` (str): Tokenization method
- `**kwargs`: Additional method-specific parameters

**Returns:**
```python
{
    'original_text': 'Hello World!',
    'preprocessed_text': 'hello world!',
    'tokens': ['hello', 'world!'],
    'frontend_digits': [1, 2],
    'features': {
        'length_factor': 2,
        'balance_index': 1,
        'entropy_index': 0,
        'mean': 1.5,
        'variance': 0.25
    },
    'tokenization_method': 'whitespace',
    'configuration': {...}
}
```

**Available Methods:**
- `'whitespace'`: Split by whitespace
- `'word'`: Split by word boundaries
- `'character'`: Split into characters
- `'subword'`: Split into subwords

**Example:**
```python
result = tokenization_engine.tokenize("Hello World!", "whitespace")
print(result['tokens'])  # ['hello', 'world!']
print(result['frontend_digits'])  # [1, 2]
```

## Command Line Interface

### Basic Usage

```bash
santok "Hello World!" --method whitespace
```

### Options

- `--method`: Tokenization method (whitespace, word, character, subword)
- `--features`: Include statistical features
- `--analyze`: Comprehensive analysis
- `--file`: Input file path
- `--output`: Output file path
- `--seed`: Random seed
- `--normalize-case`: Normalize to lowercase
- `--remove-punctuation`: Remove punctuation

### Examples

```bash
# Basic tokenization
santok "Hello World!" --method whitespace

# With statistical features
santok "Hello World!" --method word --features

# Comprehensive analysis
santok "Hello World!" --analyze

# Process file
santok --file input.txt --method character --output results.json
```

## Web API

### Endpoints

#### POST /api/tokenize

Tokenize text via HTTP API.

**Request:**
```json
{
    "text": "Hello World!",
    "method": "whitespace",
    "options": {
        "normalize_case": true,
        "remove_punctuation": false,
        "collapse_repetitions": 0
    }
}
```

**Response:**
```json
{
    "tokens": ["Hello", "World!"],
    "frontend_digits": [1, 2, 3],
    "features": {
        "length_factor": 2,
        "balance_index": 5,
        "entropy_index": 3,
        "mean": 2.0,
        "variance": 0.5
    },
    "processing_time": 0.001
}
```

#### GET /api/methods

Get available tokenization methods.

**Response:**
```json
{
    "methods": [
        "whitespace",
        "word", 
        "character",
        "subword"
    ]
}
```

## Frontend API

### Components

#### Dashboard Component
- Real-time tokenization interface
- File upload support
- Performance metrics display

#### Compression Explorer Component
- Algorithm comparison
- Interactive charts
- Efficiency analysis

#### Performance Lab Component
- Benchmark testing
- Stress testing
- Real-time monitoring

### State Management

Uses Zustand for state management:

```typescript
interface AppState {
  activePage: Page
  sidebarOpen: boolean
  tokenizationResult: TokenizationResult | null
  // ... other state properties
}
```

## Error Handling

### Common Exceptions

```python
from santok.exceptions import SanTOKError

try:
    result = tokenization_engine.tokenize("", "invalid_method")
except SanTOKError as e:
    print(f"Error: {e.message}")
```

### Error Types

- `InvalidMethodError`: Unsupported tokenization method
- `EmptyTextError`: Empty input text
- `ConfigurationError`: Invalid configuration parameters

## Performance Considerations

- Use appropriate method for your use case
- Enable caching for repeated operations
- Monitor memory usage for large texts
- Use async operations for web interface

## Next Steps

- [Examples](Examples)
- [Performance Guide](Performance-Guide)
