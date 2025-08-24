import { render, screen, fireEvent } from '@testing-library/react'
import { Hero } from '@/components/hero'

describe('Hero', () => {
  it('renders hero with default content', () => {
    render(<Hero />)
    
    expect(screen.getByText('We create digital experiences that matter')).toBeInTheDocument()
    expect(screen.getByText('Studio')).toBeInTheDocument()
    expect(screen.getByText(/We are a creative studio/)).toBeInTheDocument()
  })

  it('renders hero with custom content', () => {
    const customTitle = 'Custom Hero Title'
    const customSubtitle = 'Custom Subtitle'
    const customDescription = 'Custom description text'
    
    render(
      <Hero
        title={customTitle}
        subtitle={customSubtitle}
        description={customDescription}
      />
    )
    
    expect(screen.getByText(customTitle)).toBeInTheDocument()
    expect(screen.getByText(customSubtitle)).toBeInTheDocument()
    expect(screen.getByText(customDescription)).toBeInTheDocument()
  })

  it('renders primary action button when provided', () => {
    const mockPrimaryAction = jest.fn()
    render(
      <Hero
        primaryAction={{
          label: 'Primary Action',
          onClick: mockPrimaryAction
        }}
      />
    )
    
    const primaryButton = screen.getByText('Primary Action')
    expect(primaryButton).toBeInTheDocument()
    
    fireEvent.click(primaryButton)
    expect(mockPrimaryAction).toHaveBeenCalledTimes(1)
  })

  it('renders secondary action button when provided', () => {
    const mockSecondaryAction = jest.fn()
    render(
      <Hero
        secondaryAction={{
          label: 'Secondary Action',
          onClick: mockSecondaryAction
        }}
      />
    )
    
    const secondaryButton = screen.getByText('Secondary Action')
    expect(secondaryButton).toBeInTheDocument()
    
    fireEvent.click(secondaryButton)
    expect(mockSecondaryAction).toHaveBeenCalledTimes(1)
  })

  it('renders both action buttons when provided', () => {
    const mockPrimaryAction = jest.fn()
    const mockSecondaryAction = jest.fn()
    
    render(
      <Hero
        primaryAction={{
          label: 'Primary Action',
          onClick: mockPrimaryAction
        }}
        secondaryAction={{
          label: 'Secondary Action',
          onClick: mockSecondaryAction
        }}
      />
    )
    
    expect(screen.getByText('Primary Action')).toBeInTheDocument()
    expect(screen.getByText('Secondary Action')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Hero className="custom-hero" />)
    expect(screen.getByRole('banner')).toHaveClass('custom-hero')
  })
})
