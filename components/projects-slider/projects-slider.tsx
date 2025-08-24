'use client'

import React, { useState, useEffect } from 'react'
import { Project } from '@/types'
import { getPublishedProjects } from '@/lib/projects-client'
import { ProjectCard } from '@/components/project-card'
import styles from './projects-slider.module.css'

export function ProjectsSlider () {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true)
        // Fetch published projects for the frontend
        const publishedProjects = await getPublishedProjects()
        setProjects(publishedProjects)
      } catch (error) {
        console.error('Failed to load projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  if (isLoading) {
    return (
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What we made so far</h2>
        <div className={styles.projectsContainer}>
          <div className={styles.projectsScroll}>
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What we made so far</h2>
        <div className={styles.projectsContainer}>
          <div className={styles.projectsScroll}>
            <div className="flex items-center justify-center py-8 text-gray-500">
              <p>No projects available yet.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>What we made so far</h2>

      <div className={styles.projectsContainer}>
        <div className={styles.projectsScroll}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              className={styles.projectCard}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
