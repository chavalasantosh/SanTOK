'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Fingerprint, 
  Hash, 
  Copy, 
  CheckCircle,
  Info
} from 'lucide-react'
import { TokenizationResult } from '@/types'
import { copyToClipboard } from '@/utils'
import { toast } from '@/components/notification-toast'

interface FingerprintPanelProps {
  result: TokenizationResult
}

export function FingerprintPanel({ result }: FingerprintPanelProps) {
  const fingerprint = result.fingerprint

  if (!fingerprint) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Fingerprint className="h-5 w-5 mr-2" />
            Fingerprint
          </CardTitle>
          <CardDescription>
            No fingerprint data available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Info className="h-8 w-8 mx-auto mb-2" />
            <p>Enable embeddings to generate fingerprint</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleCopyFingerprint = async () => {
    const fingerprintData = {
      signatureDigit: fingerprint.signatureDigit,
      compatDigit: fingerprint.compatDigit,
      textValue: fingerprint.textValue,
      textValueWithEmbedding: fingerprint.textValueWithEmbedding
    }
    
    const success = await copyToClipboard(JSON.stringify(fingerprintData, null, 2))
    
    if (success) {
      toast.success('Fingerprint copied to clipboard')
    } else {
      toast.error('Failed to copy fingerprint')
    }
  }

  const handleCopyValue = async (value: number, label: string) => {
    const success = await copyToClipboard(value.toString())
    
    if (success) {
      toast.success(`${label} copied to clipboard`)
    } else {
      toast.error('Failed to copy value')
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Fingerprint className="h-5 w-5 mr-2" />
              Text Fingerprint
            </CardTitle>
            <CardDescription>
              Unique identifiers for text analysis and comparison
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyFingerprint}
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Signature Digit */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Hash className="h-4 w-4 text-primary" />
              <span className="font-medium">Signature Digit</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="font-mono">
                {fingerprint.signatureDigit}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyValue(fingerprint.signatureDigit, 'Signature Digit')}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Primary identifier for text uniqueness
          </p>
        </div>

        {/* Compatibility Digit */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="font-medium">Compatibility Digit</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="font-mono">
                {fingerprint.compatDigit}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyValue(fingerprint.compatDigit, 'Compatibility Digit')}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Ensures compatibility across tokenizers
          </p>
        </div>

        {/* Text Value */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Hash className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Text Value</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="font-mono">
                {fingerprint.textValue.toLocaleString()}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyValue(fingerprint.textValue, 'Text Value')}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Numeric representation of text content
          </p>
        </div>

        {/* Text Value with Embedding */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Fingerprint className="h-4 w-4 text-purple-500" />
              <span className="font-medium">With Embedding</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="font-mono">
                {fingerprint.textValueWithEmbedding.toLocaleString()}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyValue(fingerprint.textValueWithEmbedding, 'Text Value with Embedding')}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Enhanced value including embedding information
          </p>
        </div>

        {/* Summary */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Fingerprint Hash</span>
            <span className="font-mono text-xs">
              {(() => {
                try {
                  const hashData = `${fingerprint.signatureDigit}${fingerprint.compatDigit}${fingerprint.textValue}`
                  return btoa(hashData).slice(0, 16) + '...'
                } catch {
                  return 'Invalid data'
                }
              })()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
