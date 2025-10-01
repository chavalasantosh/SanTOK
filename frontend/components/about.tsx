'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Code, 
  Zap, 
  Shield, 
  Globe, 
  BarChart3,
  FileText,
  Download,
  Star,
  Users,
  Award
} from 'lucide-react'

export function About() {
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

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <Star className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Enterprise-Grade Tokenization</span>
        </div>
        
        <h1 className="text-4xl font-bold text-foreground">
          About{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SanTOK
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          SanTOK is a universal tokenization framework designed for modern text processing needs. 
          Built with performance and flexibility in mind, it provides powerful tokenization algorithms 
          for developers, researchers, and enterprises.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow duration-300">
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

      {/* Tokenizers Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Tokenization Algorithms</span>
          </CardTitle>
          <CardDescription>
            Choose from our comprehensive suite of tokenization methods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tokenizers.map((tokenizer, index) => (
              <div key={tokenizer.type} className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{tokenizer.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {tokenizer.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {tokenizer.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
            <Code className="h-6 w-6 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">4</div>
          <div className="text-sm text-muted-foreground">Tokenizer Types</div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
            <Globe className="h-6 w-6 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">Multiple</div>
          <div className="text-sm text-muted-foreground">Languages Supported</div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">Fast</div>
          <div className="text-sm text-muted-foreground">Processing Speed</div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">Yes</div>
          <div className="text-sm text-muted-foreground">Perfect Reconstruction</div>
        </div>
      </div>

      {/* Footer */}
      <Card>
        <CardContent className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Trusted by developers worldwide
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 SanTOK Tokenization Framework. All rights reserved.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}