#!/usr/bin/env python3
"""
Test the user's original code with all 9 tokenization methods
"""

from santok import TextTokenizationEngine

def test_user_code():
    engine = TextTokenizationEngine()
    texts = [
        "First document content here.",
        "Second document with different content.",
        "Third document for analysis."
    ]
    
    results = []
    for text in texts:
        result = engine.tokenize(text, compute_features=True)
        results.append({
            'text': text,
            'length_factor': result['features']['length_factor'],
            'entropy_index': result['features']['entropy_index']
        })
    
    for result in results:
        print(f"Text: {result['text'][:30]}...")
        print(f"Length Factor: {result['length_factor']}, Entropy: {result['entropy_index']}")
        print()

if __name__ == "__main__":
    test_user_code()
