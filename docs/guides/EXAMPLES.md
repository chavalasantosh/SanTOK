# SanTOK Examples Collection

## 📚 Comprehensive Examples for Different Use Cases

### 1. Basic Text Analysis

```python
from santok import tokenize_text, TextTokenizationEngine

# Simple example
text = "Hello World! This is SanTOK."
result = tokenize_text(text)
print(result)

# Advanced example
engine = TextTokenizationEngine()
result = engine.analyze_text_comprehensive(text)
print(f"Essence Digit: {result['features']['essence_digit']}")
print(f"Entropy Index: {result['features']['entropy_index']}")
```

### 2. Document Classification

```python
from santok import TextTokenizationEngine
import pandas as pd

# Sample documents with categories
documents = [
    ("Machine learning is transforming industries.", "Technology"),
    ("The weather is beautiful today.", "Weather"),
    ("Data science combines statistics and programming.", "Technology"),
    ("It's raining heavily outside.", "Weather"),
    ("Artificial intelligence will change everything.", "Technology")
]

# Initialize engine
engine = TextTokenizationEngine(normalize_case=True, remove_punctuation=True)

# Analyze documents
results = []
for text, category in documents:
    result = engine.analyze_text_comprehensive(text)
    results.append({
        'text': text,
        'category': category,
        'essence_digit': result['features']['essence_digit'],
        'entropy_index': result['features']['entropy_index'],
        'balance_index': result['features']['balance_index']
    })

# Create DataFrame
df = pd.DataFrame(results)
print("Document Analysis:")
print(df)
```

### 3. Text Similarity Detection

```python
from santok import TextTokenizationEngine
import numpy as np

# Sample texts
texts = [
    "The quick brown fox jumps over the lazy dog.",
    "A fast brown fox leaps over a sleepy dog.",
    "Machine learning algorithms are powerful tools.",
    "Artificial intelligence is revolutionizing technology."
]

# Initialize engine
engine = TextTokenizationEngine()

# Analyze texts
features = []
for text in texts:
    result = engine.analyze_text_comprehensive(text)
    features.append([
        result['features']['essence_digit'],
        result['features']['entropy_index'],
        result['features']['balance_index']
    ])

# Calculate similarity
def calculate_similarity(features1, features2):
    # Simple similarity based on essence digit
    if features1[0] == features2[0]:
        return 1.0
    else:
        return 0.0

# Compare all pairs
print("Text Similarity Matrix:")
for i, text1 in enumerate(texts):
    for j, text2 in enumerate(texts):
        if i < j:  # Avoid duplicates
            similarity = calculate_similarity(features[i], features[j])
            print(f"Text {i+1} vs Text {j+1}: {similarity}")
            print(f"  '{text1[:30]}...' vs '{text2[:30]}...'")
            print()
```

### 4. Text Quality Assessment

```python
from santok import TextTokenizationEngine

# Sample texts of varying quality
texts = [
    "This is a well-structured sentence with proper grammar and clear meaning.",
    "good text here",
    "This is an excellent example of comprehensive text analysis with detailed information.",
    "bad",
    "This document contains extensive information about data science methodologies."
]

# Initialize engine
engine = TextTokenizationEngine()

# Analyze texts
results = []
for i, text in enumerate(texts):
    result = engine.analyze_text_comprehensive(text)
    
    # Calculate quality score
    quality_score = (
        result['features']['entropy_index'] * 0.4 +
        result['features']['balance_index'] * 0.3 +
        result['features']['essence_digit'] * 0.3
    )
    
    results.append({
        'text_id': i+1,
        'text': text,
        'length': len(text),
        'quality_score': quality_score,
        'essence_digit': result['features']['essence_digit'],
        'entropy_index': result['features']['entropy_index'],
        'balance_index': result['features']['balance_index']
    })

# Sort by quality score
results.sort(key=lambda x: x['quality_score'], reverse=True)

print("Text Quality Assessment (sorted by quality):")
for result in results:
    print(f"Rank {results.index(result)+1}: Score {result['quality_score']:.2f}")
    print(f"  Text: {result['text']}")
    print(f"  Features: Essence={result['essence_digit']}, Entropy={result['entropy_index']}, Balance={result['balance_index']}")
    print()
```

### 5. Language Detection Simulation

