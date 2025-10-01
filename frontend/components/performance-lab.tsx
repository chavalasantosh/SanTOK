'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Zap, 
  BarChart3, 
  Clock, 
  Activity,
  TrendingUp,
  Gauge
} from 'lucide-react'

export function PerformanceLab() {
  const [text, setText] = useState('')
  const [method, setMethod] = useState('space')
  const [metrics, setMetrics] = useState({
    processingTime: 0,
    tokensPerSecond: 0,
    memoryUsage: 0,
    efficiency: 0
  })
  const [isRunning, setIsRunning] = useState(false)

  const runBenchmark = async () => {
    if (!text.trim()) return
    
    setIsRunning(true)
    
    // Simulate benchmark
    const startTime = performance.now()
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const endTime = performance.now()
    const processingTime = endTime - startTime
    const tokens = text.split(/\s+/)
    const tokensPerSecond = (tokens.length / processingTime) * 1000
    
    setMetrics({
      processingTime: processingTime,
      tokensPerSecond: tokensPerSecond,
      memoryUsage: Math.random() * 100,
      efficiency: Math.random() * 100
    })
    
    setIsRunning(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Performance Lab</h1>
          <p className="text-muted-foreground mt-2">
            Benchmark and analyze tokenization performance metrics
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center space-x-1">
          <Activity className="h-3 w-3" />
          <span>Performance Testing</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Benchmark Input</span>
            </CardTitle>
            <CardDescription>
              Configure and run performance benchmarks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter text for performance testing..."
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
                    <SelectItem value="space">Space</SelectItem>
                    <SelectItem value="word">Word</SelectItem>
                    <SelectItem value="char">Character</SelectItem>
                    <SelectItem value="grammar">Grammar</SelectItem>
                    <SelectItem value="subword">Subword</SelectItem>
                    <SelectItem value="bpe">BPE</SelectItem>
                    <SelectItem value="syllable">Syllable</SelectItem>
                    <SelectItem value="frequency">Frequency</SelectItem>
                    <SelectItem value="byte">Byte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={runBenchmark} 
                disabled={!text.trim() || isRunning}
                className="mt-6"
              >
                <Activity className="h-4 w-4 mr-2" />
                {isRunning ? 'Running...' : 'Run Benchmark'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Performance Metrics</span>
            </CardTitle>
            <CardDescription>
              Real-time performance analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {metrics.processingTime > 0 ? (
              <>
                {/* Processing Time */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Processing Time</span>
                    </span>
                    <Badge variant="default">
                      {metrics.processingTime.toFixed(2)}ms
                    </Badge>
                  </div>
                  <Progress value={Math.min(metrics.processingTime * 10, 100)} className="h-2" />
                </div>

                {/* Tokens Per Second */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Tokens/Second</span>
                    </span>
                    <Badge variant="secondary">
                      {metrics.tokensPerSecond.toFixed(0)}
                    </Badge>
                  </div>
                  <Progress value={Math.min(metrics.tokensPerSecond / 100, 100)} className="h-2" />
                </div>

                {/* Memory Usage */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center space-x-2">
                      <Gauge className="h-4 w-4" />
                      <span>Memory Usage</span>
                    </span>
                    <Badge variant="outline">
                      {metrics.memoryUsage.toFixed(1)}%
                    </Badge>
                  </div>
                  <Progress value={metrics.memoryUsage} className="h-2" />
                </div>

                {/* Efficiency */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>Efficiency Score</span>
                    </span>
                    <Badge variant={metrics.efficiency > 80 ? "default" : "secondary"}>
                      {metrics.efficiency.toFixed(1)}%
                    </Badge>
                  </div>
                  <Progress value={metrics.efficiency} className="h-2" />
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No benchmark results yet</p>
                <p className="text-sm">Enter text and run benchmark to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      {metrics.processingTime > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Performance Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{metrics.processingTime.toFixed(2)}ms</div>
                <div className="text-sm text-muted-foreground">Processing Time</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-secondary">{metrics.tokensPerSecond.toFixed(0)}</div>
                <div className="text-sm text-muted-foreground">Tokens/Second</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{metrics.memoryUsage.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Memory Usage</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-secondary">{metrics.efficiency.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Efficiency</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}