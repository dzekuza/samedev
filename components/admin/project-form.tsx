'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Project, ProjectFormData } from '@/types'
import { createProject, updateProject } from '@/lib/projects'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ImageUpload } from '@/components/ui/image-upload'
import { X, Plus, Loader2 } from 'lucide-react'

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().url('Must be a valid URL'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  status: z.enum(['draft', 'published', 'archived']),
  featured: z.boolean(),
  order: z.number().min(1),
  client: z.string().optional(),
  category: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  liveUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  caseStudy: z.string().optional()
})

interface ProjectFormProps {
  project?: Project | null
  onSave: () => void
  onCancel: () => void
}

export function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [newTechnology, setNewTechnology] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      image: project?.image || '',
      tags: project?.tags || [],
      status: project?.status || 'draft',
      featured: project?.featured || false,
      order: project?.order || 1,
      client: project?.client || '',
      category: project?.category || '',
      technologies: project?.technologies || [],
      live_url: project?.live_url || '',
      github_url: project?.github_url || '',
      case_study: project?.case_study || ''
    }
  })

  const watchedTags = watch('tags')
  const watchedTechnologies = watch('technologies')

  const addTag = () => {
    if (newTag.trim() && !watchedTags?.includes(newTag.trim())) {
      setValue('tags', [...(watchedTags || []), newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setValue('tags', watchedTags?.filter(tag => tag !== tagToRemove) || [])
  }

  const addTechnology = () => {
    if (newTechnology.trim() && !watchedTechnologies?.includes(newTechnology.trim())) {
      setValue('technologies', [...(watchedTechnologies || []), newTechnology.trim()])
      setNewTechnology('')
    }
  }

  const removeTechnology = (techToRemove: string) => {
    setValue('technologies', watchedTechnologies?.filter(tech => tech !== techToRemove) || [])
  }

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true)
      
      if (project) {
        await updateProject(project.id, data)
      } else {
        await createProject(data)
      }
      
      onSave()
    } catch (error) {
      console.error('Failed to save project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {project ? 'Edit Project' : 'Add New Project'}
            </h2>
            <Button variant="ghost" onClick={onCancel} className="p-1">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <Input
                  {...register('title')}
                  placeholder="Project title"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <Textarea
                  {...register('description')}
                  placeholder="Project description"
                  rows={4}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Image *
                </label>
                <ImageUpload
                  value={watch('image')}
                  onChange={(value) => setValue('image', value)}
                  onError={(error) => console.error('Image upload error:', error)}
                  disabled={isSubmitting}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client
                </label>
                <Input
                  {...register('client')}
                  placeholder="Client name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Input
                  {...register('category')}
                  placeholder="e.g., Web App, Mobile App, Design"
                />
              </div>
            </div>

            {/* Settings and URLs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <Select
                  value={watch('status')}
                  onValueChange={(value) => setValue('status', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order *
                </label>
                <Input
                  {...register('order', { valueAsNumber: true })}
                  type="number"
                  min="1"
                  placeholder="1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={watch('featured')}
                  onCheckedChange={(checked) => setValue('featured', checked)}
                />
                <label className="text-sm font-medium text-gray-700">
                  Featured Project
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Live URL
                </label>
                <Input
                  {...register('live_url')}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub URL
                </label>
                <Input
                  {...register('github_url')}
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags *
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {watchedTags?.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
            )}
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {watchedTechnologies?.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                placeholder="Add a technology"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              />
              <Button type="button" onClick={addTechnology} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Case Study */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Case Study
            </label>
            <Textarea
              {...register('case_study')}
              placeholder="Detailed case study or additional information..."
              rows={4}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                project ? 'Update Project' : 'Create Project'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
