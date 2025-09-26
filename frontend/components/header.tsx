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
import { Logo } from '@/components/logo'

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
            <Logo size="sm" showText={false} />
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
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg"
    >
      <div className="w-full flex h-16 items-center px-4 sm:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Hamburger */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Menu className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30 opacity-0 group-hover:opacity-100"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            </Button>
          </motion.div>

          {/* Desktop Hamburger - Always Visible & Extra Stylish */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="hidden lg:block"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="relative overflow-hidden group bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300"
              title="Toggle Navigation (Ctrl/Cmd + B)"
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Pulsing Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/40"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Main Icon with Special Animation */}
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.15, 1]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <Menu className="h-5 w-5 text-primary" />
              </motion.div>
              
              {/* Sparkle Effect */}
              <motion.div
                className="absolute top-1 right-1 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 1.5
                }}
              />
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="hidden sm:flex items-center space-x-2"
          >
            <Logo size="md" showText={true} />
          </motion.div>
          <div className="sm:hidden flex items-center space-x-2">
            <Logo size="sm" showText={false} />
            <div className="flex flex-col">
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">SanTOK</h1>
              <p className="text-xs text-muted-foreground font-medium">Advanced Text Processing</p>
            </div>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-sm sm:max-w-lg mx-6 sm:mx-12">
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
                  className="w-full h-10 pl-10 pr-4 py-2 text-sm border border-input rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 shadow-sm"
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
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(true)}
                className="w-full justify-start text-muted-foreground hover:text-foreground transition-all duration-300 bg-background/30 hover:bg-background/50 border border-transparent hover:border-input rounded-lg shadow-sm"
              >
                <Search className="h-4 w-4 mr-3" />
                Search tokens...
              </Button>
            </motion.div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2 ml-auto">
          {/* Live Mode Toggle */}
          <motion.div 
            className="hidden sm:flex items-center space-x-2 bg-muted/30 px-2 py-1.5 rounded-lg border border-border/50"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-sm font-medium text-muted-foreground">Live</span>
            <Switch
              checked={liveMode}
              onCheckedChange={setLiveMode}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
            />
          </motion.div>

          {/* Theme Toggle */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeChange}
              title={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
              className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              {getThemeIcon()}
            </Button>
          </motion.div>

          {/* Settings */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button variant="ghost" size="icon" title="Settings" className="hover:bg-primary/10 hover:text-primary transition-all duration-300">
              <Settings className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Export */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button variant="ghost" size="icon" title="Export" className="hover:bg-primary/10 hover:text-primary transition-all duration-300">
              <Download className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Import */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button variant="ghost" size="icon" title="Import" className="hover:bg-primary/10 hover:text-primary transition-all duration-300">
              <Upload className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Keyboard Shortcuts */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              title="Keyboard Shortcuts (Ctrl/Cmd + ?)"
              onClick={onShortcutsClick}
              className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              <Keyboard className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
