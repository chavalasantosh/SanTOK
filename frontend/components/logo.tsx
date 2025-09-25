'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className, showText = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl'
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {/* Logo Icon */}
      <motion.div
        className={cn(
          "relative rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center shadow-lg",
          sizeClasses[size]
        )}
        whileHover={{ 
          scale: 1.05,
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Main logo symbol - stylized "S" with tokenization elements */}
        <div className="relative z-10">
          <motion.svg
            viewBox="0 0 24 24"
            className="w-3/4 h-3/4 text-primary-foreground"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Stylized S with tokenization dots */}
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
            {/* Tokenization dots */}
            <circle cx="8" cy="8" r="1" fill="currentColor" opacity="0.7" />
            <circle cx="16" cy="8" r="1" fill="currentColor" opacity="0.7" />
            <circle cx="8" cy="16" r="1" fill="currentColor" opacity="0.7" />
            <circle cx="16" cy="16" r="1" fill="currentColor" opacity="0.7" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.9" />
          </motion.svg>
        </div>

        {/* Floating particles effect */}
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-white/60 rounded-full"
          animate={{
            y: [0, -4, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white/40 rounded-full"
          animate={{
            y: [0, 3, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1
          }}
        />
      </motion.div>

      {/* Logo Text */}
      {showText && (
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className={cn(
            "font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent",
            textSizeClasses[size]
          )}>
            SanTOK
          </h1>
          <p className={cn(
            "text-muted-foreground font-medium",
            size === 'sm' ? 'text-xs' : size === 'md' ? 'text-xs' : 'text-sm'
          )}>
            Advanced Text Processing
          </p>
        </motion.div>
      )}
    </div>
  )
}
