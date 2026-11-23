import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import PerfumeCard, { formatKsh } from '../components/PerfumeCard'
import { api } from '../api/api'
import { useFetch } from '../hooks/useFetch'
import { useDebounce } from '../hooks/useDebounce'

export default function Products() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const { data: products, loading, error, reload } = useFetch(api.getProducts, [])

  // Dynamic search across name, brand, category and description
  const filtered = useMemo(() => {
    if (!products) return []
    const q = debouncedQuery.trim().toLowerCase()
    if (!q) return products
    return products.filter((p) =>
      [p.name, p.brand, p.category, p.description]
        .some((field) => field?.toLowerCase().includes(q))
    )
  }, [products, debouncedQuery])

  const handleDelete = async (id) => {
    await api.deleteProduct(id)
    reload()
  }

  return (
    <>
      <Header title="Products" />
      <div className="page-body">
        <div className="toolbar">
          <SearchBar value={query} onChange={setQuery} />
          <Link to="/products/new" className="btn-primary">+ Add Product</Link>
        </div>

        {loading && <p className="muted">Loading products…</p>}
        {error && <p className="muted">Could not reach the server. Is json-server running?</p>}

        {!loading && !error && (
          <>
            <p className="muted">{filtered.length} product{filtered.length === 1 ? '' : 's'} found</p>
            <div className="perfume-grid">
              {filtered.map((p) => (
                <div key={p.id} className="product-cell">
                  <PerfumeCard product={p} />
                  <div className="cell-actions">
                    <Link to={`/products/${p.id}`} className="btn-ghost sm">View / Edit</Link>
                    <button className="btn-danger sm" onClick={() => handleDelete(p.id)}>Delete</button>
                  </div>
                  <span className="stock-note">{p.stock} in stock · {formatKsh(p.price)}</span>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="muted">No products match “{query}”.</p>
            )}
          </>
        )}
      </div>
    </>
  )
}
