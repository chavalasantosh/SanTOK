# SanTOK Databricks Guide

## 🚀 Installing SanTOK in Databricks

### Method 1: Using %pip Magic Command (Recommended)

```python
# Run this in a Databricks cell
%pip install santok
```

### Method 2: Using subprocess (Alternative)

```python
import subprocess
import sys

# Install SanTOK
subprocess.check_call([sys.executable, "-m", "pip", "install", "santok"])

# Verify installation
import santok
print(f"SanTOK version: {santok.__version__}")
```

### Method 3: Using Databricks Libraries (Cluster-level)

1. Go to your Databricks cluster
2. Click **Libraries** tab
3. Click **Install New**
4. Select **PyPI**
5. Enter package name: `santok`
6. Click **Install**

## 📊 Basic Usage in Databricks

### 1. Simple Text Analysis

```python
from santok import tokenize_text, TextTokenizationEngine

# Quick tokenization
text = "Hello Databricks! This is SanTOK in action."
result = tokenize_text(text)
print(result)
```

### 2. Advanced Analysis with DataFrame Integration

```python
from santok import TextTokenizationEngine
import pandas as pd

# Create sample DataFrame
data = {
    'document_id': [1, 2, 3, 4, 5],
    'text': [
        "Machine learning is transforming industries worldwide.",
        "Data science combines statistics, programming, and domain expertise.",
        "Artificial intelligence will shape the future of technology.",
        "Big data analytics provides valuable business insights.",
        "Cloud computing enables scalable data processing solutions."
    ],
    'category': ['ML', 'DS', 'AI', 'Analytics', 'Cloud']
}

df = spark.createDataFrame(data)

# Convert to Pandas for easier processing
pandas_df = df.toPandas()

# Initialize SanTOK engine
engine = TextTokenizationEngine(
    normalize_case=True,
    remove_punctuation=True
)

# Function to analyze text
def analyze_document(text):
    result = engine.analyze_text_comprehensive(text)
    return {
        'essence_digit': result['features']['essence_digit'],
        'entropy_index': result['features']['entropy_index'],
        'balance_index': result['features']['balance_index'],
        'length_factor': result['features']['length_factor'],
        'signature_runes': result['features']['signature_runes'][:5]  # First 5 runes
    }

# Apply analysis
analysis_results = pandas_df['text'].apply(analyze_document)
analysis_df = pd.DataFrame(analysis_results.tolist())

# Combine with original data
final_df = pd.concat([pandas_df, analysis_df], axis=1)

# Display results
display(final_df)
```

### 3. Large-Scale Text Processing

```python
from santok import TextTokenizationEngine
from pyspark.sql import functions as F
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, ArrayType

# Initialize engine
engine = TextTokenizationEngine()

# Define UDF for text analysis
def analyze_text_udf(text):
    if not text or not isinstance(text, str):
        return None
    
    try:
        result = engine.analyze_text_comprehensive(text)
        return {
            'essence_digit': result['features']['essence_digit'],
            'entropy_index': result['features']['entropy_index'],
            'balance_index': result['features']['balance_index']
        }
    except:
        return None

# Register UDF
analyze_udf = F.udf(analyze_text_udf, StructType([
    StructField("essence_digit", IntegerType(), True),
    StructField("entropy_index", IntegerType(), True),
    StructField("balance_index", IntegerType(), True)
]))

# Apply to DataFrame
df_with_analysis = df.withColumn("analysis", analyze_udf(F.col("text")))

# Extract individual fields
df_final = df_with_analysis.select(
    "document_id",
    "text",
    "category",
    df_with_analysis.analysis.essence_digit.alias("essence_digit"),
    df_with_analysis.analysis.entropy_index.alias("entropy_index"),
    df_with_analysis.analysis.balance_index.alias("balance_index")
)

display(df_final)
```

## 🔍 Text Analytics Dashboard

### 1. Document Similarity Analysis

