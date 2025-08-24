import { Project } from '@/types'

export async function getPublishedProjects (): Promise<Project[]> {
  try {
    const response = await fetch('/api/projects')
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }

    const data = await response.json()
    return data.projects || []
  } catch (error) {
    console.error('Failed to fetch published projects:', error)
    return []
  }
}
