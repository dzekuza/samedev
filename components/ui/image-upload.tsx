'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { Button } from './button'
import { uploadImage } from '@/lib/storage'

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  onError?: (error: string) => void
  className?: string
  disabled?: boolean
}

export function ImageUpload({ 
  value, 
  onChange, 
  onError, 
  className = '',
  disabled = false 
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(value || null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      onError?.('Please upload an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      onError?.('Image size must be less than 5MB')
      return
    }

    try {
      setIsUploading(true)
      
      // Create preview
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // For now, we'll use a placeholder URL
      // In a real app, you'd upload to Supabase Storage or another service
      const imageUrl = await uploadImageToStorage(file)
      onChange(imageUrl)
      
    } catch (error) {
      console.error('Upload failed:', error)
      onError?.('Failed to upload image')
      setPreview(null)
    } finally {
      setIsUploading(false)
    }
  }, [onChange, onError])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    disabled: disabled || isUploading
  })

  const removeImage = () => {
    setPreview(null)
    onChange('')
  }

  const uploadImageToStorage = async (file: File): Promise<string> => {
    try {
      return await uploadImage(file)
    } catch (error) {
      console.error('Upload failed:', error)
      throw new Error('Failed to upload image to storage')
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Preview */}
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-200"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={removeImage}
            className="absolute top-2 right-2"
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${disabled || isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {isUploading ? (
          <div className="space-y-2">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
            <p className="text-sm text-gray-600">Uploading image...</p>
          </div>
        ) : (
          <div className="space-y-2">
            {isDragActive ? (
              <Upload className="h-8 w-8 mx-auto text-blue-600" />
            ) : (
              <ImageIcon className="h-8 w-8 mx-auto text-gray-400" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">
                {isDragActive ? 'Drop the image here' : 'Upload an image'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* URL Input Fallback */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Or enter image URL
        </label>
        <input
          type="url"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={disabled}
        />
      </div>
    </div>
  )
}
