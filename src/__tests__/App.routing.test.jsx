import { screen } from '@testing-library/react'
import App from '../App'
import { renderWithRouter } from './helpers'

describe('App routing', () => {
  it('renders the landing page on /', () => {
    renderWithRouter(<App />, { route: '/' })
    expect(screen.getByText(/admin portal/i)).toBeInTheDocument()
  })

  it('renders a 404 page for unknown routes', () => {
    renderWithRouter(<App />, { route: '/no-such-page' })
    expect(screen.getByText('404')).toBeInTheDocument()
  })
})
