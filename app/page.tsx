'use client'

import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { Component as AnimatedBackground } from '@/components/ui/raycast-animated-background'
import { WhatWeDo } from '@/components/what-we-do'
import { ProjectsSlider } from '@/components/projects-slider'
import { ReceiveOffer } from '@/components/receive-offer'

export default function HomePage () {
  return (
    <div className="min-h-screen pt-[80px]">
      <Navigation />
      <Hero
        title="Interfaces and digital brands that accelerate growth"
        subtitle=""
        description=""
      />

      {/* Animated Background Section */}
      <section className="relative w-full min-h-screen">
        <AnimatedBackground />
      </section>

      {/* What We Do Section */}
      <WhatWeDo />

      {/* What We Made So Far Section */}
      <ProjectsSlider />

      {/* Receive Offer Section */}
      <ReceiveOffer />
    </div>
  )
}
