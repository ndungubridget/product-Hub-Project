import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api/api'

// Global store info (name, tagline, phone, status) shared by every page.
const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [store, setStore] = useState(null)

  useEffect(() => {
    api.getStoreInfo().then(setStore).catch(() => setStore({
      name: 'SCENTORA', tagline: 'Store management', status: 'Store is live'
    }))
  }, [])

  return (
    <StoreContext.Provider value={{ store }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}
