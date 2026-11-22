import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AddProduct from '../src/pages/AddProduct'

describe('AddProduct page', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the add product form fields', () => {
    render(
      <MemoryRouter initialEntries={['/products/new']}>
        <AddProduct />
      </MemoryRouter>
    )

    expect(screen.getByLabelText(/product name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/stock/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty fields or invalid price', () => {
    render(
      <MemoryRouter initialEntries={['/products/new']}>
        <AddProduct />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /add product/i }))

    expect(screen.getByText('Product name is required')).toBeInTheDocument()
    expect(screen.getByText('Price must be a number above 0')).toBeInTheDocument()
    expect(screen.getByText('Category is required')).toBeInTheDocument()
    expect(screen.getByText('Description is required')).toBeInTheDocument()
    expect(screen.getByText('Image URL is required')).toBeInTheDocument()
    expect(screen.getByText('Stock is required')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '0' } })
    fireEvent.click(screen.getByRole('button', { name: /add product/i }))

    expect(screen.getByText('Price must be a number above 0')).toBeInTheDocument()
  })

  it('submits a POST request and redirects so the new product appears', async () => {
    const newPerfume = {
      id: 7,
      name: 'Velvet Oud',
      brand: 'Scentora',
      category: 'Unisex',
      concentration: 'Eau de Parfum',
      size: 100,
      price: 5500,
      stock: 12,
      image: 'https://example.com/velvet-oud.jpg',
      description: 'Rich woody fragrance.'
    }

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(newPerfume)
    })

    render(
      <MemoryRouter initialEntries={['/products/new']}>
        <Routes>
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/products" element={<div>Velvet Oud</div>} />
        </Routes>
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText(/product name/i), {
      target: { value: 'Velvet Oud' }
    })
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: '5500' }
    })
    fireEvent.change(screen.getByLabelText(/stock/i), {
      target: { value: '12' }
    })
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: 'Unisex' }
    })
    fireEvent.change(screen.getByLabelText(/image url/i), {
      target: { value: 'https://example.com/velvet-oud.jpg' }
    })
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Rich woody fragrance.' }
    })

    fireEvent.click(screen.getByRole('button', { name: /add product/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        'http://localhost:3000/products',
        expect.objectContaining({
          method: 'POST'
        })
      )
    })

    expect(await screen.findByText('Velvet Oud')).toBeInTheDocument()
  })
})