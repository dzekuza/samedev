import { seedProjects, createStorageBucket } from '../lib/projects'

async function setupDatabase () {
  try {
    console.log('Setting up database...')
    
    // Create storage bucket
    console.log('Creating storage bucket...')
    await createStorageBucket()
    
    // Seed initial projects
    console.log('Seeding projects...')
    await seedProjects()
    
    console.log('Database setup completed successfully!')
  } catch (error) {
    console.error('Database setup failed:', error)
    process.exit(1)
  }
}

setupDatabase()
