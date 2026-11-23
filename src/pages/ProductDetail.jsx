import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import { api } from '../api/api'
import { formatKsh } from '../components/PerfumeCard'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Edit state: administrator can change values such as price
  const [draft, setDraft] = useState({ price: '', stock: '' })
  const [saving, setSaving] = useState(false)
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.getProduct(id)
      .then((p) => { setProduct(p); setDraft({ price: p.price, stock: p.stock }) })
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setUpdated(false)
    try {
      const updatedProduct = await api.updateProduct(id, {
        price: Number(draft.price),
        stock: Number(draft.stock)
      })
      setProduct(updatedProduct)
      setUpdated(true)
    } catch {
      setError('Update failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (<><Header title="Product" /><p className="muted page-body">Loading…</p></>)
  if (error || !product) return (
    <>
      <Header title="Product" />
      <div className="page-body">
        <p className="muted">{error ?? 'Product not found.'}</p>
        <Link to="/products" className="btn-ghost">Back to products</Link>
      </div>
    </>
  )

  return (
    <>
      <Header title={product.name} />
      <div className="page-body detail-layout">
        <div className="detail-card" style={{ background: product.scent, borderColor: product.accent }}>
          <span className="perfume-emoji big" style={{ color: product.accent }}>🧴</span>
          <h3>{product.name}</h3>
          <p className="muted">{product.brand} · {product.category}</p>
          <p>{product.description}</p>
          <p className="detail-price">{formatKsh(product.price)}</p>
          <p className="muted">{product.stock} units in stock</p>
        </div>

        <form className="product-form edit-panel" onSubmit={handleSave}>
          <h3 className="section-title">Edit values</h3>
          <label>
            Price (KSh)
            <input
              type="number" min="0" step="0.01"
              value={draft.price}
              onChange={(e) => setDraft((d) => ({ ...d, price: e.target.value }))}
            />
          </label>
          <label>
            Stock
            <input
              type="number" min="0"
              value={draft.stock}
              onChange={(e) => setDraft((d) => ({ ...d, stock: e.target.value }))}
            />
          </label>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          {updated && <p className="save-ok">✓ Changes saved (PATCH persisted to db.json)</p>}
          <Link to="/products" className="btn-ghost">← Back to products</Link>
        </form>
      </div>
    </>
  )
}
