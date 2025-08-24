'use client'

import { useState, useEffect } from 'react'
import { Project } from '@/types'
import { getProjects } from '@/lib/projects'
import { AdminHeader } from '@/components/admin/admin-header'
import { ProjectsTable } from '@/components/admin/projects-table'
import { ProjectForm } from '@/components/admin/project-form'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Plus, Loader2, Filter } from 'lucide-react'

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, statusFilter, searchTerm])

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

  const filterProjects = () => {
    let filtered = projects

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredProjects(filtered)
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

  const getStatusCounts = () => {
    const counts = {
      all: projects.length,
      published: projects.filter(p => p.status === 'published').length,
      draft: projects.filter(p => p.status === 'draft').length,
      archived: projects.filter(p => p.status === 'archived').length
    }
    return counts
  }

  const statusCounts = getStatusCounts()

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
          title="Projects Management"
          description="Create, edit, and manage your portfolio projects"
        />
        
        {/* Stats and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-900">{statusCounts.all}</div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">{statusCounts.published}</div>
            <div className="text-sm text-gray-600">Published</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.draft}</div>
            <div className="text-sm text-gray-600">Drafts</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-600">{statusCounts.archived}</div>
            <div className="text-sm text-gray-600">Archived</div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <Button onClick={handleCreateProject} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>

        <ProjectsTable 
          projects={filteredProjects}
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
