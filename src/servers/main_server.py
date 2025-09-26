"""
FastAPI Backend Server for SanTOK
Connects the frontend to the Python tokenization engine
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import sys
import os
import time
import json

# Add src directory to path to import backend files
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

# Import your existing backend files (aliased to avoid symbol shadowing)
try:
    from core.core_tokenizer import tokenize_text, reconstruct_from_tokens
    import core.core_tokenizer as KT
    from core.core_tokenizer import _content_id
    print("✅ Successfully imported engine module")
except ImportError as e:
    print(f"❌ Error importing core_tokenizer.py: {e}")
    sys.exit(1)

try:
    import base_tokenizer as TK
    print("✅ Successfully imported base_tokenizer.py")
except ImportError as e:
    print(f"⚠️  Warning: Could not import base_tokenizer.py: {e}")

try:
    from compression_algorithms import *  # noqa: F401,F403 (optional additional helpers)
    print("✅ Successfully imported compression_algorithms.py")
except ImportError as e:
    print(f"⚠️  Warning: Could not import compression_algorithms.py: {e}")

try:
    from unique_identifier import *  # noqa: F401,F403 (optional)
    print("✅ Successfully imported unique_identifier.py")
except ImportError as e:
    print(f"⚠️  Warning: Could not import unique_identifier.py: {e}")

# Initialize FastAPI app
app = FastAPI(
    title="SanTOK API",
    description="Advanced Text Tokenization System with Multiple Algorithms",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class TokenizationRequest(BaseModel):
    text: str
    tokenizer_type: str
    lower: bool = False
    drop_specials: bool = False
    # Accept number (aligned with frontend) but allow bool too; 1 means run-aware math
    collapse_repeats: Optional[int] = 1
    embedding: bool = False
    seed: Optional[int] = None
    embedding_bit: Optional[int] = None

class Token(BaseModel):
    text: str
    id: int
    position: int
    length: int
    type: str
    color: Optional[str] = None

class TokenizationResult(BaseModel):
    tokens: List[Token]
    tokenCount: int
    characterCount: int
    tokenizerType: str
    processingTime: float
    memoryUsage: float
    compressionRatio: float
    reversibility: bool
    fingerprint: Dict[str, Any]
    originalText: Optional[str] = None  # Include original text for comparison
    # Extra data to mirror SanTOK core tokenizer engine
    frontendDigits: Optional[List[int]] = None
    backendScaled: Optional[List[int]] = None
    contentIds: Optional[List[int]] = None

class CompressionAnalysis(BaseModel):
    algorithm: str
    compressionRatio: float
    tokensSaved: int
    percentageSaved: float
    reversibility: bool

# Tokenizer mapping (call the advanced engine by default)
TOKENIZERS = {
    'space': KT.tokenize_space,
    'word': KT.tokenize_word,
    'char': KT.tokenize_char,
    'grammar': KT.tokenize_grammar,
    'subword': lambda text: KT.tokenize_subword(text, 3, 'fixed'),
    'bpe': lambda text: KT.tokenize_subword(text, 3, 'bpe'),
    'syllable': lambda text: KT.tokenize_subword(text, 3, 'syllable'),
    'frequency': lambda text: KT.tokenize_subword(text, 3, 'frequency'),
    'byte': KT.tokenize_bytes,
}

def _stream_name_for(tokenizer_type: str) -> str:
    if tokenizer_type == 'bpe':
        return 'subword_bpe'
    if tokenizer_type == 'syllable':
        return 'subword_syllable'
    if tokenizer_type == 'frequency':
        return 'subword_frequency'
    return tokenizer_type

def preprocess_text(text: str, lower: bool, drop_specials: bool, collapse_repeats: bool) -> str:
    """Preprocess text based on options"""
    if lower:
        text = text.lower()
    
    if drop_specials:
        # Keep only alphanumeric and spaces
        text = ''.join(c if c.isalnum() or c.isspace() else ' ' for c in text)
    
    if collapse_repeats:
        # Collapse multiple spaces into single space
        import re
        text = re.sub(r'\s+', ' ', text).strip()
    
    return text

def generate_token_colors(tokens: List[str]) -> List[str]:
    """Generate colors for tokens"""
    colors = []
    for i, token in enumerate(tokens):
        hue = (i * 137.5) % 360  # Golden angle for good distribution
        colors.append(f"hsl({hue}, 70%, 50%)")
    return colors

def calculate_fingerprint(text: str, tokens: List[str], embedding: bool = False) -> Dict[str, Any]:
    """Fallback fingerprint when engine summary is unavailable."""
    try:
        content_id = _content_id(text)
        # Use engine's digital root semantics when possible
        try:
            sig = KT.digital_root_9(content_id)
            if embedding:
                sig = KT.digital_root_9(sig + 1)
        except Exception:
            sig = (content_id % 9) or 9
            if embedding:
                sig = ((sig + 1 - 1) % 9) + 1
        compat = content_id % 10
        text_value = sum(ord(c) for c in text) % 10000
        text_value_with_embedding = (text_value + (1 if embedding else 0)) % 10000
        return {
            "signatureDigit": int(sig),
            "compatDigit": int(compat),
            "textValue": int(text_value),
            "textValueWithEmbedding": int(text_value_with_embedding),
        }
    except Exception as e:
        print(f"Error calculating fingerprint: {e}")
        return {
            "signatureDigit": 0,
            "compatDigit": 0,
            "textValue": 0,
            "textValueWithEmbedding": 0,
        }

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "SanTOK API is running!",
        "version": "1.0.0",
        "available_tokenizers": list(TOKENIZERS.keys())
    }

@app.post("/tokenize", response_model=TokenizationResult)
async def tokenize_text(request: TokenizationRequest):
    """Tokenize text using the specified tokenizer"""
    try:
        start_time = time.time()
        
        # Preprocess text
        processed_text = preprocess_text(
            request.text, 
            request.lower, 
            request.drop_specials, 
            bool(request.collapse_repeats)
        )
        
        # Get tokenizer function
        if request.tokenizer_type not in TOKENIZERS:
            raise HTTPException(
                status_code=400, 
                detail=f"Unknown tokenizer type: {request.tokenizer_type}"
            )
        
        tokenizer_func = TOKENIZERS[request.tokenizer_type]
        
        # Tokenize
        tokens = tokenizer_func(processed_text)
        # Build engine digits using SanTOK core tokenizer streams
        seed = request.seed if request.seed is not None else 12345
        embedding_flag = bool(request.embedding_bit) or bool(request.embedding)
        try:
            engine = KT.TextTokenizer(seed, embedding_flag)
            streams = engine.build(processed_text)
            stream_name = _stream_name_for(request.tokenizer_type)
            ts = streams.get(stream_name)
            frontend_digits = [t.frontend for t in ts.tokens] if ts else []
            backend_scaled = [t.backend_scaled for t in ts.tokens] if ts else []
            content_ids = [t.content_id for t in ts.tokens] if ts else []
        except Exception:
            frontend_digits = []
            backend_scaled = []
            content_ids = []
        
        # Generate colors
        colors = generate_token_colors(tokens)
        
        # Create token objects
        token_objects = []
        min_len = min(len(tokens), len(frontend_digits)) if frontend_digits else len(tokens)
        for i in range(min_len):
            tok = tokens[i]
            token_text = tok if isinstance(tok, str) else tok.get('text', '')
            token_length = len(token_text) if isinstance(tok, str) else tok.get('length', len(token_text))
            position_val = i if isinstance(tok, str) else tok.get('index', i)
            token_obj = Token(
                text=token_text,
                # Expose engine digit as the visible ID so UI "IDs" view matches engine output
                id=(frontend_digits[i] if i < len(frontend_digits) else i),
                position=position_val,
                length=token_length,
                type=(tok.get('type', request.tokenizer_type) if isinstance(tok, dict) else request.tokenizer_type),
                color=colors[i] if i < len(colors) else colors[i % len(colors)]
            )
            token_objects.append(token_obj)
        
        # Calculate metrics
        processing_time = (time.time() - start_time) * 1000  # Convert to ms
        memory_usage = len(processed_text.encode('utf-8')) / 1024  # KB
        compression_ratio = len(tokens) / len(processed_text.split()) if processed_text.split() else 1.0
        
        # Calculate fingerprint
        try:
            # Use engine's summary so digits match CLI
            summary = KT.compute_text_value_summary(processed_text, embedding_flag)
            fingerprint = {
                "signatureDigit": summary.get("signature_digit", 0),
                "compatDigit": summary.get("compat_digit", 0),
                "textValue": summary.get("weighted_sum", 0),
                "textValueWithEmbedding": summary.get("final_digit", 0)
            }
        except Exception:
            fingerprint = calculate_fingerprint(processed_text, tokens, request.embedding)
        
        # Create result
        result = TokenizationResult(
            tokens=token_objects,
            tokenCount=len(token_objects),
            characterCount=len(processed_text),
            tokenizerType=request.tokenizer_type,
            processingTime=processing_time,
            memoryUsage=memory_usage,
            compressionRatio=compression_ratio,
            reversibility=True,  # All our tokenizers are reversible
            fingerprint=fingerprint,
            originalText=request.text,  # Include original text for comparison
            frontendDigits=frontend_digits if frontend_digits else None,
            backendScaled=backend_scaled if backend_scaled else None,
            contentIds=content_ids if content_ids else None,
        )
        
        return result
        
    except Exception as e:
        print(f"Tokenization error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze")
async def analyze_text(request: TokenizationRequest):
    """Analyze text and return detailed metrics"""
    try:
        # First tokenize
        tokenize_result = await tokenize_text(request)
        
        # Calculate additional analysis metrics
        analysis = {
            "tokenDistribution": {},
            "characterDistribution": {},
            "averageTokenLength": sum(len(token.text) for token in tokenize_result.tokens) / len(tokenize_result.tokens) if tokenize_result.tokens else 0,
            "uniqueTokens": len(set(token.text for token in tokenize_result.tokens)),
            "repetitionRate": 1 - (len(set(token.text for token in tokenize_result.tokens)) / len(tokenize_result.tokens)) if tokenize_result.tokens else 0
        }
        
        # Token distribution
        for token in tokenize_result.tokens:
            token_text = token.text
            if token_text in analysis["tokenDistribution"]:
                analysis["tokenDistribution"][token_text] += 1
            else:
                analysis["tokenDistribution"][token_text] = 1
        
        # Character distribution
        for char in request.text:
            if char in analysis["characterDistribution"]:
                analysis["characterDistribution"][char] += 1
            else:
                analysis["characterDistribution"][char] = 1
        
        return {
            "analysis": analysis,
            "metrics": {
                "processingTime": tokenize_result.processingTime,
                "memoryUsage": tokenize_result.memoryUsage,
                "compressionRatio": tokenize_result.compressionRatio
            },
            "fingerprint": tokenize_result.fingerprint
        }
        
    except Exception as e:
        print(f"Analysis error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/compress", response_model=List[CompressionAnalysis])
async def compress_text(request: TokenizationRequest):
    """Analyze compression using real engine metrics"""
    try:
        processed_text = preprocess_text(
            request.text,
            request.lower,
            request.drop_specials,
            bool(request.collapse_repeats),
        )
        stream_name = _stream_name_for(request.tokenizer_type)
        analysis = KT.analyze_compression_efficiency(processed_text, stream_name)
        methods = analysis.get("compression_methods", {}) if analysis else {}
        token_count = analysis.get("original_tokens", 0) if analysis else 0
        out: List[CompressionAnalysis] = []
        for method, stats in methods.items():
            ratio = float(stats.get("compression_ratio", 1.0))
            saved = int(stats.get("space_saved", 0))
            pct = float(stats.get("compression_percentage", 0.0))
            out.append(CompressionAnalysis(
                algorithm=method.capitalize(),
                compressionRatio=ratio,
                tokensSaved=saved,
                percentageSaved=pct if pct else ((saved / token_count) * 100 if token_count else 0.0),
                reversibility=bool(stats.get("is_reversible", True)),
            ))
        return out
    except Exception as e:
        print(f"Compression analysis error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/validate")
async def validate_tokenization(request: TokenizationRequest):
    """Validate tokenization reversibility using engine reconstruction"""
    try:
        processed_text = preprocess_text(
            request.text,
            request.lower,
            request.drop_specials,
            bool(request.collapse_repeats),
        )
        # Produce tokens with the same tokenizer the user selected
        tokenizer_func = TOKENIZERS.get(request.tokenizer_type)
        if tokenizer_func is None:
            raise HTTPException(status_code=400, detail=f"Unknown tokenizer type: {request.tokenizer_type}")
        tokens = tokenizer_func(processed_text)
        # Engine-aware reconstruction
        stream_name = _stream_name_for(request.tokenizer_type)
        reconstructed = KT.reconstruct_from_tokens(tokens, stream_name)
        is_valid = reconstructed == processed_text
        differences: List[str] = []
        if not is_valid:
            differences.append(f"Original length: {len(processed_text)}, Reconstructed length: {len(reconstructed)}")
            if len(processed_text) != len(reconstructed):
                differences.append("Length mismatch detected")
        return {
            "isValid": is_valid,
            "reversibility": is_valid,
            "reconstruction": reconstructed,
            "differences": differences,
        }
    except Exception as e:
        print(f"Validation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/decode")
async def decode_tokens(request: Dict[str, Any]):
    """Decode tokenized text back to original form"""
    try:
        tokens = request.get("tokens", [])
        tokenizer_type = request.get("tokenizer_type", "word")
        
        if not tokens:
            raise HTTPException(status_code=400, detail="No tokens provided")
        
        # Use the core tokenizer's reconstruction function
        decoded_text = KT.reconstruct_from_tokens(tokens, tokenizer_type)
        
        return {
            "decoded_text": decoded_text,
            "tokenizer_type": tokenizer_type,
            "token_count": len(tokens),
            "decoded_length": len(decoded_text)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Decoding failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting SanTOK API Server...")
    print("📡 Server will be available at: http://localhost:8000")
    print("📚 API Documentation at: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
