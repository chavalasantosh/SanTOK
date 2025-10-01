'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Keyboard, 
  Command, 
  ArrowRight,
  X
} from 'lucide-react'

interface KeyboardShortcutsProps {
  isOpen: boolean
  onClose: () => void
}

export function KeyboardShortcuts({ isOpen, onClose }: KeyboardShortcutsProps) {
  if (!isOpen) return null

  const shortcuts = [
    { key: 'Ctrl + /', description: 'Toggle shortcuts panel', category: 'General' },
    { key: 'Ctrl + K', description: 'Open search', category: 'General' },
    { key: 'Ctrl + N', description: 'New tokenization', category: 'General' },
    { key: 'Ctrl + S', description: 'Save results', category: 'General' },
    { key: 'Ctrl + D', description: 'Download tokens', category: 'General' },
    { key: 'Ctrl + T', description: 'Toggle theme', category: 'General' },
    { key: 'Ctrl + M', description: 'Toggle sidebar', category: 'Navigation' },
    { key: 'Ctrl + 1', description: 'Go to Dashboard', category: 'Navigation' },
    { key: 'Ctrl + 2', description: 'Go to Compression', category: 'Navigation' },
    { key: 'Ctrl + 3', description: 'Go to Performance', category: 'Navigation' },
    { key: 'Ctrl + 4', description: 'Go to About', category: 'Navigation' },
    { key: 'Enter', description: 'Run tokenization', category: 'Actions' },
    { key: 'Escape', description: 'Close modal/cancel', category: 'Actions' },
    { key: 'Ctrl + C', description: 'Copy tokens', category: 'Actions' },
    { key: 'Ctrl + V', description: 'Paste text', category: 'Actions' }
  ]

  const categories = Array.from(new Set(shortcuts.map(s => s.category)))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-2">
            <Keyboard className="h-5 w-5" />
            <CardTitle>Keyboard Shortcuts</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6 max-h-[60vh] overflow-y-auto">
          <CardDescription>
            Use these keyboard shortcuts to navigate and interact with SanTOK more efficiently.
          </CardDescription>

          {categories.map((category) => (
            <div key={category} className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {shortcuts
                  .filter(shortcut => shortcut.category === category)
                  .map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">
                        {shortcut.description}
                      </span>
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <Command className="h-3 w-3" />
                        <span className="text-xs font-mono">{shortcut.key}</span>
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <ArrowRight className="h-4 w-4" />
              <span>Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd> to close this panel</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}