'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

export function useKeyboardShortcuts() {
  const { 
    liveMode, 
    setLiveMode, 
    viewMode, 
    setViewMode, 
    sidebarOpen, 
    setSidebarOpen 
  } = useAppStore()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts when not typing in input fields
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return
      }

      // Ctrl/Cmd + K - Toggle search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        // Search functionality would be implemented here
        console.log('Search shortcut triggered')
      }

      // Ctrl/Cmd + L - Toggle live mode
      if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
        event.preventDefault()
        setLiveMode(!liveMode)
      }

      // Ctrl/Cmd + B - Toggle sidebar
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault()
        setSidebarOpen(!sidebarOpen)
      }

      // 1, 2, 3 - Switch view modes
      if (event.key === '1') {
        event.preventDefault()
        setViewMode('text')
      } else if (event.key === '2') {
        event.preventDefault()
        setViewMode('tokens')
      } else if (event.key === '3') {
        event.preventDefault()
        setViewMode('ids')
      }

      // Escape - Close sidebar
      if (event.key === 'Escape') {
        setSidebarOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [liveMode, setLiveMode, viewMode, setViewMode, sidebarOpen, setSidebarOpen])
}
