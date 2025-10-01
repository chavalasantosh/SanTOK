'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  FileText, 
  BarChart3, 
  Download, 
  Upload,
  Zap,
  TrendingDown,
  TrendingUp
} from 'lucide-react'

export function CompressionExplorer() {
  const [text, setText] = useState('')
  const [method, setMethod] = useState('space')
  const [compressionRatio, setCompressionRatio] = useState(0)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)

  const handleAnalyze = () => {
    if (!text.trim()) return
    
    const original = text.length
    const tokens = text.split(/\s+/)
    const compressed = tokens.length * 2 // Rough estimate
    
    setOriginalSize(original)
    setCompressedSize(compressed)
    setCompressionRatio(((original - compressed) / original) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Compression Explorer</h1>
          <p className="text-muted-foreground mt-2">
            Analyze compression efficiency of different tokenization methods
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center space-x-1">
          <TrendingDown className="h-3 w-3" />
          <span>Compression Analysis</span>
        </Badge>
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
              Enter text to analyze compression efficiency
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
                onClick={handleAnalyze} 
                disabled={!text.trim()}
                className="mt-6"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analyze
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5" />
              <span>Compression Analysis</span>
            </CardTitle>
            <CardDescription>
              Compression ratio and size comparison
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {originalSize > 0 ? (
              <>
                {/* Compression Ratio */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Compression Ratio</span>
                    <Badge variant={compressionRatio > 0 ? "default" : "secondary"}>
                      {compressionRatio.toFixed(1)}%
                    </Badge>
                  </div>
                  <Progress 
                    value={Math.abs(compressionRatio)} 
                    className="h-2"
                  />
                </div>

                {/* Size Comparison */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{originalSize}</div>
                    <div className="text-sm text-muted-foreground">Original Size</div>
                    <div className="text-xs text-muted-foreground mt-1">characters</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-secondary">{compressedSize}</div>
                    <div className="text-sm text-muted-foreground">Compressed Size</div>
                    <div className="text-xs text-muted-foreground mt-1">tokens</div>
                  </div>
                </div>

                {/* Efficiency Metrics */}
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">Efficiency Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold">
                        {(originalSize / compressedSize).toFixed(1)}
                      </div>
                      <div className="text-xs text-muted-foreground">Chars/Token</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">
                        {compressedSize > 0 ? (originalSize / compressedSize).toFixed(1) : '0'}
                      </div>
                      <div className="text-xs text-muted-foreground">Compression Factor</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No analysis performed yet</p>
                <p className="text-sm">Enter text and click Analyze to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Compare Methods
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}