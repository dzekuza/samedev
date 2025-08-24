import { NextResponse } from 'next/server'
import { seedProjects, createStorageBucket } from '@/lib/projects'

export async function POST () {
  try {
    // Create storage bucket
    await createStorageBucket()
    
    // Seed initial projects
    await seedProjects()
    
    return NextResponse.json({ message: 'Database and storage setup completed successfully' })
  } catch (error) {
    console.error('Failed to setup database:', error)
    return NextResponse.json(
      { error: 'Failed to setup database' },
      { status: 500 }
    )
  }
}
