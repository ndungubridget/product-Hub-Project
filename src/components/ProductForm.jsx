import { useState } from 'react'

const INITIAL = { name: '', brand: '', price: '', stock: '', category: 'Women', description: '' }

/** Shared form used by AddProduct and (reused fields conceptually) elsewhere. */
export default function ProductForm({ onSubmit, submitLabel = 'Add Product', initial = INITIAL }) {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Name is required'
    if (!form.brand.trim()) er.brand = 'Brand is required'
    if (!form.price || Number(form.price) <= 0) er.price = 'Enter a valid price'
    if (form.stock === '' || Number(form.stock) < 0) er.stock = 'Enter stock quantity'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      // pastel tint assigned automatically for the card art
      scent: ['#f5e6c8', '#dfe9f2', '#e2f0e6', '#fdeedd'][(form.name.length + 7) % 4],
      accent: ['#b8860b', '#4a6fa5', '#2e7d5b', '#c47f3e'][(form.brand.length + 3) % 4]
    })
  }

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label>
          Product name
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <em className="field-error">{errors.name}</em>}
        </label>
        <label>
          Brand
          <input name="brand" value={form.brand} onChange={handleChange} />
          {errors.brand && <em className="field-error">{errors.brand}</em>}
        </label>
      </div>
      <div className="form-row">
        <label>
          Price (KSh)
          <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} />
          {errors.price && <em className="field-error">{errors.price}</em>}
        </label>
        <label>
          Stock
          <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} />
          {errors.stock && <em className="field-error">{errors.stock}</em>}
        </label>
      </div>
      <label>
        Category
        <select name="category" value={form.category} onChange={handleChange}>
          <option>Women</option><option>Men</option><option>Unisex</option>
        </select>
      </label>
      <label>
        Description
        <textarea name="description" rows="3" value={form.description} onChange={handleChange} />
      </label>
      <button type="submit" className="btn-primary">{submitLabel}</button>
    </form>
  )
}
