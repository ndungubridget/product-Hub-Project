
import { useEffect, useState } from 'react'

function SalesReports() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/orders')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch orders')
        return res.json()
      })
      .then(setOrders)
      .catch(console.error)
  }, [])

  const completedOrders = orders.filter(
    order => order.status?.toLowerCase() === 'completed'
  )

  const revenue = completedOrders.reduce(
    (sum, order) => sum + Number(order.total || 0), 0
  )

  const average = completedOrders.length
    ? revenue / completedOrders.length
    : 0

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Sales Reports</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold">
            KSh {revenue.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Completed Orders</p>
          <h2 className="text-2xl font-bold">
            {completedOrders.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Average Order Value</p>
          <h2 className="text-2xl font-bold">
            KSh {average.toLocaleString(undefined, {
              maximumFractionDigits: 2
            })}
          </h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Recent Orders
        </h2>

        {orders.slice(-5).reverse().map(order => (
          <div key={order.id}
            className="flex justify-between border-b py-3 gap-3">
            <span>Order #{order.id}</span>
            <span>KSh {Number(order.total || 0).toLocaleString()}</span>
            <span className="capitalize">{order.status || 'Pending'}</span>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-gray-500">No sales records available.</p>
        )}
      </div>
    </div>
  )
}

export default SalesReports
