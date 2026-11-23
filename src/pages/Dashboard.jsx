import Header from '../components/Header'
import StatCard from '../components/StatCard'
import SalesChart from '../components/SalesChart'
import PerfumeCard from '../components/PerfumeCard'
import OrdersTable from '../components/OrdersTable'
import { api } from '../api/api'
import { useFetch } from '../hooks/useFetch'

const STATS = [
  { label: 'Total Revenue', value: 'KSh 245,000' },
  { label: 'Total Orders', value: '1,250' },
  { label: 'Total Products', value: '85' },
  { label: 'Total Customers', value: '920' }
]

export default function Dashboard() {
  const { data: products, loading } = useFetch(api.getProducts, [])
  const top = products?.slice(0, 4) ?? []

  return (
    <>
      <Header title="Dashboard Overview" />
      <div className="page-body">
        <div className="stats-row">
          {STATS.map((s) => <StatCard key={s.label} {...s} />)}
        </div>

        <SalesChart />

        <section>
          <h3 className="section-title">Top Selling Perfumes</h3>
          {loading ? (
            <p className="muted">Loading products…</p>
          ) : (
            <div className="perfume-grid">
              {top.map((p) => <PerfumeCard key={p.id} product={p} />)}
            </div>
          )}
        </section>

        <OrdersTable />
      </div>
    </>
  )
}
