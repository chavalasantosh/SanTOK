'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Keyboard } from 'lucide-react'

const shortcuts = [
  { key: 'Ctrl/Cmd + K', description: 'Toggle search' },
  { key: 'Ctrl/Cmd + L', description: 'Toggle live mode' },
  { key: 'Ctrl/Cmd + B', description: 'Toggle sidebar' },
  { key: '1', description: 'Switch to text view' },
  { key: '2', description: 'Switch to tokens view' },
  { key: '3', description: 'Switch to IDs view' },
  { key: 'Escape', description: 'Close sidebar' },
]

interface KeyboardShortcutsProps {
  isOpen: boolean
  onClose: () => void
}

export function KeyboardShortcuts({ isOpen, onClose }: KeyboardShortcutsProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Keyboard className="h-5 w-5" />
                  <CardTitle>Keyboard Shortcuts</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Use these shortcuts to navigate faster
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={shortcut.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-lg"
                  >
                    <span className="text-sm font-medium">{shortcut.description}</span>
                    <kbd className="px-2 py-1 text-xs bg-muted border rounded font-mono">
                      {shortcut.key}
                    </kbd>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
