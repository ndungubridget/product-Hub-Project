import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../components/ProductForm'

/**
 * AddProduct page component that handles submitting new perfumes to the backend API
 * and redirecting to the product catalog on success.
 */
function AddProduct() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  async function handleAddProduct(newProduct) {
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      })

      if (!response.ok) {
        throw new Error('Could not save the product. Please try again.')
      }

      await response.json()
      setSuccessMessage('Product added successfully!')

      setTimeout(() => {
        navigate('/products')
      }, 800)
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Add New Perfume
        </h1>
        <p className="text-gray-600 mt-2">
          Fill in the form below to add a perfume to the store.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <ProductForm
          onSubmit={handleAddProduct}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      </div>
    </section>
  )
}

export default AddProduct