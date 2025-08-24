export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  order: number
  created_at: string
  updated_at: string
  client?: string
  category?: string
  technologies?: string[]
  live_url?: string
  github_url?: string
  case_study?: string
}

export interface ProjectFormData {
  title: string
  description: string
  image: string
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  order: number
  client?: string
  category?: string
  technologies?: string[]
  live_url?: string
  github_url?: string
  case_study?: string
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

// AI Chat Response Types
export interface AIQuestionOption {
  label: string
  value: string
  description?: string
}

export interface AIQuestion {
  question: string
  options: AIQuestionOption[]
  type: 'single' | 'multiple'
  required?: boolean
}

export interface AIResponse {
  message: string
  question?: AIQuestion
  suggestions?: string[]
  nextStep?: string
}