```python
from santok import TextTokenizationEngine
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Sample documents
documents = [
    "Machine learning algorithms are powerful tools for data analysis.",
    "Data science involves statistical analysis and machine learning techniques.",
    "Artificial intelligence is revolutionizing modern technology applications.",
    "Big data processing requires efficient algorithms and scalable systems.",
    "Cloud computing provides flexible and cost-effective data storage solutions."
]

# Initialize engine
engine = TextTokenizationEngine()

# Analyze all documents
def analyze_document(text):
    result = engine.analyze_text_comprehensive(text)
    return [
        result['features']['essence_digit'],
        result['features']['entropy_index'],
        result['features']['balance_index'],
        result['features']['length_factor']
    ]

# Create feature matrix
features_matrix = np.array([analyze_document(doc) for doc in documents])

# Calculate similarity matrix
similarity_matrix = cosine_similarity(features_matrix)

# Create DataFrame for visualization
similarity_df = pd.DataFrame(
    similarity_matrix,
    index=[f"Doc {i+1}" for i in range(len(documents))],
    columns=[f"Doc {i+1}" for i in range(len(documents))]
)

print("Document Similarity Matrix:")
display(similarity_df)
```

### 2. Text Quality Assessment

```python
from santok import TextTokenizationEngine
import pandas as pd
import matplotlib.pyplot as plt

# Sample texts of varying quality
texts = [
    "This is a well-structured sentence with proper grammar and clear meaning.",
    "good text here",
    "This is an excellent example of comprehensive text analysis with detailed information and proper formatting.",
    "bad",
    "This document contains extensive information about data science methodologies, machine learning algorithms, and statistical analysis techniques used in modern data processing workflows."
]

# Initialize engine
engine = TextTokenizationEngine()

# Analyze texts
results = []
for i, text in enumerate(texts):
    result = engine.analyze_text_comprehensive(text)
    results.append({
        'text_id': i+1,
        'text_length': len(text),
        'essence_digit': result['features']['essence_digit'],
        'entropy_index': result['features']['entropy_index'],
        'balance_index': result['features']['balance_index'],
        'text_preview': text[:50] + "..." if len(text) > 50 else text
    })

# Create DataFrame
quality_df = pd.DataFrame(results)

# Calculate quality score (combination of features)
quality_df['quality_score'] = (
    quality_df['entropy_index'] * 0.4 +
    quality_df['balance_index'] * 0.3 +
    quality_df['essence_digit'] * 0.3
)

# Sort by quality score
quality_df = quality_df.sort_values('quality_score', ascending=False)

print("Text Quality Assessment:")
display(quality_df[['text_id', 'text_preview', 'quality_score', 'entropy_index', 'balance_index']])
```

## 📈 Performance Optimization

### 1. Batch Processing for Large Datasets

```python
from santok import TextTokenizationEngine
from pyspark.sql import functions as F
from pyspark.sql.types import StructType, StructField, StringType, IntegerType

# Initialize engine once
engine = TextTokenizationEngine()

# Define batch processing function
def batch_analyze_texts(texts_batch):
    results = []
    for text in texts_batch:
        if text:
            try:
                result = engine.analyze_text_comprehensive(text)
                results.append({
                    'essence_digit': result['features']['essence_digit'],
                    'entropy_index': result['features']['entropy_index'],
                    'balance_index': result['features']['balance_index']
                })
            except:
                results.append({
                    'essence_digit': None,
                    'entropy_index': None,
                    'balance_index': None
                })
        else:
            results.append({
                'essence_digit': None,
                'entropy_index': None,
                'balance_index': None
            })
    return results

# Apply to DataFrame in batches
def process_dataframe_batch(df, batch_size=1000):
    # Convert to Pandas for batch processing
    pandas_df = df.toPandas()
    
    # Process in batches
    all_results = []
    for i in range(0, len(pandas_df), batch_size):
        batch = pandas_df.iloc[i:i+batch_size]
        batch_results = batch_analyze_texts(batch['text'].tolist())
        all_results.extend(batch_results)
    
    # Add results to DataFrame
    results_df = pd.DataFrame(all_results)
    final_df = pd.concat([pandas_df, results_df], axis=1)
    
    return final_df

# Example usage
# processed_df = process_dataframe_batch(your_spark_dataframe)
```

### 2. Caching for Repeated Analysis

