#!/usr/bin/env python3
"""
Test script to demonstrate correct SanTOK feature access
"""

from santok import TextTokenizationEngine, analyze_text_comprehensive

def test_features():
    text = "Hello World! This is a test."
    
    print("=== Method 1: tokenize() with compute_features=True ===")
    engine = TextTokenizationEngine()
    result = engine.tokenize(text, compute_features=True)
    
    print("Mathematical Features:")
    print(f"Entropy Index: {result['features']['entropy_index']}")
    print(f"Balance Index: {result['features']['balance_index']}")
    print(f"Length Factor: {result['features']['length_factor']}")
    print(f"Mean: {result['features']['mean']}")
    print(f"Variance: {result['features']['variance']}")
    print(f"Frontend Digits: {result['frontend_digits']}")
    print()
    
    print("=== Method 2: analyze_text_comprehensive() ===")
    result = analyze_text_comprehensive(text)
    
    # Access features from whitespace tokenization
    features = result['whitespace']['features']
    print("Mathematical Features:")
    print(f"Entropy Index: {features['entropy_index']}")
    print(f"Balance Index: {features['balance_index']}")
    print(f"Length Factor: {features['length_factor']}")
    print(f"Mean: {features['mean']}")
    print(f"Variance: {features['variance']}")
    print(f"Frontend Digits: {result['whitespace']['frontend_digits']}")
    print()
    
    print("=== Method 3: analyze_text() method ===")
    engine = TextTokenizationEngine()
    result = engine.analyze_text(text)
    
    # Access features from whitespace tokenization
    features = result['whitespace']['features']
    print("Mathematical Features:")
    print(f"Entropy Index: {features['entropy_index']}")
    print(f"Balance Index: {features['balance_index']}")
    print(f"Length Factor: {features['length_factor']}")
    print(f"Mean: {features['mean']}")
    print(f"Variance: {features['variance']}")
    print(f"Frontend Digits: {result['whitespace']['frontend_digits']}")

if __name__ == "__main__":
    test_features()
