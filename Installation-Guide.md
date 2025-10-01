# Installation Guide

This guide will help you install and set up SanTOK on your system.

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher (for web interface)
- pip package manager

## Installation Methods

### Method 1: From PyPI (Recommended)

```bash
pip install santok
```

### Method 2: From Source

1. Clone the repository:
```bash
git clone https://github.com/chavalasantosh/SanTOK.git
cd SanTOK
```

2. Install the package:
```bash
pip install -e .
```

### Method 3: Development Installation

1. Clone the repository:
```bash
git clone https://github.com/chavalasantosh/SanTOK.git
cd SanTOK
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Verification

Test your installation:

```python
from santok import TextTokenizationEngine

# Create tokenization engine
tokenization_engine = TextTokenizationEngine()

# Test tokenization
result = tokenization_engine.tokenize("Hello World!", "whitespace")
print(f"Installation successful! Tokens: {result['tokens']}")
```

## Web Interface Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open browser to `http://localhost:3000`

## Backend Server Setup

1. Start the main server:
```bash
python src/servers/main_server.py
```

2. Or start the lightweight server:
```bash
python src/servers/lightweight_server.py
```

## Troubleshooting

### Common Issues

**Import Error**: Make sure you're using Python 3.8+
```bash
python --version
```

**Permission Denied**: Use virtual environment
```bash
python -m venv santok_env
source santok_env/bin/activate  # On Windows: santok_env\Scripts\activate
pip install santok
```

**Frontend Build Issues**: Clear cache and reinstall
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### System Requirements

- **Minimum RAM**: 4GB
- **Disk Space**: 500MB
- **OS**: Windows 10+, macOS 10.14+, Ubuntu 18.04+

## Next Steps

After installation, check out:
- [API Reference](API-Reference)
- [Examples](Examples)
- [Performance Guide](Performance-Guide)
