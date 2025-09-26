#!/usr/bin/env python3
"""
Advanced Test Runner for SanTOK
Run comprehensive tests with massive datasets
"""

import sys
import os
import time
import random
import string
import json
import statistics
from pathlib import Path

# Add src to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from core.core_tokenizer import (
    tokenize_space, tokenize_word, tokenize_char, tokenize_grammar,
    tokenize_subword, tokenize_bytes, reconstruct_from_tokens
)

def generate_massive_dataset(size_mb: int = 100) -> list:
    """Generate a massive dataset of specified size in MB"""
    print(f"🔄 Generating {size_mb}MB dataset...")
    
    # Common words for realistic text
    words = [
        'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
        'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
        'this', 'but', 'his', 'by', 'from', 'they', 'she', 'or', 'an',
        'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
        'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go',
        'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him',
        'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some',
        'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look',
        'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after',
        'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even',
        'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most',
        'us', 'is', 'was', 'are', 'been', 'has', 'had', 'were', 'said',
        'each', 'which', 'their', 'said', 'if', 'will', 'up', 'other',
        'about', 'out', 'many', 'then', 'them', 'can', 'only', 'other',
        'new', 'some', 'what', 'time', 'very', 'when', 'much', 'then',
        'no', 'way', 'could', 'people', 'my', 'than', 'first', 'water',
        'been', 'call', 'who', 'oil', 'its', 'now', 'find', 'long', 'down',
        'day', 'did', 'get', 'come', 'made', 'may', 'part'
    ]
    
    target_size = size_mb * 1024 * 1024  # Convert MB to bytes
    texts = []
    current_size = 0
    
    while current_size < target_size:
        # Generate a paragraph
        paragraph_words = [random.choice(words) for _ in range(random.randint(50, 200))]
        paragraph = ' '.join(paragraph_words)
        
        # Add some variation
        if random.random() < 0.1:
            paragraph += random.choice(['.', ',', '!', '?', ';', ':'])
        if random.random() < 0.05:
            paragraph += str(random.randint(0, 999))
        if random.random() < 0.02:
            paragraph += random.choice([' 你好世界', ' 🌍', ' مرحبا', ' привет'])
        
        texts.append(paragraph)
        current_size += len(paragraph)
        
        # Progress indicator
        if len(texts) % 1000 == 0:
            progress = (current_size / target_size) * 100
            print(f"  Progress: {progress:.1f}% ({len(texts)} texts, {current_size:,} chars)")
    
    print(f"✅ Generated {len(texts)} texts, {current_size:,} characters")
    return texts