```python
from santok import TextTokenizationEngine
import pandas as pd

# Initialize engine with caching
engine = TextTokenizationEngine()

# Cache for repeated texts
analysis_cache = {}

def cached_analyze_text(text):
    if text in analysis_cache:
        return analysis_cache[text]
    
    result = engine.analyze_text_comprehensive(text)
    analysis_cache[text] = result
    return result

# Use cached analysis
texts = ["repeated text", "unique text", "repeated text", "another unique text"]

for text in texts:
    result = cached_analyze_text(text)
    print(f"Text: {text[:20]}... -> Essence: {result['features']['essence_digit']}")
```

## 🔧 Troubleshooting in Databricks

### Common Issues and Solutions

1. **Installation Issues**
```python
# Check if SanTOK is installed
try:
    import santok
    print(f"SanTOK version: {santok.__version__}")
except ImportError:
    print("SanTOK not installed. Installing...")
    %pip install santok
```

2. **Memory Issues with Large Texts**
```python
# Process large texts in chunks
def process_large_text(text, chunk_size=1000):
    chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
    results = []
    
    for chunk in chunks:
        result = engine.analyze_text_comprehensive(chunk)
        results.append(result)
    
    return results
```

3. **UDF Performance Issues**
```python
# Use vectorized operations when possible
def vectorized_analysis(texts):
    engine = TextTokenizationEngine()
    results = []
    
    for text in texts:
        result = engine.analyze_text_comprehensive(text)
        results.append(result['features']['essence_digit'])
    
    return results
```

## 📊 Example Notebooks

### 1. Text Preprocessing Pipeline

```python
# Complete text preprocessing pipeline
from santok import TextTokenizationEngine
from pyspark.sql import functions as F

# Initialize engine
engine = TextTokenizationEngine(
    normalize_case=True,
    remove_punctuation=True,
    collapse_repetitions=1
)

# Define preprocessing function
def preprocess_text(text):
    if not text:
        return None
    
    result = engine.analyze_text_comprehensive(text)
    return {
        'original_text': text,
        'processed_text': result['preprocessed_text'],
        'token_count': len(result['tokens']['whitespace']),
        'essence_digit': result['features']['essence_digit'],
        'entropy_index': result['features']['entropy_index']
    }

# Apply to DataFrame
preprocessed_df = df.withColumn(
    "preprocessing_result",
    F.udf(preprocess_text, StructType([
        StructField("original_text", StringType(), True),
        StructField("processed_text", StringType(), True),
        StructField("token_count", IntegerType(), True),
        StructField("essence_digit", IntegerType(), True),
        StructField("entropy_index", IntegerType(), True)
    ]))(F.col("text"))
)

display(preprocessed_df)
```

### 2. Document Clustering

```python
from santok import TextTokenizationEngine
from sklearn.cluster import KMeans
import pandas as pd

# Sample documents
documents = [
    "Machine learning and artificial intelligence technologies",
    "Data science methodologies and statistical analysis",
    "Cloud computing and distributed systems architecture",
    "Big data processing and analytics frameworks",
    "Natural language processing and text mining techniques"
]

# Analyze documents
engine = TextTokenizationEngine()
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
kmeans = KMeans(n_clusters=2, random_state=42)
clusters = kmeans.fit_predict(features)

# Create results DataFrame
results_df = pd.DataFrame({
    'document': documents,
    'cluster': clusters,
    'essence_digit': [f[0] for f in features],
    'entropy_index': [f[1] for f in features]
})

print("Document Clustering Results:")
display(results_df)
```

## 🎯 Best Practices for Databricks

1. **Use %pip for installation** - Most reliable method
2. **Initialize engine once** - Reuse the same engine instance
3. **Process in batches** - For large datasets, use batch processing
4. **Cache results** - Store analysis results for repeated texts
5. **Handle errors gracefully** - Always wrap analysis in try-catch blocks
6. **Use UDFs carefully** - Consider performance implications
7. **Monitor memory usage** - Large texts can consume significant memory

## 📚 Additional Resources

- [SanTOK PyPI Page](https://pypi.org/project/santok/)
- [GitHub Repository](https://github.com/chavalasantosh/SanTOK)
- [User Guide](./USER_GUIDE.md)
- [API Reference](./API_REFERENCE.md)

Happy analyzing with SanTOK in Databricks! 🚀
