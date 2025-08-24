'use client'

import { useState } from 'react'
import { Image as ImageIcon, X } from 'lucide-react'

interface ImagePreviewProps {
  src: string
  alt: string
  className?: string
  fallback?: string
}

export function ImagePreview({ src, alt, className = '', fallback }: ImagePreviewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError || !src) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <ImageIcon className="h-6 w-6 text-gray-400" />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover rounded-lg ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
      />
    </div>
  )
}
