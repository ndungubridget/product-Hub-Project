/** Small stat tile: label on top, value below, pastel background. */
export default function StatCard({ label, value, bg = '#e9e7e3' }) {
  return (
    <div className="stat-card" style={{ background: bg }}>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  )
}
