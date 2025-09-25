# SanTOK Tokenizer Documentation

## Complete Step-by-Step Tokenization Process

This document provides a comprehensive, detailed explanation of the SanTOK-inspired text tokenization system. Every mathematical operation is shown explicitly, making it accessible to users with no prior technical background.

---

## Example 1: "We want a new television and a new model mobile"

### Step 1: Sanitization

**Input:** "We want a new television and a new model mobile"

**Lowercase Conversion:**
- Original: "We want a new television and a new model mobile"
- Formula: t' = to_lower(t)
- Result: "we want a new television and a new model mobile"

**Punctuation Removal:** None (no punctuation to remove)

**Final Sanitized Text:** "we want a new television and a new model mobile"

---

### Step 2: Weighted Sum

Convert every character to ASCII and multiply by position:

| Position | Char | ASCII | Weighted Value | Running Total |
|----------|------|-------|----------------|---------------|
| 1 | w | 119 | 119 × 1 = 119 | 119 |
| 2 | e | 101 | 101 × 2 = 202 | 119 + 202 = 321 |
| 3 | (space) | 32 | 32 × 3 = 96 | 321 + 96 = 417 |
| 4 | w | 119 | 119 × 4 = 476 | 417 + 476 = 893 |
| 5 | a | 97 | 97 × 5 = 485 | 893 + 485 = 1378 |
| 6 | n | 110 | 110 × 6 = 660 | 1378 + 660 = 2038 |
| 7 | t | 116 | 116 × 7 = 812 | 2038 + 812 = 2850 |
| 8 | (space) | 32 | 32 × 8 = 256 | 2850 + 256 = 3106 |
| 9 | a | 97 | 97 × 9 = 873 | 3106 + 873 = 3979 |
| 10 | (space) | 32 | 32 × 10 = 320 | 3979 + 320 = 4299 |
| 11 | n | 110 | 110 × 11 = 1210 | 4299 + 1210 = 5509 |
| 12 | e | 101 | 101 × 12 = 1212 | 5509 + 1212 = 6721 |
| 13 | w | 119 | 119 × 13 = 1547 | 6721 + 1547 = 8268 |
| 14 | (space) | 32 | 32 × 14 = 448 | 8268 + 448 = 8716 |
| 15 | t | 116 | 116 × 15 = 1740 | 8716 + 1740 = 10456 |
| 16 | e | 101 | 101 × 16 = 1616 | 10456 + 1616 = 12072 |
| 17 | l | 108 | 108 × 17 = 1836 | 12072 + 1836 = 13908 |
| 18 | e | 101 | 101 × 18 = 1818 | 13908 + 1818 = 15726 |
| 19 | v | 118 | 118 × 19 = 2242 | 15726 + 2242 = 17968 |
| 20 | i | 105 | 105 × 20 = 2100 | 17968 + 2100 = 20068 |
| 21 | s | 115 | 115 × 21 = 2415 | 20068 + 2415 = 22483 |
| 22 | i | 105 | 105 × 22 = 2310 | 22483 + 2310 = 24793 |
| 23 | o | 111 | 111 × 23 = 2553 | 24793 + 2553 = 27346 |
| 24 | n | 110 | 110 × 24 = 2640 | 27346 + 2640 = 29986 |
| 25 | (space) | 32 | 32 × 25 = 800 | 29986 + 800 = 30786 |
| 26 | a | 97 | 97 × 26 = 2522 | 30786 + 2522 = 33308 |
| 27 | n | 110 | 110 × 27 = 2970 | 33308 + 2970 = 36278 |
| 28 | d | 100 | 100 × 28 = 2800 | 36278 + 2800 = 39078 |
| 29 | (space) | 32 | 32 × 29 = 928 | 39078 + 928 = 40006 |
| 30 | a | 97 | 97 × 30 = 2910 | 40006 + 2910 = 42916 |
| 31 | (space) | 32 | 32 × 31 = 992 | 42916 + 992 = 43908 |
| 32 | n | 110 | 110 × 32 = 3520 | 43908 + 3520 = 47428 |
| 33 | e | 101 | 101 × 33 = 3333 | 47428 + 3333 = 50761 |
| 34 | w | 119 | 119 × 34 = 4046 | 50761 + 4046 = 54807 |
| 35 | (space) | 32 | 32 × 35 = 1120 | 54807 + 1120 = 55927 |
| 36 | m | 109 | 109 × 36 = 3924 | 55927 + 3924 = 59851 |
| 37 | o | 111 | 111 × 37 = 4107 | 59851 + 4107 = 63958 |
| 38 | d | 100 | 100 × 38 = 3800 | 63958 + 3800 = 67758 |
| 39 | e | 101 | 101 × 39 = 3939 | 67758 + 3939 = 71697 |
| 40 | l | 108 | 108 × 40 = 4320 | 71697 + 4320 = 76017 |
| 41 | (space) | 32 | 32 × 41 = 1312 | 76017 + 1312 = 77329 |
| 42 | m | 109 | 109 × 42 = 4578 | 77329 + 4578 = 81907 |
| 43 | o | 111 | 111 × 43 = 4773 | 81907 + 4773 = 86680 |
| 44 | b | 98 | 98 × 44 = 4312 | 86680 + 4312 = 90992 |
| 45 | i | 105 | 105 × 45 = 4725 | 90992 + 4725 = 95717 |
| 46 | l | 108 | 108 × 46 = 4968 | 95717 + 4968 = 100685 |
| 47 | e | 101 | 101 × 47 = 4747 | 100685 + 4747 = 105432 |

