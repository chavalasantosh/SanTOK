# Tokenization Mathematics
## Complete Mathematical Guide for SanTOK Tokenizer

**Document Version:** 1.0  
**Date:** September 23, 2025  
**Status:** Production Ready  

---

## 🎯 **PURPOSE**

This document explains all the **mathematical concepts, formulas, and calculations** used in the SanTOK Tokenizer system. Every mathematical operation is explained with examples and step-by-step calculations.

---

## 📚 **TABLE OF CONTENTS**

1. [Basic Tokenization Math](#1-basic-tokenization-math)
2. [Token Counting Mathematics](#2-token-counting-mathematics)
3. [Unique Token Calculations](#3-unique-token-calculations)
4. [Average Length Calculations](#4-average-length-calculations)
5. [Compression Mathematics](#5-compression-mathematics)
6. [Performance Mathematics](#6-performance-mathematics)
7. [ID Generation Mathematics](#7-id-generation-mathematics)
8. [File Size Mathematics](#8-file-size-mathematics)
9. [Memory Usage Mathematics](#9-memory-usage-mathematics)
10. [Reversibility Mathematics](#10-reversibility-mathematics)
11. [Validation Mathematics](#11-validation-mathematics)
12. [Advanced Tokenization Math](#12-advanced-tokenization-math)
13. [Mathematical Formulas Reference](#13-mathematical-formulas-reference)
14. [Practice Problems](#14-practice-problems)
15. [Quick Reference](#15-quick-reference)

---

## 1. BASIC TOKENIZATION MATH

### 1.1 What is Tokenization Math?
**Tokenization math** is the mathematics used to break text into tokens and analyze the results.

**Basic Formula:**
```
Text → Tokens → Analysis
```

### 1.2 Token Counting Formula
**Formula:** `Total Tokens = Number of pieces text is broken into`

**Example 1: Space Tokenization**
- **Text:** "Hello World"
- **Spaces:** 1 space
- **Tokens:** 2 tokens ("Hello", "World")
- **Formula:** 1 space + 1 = 2 tokens

**Example 2: Character Tokenization**
- **Text:** "Hello"
- **Characters:** 5 characters
- **Tokens:** 5 tokens ("H", "e", "l", "l", "o")
- **Formula:** 5 characters = 5 tokens

### 1.3 Tokenization Ratio
**Formula:** `Tokenization Ratio = Total Tokens ÷ Original Text Length`

**Example:**
- **Text:** "Hello World" (11 characters)
- **Space Tokens:** 2 tokens
- **Ratio:** 2 ÷ 11 = 0.18

**Meaning:** 0.18 tokens per character

---

## 2. TOKEN COUNTING MATHEMATICS

### 2.1 Space Tokenization Math
**Formula:** `Space Tokens = Number of Spaces + 1`

**Step-by-step calculation:**
1. Count spaces in text
2. Add 1 (for the last word)
3. Result = total space tokens

**Example: "Hello World Test"**
1. **Count spaces:** 2 spaces
2. **Add 1:** 2 + 1 = 3
3. **Result:** 3 space tokens

### 2.2 Word Tokenization Math
**Formula:** `Word Tokens = Words + Punctuation + Spaces`

**Step-by-step calculation:**
1. Count words
2. Count punctuation marks
3. Count spaces
4. Add all together

**Example: "Hello, World!"**
1. **Words:** 2 ("Hello", "World")
2. **Punctuation:** 2 (",", "!")
3. **Spaces:** 1 (" ")
4. **Total:** 2 + 2 + 1 = 5 word tokens

### 2.3 Character Tokenization Math
**Formula:** `Character Tokens = Number of Characters`

**Step-by-step calculation:**
1. Count every character (including spaces, punctuation)
2. Each character = 1 token

**Example: "Hello!"**
1. **Characters:** H, e, l, l, o, !
2. **Count:** 6 characters
3. **Result:** 6 character tokens

### 2.4 Byte Tokenization Math
**Formula:** `Byte Tokens = UTF-8 Bytes of Text`

**Step-by-step calculation:**
1. Convert text to UTF-8 bytes
2. Count bytes
3. Each byte = 1 token

**Example: "Hello"**
1. **UTF-8 bytes:** 72, 101, 108, 108, 111
2. **Count:** 5 bytes
3. **Result:** 5 byte tokens

---

## 3. UNIQUE TOKEN CALCULATIONS

### 3.1 What are Unique Tokens?
**Unique tokens** are different tokens (no duplicates).

**Formula:** `Unique Tokens = Number of different tokens`

### 3.2 Unique Token Calculation
**Step-by-step process:**
1. List all tokens
2. Remove duplicates
3. Count remaining tokens

**Example: "Hello Hello World"**
1. **All tokens:** ["Hello", "Hello", "World"]
2. **Remove duplicates:** ["Hello", "World"]
3. **Unique count:** 2 unique tokens

### 3.3 Unique Token Ratio
**Formula:** `Unique Ratio = Unique Tokens ÷ Total Tokens`

**Example:**
- **Total tokens:** 3
- **Unique tokens:** 2
- **Ratio:** 2 ÷ 3 = 0.67

**Meaning:** 67% of tokens are unique

### 3.4 Duplicate Token Count
**Formula:** `Duplicate Tokens = Total Tokens - Unique Tokens`

**Example:**
- **Total tokens:** 3
- **Unique tokens:** 2
- **Duplicates:** 3 - 2 = 1 duplicate token

---

## 4. AVERAGE LENGTH CALCULATIONS

### 4.1 Average Token Length
**Formula:** `Average Length = Total Characters ÷ Total Tokens`

**Step-by-step calculation:**
1. Count total characters in all tokens
2. Count total tokens
3. Divide characters by tokens

**Example: "Hello World"**
1. **Tokens:** ["Hello", "World"]
2. **Characters:** 5 + 5 = 10 characters
3. **Tokens:** 2 tokens
4. **Average:** 10 ÷ 2 = 5.0

### 4.2 Character Token Average
**Formula:** `Character Average = 1.0` (always)

**Why:** Each character token is exactly 1 character long.

### 4.3 Space Token Average
**Formula:** `Space Average = Total Characters ÷ Space Tokens`

**Example: "Hello World Test"**
1. **Characters:** 15 characters
2. **Space tokens:** 3 tokens
3. **Average:** 15 ÷ 3 = 5.0

### 4.4 Word Token Average
**Formula:** `Word Average = Total Characters ÷ Word Tokens`

**Example: "Hello, World!"**
1. **Characters:** 12 characters
2. **Word tokens:** 5 tokens
3. **Average:** 12 ÷ 5 = 2.4

---

## 5. COMPRESSION MATHEMATICS

### 5.1 Compression Ratio Formula
**Formula:** `Compression Ratio = Original Size ÷ Compressed Size`

**Example:**
- **Original:** 100 bytes
- **Compressed:** 50 bytes
- **Ratio:** 100 ÷ 50 = 2.0

**Meaning:** 2:1 compression (half the size)

### 5.2 Compression Percentage
**Formula:** `Compression % = (1 - Compressed Size ÷ Original Size) × 100`

**Example:**
- **Original:** 100 bytes
- **Compressed:** 50 bytes
- **Percentage:** (1 - 50 ÷ 100) × 100 = 50%

**Meaning:** 50% space saved

### 5.3 RLE Compression Math
**RLE (Run-Length Encoding) Formula:**
```
Original: "AAAAA" (5 characters)
Compressed: "A5" (2 characters)
Ratio: 5 ÷ 2 = 2.5
```

### 5.4 Pattern Compression Math
**Pattern Compression Formula:**
```
Original: "Hello Hello Hello" (17 characters)
Compressed: "Hello" (5 characters) + count (3)
Ratio: 17 ÷ 8 = 2.125
```

### 5.5 Frequency Compression Math
**Frequency Compression Formula:**
```
Common words get shorter codes:
"the" → "t" (saves 2 characters)
"and" → "a" (saves 2 characters)
```

---

## 6. PERFORMANCE MATHEMATICS

### 6.1 Response Time Formula
**Formula:** `Response Time = End Time - Start Time`

**Example:**
- **Start time:** 0.000000 seconds
- **End time:** 0.000066 seconds
- **Response time:** 0.000066 seconds

### 6.2 Throughput Formula
**Formula:** `Throughput = Characters Processed ÷ Time Taken`

**Example:**
- **Characters:** 1,000 characters
- **Time:** 0.001 seconds
- **Throughput:** 1,000 ÷ 0.001 = 1,000,000 characters/second

### 6.3 Performance Rating
**Formula:** `Performance Rating = 1 ÷ Response Time`

**Example:**
- **Response time:** 0.000066 seconds
- **Rating:** 1 ÷ 0.000066 = 15,151 operations/second

### 6.4 Efficiency Formula
**Formula:** `Efficiency = Output ÷ Input`

**Example:**
- **Input:** 1,000 characters
- **Output:** 200 tokens
- **Efficiency:** 200 ÷ 1,000 = 0.2 tokens per character

---

## 7. ID GENERATION MATHEMATICS

### 7.1 Unique ID Formula
**Formula:** `ID = Hash(Content + Seed + Index)`

**Step-by-step calculation:**
1. Take token content
2. Add seed value
3. Add token index
4. Calculate hash
5. Convert to string

### 7.2 Sequential ID Math
**Formula:** `Sequential ID = Base ID + Index`

**Example:**
- **Base ID:** 1000000000000000000
- **Index:** 5
- **Sequential ID:** 1000000000000000005

### 7.3 Content ID Math
**Formula:** `Content ID = Sum of Character Codes`

**Example: "Hello"**
1. **H:** 72
2. **e:** 101
3. **l:** 108
4. **l:** 108
5. **o:** 111
6. **Sum:** 72 + 101 + 108 + 108 + 111 = 500

### 7.4 Global ID Math
**Formula:** `Global ID = Session ID + Token Index`

**Example:**
- **Session ID:** 1000000
- **Token Index:** 42
- **Global ID:** 1000042

---

## 8. FILE SIZE MATHEMATICS

### 8.1 File Size Calculation
**Formula:** `File Size = Number of Bytes`

**Step-by-step calculation:**
1. Read file in binary mode
2. Count bytes
3. Convert to appropriate units

### 8.2 Size Conversion Math
**Conversion Formulas:**
- **Bytes to KB:** `KB = Bytes ÷ 1,000`
- **KB to MB:** `MB = KB ÷ 1,000`
- **MB to GB:** `GB = MB ÷ 1,000`

**Example: 5,000,000 bytes**
1. **To KB:** 5,000,000 ÷ 1,000 = 5,000 KB
2. **To MB:** 5,000 ÷ 1,000 = 5 MB

### 8.3 Processing Time Math
**Formula:** `Processing Time = File Size ÷ Processing Speed`

**Example:**
- **File size:** 10 MB = 10,000,000 bytes
- **Speed:** 1,000 bytes/second
- **Time:** 10,000,000 ÷ 1,000 = 10,000 seconds

### 8.4 Memory Usage Math
**Formula:** `Memory Usage = File Size × Memory Multiplier`

**Example:**
- **File size:** 10 MB
- **Multiplier:** 2 (for processing overhead)
- **Memory:** 10 × 2 = 20 MB

---

## 9. MEMORY USAGE MATHEMATICS

### 9.1 Token Memory Formula
**Formula:** `Token Memory = Token Size + Metadata Size`

**Example:**
- **Token size:** 10 bytes
- **Metadata:** 50 bytes
- **Total:** 10 + 50 = 60 bytes per token

### 9.2 Total Memory Formula
**Formula:** `Total Memory = Token Memory × Number of Tokens`

**Example:**
- **Token memory:** 60 bytes
- **Number of tokens:** 1,000
- **Total memory:** 60 × 1,000 = 60,000 bytes = 60 KB

### 9.3 Memory Efficiency
**Formula:** `Memory Efficiency = Useful Data ÷ Total Memory`

**Example:**
- **Useful data:** 10,000 bytes
- **Total memory:** 60,000 bytes
- **Efficiency:** 10,000 ÷ 60,000 = 0.167 (16.7%)

### 9.4 Memory Optimization
**Formula:** `Optimized Memory = Original Memory × Optimization Factor`

**Example:**
- **Original memory:** 100 MB
- **Optimization factor:** 0.5 (50% reduction)
- **Optimized memory:** 100 × 0.5 = 50 MB

---

## 10. REVERSIBILITY MATHEMATICS

### 10.1 Reversibility Check
**Formula:** `Reversible = (Original Text == Reconstructed Text)`

**Step-by-step process:**
1. Tokenize original text
2. Reconstruct from tokens
3. Compare original and reconstructed
4. If identical: Reversible = True
5. If different: Reversible = False

### 10.2 Information Preservation
**Formula:** `Information Preserved = Original Length == Reconstructed Length`

**Example:**
- **Original:** "Hello World" (11 characters)
- **Reconstructed:** "Hello World" (11 characters)
- **Preserved:** 11 == 11 = True

### 10.3 Loss Calculation
**Formula:** `Information Loss = Original Length - Reconstructed Length`

**Example:**
- **Original:** "Hello World" (11 characters)
- **Reconstructed:** "HelloWorld" (10 characters)
- **Loss:** 11 - 10 = 1 character lost

### 10.4 Reversibility Percentage
**Formula:** `Reversibility % = (Preserved Characters ÷ Original Characters) × 100`

**Example:**
- **Original:** 100 characters
- **Preserved:** 100 characters
- **Percentage:** (100 ÷ 100) × 100 = 100%

---

## 11. VALIDATION MATHEMATICS

### 11.1 Stability Check
**Formula:** `Stable = (Run1 Result == Run2 Result == Run3 Result)`

**Step-by-step process:**
1. Run tokenization 3 times
2. Compare results
3. If all identical: Stable = True
4. If any different: Stable = False

### 11.2 Determinism Check
**Formula:** `Deterministic = (Same Input → Same Output)`

**Example:**
- **Input:** "Hello World"
- **Output 1:** ["Hello", "World"]
- **Output 2:** ["Hello", "World"]
- **Deterministic:** True (same output)

### 11.3 Validation Score
**Formula:** `Validation Score = (Passed Tests ÷ Total Tests) × 100`

**Example:**
- **Total tests:** 10
- **Passed tests:** 9
- **Score:** (9 ÷ 10) × 100 = 90%

### 11.4 Error Rate Calculation
**Formula:** `Error Rate = (Failed Tests ÷ Total Tests) × 100`

**Example:**
- **Total tests:** 100
- **Failed tests:** 2
- **Error rate:** (2 ÷ 100) × 100 = 2%

---

## 12. ADVANCED TOKENIZATION MATH

### 12.1 Subword Tokenization Math
**Formula:** `Subword Tokens = Word Length ÷ Chunk Size + Remainder`

**Example: "Hello" with chunk size 2**
1. **Word length:** 5
2. **Chunk size:** 2
3. **Chunks:** 5 ÷ 2 = 2 chunks
4. **Remainder:** 1 character
5. **Total:** 2 + 1 = 3 subword tokens

### 12.2 BPE Tokenization Math
**BPE (Byte Pair Encoding) Formula:**
```
Step 1: Start with character tokens
Step 2: Find most frequent pair
Step 3: Merge pair into new token
Step 4: Repeat until desired vocabulary size
```

### 12.3 Syllable Tokenization Math
**Formula:** `Syllable Tokens = Number of Syllables + Punctuation`

**Example: "Hello!"**
1. **Syllables:** "Hel-lo" (2 syllables)
2. **Punctuation:** "!" (1 punctuation)
3. **Total:** 2 + 1 = 3 tokens

### 12.4 Frequency Tokenization Math
**Formula:** `Frequency Tokens = High Frequency + Low Frequency`

**Example:**
- **High frequency words:** 10 tokens
- **Low frequency words:** 20 tokens
- **Total:** 10 + 20 = 30 tokens

---

## 13. MATHEMATICAL FORMULAS REFERENCE

### 13.1 Basic Formulas
```
Total Tokens = Count of pieces
Unique Tokens = Count of different pieces
Average Length = Total Characters ÷ Total Tokens
Compression Ratio = Original Size ÷ Compressed Size
```

### 13.2 Performance Formulas
```
Response Time = End Time - Start Time
Throughput = Characters ÷ Time
Efficiency = Output ÷ Input
Performance Rating = 1 ÷ Response Time
```

### 13.3 Memory Formulas
```
Token Memory = Token Size + Metadata Size
Total Memory = Token Memory × Number of Tokens
Memory Efficiency = Useful Data ÷ Total Memory
```

### 13.4 Validation Formulas
```
Reversible = (Original == Reconstructed)
Stable = (All runs identical)
Deterministic = (Same input → Same output)
Validation Score = (Passed ÷ Total) × 100
```

---

## 14. PRACTICE PROBLEMS

### 14.1 Basic Tokenization Problems

#### **Problem 1: Space Tokenization**
**Text:** "Hello World Test"
**Question:** How many space tokens?
**Solution:**
1. Count spaces: 2
2. Add 1: 2 + 1 = 3
3. **Answer: 3 space tokens**

#### **Problem 2: Character Tokenization**
**Text:** "Hello!"
**Question:** How many character tokens?
**Solution:**
1. Count characters: H, e, l, l, o, !
2. **Answer: 6 character tokens**

#### **Problem 3: Unique Tokens**
**Text:** "Hello Hello World"
**Question:** How many unique tokens?
**Solution:**
1. All tokens: ["Hello", "Hello", "World"]
2. Remove duplicates: ["Hello", "World"]
3. **Answer: 2 unique tokens**

### 14.2 Compression Problems

#### **Problem 4: Compression Ratio**
**Original:** 100 bytes
**Compressed:** 25 bytes
**Question:** What is the compression ratio?
**Solution:**
1. Formula: Original ÷ Compressed
2. Calculation: 100 ÷ 25 = 4
3. **Answer: 4:1 compression ratio**

#### **Problem 5: Compression Percentage**
**Original:** 200 bytes
**Compressed:** 50 bytes
**Question:** What percentage of space is saved?
**Solution:**
1. Formula: (1 - Compressed ÷ Original) × 100
2. Calculation: (1 - 50 ÷ 200) × 100 = 75%
3. **Answer: 75% space saved**

### 14.3 Performance Problems

#### **Problem 6: Throughput Calculation**
**Characters processed:** 5,000
**Time taken:** 0.005 seconds
**Question:** What is the throughput?
**Solution:**
1. Formula: Characters ÷ Time
2. Calculation: 5,000 ÷ 0.005 = 1,000,000
3. **Answer: 1,000,000 characters/second**

#### **Problem 7: Response Time**
**Start time:** 0.000000 seconds
**End time:** 0.000123 seconds
**Question:** What is the response time?
**Solution:**
1. Formula: End Time - Start Time
2. Calculation: 0.000123 - 0.000000 = 0.000123
3. **Answer: 0.000123 seconds**

### 14.4 Memory Problems

#### **Problem 8: Memory Usage**
**Token size:** 20 bytes
**Metadata size:** 30 bytes
**Number of tokens:** 500
**Question:** What is the total memory usage?
**Solution:**
1. Token memory: 20 + 30 = 50 bytes
2. Total memory: 50 × 500 = 25,000 bytes
3. **Answer: 25,000 bytes (25 KB)**

#### **Problem 9: Memory Efficiency**
**Useful data:** 10,000 bytes
**Total memory:** 50,000 bytes
**Question:** What is the memory efficiency?
**Solution:**
1. Formula: Useful Data ÷ Total Memory
2. Calculation: 10,000 ÷ 50,000 = 0.2
3. **Answer: 20% efficiency**

---

## 15. QUICK REFERENCE

### 15.1 Basic Tokenization Formulas
- **Space tokens:** `Spaces + 1`
- **Character tokens:** `Number of characters`
- **Word tokens:** `Words + Punctuation + Spaces`
- **Byte tokens:** `UTF-8 bytes`

### 15.2 Analysis Formulas
- **Unique ratio:** `Unique tokens ÷ Total tokens`
- **Average length:** `Total characters ÷ Total tokens`
- **Compression ratio:** `Original size ÷ Compressed size`
- **Throughput:** `Characters ÷ Time`

### 15.3 Validation Formulas
- **Reversible:** `Original == Reconstructed`
- **Stable:** `All runs identical`
- **Deterministic:** `Same input → Same output`
- **Error rate:** `Failed tests ÷ Total tests × 100`

### 15.4 Memory Formulas
- **Token memory:** `Token size + Metadata size`
- **Total memory:** `Token memory × Number of tokens`
- **Memory efficiency:** `Useful data ÷ Total memory`

### 15.5 Performance Formulas
- **Response time:** `End time - Start time`
- **Performance rating:** `1 ÷ Response time`
- **Efficiency:** `Output ÷ Input`

---

## 16. MATHEMATICAL EXAMPLES FROM SanTOK TOKENIZER

### 16.1 Real System Example
**Input:** "Hello World! This is a test."
**System Output:**
```
space: 21 tokens, 12 unique, avg_len=8.86
word: 68 tokens, 26 unique, avg_len=2.74
char: 186 tokens, 41 unique, avg_len=1.00
```

**Mathematical Analysis:**
- **Space tokens:** 21 (spaces + 1)
- **Unique space tokens:** 12 (different pieces)
- **Average length:** 8.86 characters per token
- **Word tokens:** 68 (words + punctuation + spaces)
- **Character tokens:** 186 (every character)

### 16.2 Performance Example
**System Output:**
```
space: ✓ STABLE (rev:True, ids:True, det:True, perf:0.000066s)
```

**Mathematical Analysis:**
- **Response time:** 0.000066 seconds
- **Performance rating:** 1 ÷ 0.000066 = 15,151 operations/second
- **Stability:** All runs identical
- **Reversibility:** Perfect reconstruction
- **Determinism:** Same input → Same output

### 16.3 Compression Example
**System Output:**
```
Compression Analysis: rle: 1.000 ratio (0.0% saved, 0 tokens)
```

**Mathematical Analysis:**
- **Compression ratio:** 1.000 (no compression)
- **Space saved:** 0.0% (no savings)
- **Tokens compressed:** 0 (no tokens compressed)

---

## 17. CONCLUSION

### 17.1 Key Mathematical Concepts
1. **Token counting:** Basic counting and analysis
2. **Compression math:** Ratios and percentages
3. **Performance math:** Time and throughput calculations
4. **Memory math:** Usage and efficiency calculations
5. **Validation math:** Reversibility and stability checks

### 17.2 Mathematical Applications
- **Tokenization analysis:** Understanding token counts and types
- **Performance optimization:** Measuring and improving speed
- **Memory management:** Calculating and optimizing memory usage
- **Quality assurance:** Validating system correctness
- **Compression efficiency:** Measuring space savings

### 17.3 Next Steps
1. **Practice:** Work through all the practice problems
2. **Apply:** Use these formulas with real SanTOK Tokenizer data
3. **Experiment:** Try different inputs and analyze the results
4. **Optimize:** Use the math to improve system performance

---

**Document Status:** ✅ **COMPLETE AND MATHEMATICALLY COMPREHENSIVE**  
**Mathematical Coverage:** ✅ **ALL TOKENIZATION MATH COVERED**  
**Formula Reference:** ✅ **COMPLETE FORMULA COLLECTION**  
**Practice Problems:** ✅ **COMPREHENSIVE PRACTICE SET**  
**Real Examples:** ✅ **SanTOK TOKENIZER EXAMPLES INCLUDED**
