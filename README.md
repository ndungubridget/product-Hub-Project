# SCENTORA · Admin Portal

A React-based administrator portal for a perfume e-commerce store, built as a
Single Page Application (SPA) with client-side routing, hooks-based state
management, and a simulated backend (JSON Server) for persistence.

## Features

- **Landing page** describing what the site is about
- **Dashboard** with stat tiles, a pure-CSS sales bar chart, top-selling
  perfumes and a recent-orders table (matching the mock-up)
- **Products page** with dynamic debounced search (name, brand, category,
  description), delete support and links to detail
- **Add Product form** — validated form that POSTs to the backend
- **Product detail page** — administrator can edit values such as price and
  stock (PATCH persisted to `db.json`)
- Responsive layout: sidebar collapses on mobile

## Tech

- React 18 + Vite
- React Router v6 (client-side routing)
- Hooks: `useState`, `useEffect`, `useRef`, `useId`, `useContext`, `useMemo`
- Custom hooks: `useFetch` (loading/error/reload) and `useDebounce`
- JSON Server as the simulated backend (`db.json`)
- Vitest + React Testing Library for unit tests

## Setup

```bash
npm install
npm run dev        # starts json-server (:3001) AND vite (:5173) together
```

Open http://localhost:5173.

Other commands:

```bash
npm test           # run unit tests
npm run build      # production build
npm run server     # backend only
```

## Project structure

```
src/
  api/api.js           # all fetch calls (GET/POST/PATCH/DELETE)
  context/StoreContext # global store info via useContext
  hooks/               # useFetch, useDebounce
  components/          # Sidebar, Header, StatCard, SalesChart,
                       # PerfumeCard, OrdersTable, SearchBar, ProductForm
  pages/               # Landing, Dashboard, Products, AddProduct,
                       # ProductDetail, NotFound
  __tests__/           # Vitest + React Testing Library tests
```

## Data shape (db.json)

```json
{
  "store_info": [{ "id": 1, "name": "SCENTORA", "tagline": "Store management",
                   "description": "...", "phone_number": "555-0199", "status": "Store is live" }],
  "products": [{ "id": 1, "name": "Chanel No. 5", "brand": "Chanel", "price": 18500,
                  "stock": 24, "category": "Women", "description": "...",
                  "scent": "#f5e6c8", "accent": "#b8860b" }],
  "orders":   [{ "id": 1048, "customer": "Grace Wanjiku", "product": "Chanel No. 5",
                  "date": "18 Nov, 2026", "amount": 18500, "status": "Delivered" }],
  "sales":    [{ "month": "Jan", "revenue": 11000 }]
}
```

## Known limitations

- Product images are pastel-tinted placeholder cards (🧴) rather than real
  photos; add an `image` URL field and an `<img>` in `PerfumeCard` to upgrade.
- The sidebar categories/orders/customers links point at the dashboard as a
  placeholder — the assignment scopes only product management.
- Auth (Login/Logout) is visual only; there is no real authentication.
- Prices are stored in KSh as plain numbers.
