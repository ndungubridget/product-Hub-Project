
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddProduct() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    stock: ''
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (Object.values(form).some(value => !String(value).trim())) {
      setError('Please fill in all fields.')
      return
    }

    if (!Number.isFinite(Number(form.price)) || Number(form.price) <= 0) {
      setError('Price must be a number above 0.')
      return
    }

    if (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) {
      setError('Stock must be a non-negative whole number.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock)
        })
      })

      if (!response.ok) throw new Error('Could not add product')

      setSuccess('Product added successfully!')
      setTimeout(() => navigate('/products'), 800)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-6">Add New Perfume</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            ['name', 'Perfume Name', 'text'],
            ['price', 'Price (KSh)', 'number'],
            ['category', 'Category', 'text'],
            ['image', 'Image URL', 'url'],
            ['stock', 'Stock Quantity', 'number']
          ].map(([name, label, type]) => (
            <div key={name}>
              <label className="block font-medium mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                min={type === 'number' ? '0' : undefined}
                className="w-full border rounded-lg p-3"
              />
            </div>
          ))}

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              rows="4"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
