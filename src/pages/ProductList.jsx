import { useState } from 'react'
import useProducts from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'

function ProductList() {
  const { products, loading, error } = useProducts()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase().trim()

    return (
  (product.name || '').toLowerCase().includes(search) ||
  (product.brand || '').toLowerCase().includes(search) ||
  (product.category || '').toLowerCase().includes(search)
)
  })

  if (loading) {
    return <p className="p-8 text-gray-600">Loading perfumes...</p>
  }

  if (error) {
    return <p className="p-8 text-red-600">Error: {error}</p>
  }

  return (
    <section className="p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Perfume Inventory
          </h1>

          <p className="text-gray-600 mt-2">
            View and manage all available perfumes.
          </p>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      <p className="text-sm text-gray-500 mb-5">
        Showing {filteredProducts.length} of {products.length} perfumes
      </p>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">
          No perfumes found. Try another search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductList