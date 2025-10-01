'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'
import { 
  Menu, 
  Search, 
  Settings, 
  Download, 
  Upload, 
  Keyboard,
  Sun,
  Moon,
  Monitor
} from 'lucide-react'
import { useTheme } from 'next-themes'

interface HeaderProps {
  onMenuClick: () => void
  onShortcutsClick: () => void
}

export function Header({ onMenuClick, onShortcutsClick }: HeaderProps) {
  const [mounted, setMounted] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [liveMode, setLiveMode] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Logo size="md" showText={true} />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden relative overflow-hidden group"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
          </Button>

          {/* Desktop Hamburger */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-200 group"
          >
            <Menu className="h-5 w-5 text-primary" />
          </Button>
          
          <div className="hover:scale-105 transition-transform duration-200">
            <Logo size="md" showText={true} />
          </div>
          <div className="sm:hidden flex items-center space-x-2">
            <Logo size="sm" showText={false} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-sm sm:max-w-lg mx-6 sm:mx-12">
          {showSearch ? (
            <div className="flex items-center space-x-2 w-full">
              <Input
                type="text"
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(false)}
                className="px-2"
              >
                ×
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              onClick={() => setShowSearch(true)}
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
            >
              <Search className="h-4 w-4 mr-2" />
              Search tokens...
            </Button>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2 ml-auto">
          {/* Live Mode Toggle */}
          <div className="hidden sm:flex items-center space-x-2 bg-muted/30 px-2 py-1.5 rounded-lg border border-border/50 hover:scale-105 transition-transform duration-200">
            <span className="text-xs text-muted-foreground">Live</span>
            <Switch
              checked={liveMode}
              onCheckedChange={setLiveMode}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
            />
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={cycleTheme}
            className="hover:scale-105 transition-transform duration-200"
          >
            {getThemeIcon()}
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="sm"
            className="hover:scale-105 transition-transform duration-200"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* Export */}
          <Button
            variant="ghost"
            size="sm"
            className="hover:scale-105 transition-transform duration-200"
          >
            <Download className="h-4 w-4" />
          </Button>

          {/* Import */}
          <Button
            variant="ghost"
            size="sm"
            className="hover:scale-105 transition-transform duration-200"
          >
            <Upload className="h-4 w-4" />
          </Button>

          {/* Keyboard Shortcuts */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onShortcutsClick}
            className="hover:scale-105 transition-transform duration-200"
          >
            <Keyboard className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}