def test_tokenizer_performance(texts: list, tokenizer_type: str) -> dict:
    """Test performance of a specific tokenizer"""
    print(f"\n🧪 Testing {tokenizer_type.upper()} tokenization...")
    
    perfect_count = 0
    total_tokens = 0
    processing_times = []
    total_chars = sum(len(text) for text in texts)
    
    for i, text in enumerate(texts):
        try:
            # Time the tokenization
            start_time = time.time()
            
            if tokenizer_type == 'space':
                tokens = tokenize_space(text)
            elif tokenizer_type == 'word':
                tokens = tokenize_word(text)
            elif tokenizer_type == 'char':
                tokens = tokenize_char(text)
            elif tokenizer_type == 'grammar':
                tokens = tokenize_grammar(text)
            elif tokenizer_type == 'subword':
                tokens = tokenize_subword(text, 3, 'fixed')
            elif tokenizer_type == 'bpe':
                tokens = tokenize_subword(text, 3, 'bpe')
            elif tokenizer_type == 'syllable':
                tokens = tokenize_subword(text, 3, 'syllable')
            elif tokenizer_type == 'frequency':
                tokens = tokenize_subword(text, 3, 'frequency')
            elif tokenizer_type == 'byte':
                tokens = tokenize_bytes(text)
            else:
                raise ValueError(f"Unknown tokenizer type: {tokenizer_type}")
            
            # Time the reconstruction
            reconstructed = reconstruct_from_tokens(tokens, tokenizer_type)
            end_time = time.time()
            
            # Check accuracy
            is_perfect = (text == reconstructed)
            if is_perfect:
                perfect_count += 1
            
            # Collect metrics
            total_tokens += len(tokens)
            processing_times.append(end_time - start_time)
            
            # Progress indicator
            if (i + 1) % max(1, len(texts) // 10) == 0:
                progress = ((i + 1) / len(texts)) * 100
                print(f"  Progress: {progress:.1f}% ({i + 1}/{len(texts)})")
            
        except Exception as e:
            print(f"  ❌ Error in text {i + 1}: {e}")
            continue
    
    # Calculate statistics
    accuracy = (perfect_count / len(texts)) * 100
    total_time = sum(processing_times)
    chars_per_second = total_chars / total_time if total_time > 0 else 0
    avg_processing_time = statistics.mean(processing_times) if processing_times else 0
    
    return {
        'tokenizer': tokenizer_type,
        'accuracy': accuracy,
        'perfect_count': perfect_count,
        'total_texts': len(texts),
        'total_tokens': total_tokens,
        'total_chars': total_chars,
        'total_time': total_time,
        'avg_processing_time': avg_processing_time,
        'chars_per_second': chars_per_second,
        'tokens_per_char': total_tokens / total_chars if total_chars > 0 else 0
    }

def run_comprehensive_tests():
    """Run comprehensive tests with massive datasets"""
    print("🚀 SanTOK Advanced Comprehensive Testing")
    print("=" * 80)
    print(f"🕐 Start time: {time.strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 80)
    
    # Test datasets
    datasets = {
        'small': 1,    # 1MB
        'medium': 10,  # 10MB
        'large': 50,   # 50MB
        'huge': 100,   # 100MB
        'massive': 500 # 500MB
    }
    
    tokenizers = [
        'space', 'word', 'char', 'grammar', 'subword', 
        'bpe', 'syllable', 'frequency', 'byte'
    ]
    
    all_results = {}
    
    for dataset_name, size_mb in datasets.items():
        print(f"\n📊 Testing {dataset_name.upper()} dataset ({size_mb}MB)...")
        print("=" * 60)
        
        # Generate dataset
        texts = generate_massive_dataset(size_mb)
        
        dataset_results = {}
        
        for tokenizer in tokenizers:
            result = test_tokenizer_performance(texts, tokenizer)
            dataset_results[tokenizer] = result
            
            print(f"  ✅ {tokenizer.upper()}: {result['accuracy']:.1f}% accuracy, {result['chars_per_second']:,.0f} chars/sec")
        
        all_results[dataset_name] = dataset_results
        
        # Clear memory
        del texts
        import gc
        gc.collect()
    
    # Generate summary report
    print("\n📋 GENERATING SUMMARY REPORT...")
    print("=" * 60)
    
    # Overall accuracy summary
    print("\n🎯 RECONSTRUCTION ACCURACY SUMMARY:")
    print("-" * 40)
    
    for dataset_name, dataset_results in all_results.items():
        print(f"\n{dataset_name.upper()} Dataset:")
        for tokenizer, result in dataset_results.items():
            accuracy = result['accuracy']
            status = "✅ PERFECT" if accuracy == 100.0 else f"⚠️  {accuracy:.1f}%"
            print(f"  {tokenizer:12} {status:15} ({result['perfect_count']}/{result['total_texts']})")
    
    # Performance summary
    print("\n⚡ PERFORMANCE SUMMARY:")
    print("-" * 40)
    
    for dataset_name, dataset_results in all_results.items():
        print(f"\n{dataset_name.upper()} Dataset:")
        for tokenizer, result in dataset_results.items():
            speed = result['chars_per_second']
            print(f"  {tokenizer:12} {speed:>12,.0f} chars/sec")
    
    # Save detailed results
    timestamp = time.strftime('%Y%m%d_%H%M%S')
    filename = f"advanced_test_results_{timestamp}.json"
    
    with open(filename, 'w') as f:
        json.dump(all_results, f, indent=2)
    
    print(f"\n💾 Detailed results saved to: {filename}")
    print("\n🎉 All tests completed successfully!")

def run_quick_test():
    """Run a quick test with smaller dataset"""
    print("🚀 SanTOK Quick Test")
    print("=" * 40)
    
    # Generate small dataset
    texts = generate_massive_dataset(1)  # 1MB
    
    tokenizers = [
        'space', 'word', 'char', 'grammar', 'subword', 
        'bpe', 'syllable', 'frequency', 'byte'
    ]
    
    results = {}
    
    for tokenizer in tokenizers:
        result = test_tokenizer_performance(texts, tokenizer)
        results[tokenizer] = result
        
        print(f"✅ {tokenizer.upper()}: {result['accuracy']:.1f}% accuracy, {result['chars_per_second']:,.0f} chars/sec")
    
    # Save results
    timestamp = time.strftime('%Y%m%d_%H%M%S')
    filename = f"quick_test_results_{timestamp}.json"
    
    with open(filename, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n💾 Results saved to: {filename}")

def main():
    """Main function"""
    print("🚀 SanTOK Advanced Testing Framework")
    print("=" * 80)
    print("Choose test type:")
    print("1. Quick test (1MB dataset)")
    print("2. Comprehensive test (1MB to 500MB datasets)")
    print("3. Custom test (specify size)")
    
    choice = input("\nEnter choice (1-3): ").strip()
    
    if choice == '1':
        run_quick_test()
    elif choice == '2':
        run_comprehensive_tests()
    elif choice == '3':
        size = int(input("Enter dataset size in MB: "))
        print(f"🔄 Generating {size}MB dataset...")
        texts = generate_massive_dataset(size)
        
        tokenizers = [
            'space', 'word', 'char', 'grammar', 'subword', 
            'bpe', 'syllable', 'frequency', 'byte'
        ]
        
        results = {}
        
        for tokenizer in tokenizers:
            result = test_tokenizer_performance(texts, tokenizer)
            results[tokenizer] = result
            
            print(f"✅ {tokenizer.upper()}: {result['accuracy']:.1f}% accuracy, {result['chars_per_second']:,.0f} chars/sec")
        
        # Save results
        timestamp = time.strftime('%Y%m%d_%H%M%S')
        filename = f"custom_test_results_{timestamp}.json"
        
        with open(filename, 'w') as f:
            json.dump(results, f, indent=2)
        
        print(f"\n💾 Results saved to: {filename}")
    else:
        print("❌ Invalid choice. Exiting...")

if __name__ == "__main__":
    main()
