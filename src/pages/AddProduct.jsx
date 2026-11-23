import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ProductForm from '../components/ProductForm'
import { api } from '../api/api'
import { useState } from 'react'

export default function AddProduct() {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)

  const handleAdd = async (product) => {
    setSaving(true)
    setSaveError(null)
    try {
      await api.addProduct(product) // POST to simulated backend
      navigate('/products')
    } catch (err) {
      setSaveError('Failed to save the product. Please try again.')
      setSaving(false)
    }
  }

  return (
    <>
      <Header title="Add New Product" />
      <div className="page-body">
        <p className="muted">Fill in the details below to list a new perfume in the store.</p>
        {saveError && <p className="field-error">{saveError}</p>}
        <ProductForm onSubmit={handleAdd} submitLabel={saving ? 'Saving…' : 'Add Product'} />
      </div>
    </>
  )
}
