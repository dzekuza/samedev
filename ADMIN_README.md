# Admin Dashboard

A comprehensive admin dashboard for managing portfolio projects built with
Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎯 Project Management

- **Create Projects**: Add new portfolio projects with comprehensive details
- **Edit Projects**: Modify existing project information
- **Delete Projects**: Remove projects from the portfolio
- **Project Status**: Manage project status (draft, published, archived)
- **Featured Projects**: Mark projects as featured for highlighting
- **Project Ordering**: Control the display order of projects

### 📊 Analytics Dashboard

- **Project Statistics**: View total, published, draft, and archived project
  counts
- **Status Distribution**: Visual representation of project status distribution
- **Tag Analytics**: See most used tags across projects
- **Technology Usage**: Track technologies used in projects
- **Recent Activity**: Monitor projects added in the last 30 days

### 🔍 Advanced Features

- **Search & Filter**: Find projects by title, description, or tags
- **Status Filtering**: Filter projects by publication status
- **Real-time Updates**: Immediate reflection of changes in the UI
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Access the Admin Dashboard

1. Navigate to `/admin` in your browser
2. The dashboard provides a clean, intuitive interface for managing your
   portfolio

### Navigation

- **Dashboard** (`/admin`): Overview of all projects
- **Projects** (`/admin/projects`): Detailed project management with filters
- **Analytics** (`/admin/analytics`): Project statistics and insights
- **Users** (`/admin/users`): User management (coming soon)
- **Settings** (`/admin/settings`): Site configuration (coming soon)

## Project Management

### Adding a New Project

1. Click the "Add Project" button
2. Fill in the required fields:
   - **Title**: Project name
   - **Description**: Project description (minimum 10 characters)
   - **Image URL**: Link to project image
   - **Tags**: Add relevant tags (at least one required)
   - **Status**: Choose draft, published, or archived
   - **Order**: Set display order
   - **Featured**: Toggle featured status

3. Optional fields:
   - **Client**: Client name
   - **Category**: Project category
   - **Technologies**: Technologies used
   - **Live URL**: Link to live project
   - **GitHub URL**: Link to source code
   - **Case Study**: Detailed project information

### Editing a Project

1. Click the edit icon (pencil) next to any project
2. Modify the desired fields
3. Click "Update Project" to save changes

### Deleting a Project

1. Click the delete icon (trash) next to any project
2. Confirm the deletion in the popup dialog

## Data Structure

Projects are stored with the following structure:

```typescript
interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    status: "draft" | "published" | "archived";
    featured: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    client?: string;
    category?: string;
    technologies?: string[];
    liveUrl?: string;
    githubUrl?: string;
    caseStudy?: string;
}
```

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Shadcn UI
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: React hooks
- **Icons**: Lucide React

## File Structure

```
app/admin/
├── page.tsx                 # Main admin dashboard
├── projects/
│   └── page.tsx            # Projects management page
├── analytics/
│   └── page.tsx            # Analytics dashboard
├── users/
│   └── page.tsx            # User management (placeholder)
└── settings/
    └── page.tsx            # Settings (placeholder)

components/admin/
├── admin-layout.tsx        # Admin layout wrapper
├── admin-sidebar.tsx       # Navigation sidebar
├── admin-header.tsx        # Page header component
├── projects-table.tsx      # Projects data table
└── project-form.tsx        # Project creation/editing form

lib/
└── projects.ts            # Project data management

types/
└── index.ts               # TypeScript interfaces
```

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Image upload functionality
- [ ] Bulk operations (delete, status change)
- [ ] Project templates
- [ ] Advanced analytics and reporting
- [ ] Export/import functionality
- [ ] Real-time collaboration
- [ ] API endpoints for external integrations

## Contributing

The admin dashboard is built with modern React patterns and follows the
established code style guidelines. When adding new features:

1. Follow the existing component structure
2. Use TypeScript for type safety
3. Implement proper error handling
4. Add loading states for better UX
5. Ensure responsive design
6. Write clear, descriptive code comments

## Support

For issues or questions about the admin dashboard, please refer to the main
project documentation or create an issue in the repository.
