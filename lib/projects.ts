import { Project, ProjectFormData } from '@/types'
import { supabase } from './supabase'

export async function getProjects (): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true })

    if (error) {
      console.error('Error fetching projects:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    throw error
  }
}

export async function getProject (id: string): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching project:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Failed to fetch project:', error)
    throw error
  }
}

export async function createProject(data: ProjectFormData): Promise<Project> {
  try {
    // Get the next order number
    const { data: maxOrderData } = await supabase
      .from('projects')
      .select('order')
      .order('order', { ascending: false })
      .limit(1)

    const nextOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].order + 1 : 1

    const { data: newProject, error } = await supabase
      .from('projects')
      .insert([{ ...data, order: nextOrder }])
      .select()
      .single()

    if (error) {
      console.error('Error creating project:', error)
      throw error
    }

    return newProject
  } catch (error) {
    console.error('Failed to create project:', error)
    throw error
  }
}

export async function updateProject(id: string, data: Partial<ProjectFormData>): Promise<Project | null> {
  try {
    const { data: updatedProject, error } = await supabase
      .from('projects')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating project:', error)
      throw error
    }

    return updatedProject
  } catch (error) {
    console.error('Failed to update project:', error)
    throw error
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting project:', error)
      throw error
    }

    return true
  } catch (error) {
    console.error('Failed to delete project:', error)
    throw error
  }
}

export async function reorderProjects(projectIds: string[]): Promise<Project[]> {
  try {
    // Update each project's order
    const updates = projectIds.map((id, index) => ({
      id,
      order: index + 1
    }))

    const { data, error } = await supabase
      .from('projects')
      .upsert(updates, { onConflict: 'id' })
      .select()
      .order('order', { ascending: true })

    if (error) {
      console.error('Error reordering projects:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Failed to reorder projects:', error)
    throw error
  }
}

export async function toggleProjectFeatured(id: string, featured: boolean): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update({ featured })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error toggling project featured status:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Failed to toggle project featured status:', error)
    throw error
  }
}

// Helper function to create storage bucket
export async function createStorageBucket(): Promise<void> {
  try {
    const { error } = await supabase.storage.createBucket('project-images', {
      public: true,
      allowedMimeTypes: ['image/*'],
      fileSizeLimit: 5242880 // 5MB
    })

    if (error && error.message !== 'Bucket already exists') {
      console.error('Error creating storage bucket:', error)
      throw error
    }

    console.log('Storage bucket created successfully')
  } catch (error) {
    console.error('Failed to create storage bucket:', error)
    throw error
  }
}

// Helper function to seed initial data
export async function seedProjects(): Promise<void> {
  try {
    const initialProjects = [
      {
        title: 'PriceHubble',
        description: 'Redesigned the enterprise real estate experience across 10 countries. Launched a new product during a market crisis, helping secure several million euros in client deals.',
        image: '/936fa0fce697440312f7a29c2fc9648552c5ec56.jpg',
        tags: ['Product Design', 'PropTech', 'Design Systems', 'B2B'],
        status: 'published' as const,
        featured: true,
        order: 1,
        client: 'PriceHubble',
        category: 'Enterprise',
        technologies: ['React', 'TypeScript', 'Figma'],
        live_url: 'https://pricehubble.com'
      },
      {
        title: 'Realtify',
        description: 'Created a brand and new products for a real estate startup, which was acquired by the leading EU PropTech company within a year.',
        image: '/936fa0fce697440312f7a29c2fc9648552c5ec56.jpg',
        tags: ['Branding', 'Product Design', 'PropTech', 'B2B'],
        status: 'published' as const,
        featured: true,
        order: 2,
        client: 'Realtify',
        category: 'Startup',
        technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
        live_url: 'https://realtify.com'
      },
      {
        title: 'Oxygen',
        description: 'Applying static brand direction to an interactive mobile experience for US fintech. $20M raised after redesign, $45M in total.',
        image: '/936fa0fce697440312f7a29c2fc9648552c5ec56.jpg',
        tags: ['Branding', 'App', 'Motion', 'Fintech'],
        status: 'published' as const,
        featured: false,
        order: 3,
        client: 'Oxygen',
        category: 'Fintech',
        technologies: ['React Native', 'TypeScript', 'Lottie'],
        live_url: 'https://oxygen.com'
      }
    ]

    const { error } = await supabase
      .from('projects')
      .insert(initialProjects)

    if (error) {
      console.error('Error seeding projects:', error)
      throw error
    }

    console.log('Projects seeded successfully')
  } catch (error) {
    console.error('Failed to seed projects:', error)
    throw error
  }
}
