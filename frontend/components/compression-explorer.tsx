'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  Archive, 
  TrendingUp, 
  Download, 
  RefreshCw,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react'
import { CompressionAnalysis } from '@/types'
import { getMockCompressionAnalysis } from '@/lib/api'
import { formatPercentage } from '@/utils'
import { toast } from '@/components/notification-toast'

const CHART_COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', 
  '#8dd1e1', '#d084d0', '#ffb347', '#87ceeb'
]

export function CompressionExplorer() {
  const [analysis, setAnalysis] = useState<CompressionAnalysis[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar')
  const [sortBy, setSortBy] = useState<'ratio' | 'saved' | 'percentage'>('percentage')

  const loadAnalysis = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const data = getMockCompressionAnalysis()
      setAnalysis(data)
      toast.success('Compression analysis loaded')
    } catch (error) {
      toast.error('Failed to load compression analysis')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAnalysis()
  }, [])

  const sortedAnalysis = [...analysis].sort((a, b) => {
    switch (sortBy) {
      case 'ratio':
        return a.compressionRatio - b.compressionRatio
      case 'saved':
        return b.tokensSaved - a.tokensSaved
      case 'percentage':
        return b.percentageSaved - a.percentageSaved
      default:
        return 0
    }
  })

  const chartData = sortedAnalysis.map((algo, index) => ({
    name: algo.algorithm,
    ratio: algo.compressionRatio,
    saved: algo.tokensSaved,
    percentage: algo.percentageSaved,
    reversibility: algo.reversibility ? 1 : 0,
    color: CHART_COLORS[index % CHART_COLORS.length]
  }))

  const pieData = sortedAnalysis.map((algo, index) => ({
    name: algo.algorithm,
    value: algo.percentageSaved,
    color: CHART_COLORS[index % CHART_COLORS.length]
  }))

  const handleExport = () => {
    const dataStr = JSON.stringify(analysis, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'compression-analysis.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('Analysis exported successfully')
  }

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    }

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'percentage' ? `${value}%` : value,
                  name === 'percentage' ? 'Percentage Saved' : 
                  name === 'saved' ? 'Tokens Saved' : 'Compression Ratio'
                ]}
              />
              <Bar 
                dataKey={sortBy === 'ratio' ? 'ratio' : sortBy === 'saved' ? 'saved' : 'percentage'} 
                fill="#8884d8"
              />
            </BarChart>
          </ResponsiveContainer>
        )

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'percentage' ? `${value}%` : value,
                  name === 'percentage' ? 'Percentage Saved' : 
                  name === 'saved' ? 'Tokens Saved' : 'Compression Ratio'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey={sortBy === 'ratio' ? 'ratio' : sortBy === 'saved' ? 'saved' : 'percentage'} 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage Saved']} />
            </PieChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Compression Explorer</h1>
          <p className="text-muted-foreground">
            Compare compression algorithms and analyze efficiency
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={loadAnalysis}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleExport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Chart Type:</span>
              <div className="flex space-x-1">
                <Button
                  variant={chartType === 'bar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('bar')}
                >
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Bar
                </Button>
                <Button
                  variant={chartType === 'line' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('line')}
                >
                  <Activity className="h-4 w-4 mr-1" />
                  Line
                </Button>
                <Button
                  variant={chartType === 'pie' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('pie')}
                >
                  <PieChartIcon className="h-4 w-4 mr-1" />
                  Pie
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Sort By:</span>
              <Select value={sortBy} onValueChange={(value: 'ratio' | 'saved' | 'percentage') => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage Saved</SelectItem>
                  <SelectItem value="saved">Tokens Saved</SelectItem>
                  <SelectItem value="ratio">Compression Ratio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Archive className="h-5 w-5 mr-2" />
            Compression Analysis
          </CardTitle>
          <CardDescription>
            Visual comparison of compression algorithms
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 mx-auto mb-2 animate-spin" />
                <p className="text-muted-foreground">Loading analysis...</p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderChart()}
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Algorithm Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAnalysis.map((algo, index) => (
          <motion.div
            key={algo.algorithm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{algo.algorithm}</CardTitle>
                  <Badge 
                    variant={algo.reversibility ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {algo.reversibility ? 'Reversible' : 'Lossy'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Compression Ratio</span>
                    <span className="font-medium">{algo.compressionRatio.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tokens Saved</span>
                    <span className="font-medium">{algo.tokensSaved.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Percentage Saved</span>
                    <span className="font-medium text-green-600">
                      {formatPercentage(algo.percentageSaved)}
                    </span>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${algo.percentageSaved}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Summary Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {formatPercentage(
                  analysis.reduce((sum, algo) => sum + algo.percentageSaved, 0) / analysis.length
                )}
              </p>
              <p className="text-sm text-muted-foreground">Average Compression</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {analysis.reduce((sum, algo) => sum + algo.tokensSaved, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Tokens Saved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {analysis.filter(algo => algo.reversibility).length}
              </p>
              <p className="text-sm text-muted-foreground">Reversible Algorithms</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {analysis.length}
              </p>
              <p className="text-sm text-muted-foreground">Total Algorithms</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
