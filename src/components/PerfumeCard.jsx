import { Link } from 'react-router-dom'

export const formatKsh = (n) => `KSh ${Number(n).toLocaleString()}`

/** Top-selling perfume tile: tinted card + name + price, per mock-up. */
export default function PerfumeCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="perfume-card"
      style={{ background: product.scent, borderColor: product.accent }}
    >
      <div className="perfume-art" style={{ background: product.scent }}>
        <span className="perfume-emoji" style={{ color: product.accent }}>🧴</span>
      </div>
      <div className="perfume-info" style={{ background: `${product.scent}cc` }}>
        <span className="perfume-name">{product.name}</span>
        <span className="perfume-price">{formatKsh(product.price)}</span>
      </div>
    </Link>
  )
}
