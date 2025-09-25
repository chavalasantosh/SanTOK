'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Search,
  Eye,
  EyeOff
} from 'lucide-react'
import { TokenizationResult, ViewMode } from '@/types'
import { generateTokenColors, copyToClipboard, searchTokens } from '@/utils'
import { toast } from '@/components/notification-toast'

interface TokenPreviewProps {
  result: TokenizationResult
  viewMode: ViewMode
  searchQuery: string
}

const TOKENS_PER_PAGE = 50

export function TokenPreview({ result, viewMode, searchQuery }: TokenPreviewProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [showRawData, setShowRawData] = useState(false)
  

  // Reset to page 1 when result changes (new tokenization)
  useEffect(() => {
    setCurrentPage(1)
  }, [result.tokenizerType, result.tokens.length])

  const colors = useMemo(() => generateTokenColors(result.tokens.length), [result.tokens.length])

  const filteredTokens = useMemo(() => {
    if (!searchQuery.trim()) return result.tokens
    return searchTokens(result.tokens, searchQuery)
  }, [result.tokens, searchQuery])

  const totalPages = Math.ceil(filteredTokens.length / TOKENS_PER_PAGE)
  const startIndex = (currentPage - 1) * TOKENS_PER_PAGE
  const endIndex = startIndex + TOKENS_PER_PAGE
  const currentTokens = filteredTokens.slice(startIndex, endIndex)

  const getTokenText = (token: any): string => {
    if (typeof token === 'string') {
      return token
    } else if (token && typeof token === 'object' && 'text' in token) {
      return String(token.text)
    } else {
      return String(token || '')
    }
  }

  const handleCopyTokens = async () => {
    const tokenText = currentTokens.map(getTokenText).join('')
    const success = await copyToClipboard(tokenText)
    
    if (success) {
      toast.success('Tokens copied to clipboard')
    } else {
      toast.error('Failed to copy tokens')
    }
  }

  const handleCopyIds = async () => {
    const idsText = currentTokens.map((token, index) => {
      return typeof token === 'object' && token?.id !== undefined ? token.id : index
    }).join(', ')
    const success = await copyToClipboard(idsText)
    
    if (success) {
      toast.success('Token IDs copied to clipboard')
    } else {
      toast.error('Failed to copy token IDs')
    }
  }

  const renderTokens = () => {
    if (viewMode === 'text') {
      return (
        <div className="flex flex-wrap gap-1 p-4 bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg border">
          {currentTokens.map((token, index) => {
            const tokenText = getTokenText(token)
            const tokenId = typeof token === 'object' && token?.id !== undefined ? token.id : index
            const tokenLength = typeof token === 'object' && token?.length !== undefined ? token.length : tokenText.length
            
            return (
              <motion.span
                key={`${tokenId}-${index}`}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.02,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                className="token-chip px-3 py-1.5 rounded-lg text-sm font-mono cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
                style={{ 
                  backgroundColor: colors[tokenId % colors.length],
                  color: 'white',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                title={`Token ${tokenId}: "${tokenText}" (${tokenLength} chars)`}
              >
                {tokenText.replace(/[<>&"']/g, (match) => {
                  const escapeMap: { [key: string]: string } = {
                    '<': '&lt;',
                    '>': '&gt;',
                    '&': '&amp;',
                    '"': '&quot;',
                    "'": '&#x27;'
                  }
                  return escapeMap[match] || match
                })}
              </motion.span>
            )
          })}
        </div>
      )
    }

    if (viewMode === 'tokens') {
      return (
        <div className="space-y-2">
          {currentTokens.map((token, index) => {
            const tokenText = getTokenText(token)
            const tokenId = typeof token === 'object' && token?.id !== undefined ? token.id : index
            const tokenLength = typeof token === 'object' && token?.length !== undefined ? token.length : tokenText.length
            const tokenPosition = typeof token === 'object' && token?.position !== undefined ? token.position : index
            
            return (
              <motion.div
                key={`${tokenId}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.01 }}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[tokenId % colors.length] }}
                  />
                  <span className="font-mono text-sm">{tokenText}</span>
                  <span className="text-xs text-muted-foreground">
                    ID: {tokenId}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Pos: {tokenPosition} | Len: {tokenLength}
                </div>
              </motion.div>
            )
          })}
        </div>
      )
    }

    if (viewMode === 'ids') {
      return (
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="font-mono text-sm">
            [{currentTokens.map((token, index) => {
              // Prefer backend-provided frontendDigits if available to match engine output
              if ((result as any).frontendDigits && Array.isArray((result as any).frontendDigits)) {
                const globalIndex = startIndex + index
                const fd = (result as any).frontendDigits[globalIndex]
                if (typeof fd === 'number') return fd
              }
              // Fallback to token.id (what we render if backend didn't provide digits)
              const tokenId = typeof token === 'object' && token?.id !== undefined ? token.id : index
              return tokenId
            }).join(', ')}]
          </div>
        </div>
      )
    }

    return null
  }

  const renderRawData = () => {
    if (!showRawData) return null

    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="mt-4 p-4 bg-muted/30 rounded-lg"
      >
        <pre className="text-xs overflow-auto max-h-64">
          {JSON.stringify(result, null, 2)}
        </pre>
      </motion.div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Token Preview
              {searchQuery && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({filteredTokens.length} of {result.tokens.length} tokens)
                </span>
              )}
            </CardTitle>
            <CardDescription>
              {viewMode === 'text' && 'Colored token visualization'}
              {viewMode === 'tokens' && 'Detailed token information'}
              {viewMode === 'ids' && 'Token ID sequence'}
            </CardDescription>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRawData(!showRawData)}
            >
              {showRawData ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showRawData ? 'Hide' : 'Show'} Raw
            </Button>
            
            {viewMode === 'text' && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyTokens}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy Text
              </Button>
            )}
            
            {viewMode === 'ids' && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyIds}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy IDs
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {filteredTokens.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-2" />
            <p>No tokens found matching "{searchQuery}"</p>
          </div>
        ) : (
          <>
            {renderTokens()}
            {renderRawData()}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredTokens.length)} of {filteredTokens.length} tokens
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      )
                    })}
                    {totalPages > 5 && (
                      <>
                        <span className="text-muted-foreground">...</span>
                        <Button
                          variant={currentPage === totalPages ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(totalPages)}
                          className="w-8 h-8 p-0"
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
