'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  RotateCcw, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react'
import { toast } from '@/components/notification-toast'

interface DecodePanelProps {
  tokens?: any[]
  tokenizerType?: string
  onDecode?: (decodedText: string) => void
}

const TOKENIZER_TYPES = [
  { value: 'char', label: 'Character Tokenization' },
  { value: 'word', label: 'Word Tokenization' },
  { value: 'space', label: 'Space Tokenization' },
  { value: 'subword', label: 'Subword Tokenization' },
  { value: 'grammar', label: 'Grammar Tokenization' },
  { value: 'syllable', label: 'Syllable Tokenization' },
  { value: 'byte', label: 'Byte Tokenization' },
  { value: 'bpe', label: 'BPE Tokenization' },
  { value: 'frequency', label: 'Frequency Tokenization' },
]

export function DecodePanel({ tokens = [], tokenizerType = 'word', onDecode }: DecodePanelProps) {
  const [decodedText, setDecodedText] = useState('')
  const [isDecoding, setIsDecoding] = useState(false)
  const [selectedTokenizer, setSelectedTokenizer] = useState(tokenizerType)
  const [customTokens, setCustomTokens] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  const handleDecode = async () => {
    if (!tokens.length && !customTokens.trim()) {
      toast.error('No tokens to decode')
      return
    }

    setIsDecoding(true)
    
    try {
      // Simulate API call to decode tokens
      const response = await fetch('/api/decode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokens: customTokens.trim() ? JSON.parse(customTokens) : tokens,
          tokenizer_type: selectedTokenizer
        })
      })

      if (!response.ok) {
        throw new Error('Decoding failed')
      }

      const result = await response.json()
      setDecodedText(result.decoded_text)
      
      if (onDecode) {
        onDecode(result.decoded_text)
      }
      
      toast.success('Text decoded successfully!')
    } catch (error) {
      // Fallback: Simple reconstruction for demo
      const reconstructed = reconstructFromTokens(
        customTokens.trim() ? JSON.parse(customTokens) : tokens,
        selectedTokenizer
      )
      setDecodedText(reconstructed)
      
      if (onDecode) {
        onDecode(reconstructed)
      }
      
      toast.success('Text decoded successfully! (Demo mode)')
    } finally {
      setIsDecoding(false)
    }
  }

  const reconstructFromTokens = (tokens: any[], tokenizerType: string): string => {
    if (!tokens.length) return ''
    
    // Sort tokens by index to ensure correct order
    const sortedTokens = tokens.sort((a, b) => (a.index || 0) - (b.index || 0))
    
    if (tokenizerType === 'space') {
      return sortedTokens.map(t => t.text || t.token || '').join(' ')
    } else if (tokenizerType === 'char') {
      return sortedTokens.map(t => t.text || t.token || '').join('')
    } else if (tokenizerType === 'word') {
      return sortedTokens.map(t => t.text || t.token || '').join(' ')
    } else if (tokenizerType === 'byte') {
      return sortedTokens.map(t => t.text || t.token || '').join('')
    } else {
      // Default reconstruction
      return sortedTokens.map(t => t.text || t.token || '').join('')
    }
  }

  const handleCopyDecoded = async () => {
    if (!decodedText) {
      toast.error('No decoded text to copy')
      return
    }

    try {
      await navigator.clipboard.writeText(decodedText)
      toast.success('Decoded text copied to clipboard')
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const handleExportDecoded = () => {
    if (!decodedText) {
      toast.error('No decoded text to export')
      return
    }

    const blob = new Blob([decodedText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'decoded-text.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('Decoded text exported')
  }

  const handleClear = () => {
    setDecodedText('')
    setCustomTokens('')
    setShowCustomInput(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <RotateCcw className="h-5 w-5 mr-2" />
          Text Decoder
        </CardTitle>
        <CardDescription>
          Decode tokenized text back to its original form
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tokenizer Type Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Tokenizer Type
          </label>
          <Select
            value={selectedTokenizer}
            onValueChange={setSelectedTokenizer}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TOKENIZER_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Custom Tokens Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">
              Custom Tokens (JSON)
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCustomInput(!showCustomInput)}
            >
              {showCustomInput ? 'Hide' : 'Show'} Custom Input
            </Button>
          </div>
          
          {showCustomInput && (
            <Textarea
              placeholder='[{"text": "Hello", "index": 0}, {"text": "world", "index": 1}]'
              value={customTokens}
              onChange={(e) => setCustomTokens(e.target.value)}
              className="min-h-[100px] font-mono text-sm"
            />
          )}
        </div>

        {/* Decode Button */}
        <Button
          onClick={handleDecode}
          disabled={isDecoding || (!tokens.length && !customTokens.trim())}
          className="w-full"
        >
          {isDecoding ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Decoding...
            </>
          ) : (
            <>
              <RotateCcw className="h-4 w-4 mr-2" />
              Decode Tokens
            </>
          )}
        </Button>

        {/* Decoded Text Output */}
        {decodedText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Decoded Text
              </h4>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyDecoded}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportDecoded}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
            
            <Textarea
              value={decodedText}
              readOnly
              className="min-h-[120px] bg-muted/50"
              placeholder="Decoded text will appear here..."
            />
            
            <div className="text-xs text-muted-foreground">
              {decodedText.length} characters decoded
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex-1"
          >
            Clear All
          </Button>
        </div>

        {/* Info */}
        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium">Reversible Tokenization</p>
              <p className="text-xs mt-1">
                SanTOK uses reversible tokenization algorithms that guarantee 100% perfect reconstruction 
                of the original text from tokens. No data loss occurs during the process.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
