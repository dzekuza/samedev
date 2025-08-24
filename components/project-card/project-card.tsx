'use client'

import React from 'react'
import styles from './project-card.module.css'

interface ProjectCardProps {
  title: string
  description: string
  image?: string
  tags: string[]
  variant?: 'default' | 'compact'
  className?: string
}

export function ProjectCard ({ 
  title, 
  description, 
  image, 
  tags, 
  variant = 'default',
  className 
}: ProjectCardProps) {
  const cardStyle = image ? {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {}

  return (
    <div 
      className={`${styles.projectCard} ${styles[variant]} ${className || ''}`}
      style={cardStyle}
    >
      <div className={styles.cardContent}>
        <div className={styles.projectContent}>
          <h3 className={styles.projectTitle}>{title}</h3>
          <p className={styles.projectDescription}>{description}</p>
        </div>
        
        {!image && (
          <div className={styles.imagePlaceholder}>
            <div className={styles.placeholderContent}>
              <div className={styles.placeholderIcon}>🎨</div>
              <p className={styles.placeholderText}>Project Visual</p>
            </div>
          </div>
        )}
        
        <div className={styles.projectTags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
