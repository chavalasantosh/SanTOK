# Welcome to the SanTOK wiki!

Welcome to the SanTOK Universal Text Tokenization Framework documentation and knowledge base.

## What is SanTOK?

SanTOK is a comprehensive text tokenization system with mathematical analysis, statistical features, and a modern web interface. It provides multiple tokenization strategies for text analysis and natural language processing tasks.

## Key Features

- **Multiple Tokenization Strategies**: Whitespace, word boundary, character, and subword tokenization
- **Mathematical Analysis**: Weighted sum calculation, digital root computation, and hash-based algorithms
- **Statistical Features**: Mean, variance, entropy index, and balance index calculations
- **Web Interface**: Modern React/Next.js frontend with real-time processing
- **File Upload Support**: Process large text files
- **Performance Analytics**: Comprehensive metrics and visualization

## Quick Start

### Installation
```bash
pip install santok
```

### Basic Usage
```python
from santok import TextTokenizationEngine

# Create tokenization engine
tokenization_engine = TextTokenizationEngine(
    random_seed=12345,
    embedding_bit=False,
    normalize_case=True,
    remove_punctuation=False,
    collapse_repetitions=0
)

# Tokenize text
result = tokenization_engine.tokenize("Hello World!", "whitespace")
print(f"Tokens: {result['tokens']}")
```

### Web Interface
```bash
cd frontend
npm install
npm run dev
```

## Tokenization Methods

- **Whitespace**: Splits text by whitespace delimiters
- **Word**: Splits text into words (alphabetic characters only)
- **Character**: Splits text into individual characters
- **Subword**: Splits text into fixed-size subword units

## Project Structure

- `santok/` - Core Python package
- `frontend/` - React/Next.js web interface
- `src/` - Backend source code
- `docs/` - Documentation and papers
- `data/` - Sample data and outputs

## Documentation

- [Installation Guide](Installation-Guide)
- [API Reference](API-Reference)
- [Performance Guide](Performance-Guide)
- [Examples](Examples)

## Testing

```bash
# Run all tests
python -m pytest

# Run specific test categories
python src/tests/advanced_comprehensive_test.py
python src/tests/extreme_stress_test.py
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Author

**Santosh Chavala**
- GitHub: [@chavalasantosh](https://github.com/chavalasantosh)

---

© 2025 SanTOK Tokenization Framework. All rights reserved.