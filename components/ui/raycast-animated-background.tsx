'use client'

import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import UnicornScene from 'unicornstudio-react'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

// Wrapper component to ensure single instance
function SingleUnicornScene ({ width, height, onError }: { width: number; height: number; onError: () => void }) {
  const [hasRendered, setHasRendered] = useState(false)

  useEffect(() => {
    if (!hasRendered) {
      setHasRendered(true)
    }
  }, [hasRendered])

  if (!hasRendered) {
    return null
  }

  return (
    <UnicornScene
      production={true}
      projectId='cbmTT38A0CcuYxeiyj5H'
      width={width}
      height={height}
      onError={onError}
    />
  )
}

export const Component = () => {
  const { width, height } = useWindowSize()
  const [hasError, setHasError] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Fallback component if UnicornScene fails
  if (hasError) {
    return (
      <div className={cn('flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500')}>
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Animated Background Section</h2>
          <p className="text-xl mb-4">This is the animated background section between Hero and What We Do</p>
          <div className="text-sm opacity-80">
            <p>Width: {width}px | Height: {height}px</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col items-center w-full min-h-screen')}>
      {isMounted && (
        <SingleUnicornScene
          width={width}
          height={height}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}
