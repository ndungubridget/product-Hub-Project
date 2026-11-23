import { useState } from 'react'

/**
 * ProductForm component for creating and validating new SCENTORA perfume entries.
 *
 * @param {Object} props
 * @param {Function} props.onSubmit - Callback invoked with the formatted product payload.
 * @param {boolean} props.isSubmitting - Indicates whether the form submission is in progress.
 * @param {string} props.errorMessage - Error alert message from the API request.
 * @param {string} props.successMessage - Confirmation message shown after saving.
 */
function ProductForm({ onSubmit, isSubmitting, errorMessage, successMessage }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    stock: ''
  })

  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  function validateForm() {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required'
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a number above 0'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required'
    }

    if (formData.stock === '' || Number(formData.stock) < 0) {
      newErrors.stock = 'Stock is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const newProduct = {
      name: formData.name.trim(),
      brand: 'Scentora',
      category: formData.category,
      concentration: 'Eau de Parfum',
      size: 100,
      price: Number(formData.price),
      stock: Number(formData.stock),
      image: formData.image.trim(),
      description: formData.description.trim(),
      notes: {
        top: [],
        middle: [],
        base: []
      }
    }

    onSubmit(newProduct)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <p role="alert" className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {errorMessage}
        </p>
      )}

      {successMessage && (
        <p role="status" className="p-3 bg-green-100 text-green-700 rounded-lg text-sm">
          {successMessage}
        </p>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Oud Mood"
          className="w-full p-2.5 border border-gray-300 rounded-lg"
        />
        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price (KSh)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 2500"
            className="w-full p-2.5 border border-gray-300 rounded-lg"
          />
          {errors.price && <p className="text-red-600 text-xs mt-1">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="e.g. 10"
            className="w-full p-2.5 border border-gray-300 rounded-lg"
          />
          {errors.stock && <p className="text-red-600 text-xs mt-1">{errors.stock}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2.5 border border-gray-300 rounded-lg bg-white"
        >
          <option value="">Select category</option>
          <option value="Unisex">Unisex</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
        {errors.category && <p className="text-red-600 text-xs mt-1">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          id="image"
          name="image"
          type="text"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full p-2.5 border border-gray-300 rounded-lg"
        />
        {errors.image && <p className="text-red-600 text-xs mt-1">{errors.image}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write a short description of the perfume..."
          className="w-full p-2.5 border border-gray-300 rounded-lg"
        />
        {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#1d4162] hover:bg-[#2876b5] text-white font-medium py-2.5 rounded-lg transition-colors"
      >
        {isSubmitting ? 'Saving...' : 'Add Product'}
      </button>
    </form>
  )
}

export default ProductForm