'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { 
  Menu, 
  Sun, 
  Moon, 
  Monitor, 
  Settings, 
  Download,
  Upload,
  Search,
  Keyboard
} from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { useTheme } from 'next-themes'

interface HeaderProps {
  onMenuClick: () => void
  onShortcutsClick?: () => void
}

export function Header({ onMenuClick, onShortcutsClick }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const { liveMode, setLiveMode, searchQuery, setSearchQuery } = useAppStore()
  const [showSearch, setShowSearch] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = () => {
    if (!mounted) return
    
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  // Move all hooks before conditional return
  const getThemeIcon = () => {
    if (!mounted) return <Monitor className="h-4 w-4" />
    
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  if (!mounted) {
    return (
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onMenuClick}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary/10 rounded-lg animate-pulse" />
              <div className="space-y-1">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                <div className="h-3 w-16 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-9 w-32 bg-muted animate-pulse rounded" />
            <div className="h-9 w-9 bg-muted animate-pulse rounded" />
            <div className="h-9 w-9 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </motion.header>
    )
  }


  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between px-3 sm:px-4">
        {/* Left side */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs sm:text-sm">S</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base sm:text-xl font-bold">SanTOK</h1>
              <p className="text-xs text-muted-foreground">Advanced Text Processing</p>
            </div>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-sm sm:max-w-md mx-2 sm:mx-4">
          {showSearch ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tokens..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-10 pr-4 py-1 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  autoFocus
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(false)}
                className="h-9 w-9 p-0"
              >
                ×
              </Button>
            </motion.div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSearch(true)}
              className="w-full justify-start text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Search className="h-4 w-4 mr-2" />
              Search tokens...
            </Button>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          {/* Live Mode Toggle */}
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Live</span>
            <Switch
              checked={liveMode}
              onCheckedChange={setLiveMode}
              className="data-[state=checked]:bg-green-500"
            />
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeChange}
            title={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
          >
            {getThemeIcon()}
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon" title="Settings">
            <Settings className="h-4 w-4" />
          </Button>

          {/* Export */}
          <Button variant="ghost" size="icon" title="Export">
            <Download className="h-4 w-4" />
          </Button>

          {/* Import */}
          <Button variant="ghost" size="icon" title="Import">
            <Upload className="h-4 w-4" />
          </Button>

          {/* Keyboard Shortcuts */}
          <Button 
            variant="ghost" 
            size="icon" 
            title="Keyboard Shortcuts (Ctrl/Cmd + ?)"
            onClick={onShortcutsClick}
          >
            <Keyboard className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
