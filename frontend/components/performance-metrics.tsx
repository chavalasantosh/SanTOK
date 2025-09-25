'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Zap, 
  MemoryStick, 
  Clock, 
  Activity,
  TrendingUp,
  Gauge
} from 'lucide-react'
import { TokenizationResult } from '@/types'
import { formatBytes, formatTime } from '@/utils'

interface PerformanceMetricsProps {
  result: TokenizationResult
}

export function PerformanceMetrics({ result }: PerformanceMetricsProps) {
  const tokensPerSecond = result.tokens.length > 0 && result.processingTime > 0 ? result.tokens.length / (result.processingTime / 1000) : 0
  const memoryPerToken = result.tokens.length > 0 ? result.memoryUsage / result.tokens.length : 0

  const getPerformanceRating = (time: number, tokenCount: number) => {
    const tokensPerMs = tokenCount / time
    if (tokensPerMs > 10) return { rating: 'Excellent', color: 'text-green-600' }
    if (tokensPerMs > 5) return { rating: 'Good', color: 'text-blue-600' }
    if (tokensPerMs > 1) return { rating: 'Fair', color: 'text-yellow-600' }
    return { rating: 'Slow', color: 'text-red-600' }
  }

  const performance = getPerformanceRating(result.processingTime, result.tokens.length)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Performance Metrics
        </CardTitle>
        <CardDescription>
          Processing speed and efficiency analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Performance Rating */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <Gauge className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Performance Rating</p>
              <p className="text-sm text-muted-foreground">
                {result.tokens.length} tokens in {formatTime(result.processingTime)}
              </p>
            </div>
          </div>
          <Badge variant="outline" className={performance.color}>
            {performance.rating}
          </Badge>
        </div>

        {/* Speed Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Processing Speed</span>
            </div>
            <div className="text-2xl font-bold">
              {tokensPerSecond.toFixed(0)}
            </div>
            <div className="text-xs text-muted-foreground">
              tokens/second
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Latency</span>
            </div>
            <div className="text-2xl font-bold">
              {formatTime(result.processingTime)}
            </div>
            <div className="text-xs text-muted-foreground">
              total time
            </div>
          </div>
        </div>

        {/* Memory Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MemoryStick className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Memory Usage</span>
            </div>
            <div className="text-2xl font-bold">
              {formatBytes(result.memoryUsage)}
            </div>
            <div className="text-xs text-muted-foreground">
              peak usage
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Memory Efficiency</span>
            </div>
            <div className="text-2xl font-bold">
              {memoryPerToken.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">
              bytes/token
            </div>
          </div>
        </div>

        {/* Efficiency Indicators */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Throughput</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ 
                    width: `${Math.min(100, (tokensPerSecond / 100) * 100)}%` 
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {Math.min(100, Math.round((tokensPerSecond / 100) * 100))}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Memory Efficiency</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ 
                    width: `${Math.min(100, Math.max(0, 100 - (memoryPerToken / 10) * 100))}%` 
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {Math.min(100, Math.max(0, Math.round(100 - (memoryPerToken / 10) * 100)))}%
              </span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {performance.rating === 'Slow' && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Tip:</strong> Consider using a faster tokenizer or reducing text size for better performance.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
