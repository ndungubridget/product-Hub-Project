import { render, screen } from '@testing-library/react'
import StatCard from '../components/StatCard'

describe('StatCard', () => {
  it('shows label and value', () => {
    render(<StatCard label="Total Revenue" value="KSh 245,000" />)
    expect(screen.getByText('Total Revenue')).toBeInTheDocument()
    expect(screen.getByText('KSh 245,000')).toBeInTheDocument()
  })
})
