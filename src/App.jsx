import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Categories from './pages/Categories'
import Customers from './pages/Customers'
import Inventory from './pages/Inventory'
import SalesReports from './pages/SalesReport'
import AddProduct from './pages/AddProduct'
import ProductDetail from './pages/ProductDetail'
function App() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8f5ed]">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales-reports" element={<SalesReports />} />
        </Routes>
      </main>
    </div>
  )
}

export default App