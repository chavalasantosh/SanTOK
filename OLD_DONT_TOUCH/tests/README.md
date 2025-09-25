# Krishna Tokenizer - Test Suite

This directory contains comprehensive tests for the Krishna Tokenizer system.

## 📁 Directory Structure

```
tests/
├── test_data/           # Test input files
│   ├── sample_texts.txt
│   ├── test_csv.csv
│   ├── test_json.json
│   ├── test_xml.xml
│   └── binary_test.bin
├── test_scripts/        # Test implementation files
│   ├── test_comprehensive.py
│   ├── test_stable_tokenization.py
│   ├── test_full_reversibility.py
│   └── test_compression_efficiency.py
├── test_results/        # Test output and reports
└── run_tests.py         # Main test runner
```

## 🧪 Test Categories

### 1. **Basic Tokenization Tests**
- Tests all tokenization strategies (space, word, char, grammar, subword, byte)
- Validates token generation and structure
- Checks for proper token counts and types

### 2. **Reversibility Tests**
- Validates perfect reconstruction of original text
- Tests all tokenization strategies for reversibility
- Ensures no information loss during tokenization

### 3. **File Handling Tests**
- Tests universal file input/output capabilities
- Validates handling of different file formats (TXT, CSV, JSON, XML, BIN)
- Tests binary file processing

### 4. **Compression Tests**
- Tests all compression algorithms (RLE, Pattern, Frequency, Adaptive)
- Validates compression ratios and efficiency
- Ensures compression reversibility

### 5. **Stability Tests**
- Tests deterministic behavior across multiple runs
- Validates unique ID generation
- Performance benchmarking

### 6. **Comprehensive Validation**
- End-to-end validation of all features
- Integration testing
- Error handling validation

## 🚀 Running Tests

### Run All Tests
```bash
cd tests
python run_tests.py
```

### Run Individual Test
```bash
cd tests
python test_scripts/test_comprehensive.py
```

### Run Specific Test Suite
```bash
cd tests
python test_scripts/test_stable_tokenization.py
```

## 📊 Test Results

Test results are saved in the `test_results/` directory with timestamps:
- `test_report_YYYYMMDD_HHMMSS.txt` - Detailed test report
- Individual test outputs and logs

## ✅ Expected Results

All tests should pass with:
- ✅ 100% reversibility across all tokenization strategies
- ✅ Stable, deterministic behavior
- ✅ Universal file handling
- ✅ Compression efficiency
- ✅ Unique ID generation
- ✅ Error-free operation

## 🔧 Test Data

The `test_data/` directory contains various test files:
- **sample_texts.txt**: Basic text with special characters, unicode, numbers
- **test_csv.csv**: CSV format data
- **test_json.json**: JSON format data  
- **test_xml.xml**: XML format data
- **binary_test.bin**: Binary file for universal file handling tests

## 📈 Performance Benchmarks

Tests include performance benchmarking to ensure:
- Fast tokenization (< 1ms for typical text)
- Efficient compression algorithms
- Scalable file handling
- Memory efficiency

## 🐛 Debugging Failed Tests

If tests fail:
1. Check the detailed error messages in test reports
2. Verify test data files exist in `test_data/`
3. Ensure Krishna Tokenizer is properly installed
4. Check system requirements and dependencies

## 🔄 Continuous Testing

The test suite is designed for:
- Automated testing in CI/CD pipelines
- Regression testing after code changes
- Performance monitoring
- Quality assurance validation
