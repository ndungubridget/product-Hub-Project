
import { NavLink } from 'react-router-dom'

function Navbar() {
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-3 md:px-4 rounded-md text-sm transition-colors ${
      isActive
        ? 'bg-[#2876b5] text-white font-semibold'
        : 'text-blue-100 hover:bg-[#294f73] hover:text-white'
    }`

  const navigation = [
    { name: 'Dashboard', path: '/', icon: '▦', end: true },
    { name: 'Products', path: '/products', icon: '♧' },
    { name: 'Categories', path: '/categories', icon: '▤' },
    { name: 'Orders', path: '/orders', icon: '▣' },
    { name: 'Customers', path: '/customers', icon: '♙' },
    { name: 'Inventory', path: '/inventory', icon: '▥' },
    { name: 'Sales Reports', path: '/reports', icon: '⌁' },
    { name: 'Settings', path: '/settings', icon: '⚙' },
  ]

  return (
    <aside className="w-full md:w-64 md:min-h-screen md:h-screen md:sticky md:top-0 md:shrink-0 bg-[#1d4162] text-white flex flex-col p-4 md:p-5">

      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-blue-300/20 pb-6">
        <span className="bg-white text-[#1d4162] rounded-md px-2 py-1 font-bold">
          S
        </span>

        <h1 className="text-xl font-bold tracking-wider">
          SCENTORA
        </h1>
      </div>

      {/* Navigation heading */}
      <p className="text-[10px] uppercase tracking-widest text-blue-200/70 mt-7 mb-3 px-3">
        Store Management
      </p>

      {/* Navigation links */}
      <nav className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 gap-2">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={linkStyle}
          >
            <span className="w-5 shrink-0 text-center text-base">
              {item.icon}
            </span>

            <span className="truncate">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Storefront and logout */}
      <div className="mt-5 md:mt-auto">
        <div className="bg-[#294f73] rounded-lg p-3 mb-4">
          <p className="text-[10px] uppercase tracking-wider text-blue-200">
            Your Storefront
          </p>

          <p className="text-sm font-medium mt-2">
            Store is live
          </p>

          <span className="text-xs text-blue-200">
            ● Online
          </span>
        </div>

        <button
          type="button"
          className="w-full text-left text-sm text-blue-100 px-3 py-3 hover:text-white"
        >
          ↪ Logout
        </button>
      </div>
    </aside>
  )
}

export default Navbar
