'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  Home, 
  BarChart3, 
  Zap, 
  Info, 
  X,
  FileText,
  Archive,
  Activity,
  BookOpen
} from 'lucide-react'
import { Page } from '@/types'

interface SidebarProps {
  activePage: Page
  onPageChange: (page: Page) => void
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  {
    id: 'dashboard' as Page,
    name: 'Dashboard',
    icon: Home,
    description: 'Main tokenization interface'
  },
  {
    id: 'compression' as Page,
    name: 'Compression Explorer',
    icon: Archive,
    description: 'Compare compression algorithms'
  },
  {
    id: 'performance' as Page,
    name: 'Performance Lab',
    icon: Activity,
    description: 'Benchmark and stress testing'
  },
  {
    id: 'about' as Page,
    name: 'About',
    icon: Info,
    description: 'Learn about SanTOK'
  }
]

export function Sidebar({ activePage, onPageChange, isOpen, onClose }: SidebarProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 bg-background border-r",
          "lg:translate-x-0 lg:static lg:inset-0",
          "flex flex-col"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = activePage === item.id
            
            return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-auto p-3 transition-all duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-muted/50 hover:text-foreground"
                )}
                onClick={() => {
                  onPageChange(item.id)
                  onClose()
                }}
              >
                <Icon className={cn(
                  "h-4 w-4 mr-3 transition-colors duration-200",
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                )} />
                <div className="flex flex-col items-start">
                  <span className="font-medium">{item.name}</span>
                  <span className={cn(
                    "text-xs transition-opacity duration-200",
                    isActive ? "opacity-90" : "opacity-70"
                  )}>
                    {item.description}
                  </span>
                </div>
              </Button>
            </motion.div>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Documentation</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>API Reference</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              SanTOK v1.0.0
            </p>
            <p className="text-xs text-muted-foreground">
              Enterprise-grade text processing
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
