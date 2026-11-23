import { screen } from '@testing-library/react'
import Sidebar from '../components/Sidebar'
import { renderWithRouter } from './helpers'

describe('Sidebar', () => {
  it('renders brand, navigation and logout', () => {
    renderWithRouter(<Sidebar />)
    expect(screen.getByText('SCENTORA')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })
})
