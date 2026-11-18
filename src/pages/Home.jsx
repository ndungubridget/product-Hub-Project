
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useProducts from '../hooks/useProducts'

function Home() {
  const { products, loading, error } = useProducts()
const [searchTerm, setSearchTerm] = useState('')
const [hoveredPoint, setHoveredPoint] = useState(null)

const chartPoints = [
  { month: 'Jan', x: 45, y: 155, value: 30 },
  { month: 'Feb', x: 120, y: 140, value: 35 },
  { month: 'Mar', x: 195, y: 135, value: 38 },
  { month: 'Apr', x: 270, y: 125, value: 42 },
  { month: 'May', x: 345, y: 115, value: 48 },
  { month: 'Jun', x: 420, y: 105, value: 53 },
  { month: 'Jul', x: 495, y: 95, value: 60 },
  { month: 'Aug', x: 570, y: 85, value: 67 },
  { month: 'Sep', x: 645, y: 75, value: 74 },
  { month: 'Oct', x: 720, y: 65, value: 82 },
  { month: 'Nov', x: 795, y: 48, value: 90 },
  { month: 'Dec', x: 875, y: 40, value: 96 },
]
const filteredProducts = products.filter((product) => {
  const search = searchTerm.toLowerCase().trim()

  return (
    product.name.toLowerCase().includes(search) ||
    product.brand.toLowerCase().includes(search) ||
    product.category.toLowerCase().includes(search)
  )
})
  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock || 0),
    0
  )

  const inventoryValue = products.reduce(
    (total, product) =>
      total + Number(product.price || 0) * Number(product.stock || 0),
    0
  )

  const lowStock = products.filter(
    (product) => Number(product.stock) <= 10
  ).length

  const formatPrice = (price) =>
    `KSh ${Number(price).toLocaleString()}`

  const stats = [
    {
      title: 'Inventory Value',
      value: formatPrice(inventoryValue),
      change: 'Current stock value',
      icon: '▣',
    },
    {
      title: 'Units in Stock',
      value: totalStock.toLocaleString(),
      change: 'Across all perfumes',
      icon: '♧',
    },
    {
      title: 'Total Products',
      value: products.length,
      change: 'Perfumes in catalogue',
      icon: '▤',
    },
    {
      title: 'Low Stock Items',
      value: lowStock,
      change: 'Products with 10 or fewer units',
      icon: '⚠',
    },
  ]

  if (loading) {
    return <p className="p-8 text-gray-600">Loading dashboard...</p>
  }

  if (error) {
    return <p className="p-8 text-red-600">Error: {error}</p>
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#26384a]">

      {/* Top navigation */}
      
{/* Top navigation */}
<header className="bg-white border-b border-gray-200 px-5 md:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  <h2 className="font-semibold text-lg text-[#263f59]">
    Dashboard Overview
  </h2>

  <div className="flex items-center gap-4">
    {/* Search field */}
    
{/* Functional dashboard search */}
<div className="relative w-48 lg:w-64">
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
    ⌕
  </span>

  <input
    type="text"
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
    placeholder="Search perfumes..."
    className="w-full bg-gray-100 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
  />

  {searchTerm.trim() !== '' && (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-72 overflow-y-auto">

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            onClick={() => setSearchTerm('')}
            className="flex items-center gap-3 p-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-10 h-10 object-contain rounded bg-gray-50"
            />

            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#263f59] truncate">
                {product.name}
              </p>

              <p className="text-xs text-gray-500 truncate">
                {product.brand}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p className="p-4 text-sm text-gray-500">
          No matching perfumes found.
        </p>
      )}

    </div>
  )}
