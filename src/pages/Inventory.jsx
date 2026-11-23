
import { useEffect, useState } from 'react'

function Inventory() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch inventory')
        return res.json()
      })
      .then(setProducts)
      .catch(console.error)
  }, [])

  const totalStock = products.reduce(
    (sum, p) => sum + Number(p.stock || 0), 0
  )

  const lowStock = products.filter(
    p => Number(p.stock || 0) <= 5
  )

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Inventory</h1>

      <div className="grid sm:grid-cols-2 gap-5 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Products</p>
          <h2 className="text-3xl font-bold">{products.length}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Stock Units</p>
          <h2 className="text-3xl font-bold">{totalStock}</h2>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Stock Overview</h2>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-t">
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.stock ?? 0}</td>
                <td className="p-4">
                  {Number(product.stock || 0) <= 5
                    ? <span className="text-red-600 font-semibold">Low Stock</span>
                    : <span className="text-green-600 font-semibold">In Stock</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-orange-600">
        {lowStock.length} products have low stock.
      </p>
    </div>
  )
}

export default Inventory
