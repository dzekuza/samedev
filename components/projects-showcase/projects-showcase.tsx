'use client'

import React, { useState, useEffect } from 'react'
import { Project } from '@/types'
import { getPublishedProjects } from '@/lib/projects-client'
import { ProjectCard } from '@/components/project-card'
import { GlowCard } from '@/components/ui/spotlight-card'
import styles from './projects-showcase.module.css'

interface ProjectSection {
  id: string
  title: string
  projects: Project[]
}

export function ProjectsShowcase () {
  const [projectSections, setProjectSections] = useState<ProjectSection[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true)
        const publishedProjects = await getPublishedProjects()

        // Create sections based on featured status
        const featuredProjects = publishedProjects.filter(project => project.featured)
        const regularProjects = publishedProjects.filter(project => !project.featured)

        const sections: ProjectSection[] = []

        if (featuredProjects.length > 0) {
          sections.push({
            id: 'featured',
            title: 'Featured',
            projects: featuredProjects
          })
        }

        if (regularProjects.length > 0) {
          sections.push({
            id: 'recent',
            title: 'Recent',
            projects: regularProjects
          })
        }

        setProjectSections(sections)
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
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </section>
    )
  }

  if (projectSections.length === 0) {
    return (
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What we made so far</h2>
        <div className="flex items-center justify-center py-8 text-gray-500">
          <p>No projects available yet.</p>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>What we made so far</h2>

      {projectSections.map((section) => (
        <div key={section.id} className={styles.projectSection}>
          <h3 className={styles.sectionSubtitle}>{section.title}</h3>

          <div className={styles.projectsContainer}>
            <div className={styles.projectsScroll}>
              {section.projects.map((project, index) => {
                // Cycle through different glow colors for variety
                const glowColors: Array<'blue' | 'purple' | 'green' | 'red' | 'orange'> = ['blue', 'purple', 'green', 'red', 'orange']
                const glowColor = glowColors[index % glowColors.length]

                return (
                  <div key={project.id} className={styles.projectCard}>
                    <GlowCard
                      glowColor={glowColor}
                      customSize={true}
                      width="100%"
                      height="100%"
                      className="w-full h-full"
                    >
                      <ProjectCard
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        tags={project.tags}
                        className="h-full"
                      />
                    </GlowCard>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
