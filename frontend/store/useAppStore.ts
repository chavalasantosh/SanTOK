'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TokenizationResult, TokenizerOptions, Theme, ViewMode, PerformanceMetrics, ComparisonResult } from '@/types'

interface AppState {
  // Theme
  theme: Theme
  setTheme: (theme: Theme) => void
  
  // Current tokenization
  currentResult: TokenizationResult | null
  setCurrentResult: (result: TokenizationResult | null) => void
  
  // Tokenizer options
  tokenizerOptions: TokenizerOptions
  setTokenizerOptions: (options: Partial<TokenizerOptions>) => void
  
  // View mode
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  
  // Performance history
  performanceHistory: PerformanceMetrics[]
  addPerformanceMetric: (metric: PerformanceMetrics) => void
  clearPerformanceHistory: () => void
  
  // Comparison mode
  comparisonResults: ComparisonResult | null
  setComparisonResults: (results: ComparisonResult | null) => void
  
  // Live mode
  liveMode: boolean
  setLiveMode: (enabled: boolean) => void
  
  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void
  
  // UI state
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  
  // Loading states
  isProcessing: boolean
  setIsProcessing: (loading: boolean) => void
  
  // Error handling
  error: string | null
  setError: (error: string | null) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      
      // Current tokenization
      currentResult: null,
      setCurrentResult: (result) => set({ currentResult: result }),
      
      // Tokenizer options
      tokenizerOptions: {
        tokenizerType: 'word',
        lowercase: false,
        dropSpecials: false,
        collapseRepeats: 1,
        enableEmbedding: false,
        seed: undefined,
        embeddingBit: undefined,
      },
      setTokenizerOptions: (options) => 
        set((state) => ({
          tokenizerOptions: { ...state.tokenizerOptions, ...options }
        })),
      
      // View mode
      viewMode: 'text',
      setViewMode: (mode) => set({ viewMode: mode }),
      
      // Performance history
      performanceHistory: [],
      addPerformanceMetric: (metric) =>
        set((state) => ({
          performanceHistory: [...state.performanceHistory, metric].slice(-100) // Keep last 100
        })),
      clearPerformanceHistory: () => set({ performanceHistory: [] }),
      
      // Comparison mode
      comparisonResults: null,
      setComparisonResults: (results) => set({ comparisonResults: results }),
      
      // Live mode
      liveMode: false,
      setLiveMode: (enabled) => set({ liveMode: enabled }),
      
      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      // UI state
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      // Loading states
      isProcessing: false,
      setIsProcessing: (loading) => set({ isProcessing: loading }),
      
      // Error handling
      error: null,
      setError: (error) => set({ error }),
    }),
    {
      name: 'SanTOK-tokenizer-storage',
      partialize: (state) => ({
        theme: state.theme,
        tokenizerOptions: state.tokenizerOptions,
        viewMode: state.viewMode,
        performanceHistory: state.performanceHistory,
        liveMode: state.liveMode,
      }),
    }
  )
)
