# SanTOK

Advanced, reversible tokenization with multi‑algorithm support, compression analysis, and a modern web UI.

## TL;DR

- CLI: `python core_tokenizer.py`
- Lightweight HTTP API (std‑lib only): `py lightweight_server.py` → `http://localhost:8000`
- Main FastAPI Server (full features): `py main_server.py` (requires FastAPI/Uvicorn)
- Frontend: `cd frontend && npm i && npm run dev` → `http://localhost:3000`

The API returns engine digits so the UI IDs view matches the CLI output.

---

## Requirements

- Python 3.10+ (tested on 3.13)
- Node.js 18+ (Next.js 14)

Optional (FastAPI backend):
- `pip install fastapi uvicorn pydantic`

---

## Project Structure

```
Krisna Tokenization/
├── frontend/                     # Next.js 14 + TypeScript web UI
├── main_server.py                # Main FastAPI server (full feature set)
├── lightweight_server.py         # Lightweight HTTP server (std‑lib only)
├── core_tokenizer.py             # Core tokenization engine & CLI
├── base_tokenizer.py, compression_algorithms.py   # Tokenization & compression primitives
├── tests/, docs/, examples/      # Tests, docs, demos
└── ...
```

---

## Quick Start

### A) CLI (no deps)
```bash
python core_tokenizer.py
```

### B) Simple HTTP API (std‑lib only)
```bash
py lightweight_server.py
# → http://localhost:8000
```

### C) FastAPI API (recommended for dev)
```bash
pip install fastapi uvicorn pydantic
py main_server.py
# → http://localhost:8000 (docs at /docs)
```

### D) Frontend (Next.js)
```bash
cd frontend
npm install
# (optional) echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local
npm run dev
# Open http://localhost:3000
```

---

## API Overview

Base URL: `http://localhost:8000`

All endpoints accept JSON like:
```json
{
  "text": "Hello World",
  "tokenizer_type": "word",
  "lower": false,
  "drop_specials": false,
  "collapse_repeats": 1,
  "embedding": false,
  "seed": 12345,
  "embedding_bit": 0
}
```

### POST /tokenize
Returns token objects and engine vectors.

Response (truncated):
```json
{
  "tokens": [{"text":"Hello","id":7,"position":0,"length":5,"type":"word"}, ...],
  "frontendDigits": [7,3,9,...],
  "backendScaled": [12345, 67890, ...],
  "contentIds": [1542, 9981, ...],
  "tokenCount": 68,
  "characterCount": 342,
  "tokenizerType": "word"
}
```

> The web UI’s “IDs” view reads `frontendDigits` so it matches the CLI’s per‑token 1..9 sequence. If you see `0,1,2...`, your backend isn’t returning `frontendDigits` (see Troubleshooting).

### POST /compress
Runs real compression analysis (RLE/Pattern/Frequency/Adaptive) using the engine and returns ratios, reversibility flags, and tokens saved.

### POST /validate
Performs tokenizer‑aware reconstruction via `reconstruct_from_tokens` and reports `isValid`/differences.

---

## Frontend Notes

- Env: `NEXT_PUBLIC_API_URL` (default `http://localhost:8000`)
- Token Preview → IDs view prefers `frontendDigits`; falls back to token.id only if absent.
- Large inputs: UI applies lightweight guards and progress feedback.

---

## Troubleshooting

### Token IDs show `0..N`
- Ensure you are running the updated backend (`simple_backend.py` or `backend_server.py`).
- Call `/tokenize` and verify the response includes `frontendDigits`.
- Hard refresh the browser (Ctrl+F5).

### PowerShell JSON quoting error
If you curl from PowerShell, escape quotes or use Invoke‑WebRequest properly:
```powershell
(Invoke-WebRequest -UseBasicParsing -Uri http://localhost:8000/tokenize -Method POST -ContentType application/json -Body '{"text":"Hello","tokenizer_type":"word"}').Content
```

### 403 pushing to GitHub (wrong cached credentials)
Open Windows Credential Manager and remove `github.com` entries, then push. Or force push after `git fetch`:
```cmd
git fetch origin
git push -u origin main --force-with-lease
```

