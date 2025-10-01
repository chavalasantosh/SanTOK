# Performance Guide

Optimization tips and performance considerations for SanTOK.

## Performance Metrics

### Key Metrics

- **Processing Time**: Time to tokenize text (measured in milliseconds)
- **Characters per Second**: Throughput in characters processed per second
- **Tokens Count**: Number of tokens generated
- **Characters per Token**: Average characters per token (efficiency metric)
- **Perfect Reconstruction**: Whether original text can be perfectly reconstructed

### Benchmarking

Run performance tests:

```bash
# Comprehensive performance test
python src/performance/comprehensive_performance_test.py

# Accuracy test
python src/performance/test_accuracy.py

# Organized outputs test
python src/performance/test_organized_outputs.py
```

## Optimization Tips

### 1. Choose the Right Method

Different methods have different performance characteristics:

- **Whitespace**: Fastest, minimal processing
- **Word**: Fast, good for most use cases
- **Character**: Slower, detailed analysis
- **Subword**: Moderate speed, balanced results

### 2. Text Preprocessing

Optimize input text:

```python
# Disable unnecessary preprocessing for speed
tokenization_engine = TextTokenizationEngine(
    normalize_case=False,      # Skip case normalization
    remove_punctuation=False,   # Skip punctuation removal
    collapse_repetitions=0       # Disable repetition collapse
)
```

### 3. Batch Processing

Process multiple texts efficiently:

```python
texts = ["Text 1", "Text 2", "Text 3"]
results = []

for text in texts:
    result = tokenization_engine.tokenize(text, "whitespace")
    results.append(result)
```

### 4. Memory Management

For large files:

```python
# Process in chunks for large files
def process_large_file(file_path, chunk_size=1000):
    with open(file_path, 'r') as file:
        while True:
            chunk = file.read(chunk_size)
            if not chunk:
                break
            result = tokenization_engine.tokenize(chunk, "whitespace")
            yield result
```

## Performance Testing

### Stress Testing

Run extreme stress tests:

```bash
python src/tests/extreme_stress_test.py
```

### Real-time Monitoring

Monitor performance in real-time:

```bash
python src/tests/real_time_monitor.py
```

### Comprehensive Testing

Run advanced comprehensive tests:

```bash
python src/tests/advanced_comprehensive_test.py
```

## Web Interface Performance

### Frontend Optimization

1. **Enable Caching**:
```typescript
// Cache tokenization results
const cachedResult = useMemo(() => {
    return tokenizeText(text, method);
}, [text, method]);
```

2. **Debounce Input**:
```typescript
// Debounce text input for real-time processing
const debouncedText = useDebounce(text, 300);
```

3. **Lazy Loading**:
```typescript
// Lazy load heavy components
const PerformanceLab = lazy(() => import('./performance-lab'));
```

### Backend Optimization

1. **Use Lightweight Server**:
```bash
python src/servers/lightweight_server.py
```

2. **Enable Compression**:
```python
# Enable gzip compression
app.use(compression())
```

## Memory Usage

### Monitoring Memory

```python
import psutil
import os

def monitor_memory():
    process = psutil.Process(os.getpid())
    memory_info = process.memory_info()
    print(f"Memory usage: {memory_info.rss / 1024 / 1024:.2f} MB")
```

### Memory Optimization

1. **Clear Results**: Clear large result objects when done
2. **Use Generators**: For large datasets, use generators instead of lists
3. **Limit Concurrent Operations**: Avoid processing too many texts simultaneously

## Scalability

### Horizontal Scaling

- Use multiple server instances
- Load balance requests
- Implement caching layer

### Vertical Scaling

- Increase server memory
- Use faster CPU
- Optimize database queries

## Performance Monitoring

### Metrics Collection

```python
import time

def time_tokenization(text, method):
    start_time = time.time()
    result = tokenization_engine.tokenize(text, method)
    end_time = time.time()
    
    return {
        'result': result,
        'processing_time': end_time - start_time
    }
```

### Logging Performance

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def log_performance(text_length, processing_time):
    logger.info(f"Processed {text_length} characters in {processing_time:.3f}s")
```

## Troubleshooting Performance Issues

### Common Issues

1. **Slow Processing**: Check method choice and preprocessing options
2. **High Memory Usage**: Process in smaller chunks
3. **Web Interface Lag**: Enable caching and debouncing

### Debugging

Enable debug mode:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## Best Practices

1. **Profile Your Code**: Use profiling tools to identify bottlenecks
2. **Test with Real Data**: Use actual data sizes in testing
3. **Monitor Continuously**: Set up performance monitoring
4. **Optimize Incrementally**: Make small, measurable improvements

## Performance Benchmarks

### Typical Performance (on modern hardware)

- **Small Text** (< 1KB): < 1ms
- **Medium Text** (1-100KB): 1-10ms
- **Large Text** (100KB-1MB): 10-100ms
- **Very Large Text** (> 1MB): 100ms+

### Memory Usage

- **Base Memory**: ~10MB
- **Per Text**: ~1MB per 100KB of text
- **Peak Usage**: 2-3x base memory during processing

## Next Steps

- [Examples](Examples)
- [API Reference](API-Reference)
