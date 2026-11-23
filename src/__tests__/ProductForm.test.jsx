import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductForm from '../components/ProductForm'

describe('ProductForm', () => {
  it('submits valid product data', async () => {
    const onSubmit = vi.fn()
    render(<ProductForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText(/product name/i), 'Test Perfume')
    await userEvent.type(screen.getByLabelText(/brand/i), 'Test Brand')
    await userEvent.type(screen.getByLabelText(/price/i), '1500')
    await userEvent.type(screen.getByLabelText(/stock/i), '10')
    await userEvent.click(screen.getByRole('button', { name: /add product/i }))

    expect(onSubmit).toHaveBeenCalledOnce()
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      name: 'Test Perfume', brand: 'Test Brand', price: 1500, stock: 10
    })
  })

  it('shows validation errors when fields are empty', async () => {
    render(<ProductForm onSubmit={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: /add product/i }))
    expect(await screen.findByText('Name is required')).toBeInTheDocument()
    expect(screen.getByText('Brand is required')).toBeInTheDocument()
  })
})
