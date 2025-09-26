export interface Token {
  text: string
  id: number
  position: number
  length: number
  type?: string
  color?: string
}

export interface TokenizationResult {
  tokens: Token[]
  tokenCount: number
  characterCount: number
  tokenizerType: string
  processingTime: number
  memoryUsage: number
  compressionRatio?: number
  reversibility?: boolean
  originalText?: string  // Include original text for comparison
  fingerprint?: {
    signatureDigit: number
    compatDigit: number
    textValue: number
    textValueWithEmbedding: number
  }
  // Optional fields returned by backend_server to mirror engine values
  frontendDigits?: number[]
  backendScaled?: number[]
  contentIds?: number[]
}

export interface CompressionAnalysis {
  algorithm: string
  compressionRatio: number
  tokensSaved: number
  percentageSaved: number
  reversibility: boolean
}

export interface PerformanceMetrics {
  processingTime: number
  memoryUsage: number
  tokenCount: number
  compressionRatio: number
  timestamp: number
}

export interface TokenizerOptions {
  tokenizerType: 'char' | 'word' | 'space' | 'subword' | 'grammar' | 'syllable' | 'byte' | 'bpe' | 'frequency'
  lowercase: boolean
  dropSpecials: boolean
  collapseRepeats: number
  enableEmbedding: boolean
  seed?: number
  embeddingBit?: number
}

export interface FileUpload {
  file: File
  content: string
  type: string
  size: number
}

export interface ComparisonResult {
  tokenizer1: TokenizationResult
  tokenizer2: TokenizationResult
  differences: {
    tokenCountDiff: number
    compressionDiff: number
    timeDiff: number
  }
}

export interface SearchResult {
  token: Token
  position: number
  context: string
}

export interface VectorSearchResult {
  token: Token
  similarity: number
  cluster: number
}

export type Page = 'dashboard' | 'compression' | 'performance' | 'about'
export type ViewMode = 'text' | 'tokens' | 'ids'
export type Theme = 'light' | 'dark' | 'system'
