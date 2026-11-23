import { api } from '../api/api'
import { useFetch } from '../hooks/useFetch'
import { formatKsh } from './PerfumeCard'

const STATUS_CLASS = {
  Delivered: 'status-delivered',
  Processing: 'status-processing',
  Shipped: 'status-shipped'
}

export default function OrdersTable() {
  const { data: orders, loading, error } = useFetch(api.getOrders, [])

  if (loading) return <p className="muted">Loading orders…</p>
  if (error) return <p className="muted">Could not load orders.</p>

  return (
    <section>
      <h3 className="section-title">Recent Orders</h3>
      <div className="table-wrap">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th><th>Customer</th><th>Product</th>
              <th>Date</th><th>Amount</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>#SC-{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.product}</td>
                <td>{o.date}</td>
                <td>{formatKsh(o.amount)}</td>
                <td><span className={`pill ${STATUS_CLASS[o.status] ?? ''}`}>{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
