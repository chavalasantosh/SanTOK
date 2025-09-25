'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { 
  Play, 
  Download, 
  Copy, 
  Upload, 
  FileText,
  BarChart3,
  Zap,
  Settings,
  Eye,
  EyeOff,
  Search
} from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { getMockTokenizationResult, getMockCompressionAnalysis } from '@/lib/api'
import { formatBytes, formatTime, formatPercentage, generateTokenColors, exportToJSON, exportToCSV, copyToClipboard } from '@/utils'
import { TokenPreview } from '@/components/token-preview'
import { MetricsPanel } from '@/components/metrics-panel'
import { CompressionStats } from '@/components/compression-stats'
import { PerformanceMetrics } from '@/components/performance-metrics'
import { FingerprintPanel } from '@/components/fingerprint-panel'
import { FileUpload } from '@/components/file-upload'
import { HelpTooltip } from '@/components/help-tooltip'
import { DecodePanel } from '@/components/decode-panel'
import { toast } from '@/components/notification-toast'
import { tokenizeText, compressText } from '@/lib/api'

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

export function Dashboard() {
  const {
    currentResult,
    setCurrentResult,
    tokenizerOptions,
    setTokenizerOptions,
    viewMode,
    setViewMode,
    liveMode,
    isProcessing,
    setIsProcessing,
    error,
    setError,
    searchQuery,
    setSearchQuery
  } = useAppStore()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const [text, setText] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [compressionAnalysis, setCompressionAnalysis] = useState<any[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const handleTokenize = useCallback(async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to tokenize')
      return
    }

    // Limit text length to prevent timeouts
    if (text.length > 10000) {
      toast.error('Text too long! Please use text under 10,000 characters')
      return
    }

    setIsProcessing(true)
    setIsAnalyzing(true)
    setError(null)
    setAnalysisProgress(0)

    try {
      // Simulate progressive analysis
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      // Use real API
      const result = await tokenizeText(text, tokenizerOptions)
      const compression = await compressText(text, tokenizerOptions)
      
      // Complete the progress
      setTimeout(() => {
        setAnalysisProgress(100)
        setCurrentResult(result)
        setCompressionAnalysis(compression)
        clearInterval(progressInterval)
        setIsAnalyzing(false)
        toast.success('Text tokenized successfully!')
      }, 1000)
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Tokenization failed'
      setError(errorMessage)
      toast.error(errorMessage)
      setIsAnalyzing(false)
    } finally {
      setIsProcessing(false)
    }
  }, [text, tokenizerOptions, setCurrentResult, setCompressionAnalysis, setError, setIsProcessing, setIsAnalyzing, setAnalysisProgress])

  // Live mode effect
  useEffect(() => {
    if (liveMode && text.trim()) {
      const timeoutId = setTimeout(() => {
        handleTokenize()
      }, 1000) // Debounce for 1 second

      return () => clearTimeout(timeoutId)
    }
  }, [text, tokenizerOptions, liveMode, handleTokenize])

  const handleClear = () => {
    setText('')
    setCurrentResult(null)
    setCompressionAnalysis([])
    setError(null)
  }

  const handleExample = () => {
    const exampleText = `Hello, I'm a data scientist. I hold a B.Tech in Artificial Intelligence and Data Science, and my career has been a blend of Data Engineering, BI Development, and AI Engineering. I started out as a Data Engineer and Data Analyst, where I designed ETL pipelines and provided BI teams with structured, high-quality data. I also worked as a BI Developer, creating dashboards in Tableau and Power BI that helped business stakeholders make data-driven decisions.`
    setText(exampleText)
  }

  const handleExport = (format: 'json' | 'csv') => {
    if (!currentResult) {
      toast.error('No results to export')
      return
    }

    if (format === 'json') {
      exportToJSON(currentResult, 'tokenization-result.json')
      toast.success('Results exported as JSON')
    } else {
      exportToCSV(currentResult.tokens, 'tokens.csv')
      toast.success('Results exported as CSV')
    }
  }

  // Show loading state while mounting
  if (!mounted) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-muted animate-pulse rounded-lg" />
            <div className="h-32 bg-muted animate-pulse rounded-lg" />
          </div>
          <div className="space-y-6">
            <div className="h-32 bg-muted animate-pulse rounded-lg" />
            <div className="h-48 bg-muted animate-pulse rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  const handleCopyResults = async () => {
    if (!currentResult) {
      toast.error('No results to copy')
      return
    }

    const resultsText = JSON.stringify(currentResult, null, 2)
    const success = await copyToClipboard(resultsText)
    
    if (success) {
      toast.success('Results copied to clipboard')
    } else {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Advanced text tokenization with multiple algorithms and real-time analysis
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs sm:text-sm"
          >
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{showAdvanced ? 'Hide' : 'Show'} Advanced</span>
            <span className="sm:hidden">Advanced</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Left Column - Input */}
        <div className="xl:col-span-1 space-y-4 lg:space-y-6">
          {/* Text Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Text Input
              </CardTitle>
              <CardDescription>
                Enter text or upload a file to tokenize
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileUpload onFileSelect={(content) => setText(content)} />
              
              <div className="space-y-2">
                <Textarea
                  placeholder="Enter text to tokenize..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[150px] sm:min-h-[200px] resize-none text-sm sm:text-base"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{text.length} characters</span>
                  {text.length > 10000 && (
                    <span className="text-destructive">Text too long! Max 10,000 characters</span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                <Button onClick={handleExample} variant="outline" size="sm" className="w-full sm:w-auto">
                  Show Example
                </Button>
                <Button onClick={handleClear} variant="outline" size="sm" className="w-full sm:w-auto">
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tokenizer Options */}
          <Card>
            <CardHeader>
              <CardTitle>Tokenizer Options</CardTitle>
              <CardDescription>
                Configure how text should be tokenized
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <label className="text-sm font-medium">
                    Tokenizer Type
                  </label>
                  <HelpTooltip content="Choose the algorithm for tokenizing your text. Each algorithm has different characteristics and use cases." />
                </div>
                <Select
                  value={tokenizerOptions.tokenizerType}
                  onValueChange={(value: 'char' | 'word' | 'space' | 'subword' | 'grammar' | 'syllable' | 'byte' | 'bpe' | 'frequency') => 
                    setTokenizerOptions({ tokenizerType: value })
                  }
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

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="lowercase"
                    checked={tokenizerOptions.lowercase}
                    onCheckedChange={(checked: boolean) =>
                      setTokenizerOptions({ lowercase: !!checked })
                    }
                    className="mt-0.5"
                  />
                  <label htmlFor="lowercase" className="text-sm font-medium leading-5">
                    Lowercase text
                  </label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="dropSpecials"
                    checked={tokenizerOptions.dropSpecials}
                    onCheckedChange={(checked: boolean) =>
                      setTokenizerOptions({ dropSpecials: !!checked })
                    }
                    className="mt-0.5"
                  />
                  <label htmlFor="dropSpecials" className="text-sm font-medium leading-5">
                    Drop special characters
                  </label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="collapseRepeats"
                    checked={tokenizerOptions.collapseRepeats > 1}
                    onCheckedChange={(checked: boolean) => 
                      setTokenizerOptions({ 
                        collapseRepeats: checked ? 2 : 1 
                      })
                    }
                    className="mt-0.5"
                  />
                  <label htmlFor="collapseRepeats" className="text-sm font-medium leading-5">
                    Collapse repeats
                  </label>
                </div>

                <div className="flex items-start space-x-2">
                  <Switch
                    id="embedding"
                    checked={tokenizerOptions.enableEmbedding}
                    onCheckedChange={(checked: boolean) => 
                      setTokenizerOptions({ enableEmbedding: !!checked })
                    }
                    className="mt-0.5"
                  />
                  <label htmlFor="embedding" className="text-sm font-medium leading-5">
                    Enable embeddings
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Options */}
          {showAdvanced && (
            <Card>
              <CardHeader>
                <CardTitle>Advanced Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Seed (optional)
                  </label>
                  <Input
                    type="number"
                    placeholder="12345"
                    value={tokenizerOptions.seed || ''}
                    onChange={(e) => 
                      setTokenizerOptions({ 
                        seed: e.target.value ? parseInt(e.target.value) : undefined 
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Embedding Bit (0/1)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="1"
                    placeholder="0"
                    value={tokenizerOptions.embeddingBit || ''}
                    onChange={(e) => 
                      setTokenizerOptions({ 
                        embeddingBit: e.target.value ? parseInt(e.target.value) : undefined 
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="space-y-3">
                  <Button
                    onClick={handleTokenize}
                    disabled={isProcessing || !text.trim()}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Zap className="h-4 w-4 mr-2 animate-spin" />
                        {isAnalyzing ? 'Analyzing...' : 'Processing...'}
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Tokenize
                      </>
                    )}
                  </Button>
                  
                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Analysis Progress</span>
                        <span>{analysisProgress}%</span>
                      </div>
                      <Progress value={analysisProgress} className="h-2" />
                    </div>
                  )}
                </div>

                {currentResult && (
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => handleExport('json')}
                      variant="outline"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      JSON
                    </Button>
                    <Button
                      onClick={() => handleExport('csv')}
                      variant="outline"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      CSV
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="xl:col-span-2 space-y-4 lg:space-y-6">
          {/* View Mode Toggle */}
          {currentResult && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === 'text' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('text')}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Text
                    </Button>
                    <Button
                      variant={viewMode === 'tokens' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('tokens')}
                    >
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Tokens
                    </Button>
                    <Button
                      variant={viewMode === 'ids' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('ids')}
                    >
                      <Search className="h-4 w-4 mr-1" />
                      IDs
                    </Button>
                  </div>

                  <Button
                    onClick={handleCopyResults}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Results
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Display */}
          {error && (
            <Card className="border-destructive">
              <CardContent className="pt-6">
                <div className="text-destructive text-sm">
                  <strong>Error:</strong> {error}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {currentResult && (
            <>
              <TokenPreview 
                result={currentResult} 
                viewMode={viewMode}
                searchQuery={searchQuery}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6">
                <MetricsPanel result={currentResult} />
                <CompressionStats analysis={compressionAnalysis} />
                <PerformanceMetrics result={currentResult} />
                <FingerprintPanel result={currentResult} />
              </div>
              
              {/* Decode Panel */}
              <DecodePanel 
                tokens={currentResult?.tokens || []}
                tokenizerType={tokenizerOptions.tokenizerType}
                onDecode={(decodedText) => {
                  setText(decodedText)
                  toast.success('Decoded text loaded into input')
                }}
              />
            </>
          )}

          {/* Empty State */}
          {!currentResult && !error && (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Tokenize</h3>
                <p className="text-muted-foreground mb-4">
                  Enter some text and click "Tokenize" to see results
                </p>
                <Button onClick={handleExample} variant="outline">
                  Try Example
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
