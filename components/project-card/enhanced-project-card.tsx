'use client'

import React from 'react'
import { GlowCard } from '@/components/ui/spotlight-card'
import { ProjectCard } from './project-card'

interface EnhancedProjectCardProps {
  title: string
  description: string
  image?: string
  tags: string[]
  variant?: 'default' | 'compact'
  className?: string
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange'
}

export function EnhancedProjectCard ({
  title,
  description,
  image,
  tags,
  variant = 'default',
  className,
  glowColor = 'blue'
}: EnhancedProjectCardProps) {
  return (
    <GlowCard
      glowColor={glowColor}
      customSize={true}
      className={`w-full h-full ${className || ''}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <ProjectCard
            title={title}
            description={description}
            image={image}
            tags={tags}
            variant={variant}
            className="h-full"
          />
        </div>
      </div>
    </GlowCard>
  )
}
