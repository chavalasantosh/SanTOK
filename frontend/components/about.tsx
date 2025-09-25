'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Github, 
  ExternalLink, 
  BookOpen, 
  Code, 
  Zap,
  Shield,
  Layers,
  BarChart3,
  FileText,
  Download,
  Play
} from 'lucide-react'

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "High Performance",
    description: "Optimized algorithms for fast tokenization with minimal memory usage"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Enterprise Grade",
    description: "Robust, scalable solution designed for production environments"
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Multiple Algorithms",
    description: "Support for 9 different tokenization strategies and compression methods"
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Real-time Analytics",
    description: "Live performance metrics and compression analysis with visualizations"
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Universal File Support",
    description: "Process text, JSON, CSV, and PDF files with drag-and-drop interface"
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Developer Friendly",
    description: "Clean API, comprehensive documentation, and easy integration"
  }
]

const tokenizerTypes = [
  { name: "Character", description: "Tokenize by individual characters" },
  { name: "Word", description: "Split by word boundaries" },
  { name: "Space", description: "Tokenize using whitespace as delimiter" },
  { name: "Subword", description: "Advanced subword tokenization" },
  { name: "Grammar", description: "Linguistic grammar-based tokenization" },
  { name: "Syllable", description: "Syllable-based tokenization" },
  { name: "Byte", description: "Byte-level tokenization" },
  { name: "BPE", description: "Byte Pair Encoding algorithm" },
  { name: "Frequency", description: "Frequency-based tokenization" }
]

const techStack = [
  { name: "Next.js 14", description: "React framework with App Router" },
  { name: "TypeScript", description: "Type-safe development" },
  { name: "Tailwind CSS", description: "Utility-first styling" },
  { name: "shadcn/ui", description: "Beautiful component library" },
  { name: "Framer Motion", description: "Smooth animations" },
  { name: "Recharts", description: "Data visualization" },
  { name: "Zustand", description: "State management" },
  { name: "FastAPI", description: "High-performance backend API" }
]

export function About() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">K</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold">Krishna Tokenizer</h1>
            <p className="text-muted-foreground">Advanced Text Processing Platform</p>
          </div>
        </div>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Enterprise-grade text tokenization with multiple algorithms, real-time compression analysis, 
          and comprehensive performance monitoring. Built for developers who need reliable, 
          scalable text processing solutions.
        </p>
        
        <div className="flex items-center justify-center space-x-4">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            v1.0.0
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1">
            Production Ready
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1">
            Open Source
          </Badge>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tokenizer Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">Supported Tokenizers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokenizerTypes.map((tokenizer, index) => (
            <motion.div
              key={tokenizer.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{tokenizer.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      Available
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {tokenizer.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Card className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{tech.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {tech.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Performance Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">Performance Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-sm text-muted-foreground">Tokens/Second</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">&lt;50ms</div>
              <p className="text-sm text-muted-foreground">Average Latency</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">9</div>
              <p className="text-sm text-muted-foreground">Tokenizer Types</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Getting Started */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start tokenizing text immediately with our intuitive interface, or integrate 
              our API into your applications for production use.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="w-full sm:w-auto">
                <Play className="h-4 w-4 mr-2" />
                Try Demo
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <BookOpen className="h-4 w-4 mr-2" />
                View Documentation
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Github className="h-4 w-4 mr-2" />
                View Source
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center space-y-4 pt-8 border-t"
      >
        <p className="text-muted-foreground">
          Built with ❤️ for the developer community
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Contact Support
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2024 Krishna Tokenizer. All rights reserved.
        </p>
      </motion.div>
    </div>
  )
}