```python
from santok import TextTokenizationEngine

# Sample texts in different languages/styles
texts = [
    "Hello world, this is English text.",
    "Hola mundo, este es texto en español.",
    "Bonjour le monde, ceci est du texte français.",
    "1234567890",  # Numbers
    "!@#$%^&*()",  # Special characters
    "aaaaaaaaaa",  # Repeated characters
    "The quick brown fox jumps over the lazy dog.",  # Pangram
]

# Initialize engine
engine = TextTokenizationEngine()

# Analyze texts
for i, text in enumerate(texts):
    result = engine.analyze_text_comprehensive(text)
    
    print(f"Text {i+1}: {text}")
    print(f"  Essence Digit: {result['features']['essence_digit']}")
    print(f"  Entropy Index: {result['features']['entropy_index']}")
    print(f"  Balance Index: {result['features']['balance_index']}")
    print(f"  Signature: {result['features']['signature_runes'][:5]}")
    print()
```

### 6. Text Preprocessing Pipeline

```python
from santok import TextTokenizationEngine
import re

# Sample raw text
raw_text = "Hello!!! This is a TEST with repeated letters: aaaa bbbb cccc"

# Initialize engine with preprocessing
engine = TextTokenizationEngine(
    normalize_case=True,
    remove_punctuation=True,
    collapse_repetitions=1
)

# Process text
result = engine.analyze_text_comprehensive(raw_text)

print("Original Text:")
print(raw_text)
print()
print("Preprocessed Text:")
print(result['preprocessed_text'])
print()
print("Tokens:")
print(f"  Whitespace: {result['tokens']['whitespace']}")
print(f"  Word: {result['tokens']['word']}")
print(f"  Character: {result['tokens']['character'][:10]}...")  # First 10 chars
print()
print("Features:")
print(f"  Essence Digit: {result['features']['essence_digit']}")
print(f"  Entropy Index: {result['features']['entropy_index']}")
print(f"  Balance Index: {result['features']['balance_index']}")
```

### 7. Batch Processing with Error Handling

```python
from santok import TextTokenizationEngine

# Sample texts (including problematic ones)
texts = [
    "Normal text for analysis.",
    "",  # Empty text
    None,  # None value
    "Another normal text.",
    "Text with special characters: !@#$%^&*()",
    "Very long text " * 100,  # Very long text
]

# Initialize engine
engine = TextTokenizationEngine()

# Safe processing function
def safe_analyze_text(text):
    try:
        if not text or not isinstance(text, str):
            return None
        
        result = engine.analyze_text_comprehensive(text)
        return {
            'text_preview': text[:30] + "..." if len(text) > 30 else text,
            'essence_digit': result['features']['essence_digit'],
            'entropy_index': result['features']['entropy_index'],
            'balance_index': result['features']['balance_index'],
            'status': 'success'
        }
    except Exception as e:
        return {
            'text_preview': str(text)[:30] + "..." if text else "None/Empty",
            'essence_digit': None,
            'entropy_index': None,
            'balance_index': None,
            'status': f'error: {str(e)[:50]}'
        }

# Process all texts
results = []
for i, text in enumerate(texts):
    result = safe_analyze_text(text)
    result['text_id'] = i + 1
    results.append(result)

# Display results
print("Batch Processing Results:")
for result in results:
    print(f"Text {result['text_id']}: {result['text_preview']}")
    print(f"  Status: {result['status']}")
    if result['status'] == 'success':
        print(f"  Essence: {result['essence_digit']}, Entropy: {result['entropy_index']}, Balance: {result['balance_index']}")
    print()
```

### 8. Text Clustering Example

