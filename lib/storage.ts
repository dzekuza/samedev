import { supabase } from './supabase'

export async function uploadImage (file: File, bucket: string = 'project-images'): Promise<string> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      throw new Error('Failed to upload image')
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    return publicUrl
  } catch (error) {
    console.error('Storage upload failed:', error)
    throw error
  }
}

export async function deleteImage (url: string, bucket: string = 'project-images'): Promise<void> {
  try {
    // Extract filename from URL
    const fileName = url.split('/').pop()
    if (!fileName) return

    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName])

    if (error) {
      console.error('Delete error:', error)
      throw new Error('Failed to delete image')
    }
  } catch (error) {
    console.error('Storage delete failed:', error)
    throw error
  }
}

export function getImageUrl (path: string, bucket: string = 'project-images'): string {
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return publicUrl
}
