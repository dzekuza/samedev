import { render, screen, fireEvent } from '@testing-library/react'
import { Navigation } from '@/components/navigation'

describe('Navigation', () => {
  it('renders navigation with logo', () => {
    render(<Navigation />)
    
    const logo = screen.getByAltText('Gvozdovic Studio')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/gvvv.svg')
  })

  it('renders all navigation buttons', () => {
    render(<Navigation />)
    
    expect(screen.getByText('What we do')).toBeInTheDocument()
    expect(screen.getByText('What we did')).toBeInTheDocument()
    expect(screen.getByText('Let\'s do it')).toBeInTheDocument()
  })

  it('calls onNavItemClick when navigation item is clicked', () => {
    const mockOnNavItemClick = jest.fn()
    render(<Navigation onNavItemClick={mockOnNavItemClick} />)
    
    fireEvent.click(screen.getByText('What we do'))
    expect(mockOnNavItemClick).toHaveBeenCalledWith('what-we-do')
    
    fireEvent.click(screen.getByText('Let\'s do it'))
    expect(mockOnNavItemClick).toHaveBeenCalledWith('lets-do-it')
  })

  it('applies custom className', () => {
    render(<Navigation className="custom-nav" />)
    expect(screen.getByRole('navigation')).toHaveClass('custom-nav')
  })
})