```python
from santok import TextTokenizationEngine
from sklearn.cluster import KMeans
import pandas as pd

# Sample documents
documents = [
    "Machine learning algorithms are powerful tools for data analysis.",
    "Data science involves statistical analysis and machine learning techniques.",
    "Artificial intelligence is revolutionizing modern technology applications.",
    "Big data processing requires efficient algorithms and scalable systems.",
    "Cloud computing provides flexible and cost-effective data storage solutions.",
    "Natural language processing enables computers to understand human language.",
    "Deep learning neural networks can recognize complex patterns in data.",
    "Computer vision allows machines to interpret and understand visual information."
]

# Initialize engine
engine = TextTokenizationEngine()

# Extract features
features = []
for doc in documents:
    result = engine.analyze_text_comprehensive(doc)
    features.append([
        result['features']['essence_digit'],
        result['features']['entropy_index'],
        result['features']['balance_index'],
        result['features']['length_factor']
    ])

# Perform clustering
kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(features)

# Create results DataFrame
results_df = pd.DataFrame({
    'document': documents,
    'cluster': clusters,
    'essence_digit': [f[0] for f in features],
    'entropy_index': [f[1] for f in features],
    'balance_index': [f[2] for f in features],
    'length_factor': [f[3] for f in features]
})

# Display results
print("Document Clustering Results:")
for cluster_id in sorted(results_df['cluster'].unique()):
    cluster_docs = results_df[results_df['cluster'] == cluster_id]
    print(f"\nCluster {cluster_id}:")
    for _, row in cluster_docs.iterrows():
        print(f"  - {row['document'][:60]}...")
        print(f"    Features: E={row['essence_digit']}, En={row['entropy_index']}, B={row['balance_index']}")
```

### 9. Text Fingerprinting

```python
from santok import TextTokenizationEngine

# Sample documents
documents = [
    "The quick brown fox jumps over the lazy dog.",
    "A fast brown fox leaps over a sleepy dog.",
    "Machine learning is transforming industries worldwide.",
    "Artificial intelligence is revolutionizing global industries."
]

# Initialize engine
engine = TextTokenizationEngine()

# Create fingerprints
fingerprints = []
for i, doc in enumerate(documents):
    result = engine.analyze_text_comprehensive(doc)
    fingerprint = {
        'document_id': i + 1,
        'text': doc,
        'signature': result['features']['signature_runes'],
        'essence_digit': result['features']['essence_digit'],
        'entropy_index': result['features']['entropy_index']
    }
    fingerprints.append(fingerprint)

# Compare fingerprints
print("Document Fingerprints:")
for fp in fingerprints:
    print(f"Document {fp['document_id']}: {fp['text']}")
    print(f"  Signature: {fp['signature'][:10]}...")
    print(f"  Essence: {fp['essence_digit']}, Entropy: {fp['entropy_index']}")
    print()

# Find similar documents
print("Similarity Analysis:")
for i, fp1 in enumerate(fingerprints):
    for j, fp2 in enumerate(fingerprints):
        if i < j:
            essence_similar = fp1['essence_digit'] == fp2['essence_digit']
            signature_similarity = sum(1 for a, b in zip(fp1['signature'], fp2['signature']) if a == b)
            print(f"Doc {fp1['document_id']} vs Doc {fp2['document_id']}:")
            print(f"  Essence similar: {essence_similar}")
            print(f"  Signature similarity: {signature_similarity}/10")
            print()
```

### 10. Performance Testing

```python
from santok import TextTokenizationEngine
import time

# Sample texts of different lengths
texts = [
    "Short text.",
    "This is a medium length text for testing purposes.",
    "This is a much longer text that contains more words and characters for performance testing. " * 10,
    "This is an extremely long text that contains many words and characters repeated many times for comprehensive performance testing. " * 50
]

# Initialize engine
engine = TextTokenizationEngine()

# Performance test
print("Performance Testing:")
for i, text in enumerate(texts):
    start_time = time.time()
    result = engine.analyze_text_comprehensive(text)
    end_time = time.time()
    
    processing_time = end_time - start_time
    text_length = len(text)
    
    print(f"Text {i+1}:")
    print(f"  Length: {text_length} characters")
    print(f"  Processing time: {processing_time:.4f} seconds")
    print(f"  Characters per second: {text_length/processing_time:.0f}")
    print(f"  Essence digit: {result['features']['essence_digit']}")
    print()
```

## 🎯 Use Case Summary

These examples demonstrate SanTOK's versatility for:

- **Text Analysis**: Basic and advanced text processing
- **Document Classification**: Categorizing documents by content
- **Similarity Detection**: Finding similar texts
- **Quality Assessment**: Evaluating text quality
- **Language Detection**: Identifying text characteristics
- **Preprocessing**: Cleaning and normalizing text
- **Batch Processing**: Handling multiple texts efficiently
- **Clustering**: Grouping similar documents
- **Fingerprinting**: Creating unique text signatures
- **Performance Testing**: Measuring processing speed

Choose the examples that match your use case and adapt them to your specific needs!
