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
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 bg-background border-r shadow-lg",
          "lg:fixed lg:left-0 lg:top-16 lg:h-[calc(100vh-4rem)] lg:z-40 lg:block",
          "flex flex-col transition-all duration-300 ease-in-out"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
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
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-auto p-3 transition-all duration-200 rounded-md",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-muted/50 hover:text-foreground"
                )}
                onClick={() => {
                  onPageChange(item.id)
                  // Only close sidebar on mobile, keep it open on desktop
                  if (window.innerWidth < 1024) {
                    onClose()
                  }
                }}
              >
                <Icon className={cn(
                  "h-4 w-4 mr-3 transition-colors duration-200",
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                )} />
                <div className="flex flex-col items-start">
                  <span className="font-medium text-sm">{item.name}</span>
                  <span className={cn(
                    "text-xs transition-opacity duration-200",
                    isActive ? "opacity-90" : "opacity-70"
                  )}>
                    {item.description}
                  </span>
                </div>
              </Button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start h-auto p-3 transition-all duration-200 rounded-md hover:bg-muted/50 hover:text-foreground"
              onClick={() => {
                console.log('Documentation clicked');
              }}
            >
              <FileText className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="font-medium text-sm">Documentation</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-auto p-3 transition-all duration-200 rounded-md hover:bg-muted/50 hover:text-foreground"
              onClick={() => {
                console.log('API Reference clicked');
              }}
            >
              <BookOpen className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="font-medium text-sm">API Reference</span>
            </Button>
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <p className="text-sm font-semibold text-foreground">
              SanTOK v1.0.0
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Enterprise-grade text processing
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
