'use client'

import { useState, useEffect } from 'react'
import { Project } from '@/types'
import { getProjects } from '@/lib/projects'
import { AdminHeader } from '@/components/admin/admin-header'
import { AdminLayout } from '@/components/admin/admin-layout'
import { BarChart3, Eye, Star, Calendar, Tag } from 'lucide-react'

export default function AdminAnalyticsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  const getAnalytics = () => {
    const totalProjects = projects.length
    const publishedProjects = projects.filter(p => p.status === 'published').length
    const featuredProjects = projects.filter(p => p.featured).length
    const draftProjects = projects.filter(p => p.status === 'draft').length
    const archivedProjects = projects.filter(p => p.status === 'archived').length

    // Get unique tags
    const allTags = projects.flatMap(p => p.tags)
    const uniqueTags = Array.from(new Set(allTags))
    const tagCounts = uniqueTags.map(tag => ({
      tag,
      count: allTags.filter(t => t === tag).length
    })).sort((a, b) => b.count - a.count).slice(0, 10)

    // Get unique technologies
    const allTechnologies = projects.flatMap(p => p.technologies || [])
    const uniqueTechnologies = Array.from(new Set(allTechnologies))
    const technologyCounts = uniqueTechnologies.map(tech => ({
      technology: tech,
      count: allTechnologies.filter(t => t === tech).length
    })).sort((a, b) => b.count - a.count).slice(0, 10)

    // Recent projects (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const recentProjects = projects.filter(p => new Date(p.created_at) > thirtyDaysAgo).length

    return {
      totalProjects,
      publishedProjects,
      featuredProjects,
      draftProjects,
      archivedProjects,
      tagCounts,
      technologyCounts,
      recentProjects
    }
  }

  const analytics = getAnalytics()

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader 
          title="Analytics Dashboard"
          description="Overview of your portfolio performance"
        />
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalProjects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.publishedProjects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.featuredProjects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recent (30d)</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.recentProjects}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Published</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(analytics.publishedProjects / analytics.totalProjects) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{analytics.publishedProjects}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Draft</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${(analytics.draftProjects / analytics.totalProjects) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{analytics.draftProjects}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Archived</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-gray-500 h-2 rounded-full" 
                      style={{ width: `${(analytics.archivedProjects / analytics.totalProjects) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{analytics.archivedProjects}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Tags</h3>
            <div className="space-y-2">
              {analytics.tagCounts.map((tagData, index) => (
                <div key={tagData.tag} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{tagData.tag}</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(tagData.count / Math.max(...analytics.tagCounts.map(t => t.count))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{tagData.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technologies Used */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies Used</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {analytics.technologyCounts.map((techData) => (
              <div key={techData.technology} className="text-center p-3 bg-gray-50 rounded-lg">
                <Tag className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">{techData.technology}</p>
                <p className="text-xs text-gray-600">{techData.count} projects</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
