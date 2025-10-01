'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Zap, 
  Shield, 
  Globe, 
  Code, 
  BarChart3,
  FileText,
  Download,
  Play,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Award
} from 'lucide-react'

export function Home() {
  const features = [
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Instant tokenization with live updates as you type'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Secure processing with advanced encryption and privacy protection'
    },
    {
      icon: Globe,
      title: 'Multi-language Support',
      description: 'Supports multiple languages with intelligent character encoding'
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description: 'RESTful API with comprehensive documentation'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Detailed performance metrics and analysis'
    },
    {
      icon: FileText,
      title: 'Multiple Formats',
      description: 'Support for TXT, JSON, CSV, and other file formats'
    }
  ]

  const tokenizers = [
    { name: 'Whitespace', type: 'whitespace', description: 'Split by whitespace delimiters' },
    { name: 'Word', type: 'word', description: 'Word-based tokenization' },
    { name: 'Character', type: 'character', description: 'Character-level tokenization' },
    { name: 'Subword', type: 'subword', description: 'Subword tokenization' }
  ]

  const stats = [
    { label: 'Tokenizer Types', value: '4', icon: Code },
    { label: 'Languages Supported', value: 'Multiple', icon: Globe },
    { label: 'Processing Speed', value: 'Fast', icon: Zap },
    { label: 'Perfect Reconstruction', value: 'Yes', icon: BarChart3 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Enterprise-Grade Tokenization</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SanTOK
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The most advanced universal tokenization framework for modern text processing. 
              Transform your text data with powerful tokenization algorithms and real-time analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                <Play className="h-4 w-4 mr-2" />
                Get Started
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                <Download className="h-4 w-4 mr-2" />
                Download SDK
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for professional text processing and analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Tokenizers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">4 Tokenization Algorithms</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive suite of tokenization methods
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tokenizers.map((tokenizer, index) => (
            <Card key={tokenizer.type} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{tokenizer.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {tokenizer.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {tokenizer.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg">
                Join developers using SanTOK for their text processing needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-2">1. Choose Your Tokenizer</h3>
                  <p className="text-sm text-muted-foreground">
                    Select from 4 different tokenization algorithms
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 mb-4">
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">2. Upload Your Text</h3>
                  <p className="text-sm text-muted-foreground">
                    Paste text or upload files in multiple formats
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 mb-4">
                    <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-2">3. Analyze Results</h3>
                  <p className="text-sm text-muted-foreground">
                    View detailed analytics and export your data
                  </p>
                </div>
              </div>
              
              <div className="pt-6">
                <Button size="lg" className="group">
                  <Play className="h-4 w-4 mr-2" />
                  Start Tokenizing Now
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Trusted by developers worldwide
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 SanTOK Tokenization Framework. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}