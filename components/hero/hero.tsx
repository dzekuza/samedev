'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { SplitText } from '@/components/ui/split-text'
import styles from './hero.module.css'

interface HeroProps {
  className?: string
  title?: string
  subtitle?: string
  description?: string
  primaryAction?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  backgroundImage?: string
  onScrollDown?: () => void
}

export function Hero ({
  className,
  title = 'We create digital experiences that matter',
  subtitle = 'Studio',
  description = 'We are a creative studio focused on building meaningful digital products and experiences that connect with people.',
  primaryAction,
  secondaryAction,
  backgroundImage,
  onScrollDown
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)

  const handleScrollDown = () => {
    if (onScrollDown) {
      onScrollDown()
    } else {
      // Default scroll behavior
      const nextSection = heroRef.current?.nextElementSibling
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  useEffect(() => {
    // Add intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={heroRef} className={cn(styles.hero, className)}>
      {/* Background */}
      {backgroundImage && (
        <div className={styles.backgroundImage}>
          <img src={backgroundImage} alt="" />
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <div className={styles.subtitle}>
          <span>{subtitle}</span>
        </div>
      )}

      {/* Main Title */}
      <SplitText
        text={title}
        className={styles.title}
        delay={80}
        animationFrom={{ opacity: 0, transform: 'translate3d(0, 40px, 0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
        easing="easeOutCubic"
        threshold={0.3}
        rootMargin="-100px"
        textAlign="left"
      />

      {/* Description */}
      {description && (
        <p className={styles.description}>
          {description}
        </p>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        {primaryAction && (
          <Button
            onClick={primaryAction.onClick}
            className={styles.primaryButton}
            size="lg"
          >
            {primaryAction.label}
          </Button>
        )}

        {secondaryAction && (
          <Button
            onClick={secondaryAction.onClick}
            variant="outline"
            className={styles.secondaryButton}
            size="lg"
          >
            {secondaryAction.label}
          </Button>
        )}
      </div>

      {/* Scroll Indicator */}
      <button
        className={styles.scrollIndicator}
        onClick={handleScrollDown}
        aria-label="Scroll to next section"
        type="button"
      >
        <div className={styles.scrollArrow}></div>
      </button>
    </section>
  )
}
