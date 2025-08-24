# Database Schema Fix

## Issue

The database schema was created with uppercase column names, but the application
expects lowercase column names. This causes errors like:

```
"Could not find the 'category' column of 'projects' in the schema cache"
```

## Solution

### Option 1: Manual SQL Fix (Recommended)

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the following SQL commands to fix the schema:

```sql
-- Drop the existing table and recreate it with correct column names
DROP TABLE IF EXISTS projects CASCADE;

-- Create the table with correct lowercase column names
CREATE TABLE projects (
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
);

-- Create indexes
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_order ON projects("order");
CREATE INDEX idx_projects_created_at ON projects(created_at);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Allow all operations" ON projects FOR ALL USING (true);

-- Create function for updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Option 2: Using the Admin Interface

1. Start your development server: `npm run dev`
2. Navigate to `/admin/setup`
3. Click "Reset Database" to recreate the table with correct schema
4. Click "Setup Database" to seed with sample data

### Option 3: Drop and Recreate (Nuclear Option)

If the above doesn't work, you can completely reset your database:

1. Go to Supabase dashboard
2. Navigate to Table Editor
3. Delete the `projects` table completely
4. Run the setup process again

## Verification

After fixing the schema, verify it's working by:

1. Creating a new project in the admin dashboard
2. Checking that all fields save correctly
3. Viewing the project in the projects list

## Column Mapping

The correct column names should be:

- `id` (not `ID`)
- `title` (not `TITLE`)
- `description` (not `DESCRIPTION`)
- `image` (not `IMAGE`)
- `tags` (not `TAGS`)
- `status` (not `STATUS`)
- `featured` (not `FEATURED`)
- `order` (not `ORDER`)
- `client` (not `CLIENT`)
- `category` (not `CATEGORY`)
- `technologies` (not `TECHNOLOGIES`)
- `live_url` (not `LIVE_URL`)
- `github_url` (not `GITHUB_URL`)
- `case_study` (not `CASE_STUDY`)
- `created_at` (not `CREATED_AT`)
- `updated_at` (not `UPDATED_AT`)

## Prevention

To prevent this issue in the future:

1. Always use lowercase column names in PostgreSQL
2. Use snake_case for column names (e.g., `created_at` not `createdAt`)
3. Test the schema before deploying to production
