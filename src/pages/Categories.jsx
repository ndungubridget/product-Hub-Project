
import { useEffect, useState } from 'react'

const API = 'http://localhost:3000'

function Categories() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/products`)
      .then(res => {
        if (!res.ok) throw new Error('Could not load products')
        return res.json()
      })
      .then(setProducts)
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  const categories = [...new Set(
    products.map(p => p.category).filter(Boolean)
  )]

  if (loading) return <p className="p-6">Loading categories...</p>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map(category => {
          const count = products.filter(
            p => p.category === category
          ).length

          return (
            <div key={category}
              className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold">{category}</h2>
              <p className="text-gray-500 mt-2">
                {count} perfume products
              </p>
            </div>
          )
        })}
      </div>

      {categories.length === 0 && (
        <p>No categories available yet.</p>
      )}
    </div>
  )
}

export default Categories
