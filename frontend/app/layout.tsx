import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ToastContainer } from '@/components/simple-toast'
// import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Krishna Tokenizer - Advanced Text Tokenization Platform',
  description: 'Enterprise-grade text tokenization with multiple algorithms, compression analysis, and real-time visualization.',
  keywords: ['tokenization', 'NLP', 'text processing', 'compression', 'analysis'],
  authors: [{ name: 'Krishna Tokenizer Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  )
}
