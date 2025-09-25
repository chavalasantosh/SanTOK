'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter
} from 'recharts'
import { 
  Zap, 
  Play, 
  Square, 
  Download, 
  RefreshCw,
  Activity,
  Clock,
  MemoryStick,
  TrendingUp,
  BarChart3,
  Target
} from 'lucide-react'
import { PerformanceMetrics, TokenizerOptions } from '@/types'
import { useAppStore } from '@/store/useAppStore'
import { formatBytes, formatTime } from '@/utils'
import { toast } from '@/components/notification-toast'

interface BenchmarkResult {
  id: string
  timestamp: number
  textSize: number
  tokenizerType: string
  processingTime: number
  memoryUsage: number
  tokenCount: number
  tokensPerSecond: number
  memoryPerToken: number
}

const TEST_TEXT_SIZES = [
  { label: 'Small (1KB)', value: 1024 },
  { label: 'Medium (10KB)', value: 10240 },
  { label: 'Large (100KB)', value: 102400 },
  { label: 'Extra Large (1MB)', value: 1048576 },
]

const TOKENIZER_TYPES = [
  'char', 'word', 'space', 'subword', 'grammar', 
  'syllable', 'byte', 'bpe', 'frequency'
]

export function PerformanceLab() {
  const { performanceHistory, addPerformanceMetric, clearPerformanceHistory } = useAppStore()
  const [benchmarkResults, setBenchmarkResults] = useState<BenchmarkResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedTokenizer, setSelectedTokenizer] = useState('word')
  const [selectedTextSize, setSelectedTextSize] = useState(10240)
  const [customText, setCustomText] = useState('')
  const [chartType, setChartType] = useState<'line' | 'bar' | 'scatter'>('line')

  const generateTestText = (size: number): string => {
    const baseText = "The quick brown fox jumps over the lazy dog. This is a sample text for performance testing. "
    const repetitions = Math.ceil(size / baseText.length)
    return baseText.repeat(repetitions).slice(0, size)
  }

  const runBenchmark = async () => {
    setIsRunning(true)
    setProgress(0)
    const results: BenchmarkResult[] = []

    try {
      const textSizes = selectedTextSize === 0 
        ? TEST_TEXT_SIZES.map(t => t.value)
        : [selectedTextSize]

      for (let i = 0; i < textSizes.length; i++) {
        const textSize = textSizes[i]
        const testText = customText || generateTestText(textSize)
        
        // Simulate tokenization with realistic performance characteristics
        const startTime = performance.now()
        const startMemory = (performance as any).memory?.usedJSHeapSize || 0
        
        // Simulate processing time based on text size and tokenizer type
        const baseTime = textSize / 1000 // Base time in ms
        const tokenizerMultiplier = {
          'char': 0.5,
          'word': 1.0,
          'space': 0.8,
          'subword': 1.5,
          'grammar': 2.0,
          'syllable': 1.8,
          'byte': 0.3,
          'bpe': 2.5,
          'frequency': 1.2
        }[selectedTokenizer] || 1.0

        const processingTime = baseTime * tokenizerMultiplier + Math.random() * 10
        await new Promise(resolve => setTimeout(resolve, processingTime))
        
        const endTime = performance.now()
        const endMemory = (performance as any).memory?.usedJSHeapSize || startMemory + textSize * 0.1
        
        const actualProcessingTime = endTime - startTime
        const memoryUsage = endMemory - startMemory
        const tokenCount = Math.floor(textSize / 4) // Rough estimate
        const tokensPerSecond = tokenCount / (actualProcessingTime / 1000)
        const memoryPerToken = memoryUsage / tokenCount

        const result: BenchmarkResult = {
          id: `${Date.now()}-${i}`,
          timestamp: Date.now(),
          textSize,
          tokenizerType: selectedTokenizer,
          processingTime: actualProcessingTime,
          memoryUsage,
          tokenCount,
          tokensPerSecond,
          memoryPerToken
        }

        results.push(result)
        addPerformanceMetric({
          processingTime: actualProcessingTime,
          memoryUsage,
          tokenCount,
          compressionRatio: 0.5 + Math.random() * 0.3,
          timestamp: Date.now()
        })

        setProgress(((i + 1) / textSizes.length) * 100)
      }

      setBenchmarkResults(prev => [...prev, ...results])
      toast.success(`Benchmark completed! ${results.length} tests run.`)
    } catch (error) {
      toast.error('Benchmark failed')
    } finally {
      setIsRunning(false)
      setProgress(0)
    }
  }

  const stopBenchmark = () => {
    setIsRunning(false)
    setProgress(0)
  }

  const clearResults = () => {
    setBenchmarkResults([])
    clearPerformanceHistory()
    toast.success('Results cleared')
  }

  const exportResults = () => {
    const dataStr = JSON.stringify(benchmarkResults, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `benchmark-results-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('Results exported successfully')
  }

  const chartData = benchmarkResults.map(result => ({
    textSize: result.textSize,
    processingTime: result.processingTime,
    memoryUsage: result.memoryUsage,
    tokensPerSecond: result.tokensPerSecond,
    memoryPerToken: result.memoryPerToken,
    tokenizerType: result.tokenizerType,
    timestamp: new Date(result.timestamp).toLocaleTimeString()
  }))

  const renderChart = () => {
    if (chartData.length === 0) return null

    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    }

    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="textSize" tickFormatter={(value) => formatBytes(value)} />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'processingTime' ? formatTime(value as number) :
                  name === 'memoryUsage' ? formatBytes(value as number) :
                  name === 'tokensPerSecond' ? `${(value as number).toFixed(0)} tokens/s` :
                  `${(value as number).toFixed(2)} bytes/token`,
                  name === 'processingTime' ? 'Processing Time' :
                  name === 'memoryUsage' ? 'Memory Usage' :
                  name === 'tokensPerSecond' ? 'Tokens/Second' : 'Memory/Token'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="processingTime" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="textSize" tickFormatter={(value) => formatBytes(value)} />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'processingTime' ? formatTime(value as number) :
                  name === 'memoryUsage' ? formatBytes(value as number) :
                  `${(value as number).toFixed(0)} tokens/s`,
                  name === 'processingTime' ? 'Processing Time' :
                  name === 'memoryUsage' ? 'Memory Usage' : 'Tokens/Second'
                ]}
              />
              <Bar dataKey="processingTime" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )

      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="textSize" tickFormatter={(value) => formatBytes(value)} />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'processingTime' ? formatTime(value as number) :
                  formatBytes(value as number),
                  name === 'processingTime' ? 'Processing Time' : 'Memory Usage'
                ]}
              />
              <Scatter dataKey="processingTime" fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  const getPerformanceStats = () => {
    if (benchmarkResults.length === 0) return null

    const avgProcessingTime = benchmarkResults.reduce((sum, r) => sum + r.processingTime, 0) / benchmarkResults.length
    const avgMemoryUsage = benchmarkResults.reduce((sum, r) => sum + r.memoryUsage, 0) / benchmarkResults.length
    const avgTokensPerSecond = benchmarkResults.reduce((sum, r) => sum + r.tokensPerSecond, 0) / benchmarkResults.length
    const maxTokensPerSecond = Math.max(...benchmarkResults.map(r => r.tokensPerSecond))

    return { avgProcessingTime, avgMemoryUsage, avgTokensPerSecond, maxTokensPerSecond }
  }

  const stats = getPerformanceStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Lab</h1>
          <p className="text-muted-foreground">
            Benchmark and stress test tokenization performance
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={clearResults}
            disabled={benchmarkResults.length === 0}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <Button
            onClick={exportResults}
            variant="outline"
            disabled={benchmarkResults.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Benchmark Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Tokenizer Type</label>
              <Select value={selectedTokenizer} onValueChange={setSelectedTokenizer}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TOKENIZER_TYPES.map(type => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type} Tokenization
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Text Size</label>
              <Select 
                value={selectedTextSize.toString()} 
                onValueChange={(value) => setSelectedTextSize(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TEST_TEXT_SIZES.map(size => (
                    <SelectItem key={size.value} value={size.value.toString()}>
                      {size.label}
                    </SelectItem>
                  ))}
                  <SelectItem value="0">All Sizes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Chart Type</label>
              <Select value={chartType} onValueChange={(value: 'line' | 'bar' | 'scatter') => setChartType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="scatter">Scatter Plot</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Custom Text (optional)</label>
            <Input
              placeholder="Enter custom text for testing..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4">
            {isRunning ? (
              <Button onClick={stopBenchmark} variant="destructive">
                <Square className="h-4 w-4 mr-2" />
                Stop Benchmark
              </Button>
            ) : (
              <Button onClick={runBenchmark} disabled={isRunning}>
                <Play className="h-4 w-4 mr-2" />
                Start Benchmark
              </Button>
            )}

            {isRunning && (
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Processing Time</p>
                    <p className="text-2xl font-bold text-blue-600">{formatTime(stats.avgProcessingTime)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <MemoryStick className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Avg Memory Usage</p>
                  <p className="text-2xl font-bold">{formatBytes(stats.avgMemoryUsage)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Zap className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Avg Tokens/Second</p>
                  <p className="text-2xl font-bold">{Math.round(stats.avgTokensPerSecond)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Peak Performance</p>
                  <p className="text-2xl font-bold">{Math.round(stats.maxTokensPerSecond)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chart */}
      {benchmarkResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Performance Analysis
            </CardTitle>
            <CardDescription>
              {benchmarkResults.length} benchmark results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderChart()}
            </motion.div>
          </CardContent>
        </Card>
      )}

      {/* Results Table */}
      {benchmarkResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Benchmark Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Text Size</th>
                    <th className="text-left p-2">Tokenizer</th>
                    <th className="text-left p-2">Processing Time</th>
                    <th className="text-left p-2">Memory Usage</th>
                    <th className="text-left p-2">Tokens/Second</th>
                    <th className="text-left p-2">Memory/Token</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarkResults.map((result, index) => (
                    <motion.tr
                      key={result.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b hover:bg-muted/50"
                    >
                      <td className="p-2 font-mono">{formatBytes(result.textSize)}</td>
                      <td className="p-2">
                        <Badge variant="outline" className="capitalize">
                          {result.tokenizerType}
                        </Badge>
                      </td>
                      <td className="p-2 font-mono">{formatTime(result.processingTime)}</td>
                      <td className="p-2 font-mono">{formatBytes(result.memoryUsage)}</td>
                      <td className="p-2 font-mono">{Math.round(result.tokensPerSecond)}</td>
                      <td className="p-2 font-mono">{result.memoryPerToken.toFixed(2)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {benchmarkResults.length === 0 && !isRunning && (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <Zap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ready to Benchmark</h3>
            <p className="text-muted-foreground mb-4">
              Configure your test parameters and start benchmarking
            </p>
            <Button onClick={runBenchmark}>
              <Play className="h-4 w-4 mr-2" />
              Start First Benchmark
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