### Normalize line endings (Windows)
```bash
echo * text=auto > .gitattributes
git add .gitattributes && git commit -m "Normalize line endings" && git push
```

---

## Supported Tokenizers (engine)

- space, word, char, grammar
- subword (fixed), subword_bpe, subword_syllable, subword_frequency
- byte

Each stream exposes:
- frontend digit (1..9, seed/neighbor/embedding‑aware)
- backend number (scaled & huge), content id, deterministic index

---

## Development Tips

- Prefer the FastAPI backend during development for interactive docs and strict validation.
- The simple HTTP server is std‑lib only and now mirrors the engine digits.
- UI and API are decoupled via `NEXT_PUBLIC_API_URL`.

---

## License

MIT — see `LICENSE`.

---

Made with care for stability, reversibility, and real‑time analysis.

---

## Extended Documentation

### 1) Architecture (Sequence)

```text
User → Frontend (/tokenize) → Backend (simple/FastAPI) → SanTOK_tokenizer
     ←      JSON (tokens, frontendDigits, backendScaled, fingerprint) ←
```

- The backend always delegates to `SanTOK_tokenizer.TextTokenizer(seed, embedding)` to compute:
  - `frontendDigits` (1..9)
  - `backendScaled` (per‑token scaled integers)
  - `contentIds` (deterministic)

### 2) Endpoint Schemas

Common Request (JSON):
```json
{
  "text": "string",
  "tokenizer_type": "space|word|char|grammar|subword|bpe|syllable|frequency|byte",
  "lower": false,
  "drop_specials": false,
  "collapse_repeats": 1,
  "embedding": false,
  "seed": 12345,
  "embedding_bit": 0
}
```

`/tokenize` Response (schema excerpt):
```json
{
  "tokens": [
    {
      "text": "string",
      "id": 1,
      "position": 0,
      "length": 5,
      "type": "word",
      "color": "hsl(...)"
    }
  ],
  "tokenCount": 0,
  "characterCount": 0,
  "tokenizerType": "word",
  "processingTime": 0,
  "memoryUsage": 0,
  "compressionRatio": 0,
  "reversibility": true,
  "fingerprint": {
    "signatureDigit": 7,
    "compatDigit": 3,
    "textValue": 1234,
    "textValueWithEmbedding": 8
  },
  "frontendDigits": [1,2,3],
  "backendScaled": [12345],
  "contentIds": [1542]
}
```

### 3) Engine Math (Intuition)

For each token text `t` at position `i`:
- compute weighted char sum (run‑aware if collapse=1)
- add position and alphabetic sums
- XOR with deterministic UID (seeded), add neighbor UIDs, embedding bit
- fold to 1..9 with a 9‑centric digital root → frontend digit

This makes digits stable, deterministic, and context‑aware.

### 4) Docker (examples)

FastAPI backend `Dockerfile` (example):
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir fastapi uvicorn pydantic
EXPOSE 8000
CMD ["python", "backend_server.py"]
```

Frontend `Dockerfile` (example):
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY frontend ./
RUN npm ci && npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app .
ENV NEXT_PUBLIC_API_URL=http://localhost:8000
EXPOSE 3000
CMD ["npm", "start"]
```

Compose (example):
```yaml
version: "3.8"
services:
  api:
    build: .
    ports: ["8000:8000"]
  web:
    build:
      context: ./frontend
    environment:
      - NEXT_PUBLIC_API_URL=http://api:8000
    ports: ["3000:3000"]
    depends_on: [api]
```

### 5) CI (GitHub Actions)

`.github/workflows/ci.yml` (starter):
```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 18 }
      - run: cd frontend && npm ci && npm run build
      - uses: actions/setup-python@v5
        with: { python-version: '3.11' }
      - run: python -m py_compile SanTOK_tokenizer.py tokenizer.py token_math.py
```

### 6) Developer Workflow

```bash
git checkout -b feat/<name>
# commit with conventional message
git commit -m "feat(api): add engine digits to response"
git push -u origin HEAD
```

### 7) Security & Limits
- The simple server is stdlib only; validate inputs before exposing publicly.
- Consider request size limits on `/tokenize` and `/analyze`.

### 8) Support
- Issues: GitHub Issues tab
- Docs: `docs/` directory

