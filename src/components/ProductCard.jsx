import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <p className="text-sm text-yellow-700 font-semibold">
          {product.brand}
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-1">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          {product.category} · {product.concentration}
        </p>

        <div className="flex justify-between items-center mt-5">
          <p className="text-lg font-bold text-gray-900">
            KSh {Number(product.price).toLocaleString()}
          </p>

          <span className="text-sm text-gray-600">
            Stock: {product.stock}
          </span>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="block text-center mt-5 bg-gray-950 hover:bg-gray-800 text-white py-2 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </article>
  )
}

export default ProductCard