import { Token, TokenizationResult } from '@/types'

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const formatTime = (milliseconds: number): string => {
  if (milliseconds < 1000) {
    return `${Math.round(milliseconds)}ms`
  } else if (milliseconds < 60000) {
    return `${(milliseconds / 1000).toFixed(2)}s`
  } else {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = ((milliseconds % 60000) / 1000).toFixed(1)
    return `${minutes}m ${seconds}s`
  }
}

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`
}

export const generateTokenColors = (tokenCount: number): string[] => {
  const colors: string[] = []
  const hueStep = 360 / Math.max(tokenCount, 1)
  
  for (let i = 0; i < tokenCount; i++) {
    const hue = (i * hueStep) % 360
    const saturation = 70 + (i % 3) * 10 // Vary saturation slightly
    const lightness = 50 + (i % 2) * 10 // Vary lightness slightly
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
  }
  
  return colors
}

export const calculateCompressionEfficiency = (original: number, compressed: number): number => {
  if (original === 0) return 0
  return (original - compressed) / original
}

export const calculateTokenDensity = (tokens: Token[], textLength: number): number => {
  if (textLength === 0) return 0
  return tokens.length / textLength
}

export const findTokenById = (tokens: Token[], id: number): Token | undefined => {
  return tokens.find(token => token.id === id)
}

export const searchTokens = (tokens: any[], query: string): any[] => {
  if (!query.trim()) return tokens
  
  const lowercaseQuery = query.toLowerCase()
  return tokens.filter(token => {
    const tokenText = typeof token === 'string' ? token : (token?.text || String(token))
    return tokenText.toLowerCase().includes(lowercaseQuery)
  })
}

export const exportToJSON = (data: any, filename: string = 'tokenization-result.json'): void => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const exportToCSV = (tokens: Token[], filename: string = 'tokens.csv'): void => {
  const headers = ['ID', 'Text', 'Position', 'Length', 'Type']
  const rows = tokens.map(token => [
    token.id,
    `"${token.text}"`,
    token.position,
    token.length,
    token.type || 'unknown'
  ])
  
  const csvContent = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const result = document.execCommand('copy')
      document.body.removeChild(textArea)
      return result
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11)
}

export const validateTextInput = (text: string): { isValid: boolean; error?: string } => {
  if (!text.trim()) {
    return { isValid: false, error: 'Text cannot be empty' }
  }
  
  if (text.length > 1000000) {
    return { isValid: false, error: 'Text is too long (max 1MB)' }
  }
  
  return { isValid: true }
}

export const calculateSimilarity = (text1: string, text2: string): number => {
  const longer = text1.length > text2.length ? text1 : text2
  const shorter = text1.length > text2.length ? text2 : text1
  
  if (longer.length === 0) return 1.0
  
  const editDistance = levenshteinDistance(longer, shorter)
  return (longer.length - editDistance) / longer.length
}

const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null))
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      )
    }
  }
  
  return matrix[str2.length][str1.length]
}
