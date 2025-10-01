import axios from 'axios'
import { TokenizationResult, TokenizerOptions, CompressionAnalysis } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 5 minutes for massive files - NO LIMITS!
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('API Response Error:', error)
    if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.')
    } else if (error.response?.status === 400) {
      throw new Error(error.response.data?.detail || 'Invalid request.')
    } else if (error.response?.status === 404) {
      throw new Error('API endpoint not found. Please check your configuration.')
    } else if (error.response?.status === 429) {
      throw new Error('Too many requests. Please wait a moment and try again.')
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.')
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to server. Please check if the backend is running.')
    } else {
      throw new Error('Network error. Please check your connection.')
    }
  }
)

export const tokenizeText = async (
  text: string,
  options: TokenizerOptions
): Promise<TokenizationResult> => {
  try {
    console.log('Making API request to:', API_BASE_URL + '/tokenize')
    console.log('Request payload:', {
      text,
      tokenizer_type: options.tokenizerType,
      lower: options.lowercase,
      drop_specials: options.dropSpecials,
      collapse_repeats: options.collapseRepeats,
      embedding: options.enableEmbedding,
      seed: options.seed,
      embedding_bit: options.embeddingBit,
    })
    
    const response = await api.post('/tokenize', {
      text,
      tokenizer_type: options.tokenizerType,
      lower: options.lowercase,
      drop_specials: options.dropSpecials,
      collapse_repeats: options.collapseRepeats,
      embedding: options.enableEmbedding,
      seed: options.seed,
      embedding_bit: options.embeddingBit,
    })
    
    console.log('API response received:', response.data)
    return response.data
  } catch (error: any) {
    console.error('Tokenization error details:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      baseURL: error.config?.baseURL
    })
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try with shorter text.')
    }
    throw error
  }
}

export const analyzeText = async (
  text: string,
  options: TokenizerOptions
): Promise<{
  analysis: any
  metrics: any
  fingerprint: any
}> => {
  try {
    const response = await api.post('/analyze', {
      text,
      tokenizer_type: options.tokenizerType,
      lower: options.lowercase,
      drop_specials: options.dropSpecials,
      collapse_repeats: options.collapseRepeats,
      embedding: options.enableEmbedding,
      seed: options.seed,
      embedding_bit: options.embeddingBit,
    })
    
    return response.data
  } catch (error) {
    console.error('Analysis error:', error)
    throw error
  }
}

export const compressText = async (
  text: string,
  options: TokenizerOptions
): Promise<CompressionAnalysis[]> => {
  try {
    const response = await api.post('/compress', {
      text,
      tokenizer_type: options.tokenizerType,
      lower: options.lowercase,
      drop_specials: options.dropSpecials,
      collapse_repeats: options.collapseRepeats,
      embedding: options.enableEmbedding,
      seed: options.seed,
      embedding_bit: options.embeddingBit,
    })
    
    return response.data
  } catch (error) {
    console.error('Compression error:', error)
    throw error
  }
}

export const validateTokenization = async (
  originalText: string,
  tokens: any[],
  options: TokenizerOptions
): Promise<{
  isValid: boolean
  reversibility: boolean
  reconstruction: string
  differences: string[]
}> => {
  try {
    const response = await api.post('/validate', {
      original_text: originalText,
      tokens,
      tokenizer_type: options.tokenizerType,
      lower: options.lowercase,
      drop_specials: options.dropSpecials,
      collapse_repeats: options.collapseRepeats,
      embedding: options.enableEmbedding,
      seed: options.seed,
      embedding_bit: options.embeddingBit,
    })
    
    return response.data
  } catch (error) {
    console.error('Validation error:', error)
    throw error
  }
}

// Mock data for development when API is not available
export const getMockTokenizationResult = (
  text: string,
  options: TokenizerOptions
): TokenizationResult => {
  let tokens: any[] = []
  
  switch (options.tokenizerType) {
    case 'space':
      tokens = text.split(/\s+/).filter(token => token.length > 0)
      break
    case 'word':
      // Split on word boundaries, keeping punctuation
      tokens = text.split(/(\W+)/).filter(token => token.length > 0)
      break
    case 'char':
      tokens = text.split('')
      break
    case 'grammar':
      // Grammar-aware tokenization - split on sentence boundaries
      tokens = text.split(/([.!?]+)/).filter(token => token.length > 0)
      break
    case 'subword':
      // Simple subword tokenization - split on common separators
      tokens = text.split(/([\/_\-\.])/).filter(token => token.length > 0)
      break
    case 'bpe':
      // Byte Pair Encoding simulation
      tokens = text.match(/.{1,3}/g) || []
      break
    case 'syllable':
      // Syllable-based tokenization simulation
      tokens = text.split(/([aeiouAEIOU]+)/).filter(token => token.length > 0)
      break
    case 'frequency':
      // Frequency-based tokenization simulation
      tokens = text.split(/([a-zA-Z]+)/).filter(token => token.length > 0)
      break
    case 'byte':
      // Byte-level tokenization
      tokens = Array.from(text).map(char => char.charCodeAt(0).toString())
      break
    default:
      tokens = text.split(/\s+/).filter(token => token.length > 0)
  }

  const tokenObjects = tokens.map((token, index) => ({
    text: token,
    id: index,
    position: text.indexOf(token),
    length: token.length,
    type: options.tokenizerType,
    color: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
  }))

  return {
    tokens: tokenObjects,
    tokenCount: tokenObjects.length,
    characterCount: text.length,
    tokenizerType: options.tokenizerType,
    processingTime: Math.random() * 100 + 50,
    memoryUsage: Math.random() * 1024 + 512,
    compressionRatio: Math.random() * 0.5 + 0.3,
    reversibility: true,
    fingerprint: {
      signatureDigit: Math.floor(Math.random() * 10),
      compatDigit: Math.floor(Math.random() * 10),
      textValue: Math.floor(Math.random() * 10000),
      textValueWithEmbedding: Math.floor(Math.random() * 10000),
    },
  }
}

export const getMockCompressionAnalysis = (): CompressionAnalysis[] => [
  {
    algorithm: 'RLE',
    compressionRatio: 0.45,
    tokensSaved: 120,
    percentageSaved: 35.2,
    reversibility: true,
  },
  {
    algorithm: 'Pattern',
    compressionRatio: 0.38,
    tokensSaved: 145,
    percentageSaved: 42.1,
    reversibility: true,
  },
  {
    algorithm: 'Frequency',
    compressionRatio: 0.52,
    tokensSaved: 98,
    percentageSaved: 28.7,
    reversibility: true,
  },
  {
    algorithm: 'Adaptive',
    compressionRatio: 0.31,
    tokensSaved: 178,
    percentageSaved: 51.8,
    reversibility: true,
  },
]
