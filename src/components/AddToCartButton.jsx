import { useState } from 'react'
import { FiPlus, FiCheck } from 'react-icons/fi'
import { useCart } from '../contexts/CartContext'
import './AddToCartButton.css'

function AddToCartButton({ item, className = '', size = 'medium' }) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isAdding || justAdded) return
    
    setIsAdding(true)
    
    try {      // Prepare item data for Snipcart
      const cartItem = {
        id: item.id || item.name.toLowerCase().replace(/\s+/g, '-'),
        name: item.name,
        price: parseFloat(item.price.replace(/[£$,]/g, '')).toFixed(2),
        description: item.description,
        category: item.category,
        image: item.image ? (item.image.startsWith('/') ? `${window.location.origin}${item.image}` : item.image) : `${window.location.origin}/images/default-burger.jpg`
      }
      
      // Wait for Snipcart to be ready
      const waitForSnipcart = () => {
        return new Promise((resolve, reject) => {
          const checkSnipcart = () => {
            if (window.Snipcart && window.Snipcart.api) {
              resolve()
            } else {
              setTimeout(checkSnipcart, 100)
            }
          }
          checkSnipcart()
          // Timeout after 5 seconds
          setTimeout(() => reject(new Error('Snipcart not ready')), 5000)
        })
      }
        await waitForSnipcart()
      
      console.log('Adding item to cart:', cartItem)
      addToCart(cartItem)
      
      // Show success state
      setJustAdded(true)
      setTimeout(() => {
        setJustAdded(false)
      }, 2000)
      
    } catch (error) {
      console.error('Error adding item to cart:', error)
      alert('Sorry, there was an error adding the item to your cart. Please try again.')
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <button
      className={`add-to-cart-button ${className} ${size} ${justAdded ? 'success' : ''}`}
      onClick={handleAddToCart}
      disabled={isAdding || justAdded}
      aria-label={`Add ${item.name} to cart`}
    >
      {justAdded ? (
        <>
          <FiCheck size={18} />
          <span>Added!</span>
        </>
      ) : (
        <>
          <FiPlus size={18} />
          <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
        </>
      )}
    </button>
  )
}

export default AddToCartButton
