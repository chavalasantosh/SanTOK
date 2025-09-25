'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Hash, 
  Type, 
  Clock, 
  MemoryStick, 
  TrendingUp,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { TokenizationResult } from '@/types'
import { formatBytes, formatTime, formatPercentage } from '@/utils'

interface MetricsPanelProps {
  result: TokenizationResult
}

export function MetricsPanel({ result }: MetricsPanelProps) {
  const tokenDensity = result.characterCount > 0 ? result.tokens.length / result.characterCount : 0
  const avgTokenLength = result.tokens.length > 0 ? result.tokens.reduce((sum, token) => sum + token.length, 0) / result.tokens.length : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Metrics
        </CardTitle>
        <CardDescription>
          Key performance and analysis metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Stats */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2 bg-primary/20 rounded-lg">
              <Hash className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tokens</p>
              <p className="text-2xl font-bold text-primary">{result.tokenCount.toLocaleString()}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-500/5 to-blue-500/10 rounded-lg border border-blue-500/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Type className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Characters</p>
              <p className="text-2xl font-bold text-blue-600">{result.characterCount.toLocaleString()}</p>
            </div>
          </motion.div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Clock className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Processing Time</p>
              <p className="text-lg font-semibold">{formatTime(result.processingTime)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <MemoryStick className="h-4 w-4 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Memory Usage</p>
              <p className="text-lg font-semibold">{formatBytes(result.memoryUsage)}</p>
            </div>
          </div>
        </div>

        {/* Analysis Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Token Density</span>
            <Badge variant="secondary">
              {tokenDensity.toFixed(3)} tokens/char
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Avg Token Length</span>
            <Badge variant="secondary">
              {avgTokenLength.toFixed(1)} chars
            </Badge>
          </div>
          
          {result.compressionRatio && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Compression Ratio</span>
              <Badge variant="secondary">
                {result.compressionRatio.toFixed(3)}
              </Badge>
            </div>
          )}
        </div>

        {/* Reversibility */}
        <div className="flex items-center justify-between pt-3 border-t">
          <span className="text-sm font-medium">Reversibility</span>
          <div className="flex items-center space-x-2">
            {result.reversibility ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">Reversible</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-600">Not Reversible</span>
              </>
            )}
          </div>
        </div>

        {/* Tokenizer Type */}
        <div className="flex items-center justify-between pt-3 border-t">
          <span className="text-sm font-medium">Tokenizer</span>
          <Badge variant="outline" className="capitalize">
            {result.tokenizerType}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
