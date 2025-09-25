'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Archive, 
  TrendingDown, 
  CheckCircle,
  XCircle,
  BarChart3
} from 'lucide-react'
import { CompressionAnalysis } from '@/types'
import { formatPercentage } from '@/utils'

interface CompressionStatsProps {
  analysis: CompressionAnalysis[]
}

export function CompressionStats({ analysis }: CompressionStatsProps) {
  if (!analysis || analysis.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Archive className="h-5 w-5 mr-2" />
            Compression Analysis
          </CardTitle>
          <CardDescription>
            No compression analysis available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <BarChart3 className="h-8 w-8 mx-auto mb-2" />
            <p>Run compression analysis to see results</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const bestAlgorithm = analysis.reduce((best, current) => 
    current.compressionRatio < best.compressionRatio ? current : best
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Archive className="h-5 w-5 mr-2" />
          Compression Analysis
        </CardTitle>
        <CardDescription>
          Performance comparison of compression algorithms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Best Algorithm Highlight */}
        <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-green-800 dark:text-green-200">
              Best Algorithm
            </h4>
            <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
              {bestAlgorithm.algorithm}
            </Badge>
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">
            {formatPercentage(bestAlgorithm.percentageSaved)} saved • {bestAlgorithm.tokensSaved} tokens
          </div>
        </div>

        {/* Algorithm Comparison */}
        <div className="space-y-3">
          {analysis.map((algo, index) => (
            <div key={algo.algorithm} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">{algo.algorithm}</span>
                  {algo.reversibility ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <XCircle className="h-3 w-3 text-red-500" />
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">
                    {formatPercentage(algo.percentageSaved)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {algo.tokensSaved} tokens saved
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Compression Ratio</span>
                  <span>{algo.compressionRatio.toFixed(3)}</span>
                </div>
                <Progress 
                  value={algo.percentageSaved} 
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Average Compression</span>
            <span className="font-medium">
              {formatPercentage(
                analysis.reduce((sum, algo) => sum + algo.percentageSaved, 0) / analysis.length
              )}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Tokens Saved</span>
            <span className="font-medium">
              {analysis.reduce((sum, algo) => sum + algo.tokensSaved, 0).toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Reversible Algorithms</span>
            <span className="font-medium">
              {analysis.filter(algo => algo.reversibility).length} / {analysis.length}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
