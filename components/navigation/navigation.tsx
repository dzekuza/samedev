'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import styles from './navigation.module.css'

interface NavigationProps {
  className?: string
  onNavItemClick?: (item: string) => void
}

interface NavItem {
  id: string
  label: string
  variant: 'primary' | 'secondary'
}

const navItems: NavItem[] = [
  { id: 'what-we-do', label: 'What we do', variant: 'secondary' },
  { id: 'what-we-did', label: 'What we did', variant: 'secondary' },
  { id: 'lets-do-it', label: 'Let\'s do it', variant: 'primary' }
]

export function Navigation ({ className, onNavItemClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (item: NavItem) => {
    onNavItemClick?.(item.id)
  }

  return (
    <nav className={cn(styles.navigation, className, isScrolled && styles.scrolled)}>
      {/* Logo/Brand Section */}
      <div className={styles.brandSection}>
        <div className={styles.logoContainer}>
          <img
            src={isScrolled ? "/gvozdlight.svg" : "/gvozddark.svg"}
            alt="Gvozdovic Studio"
            className={styles.logo}
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <div className={styles.menuSection}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              styles.navButton,
              item.variant === 'primary'
                ? styles.navButtonPrimary
                : styles.navButtonSecondary
            )}
            onClick={() => handleNavClick(item)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
