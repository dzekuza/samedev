import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST () {
  try {
    // Reset the database by dropping and recreating the table
    const resetQueries = [
      // Drop triggers
      'DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;',
      'DROP TRIGGER IF EXISTS UPDATE_PROJECTS_UPDATED_AT ON projects;',
      'DROP TRIGGER IF EXISTS UPDATE_PROJECTS_UPDATED_AT ON PROJECTS;',
      
      // Drop functions
      'DROP FUNCTION IF EXISTS update_updated_at_column();',
      'DROP FUNCTION IF EXISTS UPDATE_UPDATED_AT_COLUMN();',
      
      // Drop policies
      'DROP POLICY IF EXISTS "Allow all operations" ON projects;',
      'DROP POLICY IF EXISTS "Allow all operations" ON PROJECTS;',
      
      // Drop tables
      'DROP TABLE IF EXISTS projects;',
      'DROP TABLE IF EXISTS PROJECTS;',
      
      // Drop indexes
      'DROP INDEX IF EXISTS idx_projects_status;',
      'DROP INDEX IF EXISTS idx_projects_featured;',
      'DROP INDEX IF EXISTS idx_projects_order;',
      'DROP INDEX IF EXISTS idx_projects_created_at;',
      'DROP INDEX IF EXISTS IDX_PROJECTS_STATUS;',
      'DROP INDEX IF EXISTS IDX_PROJECTS_FEATURED;',
      'DROP INDEX IF EXISTS IDX_PROJECTS_ORDER;',
      'DROP INDEX IF EXISTS IDX_PROJECTS_CREATED_AT;',
      
      // Create table with correct schema
      `CREATE TABLE projects (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(500) NOT NULL,
        tags TEXT[] NOT NULL DEFAULT '{}',
        status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
        featured BOOLEAN NOT NULL DEFAULT false,
        "order" INTEGER NOT NULL DEFAULT 0,
        client VARCHAR(255),
        category VARCHAR(100),
        technologies TEXT[] DEFAULT '{}',
        live_url VARCHAR(500),
        github_url VARCHAR(500),
        case_study TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );`,
      
      // Create indexes
      'CREATE INDEX idx_projects_status ON projects(status);',
      'CREATE INDEX idx_projects_featured ON projects(featured);',
      'CREATE INDEX idx_projects_order ON projects("order");',
      'CREATE INDEX idx_projects_created_at ON projects(created_at);',
      
      // Enable RLS
      'ALTER TABLE projects ENABLE ROW LEVEL SECURITY;',
      
      // Create policy
      'CREATE POLICY "Allow all operations" ON projects FOR ALL USING (true);',
      
      // Create function
      `CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ language 'plpgsql';`,
      
      // Create trigger
      'CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();'
    ]

    // Execute each query
    for (const query of resetQueries) {
      const { error } = await supabase.rpc('exec_sql', { sql: query })
      if (error) {
        console.error('Error executing query:', query, error)
        // Continue with other queries even if one fails
      }
    }

    return NextResponse.json({ message: 'Database reset completed successfully' })
  } catch (error) {
    console.error('Failed to reset database:', error)
    return NextResponse.json(
      { error: 'Failed to reset database' },
      { status: 500 }
    )
  }
}
