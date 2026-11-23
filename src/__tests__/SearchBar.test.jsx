import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../components/SearchBar'

describe('SearchBar', () => {
  it('calls onChange when the user types', async () => {
    const onChange = vi.fn()
    render(<SearchBar value="" onChange={onChange} />)
    await userEvent.type(screen.getByRole('searchbox'), 'chanel')
    expect(onChange).toHaveBeenCalled()
  })
})
