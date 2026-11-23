
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [form, setForm] = useState({})
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => {
        if (res.status === 404) throw new Error('Product not found')
        if (!res.ok) throw new Error('Failed to load product')
        return res.json()
      })
      .then(data => {
        setProduct(data)
        setForm(data)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  async function handleUpdate(e) {
    e.preventDefault()

    try {
      const response = await fetch(
        `http://localhost:3000/products/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            price: Number(form.price),
            stock: Number(form.stock)
          })
        }
      )

      if (!response.ok) throw new Error('Update failed')

      const updated = await response.json()
      setProduct(updated)
      setForm(updated)
      setEditing(false)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this perfume?')) return

    try {
      const response = await fetch(
        `http://localhost:3000/products/${id}`,
        { method: 'DELETE' }
      )

      if (!response.ok) throw new Error('Delete failed')
      navigate('/products')
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p className="p-6">Loading product...</p>
  if (!product) return <p className="p-6">{error || 'Product not found'}</p>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product Details</h1>

      {error && <p className="text-red-600">{error}</p>}

      <div className="bg-white rounded-xl shadow p-6">
        {product.image && (
          <img src={product.image} alt={product.name}
            className="w-48 h-48 object-contain mb-4" />
        )}

        {editing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            {['name', 'price', 'category', 'description', 'image', 'stock'].map(field => (
              <input
                key={field}
                type="text"
                placeholder={field}
                value={form[field] ?? ''}
                onChange={e => setForm({
                  ...form,
                  [field]: e.target.value
                })}
                className="w-full border p-3 rounded-lg"
              />
            ))}
            <button className="bg-green-700 text-white px-5 py-2 rounded-lg">
              Save Changes
            </button>
          </form>
        ) : (
          <>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Price: KSh {product.price}</p>
            <p>Stock: {product.stock}</p>
            <p className="mt-3">{product.description}</p>
          </>
        )}

        <div className="flex flex-wrap gap-3 mt-6">
          <button onClick={() => setEditing(!editing)}
            className="bg-blue-700 text-white px-5 py-2 rounded-lg">
            {editing ? 'Cancel Editing' : 'Edit Product'}
          </button>

          <button onClick={handleDelete}
            className="bg-red-600 text-white px-5 py-2 rounded-lg">
            Delete Product
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