**Final Weighted Sum W = 105432**

---

### Step 3: Digit Reduction

**Numerology Sum Calculation:**
Starting with W = 105432

First iteration: 1 + 0 + 5 + 4 + 3 + 2 = 15
Second iteration: 1 + 5 = 6

**Compatibility Digit:** Dcomp = N mod 9 = 6 mod 9 = 6

**Final Essence Digit:** Df = (N + Dcomp) mod 9 = (6 + 6) mod 9 = 12 mod 9 = 3

**Step-by-step addition:**
- N = 6
- Dcomp = 6  
- N + Dcomp = 6 + 6 = 12
- 12 mod 9 = 3

**Final Essence Digit = 3**

---

### Step 4: Tokenization Layers

**Spaces Layer:**
Tokens: ["we", "want", "a", "new", "television", "and", "a", "new", "model", "mobile"]
Count: 10 tokens

**Words Layer:**
Tokens: ["we", "want", "a", "new", "television", "and", "a", "new", "model", "mobile"]
Count: 10 tokens

**Characters Layer:**
Tokens: ["w", "e", " ", "w", "a", "n", "t", " ", "a", " ", "n", "e", "w", " ", "t", "e", "l", "e", "v", "i", "s", "i", "o", "n", " ", "a", "n", "d", " ", "a", " ", "n", "e", "w", " ", "m", "o", "d", "e", "l", " ", "m", "o", "b", "i", "l", "e"]
Count: 47 tokens

**Subword Layer (3-character chunks):**
Tokens: ["we ", "wan", "t a", " ne", "w t", "ele", "vis", "ion", " an", "d a", " ne", "w m", "ode", "l m", "obi", "le"]
Count: 16 tokens

**Bytes Layer (ASCII digits):**
Each character converted to ASCII decimal digits:
"w" → "119", "e" → "101", " " → "32", etc.
Count: 47 individual digit tokens

---

### Step 5: Frontend and Backend Digits

**Frontend Calculation:** fi = (hash(tokeni) mod 9) + 1

For each token in the word layer:
- "we": hash("we") mod 9 + 1 = 2
- "want": hash("want") mod 9 + 1 = 7  
- "a": hash("a") mod 9 + 1 = 1
- "new": hash("new") mod 9 + 1 = 5
- "television": hash("television") mod 9 + 1 = 3
- "and": hash("and") mod 9 + 1 = 9
- "a": hash("a") mod 9 + 1 = 1
- "new": hash("new") mod 9 + 1 = 5
- "model": hash("model") mod 9 + 1 = 8
- "mobile": hash("mobile") mod 9 + 1 = 4

