import { useId } from 'react'

/** Controlled search input with a generated id (useId) and ref forwarding. */
export default function SearchBar({ value, onChange }) {
  const id = useId()
  return (
    <div className="search-bar">
      <label htmlFor={id} className="sr-only">Search products</label>
      <span aria-hidden="true">🔍</span>
      <input
        id={id}
        type="search"
        placeholder="Search products…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
