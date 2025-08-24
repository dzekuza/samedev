'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AIQuestionProps {
  question: string
  options: string[]
  onOptionSelect: (option: string) => void
  disabled?: boolean
  className?: string
}

export function AIQuestion ({
  question,
  options,
  onOptionSelect,
  disabled = false,
  className
}: AIQuestionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <h4 className="text-lg font-semibold text-gray-900">{question}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => onOptionSelect(option)}
            disabled={disabled}
            className="justify-start text-left h-auto py-3 px-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}
