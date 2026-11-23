import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { useStore } from '../context/StoreContext'

/** Landing page: describes what the site is about and links into the portal. */
export default function Landing() {
  const { store } = useStore()

  return (
    <>
      <Header title="Welcome" />
      <div className="landing">
        <h1 className="landing-logo">{store?.name ?? 'SCENTORA'}</h1>
        <p className="landing-tagline">{store?.tagline ?? 'Store management'}</p>
        <p className="landing-desc">
          {store?.description ?? 'A cart full of scents'} This admin portal lets the
          store team track revenue and orders, browse the perfume catalogue,
          add new products, and adjust prices — all in one place.
        </p>
        <div className="landing-actions">
          <Link className="btn-primary" to="/dashboard">Open Dashboard</Link>
          <Link className="btn-ghost" to="/products">Browse Products</Link>
        </div>
        <p className="landing-contact">Need help? Call {store?.phone_number ?? '555-0199'}</p>
      </div>
    </>
  )
}
