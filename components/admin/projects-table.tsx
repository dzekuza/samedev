'use client'

import { useState } from 'react'
import { Project } from '@/types'
import { deleteProject, reorderProjects } from '@/lib/projects'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ImagePreview } from '@/components/ui/image-preview'
import { 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star, 
  StarOff,
  GripVertical,
  ExternalLink
} from 'lucide-react'
import { format } from 'date-fns'

interface ProjectsTableProps {
  projects: Project[]
  onEdit: (project: Project) => void
  onDelete: () => void
  onReorder: () => void
}

export function ProjectsTable({ projects, onEdit, onDelete, onReorder }: ProjectsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    try {
      setDeletingId(id)
      await deleteProject(id)
      onDelete()
    } catch (error) {
      console.error('Failed to delete project:', error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleFeatured = async (project: Project) => {
    try {
      await reorderProjects(projects.map(p => p.id))
      onReorder()
    } catch (error) {
      console.error('Failed to toggle featured status:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <GripVertical className="h-4 w-4 text-gray-400 mr-2" />
                    {project.order}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <ImagePreview
                        src={project.image}
                        alt={project.title}
                        className="h-10 w-10"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {project.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {project.description.substring(0, 60)}...
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleFeatured(project)}
                    className="p-1"
                  >
                    {project.featured ? (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    ) : (
                      <StarOff className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {format(new Date(project.updated_at), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {project.live_url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(project.live_url, '_blank')}
                        className="p-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(project)}
                      className="p-1"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                      disabled={deletingId === project.id}
                      className="p-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
