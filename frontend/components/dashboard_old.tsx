'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { tokenizeText, getMockTokenizationResult } from '@/lib/api'
import { TokenizationResult, TokenizerOptions } from '@/types'
import { 
  Play, 
  Download, 
  Copy, 
  Upload, 
  FileText,
  BarChart3,
  Zap,
  Settings,
  AlertCircle
} from 'lucide-react'

export function Dashboard() {
  const [text, setText] = useState('')
  const [method, setMethod] = useState('whitespace')
  const [result, setResult] = useState<TokenizationResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'tokens' | 'text' | 'ids'>('tokens')

  const handleTokenize = async () => {
    if (!text.trim()) return

    setIsProcessing(true)
    setError(null)
    
    try {
      const options: TokenizerOptions = {
        tokenizerType: method as any,
        lowercase: false,
        dropSpecials: false,
        collapseRepeats: 1,
        enableEmbedding: false,
        seed: undefined,
        embeddingBit: undefined,
      }

      let tokenizationResult: TokenizationResult
      
      try {
        // Try real API first
        tokenizationResult = await tokenizeText(text, options)
      } catch (apiError) {
        console.warn('API not available, using mock data:', apiError)
        // Fallback to mock data if API is not available
        tokenizationResult = getMockTokenizationResult(text, options)
      }
      
      setResult(tokenizationResult)
    } catch (error: any) {
      console.error('Tokenization error:', error)
      setError(error.message || 'An error occurred during tokenization')
    } finally {
      setIsProcessing(false)
    }
  }

  const copyTokens = () => {
    if (result?.tokens) {
      const tokenTexts = result.tokens.map(token => typeof token === 'string' ? token : token.text)
      navigator.clipboard.writeText(tokenTexts.join(' '))
    }
  }

  const downloadTokens = () => {
    if (result?.tokens) {
      const tokenTexts = result.tokens.map(token => typeof token === 'string' ? token : token.text)
      const blob = new Blob([tokenTexts.join('\n')], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'tokens.txt'
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
            <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Tokenize your text with SanTOK's powerful algorithms
              </p>
            </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Zap className="h-3 w-3" />
            <span>Live Mode</span>
            </Badge>
          </div>
        </div>
        
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
          <Card>
            <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Input Text</span>
              </CardTitle>
              <CardDescription>
              Enter your text to tokenize using SanTOK algorithms
              </CardDescription>
            </CardHeader>
          <CardContent className="space-y-4">
                <Textarea
              placeholder="Enter your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Tokenization Method</label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whitespace">Whitespace</SelectItem>
                    <SelectItem value="word">Word</SelectItem>
                    <SelectItem value="character">Character</SelectItem>
                    <SelectItem value="subword">Subword</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleTokenize} 
                disabled={!text.trim() || isProcessing}
                className="mt-6"
              >
                <Play className="h-4 w-4 mr-2" />
                {isProcessing ? 'Processing...' : 'Tokenize'}
              </Button>
              </div>
            </CardContent>
          </Card>

        {/* Results Section */}
            <Card>
              <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Results</span>
            </CardTitle>
            <CardDescription>
              Tokenized output and statistics
            </CardDescription>
              </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
                </div>
            )}
            
            {result ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tokens ({result.tokenCount})</span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={copyTokens}>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadTokens}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                  </Button>
                    </div>
                </div>

                  {/* View Mode Selector */}
                  <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                    <Button
                      variant={viewMode === 'tokens' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('tokens')}
                      className="text-xs"
                    >
                      Tokens
                    </Button>
                    <Button
                      variant={viewMode === 'text' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('text')}
                      className="text-xs"
                    >
                      Text
                    </Button>
                    <Button
                      variant={viewMode === 'ids' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('ids')}
                      className="text-xs"
                    >
                      IDs
                    </Button>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 max-h-[300px] overflow-y-auto">
                    {viewMode === 'tokens' && (
                      <div className="flex flex-wrap gap-2">
                        {result.tokens.map((token, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {typeof token === 'string' ? token : token.text}
                          </Badge>
                        ))}
                </div>
                    )}
                    
                    {viewMode === 'text' && (
                      <div className="font-mono text-sm">
                        {result.tokens.map((token, index) => (
                          <span key={index} className="mr-1">
                            {typeof token === 'string' ? token : token.text}
                          </span>
                        ))}
                </div>
                    )}
                    
                    {viewMode === 'ids' && (
                      <div className="flex flex-wrap gap-2">
                        {result.tokens.map((token, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {index}: {typeof token === 'string' ? token : token.text}
                          </Badge>
                        ))}
              </div>
          )}
            </div>
          </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{result.tokenCount}</div>
                    <div className="text-sm text-muted-foreground">Total Tokens</div>
              </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {result.characterCount > 0 ? (result.characterCount / result.tokenCount).toFixed(1) : '0'}
            </div>
                    <div className="text-sm text-muted-foreground">Chars/Token</div>
            </div>
          </div>
          
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{result.processingTime.toFixed(1)}ms</div>
                    <div className="text-xs text-muted-foreground">Processing Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{((result.compressionRatio || 0) * 100).toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Compression</div>
                        </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-600">
                      {result.reversibility ? '✓' : '✗'}
                      </div>
                    <div className="text-xs text-muted-foreground">Reversible</div>
                      </div>
                    </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No tokens generated yet</p>
                <p className="text-sm">Enter text and click Tokenize to get started</p>
            </div>
            )}
              </CardContent>
            </Card>
          </div>

      {/* Quick Actions */}
            <Card>
              <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
              </CardHeader>
              <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload File
                          </Button>
                          <Button
                            variant="outline"
              onClick={() => setText("The quick brown fox jumps over the lazy dog. This is a sample text for tokenization testing.")}
                          >
              <FileText className="h-4 w-4 mr-2" />
              Load Sample
                          </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Advanced Settings
                    </Button>
                  </div>
              </CardContent>
            </Card>
    </div>
  )
}
