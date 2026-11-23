import { api } from '../api/api'
import { useFetch } from '../hooks/useFetch'

const BAR_COLORS = ['#8fb4d9','#93c7a8','#e0c084','#b39ddb','#90c6d4',
                    '#a8c686','#d98c8c','#8fa8d9','#c39bd3','#d9b48f',
                    '#8cc7b2','#9aa8d9']

/** Pure-CSS bar chart (no chart library) of monthly revenue. */
export default function SalesChart() {
  const { data: sales, loading, error } = useFetch(api.getSales, [])

  if (loading) return <p className="muted">Loading chart…</p>
  if (error) return <p className="muted">Chart unavailable.</p>

  const max = Math.max(...sales.map((s) => s.revenue))
  return (
    <section className="chart-panel">
      <div className="chart-head">
        <div>
          <h3 className="section-title">Sales Overview</h3>
          <p className="muted">Revenue performance throughout the year</p>
        </div>
        <div className="chart-note">
          <span>Monthly · 2026</span>
          <span>Revenue · KSh</span>
        </div>
      </div>
      <div className="chart" role="img" aria-label="Monthly revenue bar chart">
        {sales.map((s, i) => (
          <div className="bar-col" key={s.month}>
            <div
              className="bar"
              style={{ height: `${(s.revenue / max) * 100}%`, background: BAR_COLORS[i % BAR_COLORS.length] }}
              title={`${s.month}: KSh ${s.revenue.toLocaleString()}`}
            />
            <span className="bar-month">{s.month}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
