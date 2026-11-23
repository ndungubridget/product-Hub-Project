import { NavLink } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

const links = [
  { to: '/dashboard', label: 'Dashboard', color: '#2f4b7c' },
  { to: '/products', label: 'Products', color: '#2e7d5b' },
  { to: '/dashboard', label: 'Categories', color: '#665191' },
  { to: '/dashboard', label: 'Orders', color: '#b8860b' },
  { to: '/dashboard', label: 'Customers', color: '#a05195' },
  { to: '/dashboard', label: 'Inventory', color: '#3d6b4f' },
  { to: '/dashboard', label: 'Sales Reports', color: '#2f4b7c' },
  { to: '/dashboard', label: 'Settings', color: '#665191' }
]

export default function Sidebar() {
  const { store } = useStore()

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <h1 className="logo">{store?.name ?? 'SCENTORA'}</h1>
        <p className="tagline">{store?.tagline ?? 'Store management'}</p>

        <nav className="nav">
          {links.map((l, i) => (
            <NavLink
              key={i}
              to={l.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              style={{ '--link-color': l.color }}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="cart-art" aria-hidden="true">🛒</div>
        <p className="cart-caption">{store?.description?.split('—')[0].trim() ?? 'A cart full of scents'}</p>
        <p className="live-badge">● {store?.status ?? 'Store is live'}</p>
        <a className="logout" href="/">Logout</a>
      </div>
    </aside>
  )
}
