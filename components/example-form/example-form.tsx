'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/card'
import { loginSchema, type LoginFormData } from '@/utils/validation'
import styles from './example-form.module.css'

export function ExampleForm () {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form submitted:', data)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    <Card variant="elevated" className={styles.formContainer}>
      <CardHeader>
        <h3>Login Form</h3>
        <p>Example form with validation using React Hook Form and Zod</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={styles.input}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={styles.input}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </CardFooter>
    </Card>
  )
}
