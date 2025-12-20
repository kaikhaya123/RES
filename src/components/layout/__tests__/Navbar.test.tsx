import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Navbar from '../Navbar'
import { useSession } from 'next-auth/react'

// Mock the UserAvatar component
jest.mock('../UserAvatar', () => ({
  UserAvatar: () => <div data-testid="user-avatar">User Avatar</div>,
}))

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders navbar with logo', () => {
    render(<Navbar />)
    const logo = screen.getByAltText('R.E.S.')
    expect(logo).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Movement')).toBeInTheDocument()
    expect(screen.getByText('Challenges')).toBeInTheDocument()
    expect(screen.getByText('Apply')).toBeInTheDocument()
    expect(screen.getByText('News')).toBeInTheDocument()
    expect(screen.getByText('Journey')).toBeInTheDocument()
    expect(screen.getByText('Impact')).toBeInTheDocument()
  })

  it('renders user avatar', () => {
    render(<Navbar />)
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument()
  })

  it('toggles mobile menu on button click', () => {
    render(<Navbar />)
    const menuButton = screen.getByRole('button', { name: '' })
    
    fireEvent.click(menuButton)
    waitFor(() => {
      expect(screen.getByTestId('mobile-menu')).toBeVisible()
    })
  })

  it('handles scroll events correctly', async () => {
    render(<Navbar />)
    const navbar = screen.getByRole('navigation')
    
    // Initial state - not scrolled
    expect(navbar).toHaveClass('bg-gradient-to-b')
    
    // Simulate scroll
    fireEvent.scroll(window, { y: 100 })
    
    await waitFor(() => {
      expect(navbar).toHaveClass('bg-warm-stone-base')
    })
  })

  it('renders navigation links with correct href attributes', () => {
    render(<Navbar />)
    const aboutLink = screen.getByText('About').closest('a')
    expect(aboutLink).toHaveAttribute('href', '/about')
    
    const challengesLink = screen.getByText('Challenges').closest('a')
    expect(challengesLink).toHaveAttribute('href', '/challenges')
  })

  it('logo link navigates to home', () => {
    render(<Navbar />)
    const logoLink = screen.getByAltText('R.E.S.').closest('a')
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('has proper accessibility attributes', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })
})
