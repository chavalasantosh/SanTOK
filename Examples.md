# Examples

Practical examples and use cases for SanTOK.

## Basic Examples

### Simple Tokenization

```python
from santok import TextTokenizationEngine

# Create engine
engine = TextTokenizationEngine()

# Tokenize text
text = "Hello World! This is SanTOK."
result = engine.tokenize(text, "whitespace")

print(f"Tokens: {result['tokens']}")
# Output: ['hello', 'world!', 'this', 'is', 'santok.']
```

### Different Methods

```python
text = "Hello World!"

# Whitespace tokenization
result1 = engine.tokenize(text, "whitespace")
print(f"Whitespace: {result1['tokens']}")
# Output: ['hello', 'world!']

# Word tokenization
result2 = engine.tokenize(text, "word")
print(f"Word: {result2['tokens']}")
# Output: ['hello', 'world']

# Character tokenization
result3 = engine.tokenize(text, "character")
print(f"Character: {result3['tokens']}")
# Output: ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', '!']
```

## Advanced Examples

### With Statistical Features

```python
# Enable features
engine = TextTokenizationEngine(
    random_seed=12345,
    embedding_bit=True
)

result = engine.tokenize("Hello World!", "whitespace")

print(f"Tokens: {result['tokens']}")
print(f"Frontend Digits: {result['frontend_digits']}")
print(f"Features: {result['features']}")
```

### Custom Configuration

```python
# Custom configuration
engine = TextTokenizationEngine(
    random_seed=42,
    embedding_bit=True,
    normalize_case=True,
    remove_punctuation=True,
    collapse_repetitions=2
)

text = "HELLO!!! This is a test..."
result = engine.tokenize(text, "word")

print(f"Processed: {result['tokens']}")
# Output: ['hello', 'this', 'is', 'a', 'test']
```

## File Processing Examples

### Process Text File

```python
def process_file(file_path, method="whitespace"):
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()
    
    engine = TextTokenizationEngine()
    result = engine.tokenize(text, method)
    
    return result

# Usage
result = process_file("sample.txt", "word")
print(f"File tokens: {result['tokens']}")
```

### Batch Processing

```python
def batch_process(texts, method="whitespace"):
    engine = TextTokenizationEngine()
    results = []
    
    for text in texts:
        result = engine.tokenize(text, method)
        results.append({
            'text': text,
            'tokens': result['tokens'],
            'count': len(result['tokens'])
        })
    
    return results

# Usage
texts = [
    "First sentence.",
    "Second sentence.",
    "Third sentence."
]

results = batch_process(texts, "whitespace")
for result in results:
    print(f"Text: {result['text']}")
    print(f"Tokens: {result['tokens']}")
    print(f"Count: {result['count']}")
    print("---")
```

## Web Interface Examples

### Frontend Usage

```typescript
// Tokenize text in React component
import { useState } from 'react';

function TokenizerComponent() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleTokenize = async () => {
    const response = await fetch('/api/tokenize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: text,
        method: 'whitespace'
      })
    });
    
    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to tokenize"
      />
      <button onClick={handleTokenize}>Tokenize</button>
      {result && (
        <div>
          <h3>Tokens:</h3>
          <ul>
            {result.tokens.map((token, index) => (
              <li key={index}>{token}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

### File Upload Example

```typescript
// File upload component
function FileUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <input 
        type="file" 
        onChange={handleFileUpload}
        accept=".txt,.json,.csv"
      />
      {result && (
        <div>
          <h3>File processed:</h3>
          <p>Tokens: {result.tokens.length}</p>
          <p>Processing time: {result.processing_time}ms</p>
        </div>
      )}
    </div>
  );
}
```

## Command Line Examples

### Basic CLI Usage

```bash
# Simple tokenization
santok "Hello World!" --method whitespace

# With features
santok "Hello World!" --method word --features

# Process file
santok --file input.txt --method character --output results.json

# Comprehensive analysis
santok "Hello World!" --analyze
```

### Batch Processing Script

```bash
#!/bin/bash
# Process multiple files

for file in *.txt; do
    echo "Processing $file..."
    santok --file "$file" --method whitespace --output "${file%.txt}_tokens.json"
done
```

## Real-world Use Cases

### Text Analysis Pipeline

```python
def analyze_text_pipeline(texts):
    engine = TextTokenizationEngine()
    analysis_results = []
    
    for text in texts:
        # Tokenize
        result = engine.tokenize(text, "word")
        
        # Analyze
        analysis = {
            'original_text': text,
            'token_count': len(result['tokens']),
            'unique_tokens': len(set(result['tokens'])),
            'avg_token_length': sum(len(token) for token in result['tokens']) / len(result['tokens']),
            'features': result['features']
        }
        
        analysis_results.append(analysis)
    
    return analysis_results
```

### Data Preprocessing

```python
def preprocess_dataset(file_path):
    engine = TextTokenizationEngine(
        normalize_case=True,
        remove_punctuation=True
    )
    
    processed_data = []
    
    with open(file_path, 'r') as file:
        for line in file:
            result = engine.tokenize(line.strip(), "word")
            processed_data.append({
                'original': line.strip(),
                'tokens': result['tokens'],
                'features': result['features']
            })
    
    return processed_data
```

## Performance Examples

### Timing Tokenization

```python
import time

def time_tokenization(text, method, iterations=100):
    engine = TextTokenizationEngine()
    
    start_time = time.time()
    for _ in range(iterations):
        engine.tokenize(text, method)
    end_time = time.time()
    
    avg_time = (end_time - start_time) / iterations
    print(f"Average time for {method}: {avg_time:.4f}s")
    
    return avg_time

# Usage
text = "This is a sample text for performance testing."
time_tokenization(text, "whitespace")
time_tokenization(text, "word")
time_tokenization(text, "character")
```

### Memory Usage Monitoring

```python
import psutil
import os

def monitor_memory_usage():
    process = psutil.Process(os.getpid())
    return process.memory_info().rss / 1024 / 1024  # MB

def tokenize_with_memory_monitoring(text, method):
    initial_memory = monitor_memory_usage()
    
    engine = TextTokenizationEngine()
    result = engine.tokenize(text, method)
    
    final_memory = monitor_memory_usage()
    memory_used = final_memory - initial_memory
    
    print(f"Memory used: {memory_used:.2f} MB")
    return result
```

## Error Handling Examples

### Robust Error Handling

```python
def safe_tokenize(text, method):
    try:
        engine = TextTokenizationEngine()
        result = engine.tokenize(text, method)
        return result
    except Exception as e:
        print(f"Error tokenizing text: {e}")
        return None

# Usage
result = safe_tokenize("Hello World!", "whitespace")
if result:
    print(f"Success: {result['tokens']}")
else:
    print("Tokenization failed")
```

### Validation

```python
def validate_input(text, method):
    if not text or not text.strip():
        raise ValueError("Text cannot be empty")
    
    valid_methods = ['whitespace', 'word', 'character', 'subword']
    if method not in valid_methods:
        raise ValueError(f"Invalid method. Must be one of: {valid_methods}")
    
    return True

def tokenize_with_validation(text, method):
    validate_input(text, method)
    engine = TextTokenizationEngine()
    return engine.tokenize(text, method)
```

## Next Steps

- [API Reference](API-Reference)
- [Performance Guide](Performance-Guide)
- [Installation Guide](Installation-Guide)
