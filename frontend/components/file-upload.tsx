'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Upload, 
  FileText, 
  File, 
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { toast } from '@/components/notification-toast'

interface FileUploadProps {
  onFileSelect: (content: string) => void
  maxSize?: number
  acceptedTypes?: string[]
}

const DEFAULT_ACCEPTED_TYPES = [
  '.txt',
  '.json', 
  '.csv',
  '.pdf'
]

export function FileUpload({ 
  onFileSelect, 
  maxSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = DEFAULT_ACCEPTED_TYPES
}: FileUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setIsProcessing(true)
    setUploadedFile(file)

    try {
      const content = await readFileContent(file)
      onFileSelect(content)
      toast.success(`File "${file.name}" uploaded successfully`)
    } catch (error) {
      console.error('File upload error:', error)
      toast.error('Failed to read file content')
      setUploadedFile(null)
    } finally {
      setIsProcessing(false)
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxSize,
    accept: {
      'text/plain': ['.txt'],
      'application/json': ['.json'],
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  })

  const readFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        const content = e.target?.result as string
        if (content) {
          resolve(content)
        } else {
          reject(new Error('Failed to read file content'))
        }
      }
      
      reader.onerror = () => {
        reject(new Error('File reading failed'))
      }
      
      if (file.type === 'application/pdf') {
        // For PDF files, we'd need a PDF parser library
        reject(new Error('PDF parsing not implemented yet'))
      } else {
        reader.readAsText(file)
      }
    })
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    onFileSelect('')
  }

  const getFileIcon = (file: File) => {
    if (file.type.includes('text')) return <FileText className="h-8 w-8" />
    if (file.type.includes('json')) return <FileText className="h-8 w-8" />
    if (file.type.includes('csv')) return <FileText className="h-8 w-8" />
    return <File className="h-8 w-8" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (uploadedFile) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-2"
      >
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">
                    {uploadedFile.name}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {formatFileSize(uploadedFile.size)} • {uploadedFile.type}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                className="text-green-600 hover:text-green-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300
          ${isDragActive 
            ? 'border-primary bg-primary/5 scale-105 shadow-lg' 
            : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50 hover:scale-102'
          }
          ${isProcessing ? 'pointer-events-none opacity-50' : ''}
        `}
        role="button"
        tabIndex={0}
        aria-label="Upload file"
        aria-describedby="file-upload-description"
      >
        <input {...getInputProps()} />
        
        <motion.div
          animate={isProcessing ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 1, repeat: isProcessing ? Infinity : 0, ease: "linear" }}
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        </motion.div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium">
            {isProcessing 
              ? 'Processing file...' 
              : isDragActive 
                ? 'Drop the file here...' 
                : 'Drag & drop a file here, or click to select'
            }
          </p>
          <p id="file-upload-description" className="text-xs text-muted-foreground">
            Supports: TXT, JSON, CSV, PDF (max {formatFileSize(maxSize)})
          </p>
        </div>
      </div>

      {/* File Rejection Errors */}
      {fileRejections.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name} className="flex items-center space-x-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{file.name}: {errors[0]?.message}</span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
