'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Search,
  History,
  Star,
  RefreshCw,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Sparkles,
  Target,
  Layers,
  Activity,
  Database,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Globe,
  Languages,
  Palette,
  Maximize2,
  Minimize2,
  RotateCcw,
  Save,
  Share2,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { getMockTokenizationResult, getMockCompressionAnalysis } from '@/lib/api'
import { formatBytes, formatTime, formatPercentage, generateTokenColors, exportToJSON, exportToCSV, exportToTEXT, exportToXML, copyToClipboard } from '@/utils'
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
  
  // New enhanced state
  const [history, setHistory] = useState<any[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState('input')
  const [showHistory, setShowHistory] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [sortBy, setSortBy] = useState('time')
  const [filterBy, setFilterBy] = useState('all')
  const [showTutorial, setShowTutorial] = useState(false)
  const [processingStats, setProcessingStats] = useState({
    totalProcessed: 0,
    totalCharacters: 0,
    averageSpeed: 0,
    lastProcessed: null as Date | null
  })

  const handleTokenize = useCallback(async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to tokenize')
      return
    }

    // No limits - handle any size text!
    
    /*    // Limit text length to prevent timeouts
    if (text.length > 10000) {
      toast.error('Text too long! Please use text under 10,000 characters')
      return
    }*/


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
        
        // Add to history
        const historyEntry = {
          id: Date.now(),
          text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
          tokenizerType: tokenizerOptions.tokenizerType,
          tokenCount: result.tokens?.length || 0,
          timestamp: new Date(),
          result: result
        }
        setHistory(prev => [historyEntry, ...prev.slice(0, 49)]) // Keep last 50
        
        // Update stats
        setProcessingStats(prev => ({
          totalProcessed: prev.totalProcessed + 1,
          totalCharacters: prev.totalCharacters + text.length,
          averageSpeed: prev.averageSpeed === 0 ? 
            (result.processingTime ? text.length / result.processingTime : 0) : 
            (prev.averageSpeed + (result.processingTime ? text.length / result.processingTime : 0)) / 2,
          lastProcessed: new Date()
        }))
        
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

  // New enhanced functions
  const handleLoadFromHistory = (historyItem: any) => {
    setText(historyItem.result.originalText || historyItem.text)
    setCurrentResult(historyItem.result)
    setTokenizerOptions({ tokenizerType: historyItem.tokenizerType })
    toast.success('Loaded from history')
  }

  const handleToggleFavorite = (text: string) => {
    setFavorites(prev => 
      prev.includes(text) 
        ? prev.filter(f => f !== text)
        : [...prev, text]
    )
  }

  const handleLoadFromFavorites = (favoriteText: string) => {
    setText(favoriteText)
    toast.success('Loaded from favorites')
  }

  const handleClearHistory = () => {
    setHistory([])
    toast.success('History cleared')
  }

  const handleClearFavorites = () => {
    setFavorites([])
    toast.success('Favorites cleared')
  }

  const handleResetStats = () => {
    setProcessingStats({
      totalProcessed: 0,
      totalCharacters: 0,
      averageSpeed: 0,
      lastProcessed: null
    })
    toast.success('Stats reset')
  }

  const handleExport = (format: 'json' | 'csv' | 'txt' | 'xml') => {
    if (!currentResult) {
      toast.error('No results to export')
      return
    }

    const tokenizerType = currentResult.tokenizerType || 'word'
    const timestamp = new Date().toISOString().split('T')[0]
    const baseFilename = `tokenization-${tokenizerType}-${timestamp}`

    if (format === 'json') {
      exportToJSON(currentResult, `${baseFilename}.json`, tokenizerType)
      toast.success('Results exported as JSON')
    } else if (format === 'csv') {
      exportToCSV(currentResult.tokens, `${baseFilename}.csv`, tokenizerType)
      toast.success('Results exported as CSV')
    } else if (format === 'txt') {
      exportToTEXT(currentResult.tokens, `${baseFilename}.txt`, tokenizerType)
      toast.success('Results exported as TEXT')
    } else if (format === 'xml') {
      exportToXML(currentResult.tokens, `${baseFilename}.xml`, tokenizerType)
      toast.success('Results exported as XML')
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
    <div className={`space-y-6 transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-4' : ''}`}>
      {/* Enhanced Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                SanTOK Dashboard
              </h1>
              <p className="text-muted-foreground">
                Advanced text tokenization with 9 algorithms & perfect reconstruction
              </p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              {processingStats.totalProcessed} processed
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Database className="h-3 w-3" />
              {formatBytes(processingStats.totalCharacters)}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {Math.round(processingStats.averageSpeed).toLocaleString()} chars/sec
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTutorial(!showTutorial)}
            className="flex items-center"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Tutorial
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center"
          >
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{showAdvanced ? 'Hide' : 'Show'} Advanced</span>
            <span className="sm:hidden">Advanced</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </motion.div>

      {/* Tutorial Panel */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Quick Tutorial
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      1. Choose Algorithm
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Select from 9 tokenization algorithms based on your needs
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      2. Enter Text
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Type or upload text to tokenize (up to 10,000 characters)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      3. Process & Analyze
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Click tokenize to see results with perfect reconstruction
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={() => setShowTutorial(false)}>
                    Got it!
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2">
          <TabsTrigger value="input" className="flex items-center gap-1 sm:gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Input</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-1 sm:gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Results</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1 sm:gap-2">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1 sm:gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Input Tab */}
        <TabsContent value="input" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Left Column - Input */}
            <div className="lg:col-span-1 space-y-6">
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
            <CardContent className="space-y-6">
              <FileUpload onFileSelect={(content) => setText(content)} />
              
              <div className="space-y-2">
                <Textarea
                  placeholder="Enter text to tokenize..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[150px] sm:min-h-[200px] resize-none text-sm sm:text-base"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{text.length.toLocaleString()} characters</span>
                  <span className="text-green-600">✅ No limits - handles any size!</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleExample} variant="outline" size="sm" className="flex-1 sm:flex-none">
                  Show Example
                </Button>
                <Button onClick={handleClear} variant="outline" size="sm" className="flex-1 sm:flex-none">
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
            <CardContent className="space-y-6">
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
                <div className="flex items-start space-x-3">
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

                <div className="flex items-start space-x-3">
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

                <div className="flex items-start space-x-3">
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

                <div className="flex items-start space-x-3">
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
              <CardContent className="space-y-6">
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
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => handleExport('json')}
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      JSON
                    </Button>
                    <Button
                      onClick={() => handleExport('csv')}
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      CSV
                    </Button>
                    <Button
                      onClick={() => handleExport('txt')}
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      TEXT
                    </Button>
                    <Button
                      onClick={() => handleExport('xml')}
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      XML
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-1 xl:col-span-2 space-y-6">
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
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
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          {currentResult ? (
            <div className="space-y-6">
              <TokenPreview 
                result={currentResult} 
                viewMode={viewMode}
                searchQuery={searchQuery}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
                <MetricsPanel result={currentResult} />
                <CompressionStats analysis={compressionAnalysis} />
                <PerformanceMetrics result={currentResult} />
                <FingerprintPanel result={currentResult} />
              </div>
              
              <DecodePanel 
                tokens={currentResult?.tokens || []}
                tokenizerType={tokenizerOptions.tokenizerType}
                onDecode={(decodedText) => {
                  setText(decodedText)
                  toast.success('Decoded text loaded into input')
                }}
              />
            </div>
          ) : (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Results Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Tokenize some text to see detailed results and analysis
                </p>
                <Button onClick={() => setActiveTab('input')} variant="outline">
                  Go to Input
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Processing History</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleClearHistory}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear History
              </Button>
            </div>
          </div>
          
          {history.length > 0 ? (
            <div className="space-y-4">
              {history.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline">{item.tokenizerType}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {item.tokenCount} tokens
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {item.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm font-mono bg-muted p-2 rounded break-words">
                          {item.text}
                        </p>
                      </div>
                      <div className="flex gap-3 sm:ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleLoadFromHistory(item)}
                          className="flex-1 sm:flex-none"
                        >
                          Load
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleFavorite(item.text)}
                          className="flex-1 sm:flex-none"
                        >
                          <Star className={`h-4 w-4 ${favorites.includes(item.text) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No History Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Your tokenization history will appear here
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Processed</p>
                    <p className="text-2xl font-bold">{processingStats.totalProcessed}</p>
                  </div>
                  <Activity className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Characters</p>
                    <p className="text-2xl font-bold">{formatBytes(processingStats.totalCharacters)}</p>
                  </div>
                  <Database className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Speed</p>
                    <p className="text-2xl font-bold">{Math.round(processingStats.averageSpeed).toLocaleString()}/s</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Processed</p>
                    <p className="text-sm font-bold">
                      {processingStats.lastProcessed 
                        ? processingStats.lastProcessed.toLocaleTimeString()
                        : 'Never'
                      }
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Favorites</CardTitle>
                <CardDescription>Your saved text snippets</CardDescription>
              </CardHeader>
              <CardContent>
                {favorites.length > 0 ? (
                  <div className="space-y-2">
                    {favorites.map((favorite, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded gap-4">
                        <span className="text-sm font-mono break-words flex-1">
                          {favorite}
                        </span>
                        <div className="flex gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleLoadFromFavorites(favorite)}
                            className="flex-1 sm:flex-none"
                          >
                            Load
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleFavorite(favorite)}
                            className="flex-1 sm:flex-none"
                          >
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearFavorites}
                      className="w-full mt-2"
                    >
                      Clear Favorites
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No favorites yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current system performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Processing Status</span>
                  <Badge variant={isProcessing ? "destructive" : "default"}>
                    {isProcessing ? "Processing" : "Ready"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Live Mode</span>
                  <Badge variant={liveMode ? "default" : "secondary"}>
                    {liveMode ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Advanced Options</span>
                  <Badge variant={showAdvanced ? "default" : "secondary"}>
                    {showAdvanced ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetStats}
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Statistics
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
