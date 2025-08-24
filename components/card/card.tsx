import React from 'react'
import { cn } from '@/lib/utils'
import styles from './card.module.css'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outlined' | 'elevated'
}

export function Card ({ children, className, variant = 'default' }: CardProps) {
  return (
    <div className={cn(styles.card, styles[variant], className)}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function CardHeader ({ children, className }: CardHeaderProps) {
  return (
    <div className={cn(styles.cardHeader, className)}>
      {children}
    </div>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export function CardContent ({ children, className }: CardContentProps) {
  return (
    <div className={cn(styles.cardContent, className)}>
      {children}
    </div>
  )
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export function CardFooter ({ children, className }: CardFooterProps) {
  return (
    <div className={cn(styles.cardFooter, className)}>
      {children}
    </div>
  )
}
