import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/lib/storage'

export async function POST (request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    const imageUrl = await uploadImage(file)

    return NextResponse.json({ 
      url: imageUrl,
      message: 'Image uploaded successfully' 
    })
  } catch (error) {
    console.error('Image upload failed:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
