# Database Setup Guide

This guide will help you set up your Supabase database for the admin dashboard.

## Prerequisites

1. **Supabase Project**: You should have a Supabase project created
2. **Environment Variables**: Make sure your environment variables are set up
   correctly

## Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://qcvzoriwbyrtpwuhzfho.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjdnpvcml3YnlydHB3dWh6ZmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODcwMTQsImV4cCI6MjA3MTM2MzAxNH0.rnzv-3kaQYdZzzKMG2Zy8JcGwqN-Bqj_qgyk1x7604o
DATABASE_URL=postgresql://postgres:IrDrpmgV9RRiC9qz@db.qcvzoriwbyrtpwuhzfho.supabase.co:5432/postgres
```

## Database Schema

The application uses a single `projects` table with the following structure:

```sql
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
```

## Setup Steps

### Option 1: Using the Admin Interface (Recommended)

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/admin/setup` in your browser

3. Click the "Setup Database" button

4. The system will automatically:
   - Create the projects table
   - Create the storage bucket for images
   - Seed it with sample data
   - Set up all necessary indexes and triggers

### Option 2: Using SQL Editor

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Copy and paste the contents of `database/storage-setup.sql`
5. Run both SQL scripts

### Option 3: Using the Command Line

1. Run the database setup script:
   ```bash
   npm run setup-db
   ```

## Sample Data

The setup will create 3 sample projects:

1. **PriceHubble** - Enterprise real estate platform
2. **Realtify** - Real estate startup
3. **Oxygen** - Fintech mobile app

## Verification

After setup, you can verify everything is working by:

1. Visiting `/admin` - Should show the dashboard with project statistics
2. Visiting `/admin/projects` - Should show the projects table with sample data
3. Visiting `/admin/analytics` - Should show analytics based on the sample data

## Troubleshooting

### Common Issues

1. **"Table doesn't exist" error**
   - Make sure you've run the database setup
   - Check that your environment variables are correct

2. **"Permission denied" error**
   - Ensure Row Level Security (RLS) policies are set up correctly
   - Check that your Supabase anon key has the right permissions

3. **"Connection failed" error**
   - Verify your Supabase URL and keys
   - Check your internet connection

### Reset Database

To reset your database:

1. Go to Supabase dashboard
2. Navigate to Table Editor
3. Delete the `projects` table
4. Run the setup process again

## Security

The database includes:

- **Row Level Security (RLS)**: Enabled on the projects table
- **Input Validation**: All inputs are validated using Zod schemas
- **Type Safety**: Full TypeScript support throughout the application

## Image Uploads

The admin dashboard now supports drag-and-drop image uploads:

### Features

- **Drag & Drop**: Simply drag images onto the upload area
- **File Validation**: Supports PNG, JPG, GIF, and WebP formats
- **Size Limits**: Maximum file size of 5MB
- **Preview**: See uploaded images before saving
- **Storage**: Images are stored in Supabase Storage
- **Fallback**: Can still enter image URLs manually

### Storage Setup

The setup process automatically creates a `project-images` storage bucket with:

- Public read access for displaying images
- Proper security policies
- File type and size restrictions

## Next Steps

After setting up the database:

1. **Customize Projects**: Edit the sample projects or add your own
2. **Upload Images**: Use the drag-and-drop interface to add project images
3. **Configure Authentication**: Set up user authentication if needed
4. **Add More Features**: Extend the admin dashboard with additional
   functionality

## Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify your environment variables
3. Check the Supabase dashboard for any database errors
4. Review the application logs for detailed error information
