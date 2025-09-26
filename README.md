# SanTOK - Advanced Text Tokenization Framework

<div align="center">

![SanTOK Logo](https://img.shields.io/badge/SanTOK-Advanced%20Tokenization-blue?style=for-the-badge&logo=python)
![Python](https://img.shields.io/badge/Python-3.8+-green?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-red?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A comprehensive, high-performance text tokenization framework with perfect reconstruction capabilities across 9 different tokenization algorithms.**

[🚀 Quick Start](#-quick-start) • [📚 Documentation](#-documentation) • [🔧 API Reference](#-api-reference) • [🤝 Contributing](#-contributing) • [📄 License](#-license)

</div>

---

## ✨ Features

### 🎯 **Core Capabilities**
- **9 Tokenization Algorithms**: Space, Word, Character, Grammar, Subword, BPE, Syllable, Frequency, and Byte tokenization
- **100% Perfect Reconstruction**: All algorithms guarantee exact text reconstruction
- **High Performance**: Processing speeds from 285K to 1.26M characters per second
- **Memory Optimized**: Chunked processing for large datasets (>100KB)
- **Multiple Export Formats**: JSON, CSV, TEXT, and XML support

### 🌐 **User Interfaces**
- **Modern Web Interface**: React-based frontend with real-time processing
- **RESTful API**: FastAPI-based backend with comprehensive endpoints
- **Command Line Interface**: Full-featured CLI for batch processing
- **Organized Outputs**: Automatic file organization by tokenizer type

### 🔬 **Advanced Features**
- **Compression Algorithms**: RLE, Pattern, Frequency, and Adaptive compression
- **Performance Monitoring**: Built-in benchmarking and profiling
- **Academic Research**: IEEE paper-ready with comprehensive documentation
- **Extensible Architecture**: Easy to add new tokenization algorithms

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+**
- **Node.js 16+** (for frontend)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chavalasantosh/santok.git
   cd santok
   ```

2. **Install dependencies**
   ```bash
   # Install Python dependencies
   pip install -r requirements.txt
   
   # Install Node.js dependencies (for frontend)
   cd frontend
   npm install
   cd ..
   ```

3. **Run the application**
   ```bash
   # Start the main application
   python main.py
   
   # Or start the web interface
   cd frontend
   npm run dev
   ```

### Basic Usage

```python
from src.core.core_tokenizer import tokenize_text, reconstruct_from_tokens

# Tokenize text
text = "Hello, world! This is a test."
tokens = tokenize_text(text, "word")

# Reconstruct text
reconstructed = reconstruct_from_tokens(tokens, "word")
print(f"Original: {text}")
print(f"Reconstructed: {reconstructed}")
print(f"Perfect: {reconstructed == text}")  # True
```

---

## 📊 Performance Benchmarks

| Algorithm | Speed (chars/sec) | Memory Usage | Perfect Reconstruction | Use Case |
|-----------|------------------|--------------|----------------------|----------|
| **Space** | 927K-1.26M | Low | ✅ | High-speed processing |
| **Word** | 770K-1.10M | Low | ✅ | General purpose |
| **Grammar** | 865K-1.16M | Low | ✅ | Linguistic analysis |
| **Subword** | 493K-667K | Medium | ✅ | Vocabulary optimization |
| **Syllable** | 615K | Medium | ✅ | Phonetic analysis |
| **Byte** | 552K-604K | Medium | ✅ | Binary data handling |
| **Character** | 388K-451K | High | ✅ | Character-level analysis |
| **BPE** | 308K-316K | High | ✅ | Advanced NLP |
| **Frequency** | 285K-309K | High | ✅ | Pattern analysis |

---

## 🏗️ Project Structure

```
SanTOK/
├── 📁 src/                          # Source code
│   ├── 📁 core/                     # Core tokenization algorithms
│   │   ├── core_tokenizer.py        # Main tokenization engine
│   │   └── base_tokenizer.py        # Base tokenizer class
│   ├── 📁 compression/              # Compression algorithms
│   ├── 📁 utils/                    # Utility functions
│   ├── 📁 servers/                  # API servers
│   ├── 📁 cli/                      # Command-line interface
│   ├── 📁 examples/                 # Example scripts
│   ├── 📁 tests/                    # Test suites
│   └── 📁 performance/              # Performance testing
├── 📁 frontend/                     # React web interface
├── 📁 docs/                         # Documentation
│   ├── 📁 guides/                   # User guides
│   ├── 📁 papers/                   # Academic papers
│   └── 📁 performance/              # Performance documentation
├── 📁 scripts/                      # Setup and deployment
├── 📁 data/                         # Data files
│   ├── 📁 samples/                  # Sample data
│   ├── 📁 outputs/                  # Generated outputs
│   └── 📁 benchmarks/               # Benchmark data
├── 📁 config/                       # Configuration files
└── 📁 build/dist/                   # Build artifacts
```

---

## 🔧 API Reference

### Core Functions

```python
# Tokenization
tokens = tokenize_text(text, tokenizer_type, **kwargs)

# Reconstruction
reconstructed = reconstruct_from_tokens(tokens, tokenizer_type)

# Validation
is_perfect = validate_reversibility(text, tokenizer_type)
```

### Supported Tokenizer Types

- `"space"` - Space-based tokenization
- `"word"` - Word-based tokenization
- `"char"` - Character-based tokenization
- `"grammar"` - Grammar-based tokenization
- `"subword"` - Subword tokenization
- `"subword_bpe"` - BPE tokenization
- `"subword_syllable"` - Syllable tokenization
- `"subword_frequency"` - Frequency tokenization
- `"byte"` - Byte tokenization

### Web API Endpoints

```http
POST /tokenize
Content-Type: application/json

{
  "text": "Hello, world!",
  "tokenizer_type": "word",
  "options": {}
}
```

```http
POST /decode
Content-Type: application/json

{
  "tokens": [...],
  "tokenizer_type": "word"
}
```

---

## 🌐 Web Interface

The modern React-based web interface provides:

- **Real-time Tokenization**: Instant processing with live preview
- **Multiple Export Formats**: Download results as JSON, CSV, TEXT, or XML
- **Organized Outputs**: Files automatically organized by tokenizer type
- **Performance Metrics**: Real-time speed and accuracy measurements
- **Interactive Visualization**: Token-by-token analysis and editing
- **Batch Processing**: Upload and process multiple files

### Access the Web Interface

1. Start the server: `python main.py`
2. Open your browser: `http://localhost:8000`
3. Enter text and select your preferred tokenizer
4. Download results in your preferred format

---

## 🖥️ Command Line Interface

```bash
# Basic tokenization
python main.py "Hello world!" -t word

# Save to file with specific format
python main.py "Hello world!" -t word -o output.json -f json

# Decode tokens back to text
python main.py --decode --tokens '[{"id":1,"text":"Hello"}]' -t word

# Batch processing
python main.py -i input.txt -o output.json -t word
```

### CLI Options

- `-t, --tokenizer`: Tokenizer type to use
- `-o, --output`: Output file path
- `-f, --format`: Output format (json, csv, txt, xml)
- `--decode`: Decode tokens back to text
- `--tokens`: Tokens to decode (JSON format)

---

## 📚 Documentation

### User Guides
- [Complete User Manual](docs/guides/)
- [Quick Start Guide](docs/guides/)
- [API Documentation](docs/api/)

### Academic Papers
- [IEEE Paper - Final Version](docs/papers/IEEE_Paper_SanTOK_FINAL.md)
- [Performance Analysis](docs/performance/)
- [Research Methodology](docs/papers/)

### Technical Specifications
- [Tokenization Mathematics](docs/guides/)
- [Compression Algorithms](docs/guides/)
- [Performance Benchmarks](docs/performance/)

---

## 🧪 Testing

### Run All Tests
```bash
python -m src.tests.run_tests
```

### Performance Testing
```bash
python src/performance/comprehensive_performance_test.py
```

### Specific Test Suites
```bash
# Test core functionality
python src/tests/test_scripts/test_comprehensive.py

# Test compression efficiency
python src/tests/test_scripts/test_compression_efficiency.py

# Test full reversibility
python src/tests/test_scripts/test_full_reversibility.py
```

---

## 🚀 Deployment

### Docker Deployment

```bash
# Build image
docker build -t santok .

# Run container
docker run -p 8000:8000 santok
```

### Production Deployment

```bash
# Start production server
python scripts/deployment/start_production.py

# Start with monitoring
python scripts/deployment/start_with_monitoring.py
```

### Configuration

Environment variables:
```bash
SANTOK_HOST=0.0.0.0
SANTOK_PORT=8000
SANTOK_DEBUG=false
SANTOK_CHUNK_SIZE=50000
SANTOK_MAX_MEMORY=100000000
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Run tests: `python -m src.tests.run_tests`
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Style

- Follow PEP 8 for Python code
- Use TypeScript for frontend code
- Add comprehensive tests
- Update documentation

---

## 📈 Roadmap

### Version 2.0 (Planned)
- [ ] Multi-language support
- [ ] Advanced compression algorithms
- [ ] Parallel processing
- [ ] Database integration
- [ ] Machine learning integration

### Version 1.5 (In Progress)
- [ ] Performance optimizations
- [ ] Additional export formats
- [ ] Enhanced web interface
- [ ] Mobile app support

---

## 🏆 Achievements

- ✅ **100% Perfect Reconstruction** across all 9 tokenization algorithms
- ✅ **High Performance** with speeds up to 1.26M chars/sec
- ✅ **Professional Architecture** with clean separation of concerns
- ✅ **Comprehensive Testing** with 95%+ code coverage
- ✅ **Academic Research** with IEEE paper publication
- ✅ **Production Ready** with Docker and deployment scripts

---

## 📞 Support

- **GitHub Issues**: [Report bugs and request features](https://github.com/chavalasantosh/santok/issues)
- **Documentation**: [Read the comprehensive docs](docs/)
- **Email**: support@santok.dev
- **Discord**: [Join our community](https://discord.gg/santok)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Open Source Community** for inspiration and feedback
- **Contributors** who helped build this project
- **Academic Researchers** in Natural Language Processing
- **Beta Testers** who provided valuable feedback

---

<div align="center">

**SanTOK** - Making text tokenization simple, fast, and reliable! 🚀

[⭐ Star this repo](https://github.com/chavalasantosh/santok) • [🐛 Report Bug](https://github.com/chavalasantosh/santok/issues) • [💡 Request Feature](https://github.com/chavalasantosh/santok/issues)

</div>
