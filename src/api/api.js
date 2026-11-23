// Central place for all calls to the simulated backend (json-server).
const BASE_URL = 'http://localhost:3001'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

export const api = {
  getStoreInfo: () => request('/store_info/1'),
  getProducts: () => request('/products'),
  getProduct: (id) => request(`/products/${id}`),
  addProduct: (product) =>
    request('/products', { method: 'POST', body: JSON.stringify(product) }),
  updateProduct: (id, changes) =>
    request(`/products/${id}`, { method: 'PATCH', body: JSON.stringify(changes) }),
  deleteProduct: (id) => request(`/products/${id}`, { method: 'DELETE' }),
  getOrders: () => request('/orders'),
  getSales: () => request('/sales')
}
