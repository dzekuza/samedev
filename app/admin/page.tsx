'use client'

import { useState, useEffect } from 'react'
import { Project } from '@/types'
import { getProjects } from '@/lib/projects'
import { AdminHeader } from '@/components/admin/admin-header'
import { ProjectsTable } from '@/components/admin/projects-table'
import { ProjectForm } from '@/components/admin/project-form'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Plus, Loader2 } from 'lucide-react'

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setIsLoading(true)
      const data = await getProjects()
      setProjects(data)
    } catch (error) {
      console.error('Failed to load projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleCreateProject = () => {
    setEditingProject(null)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProject(null)
  }

  const handleProjectSaved = () => {
    loadProjects()
    handleFormClose()
  }

  const handleProjectDeleted = () => {
    loadProjects()
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader 
          title="Projects Dashboard"
          description="Manage your portfolio projects"
        />
        
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              All Projects ({projects.length})
            </h2>
            <p className="text-sm text-gray-600">
              Create, edit, and manage your portfolio projects
            </p>
          </div>
          
          <Button onClick={handleCreateProject} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>

        <ProjectsTable 
          projects={projects}
          onEdit={handleEditProject}
          onDelete={handleProjectDeleted}
          onReorder={loadProjects}
        />

        {showForm && (
          <ProjectForm
            project={editingProject}
            onSave={handleProjectSaved}
            onCancel={handleFormClose}
          />
        )}
      </div>
    </AdminLayout>
  )
}
