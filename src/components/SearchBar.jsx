function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="w-full md:max-w-md">
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search perfumes by name, brand, or category..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
      />
    </div>
  )
}

export default SearchBar