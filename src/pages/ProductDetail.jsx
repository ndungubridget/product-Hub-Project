
import { Link, useParams } from 'react-router-dom'
import useProducts from '../hooks/useProducts'

function ProductDetail() {
  const { id } = useParams()
  const { products, loading, error } = useProducts()

  if (loading) {
    return <p className="p-8 text-gray-600">Loading perfume details...</p>
  }

  if (error) {
    return <p className="p-8 text-red-600">Error: {error}</p>
  }

  const product = products.find(
    (item) => String(item.id) === id
  )

  if (!product) {
    return (
      <section className="p-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Perfume not found
        </h1>
        <p className="text-gray-600 mt-2">
          The perfume you are looking for does not exist.
        </p>
        <Link
          to="/products"
          className="inline-block mt-5 text-blue-600 hover:underline"
        >
          ← Back to products
        </Link>
      </section>
    )
  }

  return (
    <section className="p-5 md:p-8">
      <Link
        to="/products"
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to products
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[#edf2f5] min-h-80 flex items-center justify-center p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-contain"
            />
          </div>

          <div className="p-6 md:p-8">
            <p className="text-sm uppercase tracking-wide text-yellow-700 font-semibold">
              {product.brand}
            </p>

            <h1 className="text-3xl font-bold text-[#263f59] mt-2">
              {product.name}
            </h1>

            <p className="text-gray-500 mt-3">
              {product.category} · {product.concentration}
            </p>

            <p className="text-2xl font-bold text-[#263f59] mt-6">
              KSh {Number(product.price).toLocaleString()}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-7">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500">Bottle Size</p>
                <p className="font-semibold mt-1">
                  {product.size} ml
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500">Available Stock</p>
                <p className="font-semibold mt-1">
                  {product.stock} units
                </p>
              </div>
            </div>

            {product.description && (
              <div className="mt-7">
                <h2 className="font-bold text-[#263f59]">
                  Description
                </h2>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
