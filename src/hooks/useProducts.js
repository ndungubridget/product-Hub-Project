
import useFetch from './useFetch'

function useProducts() {
  const { data, loading, error } = useFetch(
    'http://localhost:3000/products'
  )

  return {
    products: data,
    loading,
    error
  }
}

export default useProducts
