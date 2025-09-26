'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { Dashboard } from '@/components/dashboard'
import { CompressionExplorer } from '@/components/compression-explorer'
import { PerformanceLab } from '@/components/performance-lab'
import { About } from '@/components/about'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { KeyboardShortcuts } from '@/components/keyboard-shortcuts'
import { cn } from '@/lib/utils'

type Page = 'dashboard' | 'compression' | 'performance' | 'about'

export default function Home() {
  const [activePage, setActivePage] = useState<Page>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)

  // Set sidebar open by default on desktop and keep it open
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setSidebarOpen(true)
      }
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Keep sidebar open when navigating between pages on desktop
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true)
    }
  }, [activePage])

  // Enable keyboard shortcuts
  useKeyboardShortcuts()

  // Handle keyboard shortcuts for shortcuts modal and sidebar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === '?') {
        event.preventDefault()
        setShowShortcuts(true)
      }
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault()
        setSidebarOpen(!sidebarOpen)
      }
      if (event.key === 'Escape') {
        setShowShortcuts(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen])

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />
      case 'compression':
        return <CompressionExplorer />
      case 'performance':
        return <PerformanceLab />
      case 'about':
        return <About />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        onShortcutsClick={() => setShowShortcuts(true)}
      />
      
      <div className="flex min-h-screen">
        <Sidebar 
          activePage={activePage}
          onPageChange={setActivePage}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className={cn(
          "flex-1 min-h-screen transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:ml-64" : "lg:ml-0"
        )}>
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {renderPage()}
          </motion.div>
        </main>
      </div>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcuts 
        isOpen={showShortcuts} 
        onClose={() => setShowShortcuts(false)} 
      />
    </div>
  )
}