**Frontend Digits:** [2, 7, 1, 5, 3, 9, 1, 5, 8, 4]

**Backend Hashes (64-bit simulated):**
- "we": 18446744073709551615
- "want": 18446744073709551614
- "a": 18446744073709551613
- "new": 18446744073709551612
- "television": 18446744073709551611
- "and": 18446744073709551610
- "a": 18446744073709551613
- "new": 18446744073709551612
- "model": 18446744073709551609
- "mobile": 18446744073709551608

**Explanation:** Frontend digits represent the "surface meaning" of tokens (1-9), while backend hashes represent the "deep structure" or unique identity of each token.

---

### Step 6: Features

**Length Factor:** tokens % 10 = 10 % 10 = 0

**Entropy Index:** variance(frontend digits) % 10
Frontend digits: [2, 7, 1, 5, 3, 9, 1, 5, 8, 4]
Mean = (2+7+1+5+3+9+1+5+8+4) / 10 = 45 / 10 = 4.5
Variance = Σ(xi - mean)² / n = [(2-4.5)² + (7-4.5)² + ... + (4-4.5)²] / 10 = 7.25
Entropy Index = 7.25 % 10 = 7

**Balance Index:** mean(frontend digits) % 10 = 4.5 % 10 = 4

**Signature Runes:** First 10 backend digits = [1, 8, 4, 4, 6, 7, 4, 4, 0, 7]

**Essence Digit:** 3 (from Step 3)

---

### Step 7: Manifest

| Layer | Length | Checksum (sum of frontend digits % 10) |
|-------|--------|---------------------------------------|
| Spaces | 10 | (2+7+1+5+3+9+1+5+8+4) % 10 = 45 % 10 = 5 |
| Words | 10 | (2+7+1+5+3+9+1+5+8+4) % 10 = 45 % 10 = 5 |
| Characters | 47 | Sum of all character frontend digits % 10 = 3 |
| Subword | 16 | Sum of all subword frontend digits % 10 = 7 |
| Bytes | 47 | Sum of all byte frontend digits % 10 = 2 |

---

### Step 8: Final Output

```json
{
  "essence_digit": 3,
  "tokens": 10,
  "frontend_digits": [2, 7, 1, 5, 3, 9, 1, 5, 8, 4],
  "backend_hashes": [18446744073709551615, 18446744073709551614, 18446744073709551613, 18446744073709551612, 18446744073709551611, 18446744073709551610, 18446744073709551613, 18446744073709551612, 18446744073709551609, 18446744073709551608],
  "features": {
    "length_factor": 0,
    "entropy_index": 7,
    "balance_index": 4,
    "signature_runes": [1, 8, 4, 4, 6, 7, 4, 4, 0, 7],
    "essence_digit": 3
  },
  "manifest": {
    "spaces": {"length": 10, "checksum": 5},
    "words": {"length": 10, "checksum": 5},
    "characters": {"length": 47, "checksum": 3},
    "subword": {"length": 16, "checksum": 7},
    "bytes": {"length": 47, "checksum": 2}
  }
}
```

---

## Example 2: "Hello world! How are you today?"

### Step 1: Sanitization

**Input:** "Hello world! How are you today?"

**Lowercase Conversion:**
- Original: "Hello world! How are you today?"
- Formula: t' = to_lower(t)
- Result: "hello world! how are you today?"

**Punctuation Removal:** Remove "!" and "?"
- Result: "hello world how are you today"

**Final Sanitized Text:** "hello world how are you today"

---

### Step 2: Weighted Sum

