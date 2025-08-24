import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  avatar: z.string().url('Invalid URL').optional()
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export type UserFormData = z.infer<typeof userSchema>
export type LoginFormData = z.infer<typeof loginSchema>
