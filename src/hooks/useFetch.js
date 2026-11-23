import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook: fetch data from a function, expose loading / error states,
 * and optionally re-fetch when `deps` change.
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // useRef keeps a stable reference for the mounted check across renders
  const mounted = useRef(true)

  const reload = () => {
    setLoading(true)
    fetcher()
      .then((result) => { if (mounted.current) { setData(result); setError(null) } })
      .catch((err) => { if (mounted.current) setError(err.message) })
      .finally(() => { if (mounted.current) setLoading(false) })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { reload() }, deps)

  useEffect(() => () => { mounted.current = false }, [])

  return { data, loading, error, reload }
}