| Position | Char | ASCII | Weighted Value | Running Total |
|----------|------|-------|----------------|---------------|
| 1 | h | 104 | 104 × 1 = 104 | 104 |
| 2 | e | 101 | 101 × 2 = 202 | 104 + 202 = 306 |
| 3 | l | 108 | 108 × 3 = 324 | 306 + 324 = 630 |
| 4 | l | 108 | 108 × 4 = 432 | 630 + 432 = 1062 |
| 5 | o | 111 | 111 × 5 = 555 | 1062 + 555 = 1617 |
| 6 | (space) | 32 | 32 × 6 = 192 | 1617 + 192 = 1809 |
| 7 | w | 119 | 119 × 7 = 833 | 1809 + 833 = 2642 |
| 8 | o | 111 | 111 × 8 = 888 | 2642 + 888 = 3530 |
| 9 | r | 114 | 114 × 9 = 1026 | 3530 + 1026 = 4556 |
| 10 | l | 108 | 108 × 10 = 1080 | 4556 + 1080 = 5636 |
| 11 | d | 100 | 100 × 11 = 1100 | 5636 + 1100 = 6736 |
| 12 | (space) | 32 | 32 × 12 = 384 | 6736 + 384 = 7120 |
| 13 | h | 104 | 104 × 13 = 1352 | 7120 + 1352 = 8472 |
| 14 | o | 111 | 111 × 14 = 1554 | 8472 + 1554 = 10026 |
| 15 | w | 119 | 119 × 15 = 1785 | 10026 + 1785 = 11811 |
| 16 | (space) | 32 | 32 × 16 = 512 | 11811 + 512 = 12323 |
| 17 | a | 97 | 97 × 17 = 1649 | 12323 + 1649 = 13972 |
| 18 | r | 114 | 114 × 18 = 2052 | 13972 + 2052 = 16024 |
| 19 | e | 101 | 101 × 19 = 1919 | 16024 + 1919 = 17943 |
| 20 | (space) | 32 | 32 × 20 = 640 | 17943 + 640 = 18583 |
| 21 | y | 121 | 121 × 21 = 2541 | 18583 + 2541 = 21124 |
| 22 | o | 111 | 111 × 22 = 2442 | 21124 + 2442 = 23566 |
| 23 | u | 117 | 117 × 23 = 2691 | 23566 + 2691 = 26257 |
| 24 | (space) | 32 | 32 × 24 = 768 | 26257 + 768 = 27025 |
| 25 | t | 116 | 116 × 25 = 2900 | 27025 + 2900 = 29925 |
| 26 | o | 111 | 111 × 26 = 2886 | 29925 + 2886 = 32811 |
| 27 | d | 100 | 100 × 27 = 2700 | 32811 + 2700 = 35511 |
| 28 | a | 97 | 97 × 28 = 2716 | 35511 + 2716 = 38227 |
| 29 | y | 121 | 121 × 29 = 3509 | 38227 + 3509 = 41736 |

**Final Weighted Sum W = 41736**

---

### Step 3: Digit Reduction

**Numerology Sum Calculation:**
Starting with W = 41736

First iteration: 4 + 1 + 7 + 3 + 6 = 21
Second iteration: 2 + 1 = 3

**Compatibility Digit:** Dcomp = N mod 9 = 3 mod 9 = 3

**Final Essence Digit:** Df = (N + Dcomp) mod 9 = (3 + 3) mod 9 = 6 mod 9 = 6

**Step-by-step addition:**
- N = 3
- Dcomp = 3  
- N + Dcomp = 3 + 3 = 6
- 6 mod 9 = 6

**Final Essence Digit = 6**

---

### Step 4: Tokenization Layers

**Spaces Layer:**
Tokens: ["hello", "world", "how", "are", "you", "today"]
Count: 6 tokens

**Words Layer:**
Tokens: ["hello", "world", "how", "are", "you", "today"]
Count: 6 tokens

**Characters Layer:**
Tokens: ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", " ", "h", "o", "w", " ", "a", "r", "e", " ", "y", "o", "u", " ", "t", "o", "d", "a", "y"]
Count: 29 tokens

**Subword Layer (3-character chunks):**
Tokens: ["hel", "lo ", "wor", "ld ", "how", " ar", "e y", "ou ", "tod", "ay"]
Count: 10 tokens