</div>


    {/* Notifications */}
    <button
      type="button"
      aria-label="Notifications"
      className="relative text-gray-500 hover:text-blue-600 text-xl"
    >
      ♧
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
    </button>

    {/* Administrator profile */}
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-[#dce9f5] flex items-center justify-center font-bold text-[#1d4162]">
        SA
      </div>

      <div>
        <p className="text-sm font-semibold text-[#263f59]">
          Store Administrator
        </p>

        <p className="text-xs text-gray-500">
          Super admin
        </p>
      </div>
    </div>
  </div>
</header>


      <main className="p-5 md:p-8">

        {/* Welcome heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div>
            <h1 className="text-2xl font-bold text-[#243b53]">
              A fresh look at your business.
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back. Here's how your perfume inventory is doing.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600">
            Inventory Overview
          </div>
        </div>

        {/* Statistics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div
             key={stat.title}
  className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:border-blue-200"
>
  <div className="flex items-center justify-between">
    <p className="text-sm text-gray-500">
      {stat.title}
    </p>

    <span className="w-9 h-9 rounded-lg bg-[#e8f2fb] text-[#2876b5] flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110">
      {stat.icon}
    </span>
  </div>

  <h2 className="text-2xl font-bold text-[#263f59] mt-4">
    {stat.value}
  </h2>

  <p className="text-xs text-gray-400 mt-2">
    {stat.change}
  </p>
</div>
          ))}
        </div>

        {/* Sales overview */}
        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div>
              <h2 className="font-bold text-[#263f59]">
                Sales Overview
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Sales performance chart — awaiting actual sales records
              </p>
            </div>

            <span className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
              Demonstration chart
            </span>
          </div>

          <div className="w-full overflow-hidden">
            <svg
              viewBox="0 0 900 230"
              className="w-full h-auto"
              role="img"
              aria-label="Illustrative sales trend chart"
            >
              {[35, 80, 125, 170].map((y) => (
                <line
                  key={y}
                  x1="45"
                  y1={y}
                  x2="875"
                  y2={y}
                  stroke="#edf1f5"
                  strokeWidth="1"
                />
              ))}

              <path
                d="M45 155 C90 145 100 125 150 135 S220 145 260 120 S330 130 370 112 S440 120 480 95 S550 110 590 80 S660 95 700 65 S770 80 820 48 L875 40 L875 190 L45 190 Z"
                fill="#dcecf9"
                opacity="0.8"
              />

              <path
                d="M45 155 C90 145 100 125 150 135 S220 145 260 120 S330 130 370 112 S440 120 480 95 S550 110 590 80 S660 95 700 65 S770 80 820 48 L875 40"
                fill="none"
                stroke="#3182ce"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {chartPoints.map((point) => (
  <g key={point.month}>
    <text
      x={point.x}
      y="215"
      fontSize="11"
      fill="#8795a5"
      textAnchor="middle"
    >
      {point.month}
    </text>

    <circle
      cx={point.x}
      cy={point.y}
      r={hoveredPoint?.month === point.month ? 8 : 5}
      fill="#3182ce"
      stroke="white"
      strokeWidth="2"
      className="cursor-pointer transition-all duration-200"
      onMouseEnter={() => setHoveredPoint(point)}
      onMouseLeave={() => setHoveredPoint(null)}
    />
  </g>
))}
{hoveredPoint && (
  <g pointerEvents="none">
    <rect
      x={Math.min(Math.max(hoveredPoint.x - 65, 5), 765)}
      y={Math.max(hoveredPoint.y - 55, 2)}
      width="130"
      height="42"
      rx="8"
      fill="#1d4162"
    />

    <text
      x={Math.min(Math.max(hoveredPoint.x, 70), 830)}
      y={Math.max(hoveredPoint.y - 30, 27)}
      textAnchor="middle"
      fill="white"
      fontSize="12"
      fontWeight="bold"
    >
      {hoveredPoint.month}: {hoveredPoint.value}
    </text>
  </g>
)}
            </svg>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Illustrative trend only. Connect real order data to display actual revenue.
          </p>
        </section>

        {/* Perfume collection */}
       
{/* Top selling perfumes */}
<section className="mb-6">
  <div className="flex items-center justify-between mb-4">
    <div>
      <h2 className="font-bold text-[#263f59]">
         Featured Perfumes
       </h2>

      <p className="text-xs text-gray-500 mt-1">
        Explore selected perfumes from your inventory.
      </p>
    </div>

    <Link
      to="/products"
      className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
    >
      View all products →
    </Link>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    {products.slice(0, 4).map((product, index) => (
      <Link
        to={`/products/${product.id}`}
        key={product.id}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="relative bg-[#edf2f5] h-36">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />

          <span className="absolute top-2 left-2 bg-white text-gray-500 text-[10px] font-bold px-2 py-1 rounded shadow-sm">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {product.brand}
          </p>

          <h3 className="font-bold text-sm mt-1 text-[#263f59] truncate">
            {product.name}
          </h3>

          <p className="text-[10px] text-gray-400 mt-1 uppercase">
            {product.concentration} · {product.size} ML
          </p>

          <div className="flex justify-between items-center mt-4 gap-2">
            <p className="text-sm font-bold text-[#263f59]">
              {formatPrice(product.price)}
            </p>

            <span className="text-[10px] bg-blue-50 text-blue-700 rounded px-2 py-1">
              {product.stock} in stock
            </span>
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>

       
{/* Recent orders preview */}

<section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
    <div>
      <h2 className="font-bold text-[#263f59]">
        Recent Orders
      </h2>
      <p className="text-xs text-gray-500 mt-1">
         Preview of the orders management table.      
      </p>
    </div>

    <span className="text-xs bg-amber-50 text-amber-700 px-3 py-2 rounded-lg">
      Sample data — awaiting orders API
    </span>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm min-w-[750px]">
      <thead>
        <tr className="text-xs text-gray-400 border-b border-gray-100">
          <th className="py-3 font-medium">Order ID</th>
          <th className="py-3 font-medium">Customer</th>
          <th className="py-3 font-medium">Product</th>
          <th className="py-3 font-medium">Date</th>
          <th className="py-3 font-medium">Amount</th>
          <th className="py-3 font-medium">Status</th>
        </tr>
      </thead>

      <tbody>
        {products.slice(0, 4).map((product, index) => {
          const customers = [
            'Grace Wanjiku',
            'James Mwangi',
            'Amina Hassan',
            'Brian Otieno',
          ]

          const statuses = [
            'Delivered',
            'Processing',
            'Shipped',
            'Delivered',
          ]

          const statusStyles = {
            Delivered: 'bg-green-50 text-green-700',
            Processing: 'bg-amber-50 text-amber-700',
            Shipped: 'bg-blue-50 text-blue-700',
          }

          return (
            <tr
              key={product.id}
              className="border-b border-gray-50 hover:bg-gray-50"
            >
              <td className="py-4 text-blue-600">
                #SC-10{index + 1}
              </td>

              <td className="py-4">
                {customers[index]}
              </td>

              <td className="py-4">
                {product.name}
              </td>

              <td className="py-4 text-gray-500">
                {index === 3 ? '17 Nov, 2026' : '18 Nov, 2026'}
              </td>

              <td className="py-4 font-semibold">
                {formatPrice(product.price)}
              </td>

              <td className="py-4">
                <span className={`px-3 py-1 rounded-full text-xs ${statusStyles[statuses[index]]}`}>
                  {statuses[index]}
                </span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
</section>


        <footer className="text-xs text-gray-400 flex flex-col sm:flex-row justify-between gap-2 mt-6">
          <p>© 2026 SCENTORA. All rights reserved.</p>
          <p>Inventory dashboard</p>
        </footer>

      </main>
    </div>
  )
}

export default Home
