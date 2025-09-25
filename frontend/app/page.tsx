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

type Page = 'dashboard' | 'compression' | 'performance' | 'about'

export default function Home() {
  const [activePage, setActivePage] = useState<Page>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)

  // Enable keyboard shortcuts
  useKeyboardShortcuts()

  // Handle keyboard shortcuts for shortcuts modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === '?') {
        event.preventDefault()
        setShowShortcuts(true)
      }
      if (event.key === 'Escape') {
        setShowShortcuts(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

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
      
      <div className="flex">
        <Sidebar 
          activePage={activePage}
          onPageChange={setActivePage}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 lg:ml-64">
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