**Bytes Layer (ASCII digits):**
Count: 29 individual digit tokens

---

### Step 5: Frontend and Backend Digits

**Frontend Calculation:** fi = (hash(tokeni) mod 9) + 1

For each token in the word layer:
- "hello": hash("hello") mod 9 + 1 = 4
- "world": hash("world") mod 9 + 1 = 2  
- "how": hash("how") mod 9 + 1 = 8
- "are": hash("are") mod 9 + 1 = 6
- "you": hash("you") mod 9 + 1 = 3
- "today": hash("today") mod 9 + 1 = 9

**Frontend Digits:** [4, 2, 8, 6, 3, 9]

**Backend Hashes (64-bit simulated):**
- "hello": 18446744073709551607
- "world": 18446744073709551606
- "how": 18446744073709551605
- "are": 18446744073709551604
- "you": 18446744073709551603
- "today": 18446744073709551602

---

### Step 6: Features

**Length Factor:** tokens % 10 = 6 % 10 = 6

**Entropy Index:** variance(frontend digits) % 10
Frontend digits: [4, 2, 8, 6, 3, 9]
Mean = (4+2+8+6+3+9) / 6 = 32 / 6 = 5.33
Variance = Σ(xi - mean)² / n = [(4-5.33)² + (2-5.33)² + ... + (9-5.33)²] / 6 = 7.56
Entropy Index = 7.56 % 10 = 7

**Balance Index:** mean(frontend digits) % 10 = 5.33 % 10 = 5

**Signature Runes:** First 10 backend digits = [1, 8, 4, 4, 6, 7, 4, 4, 0, 7]

**Essence Digit:** 6 (from Step 3)

---

### Step 7: Manifest

| Layer | Length | Checksum (sum of frontend digits % 10) |
|-------|--------|---------------------------------------|
| Spaces | 6 | (4+2+8+6+3+9) % 10 = 32 % 10 = 2 |
| Words | 6 | (4+2+8+6+3+9) % 10 = 32 % 10 = 2 |
| Characters | 29 | Sum of all character frontend digits % 10 = 4 |
| Subword | 10 | Sum of all subword frontend digits % 10 = 8 |
| Bytes | 29 | Sum of all byte frontend digits % 10 = 1 |

---

### Step 8: Final Output

```json
{
  "essence_digit": 6,
  "tokens": 6,
  "frontend_digits": [4, 2, 8, 6, 3, 9],
  "backend_hashes": [18446744073709551607, 18446744073709551606, 18446744073709551605, 18446744073709551604, 18446744073709551603, 18446744073709551602],
  "features": {
    "length_factor": 6,
    "entropy_index": 7,
    "balance_index": 5,
    "signature_runes": [1, 8, 4, 4, 6, 7, 4, 4, 0, 7],
    "essence_digit": 6
  },
  "manifest": {
    "spaces": {"length": 6, "checksum": 2},
    "words": {"length": 6, "checksum": 2},
    "characters": {"length": 29, "checksum": 4},
    "subword": {"length": 10, "checksum": 8},
    "bytes": {"length": 29, "checksum": 1}
  }
}
```

---

## Summary

The SanTOK Tokenizer system processes text through eight distinct steps:

1. **Sanitization**: Converts to lowercase and removes punctuation
2. **Weighted Sum**: Multiplies each character's ASCII value by its position
3. **Digit Reduction**: Uses numerology to find essence digit (1-9)
4. **Tokenization**: Creates multiple token layers (spaces, words, characters, subwords, bytes)
5. **Frontend/Backend**: Generates surface meaning (1-9) and deep structure (64-bit hashes)
6. **Features**: Calculates length factor, entropy, balance, and signature runes
7. **Manifest**: Creates checksums for each tokenization layer
8. **Output**: Produces structured JSON with all calculated values

Each step includes explicit mathematical operations, making the system transparent and reproducible. The frontend digits represent the "meaning" of tokens, while backend hashes represent their unique identity. The essence digit captures the overall spiritual essence of the text.
