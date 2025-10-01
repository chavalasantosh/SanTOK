#!/usr/bin/env python3
"""
Test script demonstrating all 9 SanTOK tokenization methods
"""

from santok import TextTokenizationEngine

def test_all_tokenization_methods():
    text = "Hello, World! This is a test."
    engine = TextTokenizationEngine()
    
    # All 9 tokenization methods
    methods = [
        "space",           # 1. Space/whitespace tokenization
        "word",            # 2. Word tokenization  
        "char",            # 3. Character tokenization
        "grammar",         # 4. Grammar tokenization (words + punctuation)
        "subword",         # 5. Subword tokenization (simple)
        "subword_bpe",     # 6. Subword BPE tokenization
        "subword_syllable", # 7. Subword syllable tokenization
        "subword_frequency", # 8. Subword frequency tokenization
        "byte"             # 9. Byte tokenization
    ]
    
    print("=== SanTOK - All 9 Tokenization Methods ===")
    print(f"Input text: '{text}'")
    print()
    
    for i, method in enumerate(methods, 1):
        try:
            result = engine.tokenize(text, tokenization_method=method, compute_features=True)
            
            print(f"{i}. {method.upper()} Tokenization:")
            print(f"   Tokens: {result['tokens']}")
            print(f"   Count: {len(result['tokens'])}")
            print(f"   Frontend Digits: {result['frontend_digits']}")
            print(f"   Features: Entropy={result['features']['entropy_index']}, Balance={result['features']['balance_index']}")
            print()
            
        except Exception as e:
            print(f"{i}. {method.upper()} Tokenization: ERROR - {e}")
            print()

if __name__ == "__main__":
    test_all_tokenization_methods()
