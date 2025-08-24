'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { Project } from '@/types'
import { getPublishedProjects } from '@/lib/projects-client'
import { ProjectCard } from '@/components/project-card'
import styles from './what-we-do.module.css'

interface AccordionItem {
  id: string
  title: string
  description: string
  filters: string[]
  projects: Project[]
}

const accordionData: Omit<AccordionItem, 'projects'>[] = [
  {
    id: 'development',
    title: 'Development',
    description: 'GVOZDOVIC Studios creates visually striking and effective brand systems that prioritize digital experiences and interactions but seamlessly extend and scale to any medium',
    filters: ['Websites', 'Web apps', 'Products']
  },
  {
    id: 'branding',
    title: 'Branding',
    description: 'We create comprehensive brand identities that resonate with audiences and drive business growth',
    filters: ['Identity', 'Strategy', 'Guidelines']
  },
  {
    id: 'ui-ux',
    title: 'UI/UX',
    description: 'User-centered design solutions that create meaningful digital experiences',
    filters: ['Research', 'Wireframes', 'Prototypes']
  }
]

export function WhatWeDo () {
  const [expandedItem, setExpandedItem] = useState('development')
  const [selectedFilter, setSelectedFilter] = useState('Websites')
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true)
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

  const toggleAccordion = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? '' : itemId)
  }

  // Filter projects based on selected filter
  const getFilteredProjects = () => {
    if (!projects.length) return []

    // Simple filtering logic - you can enhance this based on your needs
    return projects.slice(0, 2) // Show first 2 projects for now
  }

  const filteredProjects = getFilteredProjects()

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>What we do</h2>

      <div className={styles.accordion}>
        {accordionData.map((item) => {
          const isExpanded = expandedItem === item.id

          return (
            <div key={item.id} className={styles.accordionItem}>
              <button
                className={cn(
                  styles.accordionHeader,
                  'transition-all duration-300 ease-in-out hover:bg-gray-50/50'
                )}
                onClick={() => toggleAccordion(item.id)}
                type="button"
              >
                <h3 className={styles.accordionTitle}>{item.title}</h3>
                <div className={cn(
                  styles.accordionIcon,
                  'transition-transform duration-300 ease-in-out'
                )}>
                  <ChevronDown
                    className={cn(
                      styles.icon,
                      'transition-all duration-300 ease-in-out',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </div>
              </button>

              {isExpanded && (
                <div
                  className={cn(
                    styles.accordionContent,
                    'overflow-hidden transition-all duration-300 ease-in-out'
                  )}
                >
                  <div className="transition-all duration-300 ease-in-out">
                    <p className={styles.description}>{item.description}</p>

                    {item.filters.length > 0 && (
                      <div className={styles.filters}>
                        {item.filters.map((filter) => (
                          <button
                            key={filter}
                            className={cn(
                              styles.filterButton,
                              'transition-all duration-200 ease-in-out hover:scale-105',
                              selectedFilter === filter && styles.filterButtonActive
                            )}
                            onClick={() => setSelectedFilter(filter)}
                            type="button"
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                    )}

                    {isLoading
                      ? (
                        <div className={styles.projects}>
                          <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          </div>
                        </div>
                      )
                      : filteredProjects.length > 0
                      ? (
                        <div className={styles.projects}>
                          {filteredProjects.map((project) => (
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
                      )
                      : (
                        <div className={styles.projects}>
                          <div className="flex items-center justify-center py-8 text-gray-500">
                            <p>No projects available for this category.</p>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
