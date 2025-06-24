import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0)
  const [isCartVisible, setIsCartVisible] = useState(false)
  useEffect(() => {
    // Listen for Snipcart events
    const updateCartCount = () => {
      if (window.Snipcart && window.Snipcart.api && window.Snipcart.api.items) {
        try {
          const count = window.Snipcart.api.items.count()
          setCartCount(count)        } catch (error) {
          console.log('Snipcart API not fully ready yet:', error)
        }
      }
    }

    const handleCartOpen = () => {
      setIsCartVisible(true)
      document.body.classList.add('snipcart-modal-open')
    }
    
    const handleCartClose = () => {
      setIsCartVisible(false)
      document.body.classList.remove('snipcart-modal-open')
    }

    // Wait for Snipcart to be ready
    const checkSnipcart = () => {
      if (window.Snipcart && window.Snipcart.api && window.Snipcart.api.items) {
        try {
          // Initial cart count
          updateCartCount()
          
          // Subscribe to cart events
          window.Snipcart.events.on('cart.opened', handleCartOpen)
          window.Snipcart.events.on('cart.closed', handleCartClose)
          window.Snipcart.events.on('item.added', updateCartCount)
          window.Snipcart.events.on('item.removed', updateCartCount)
          window.Snipcart.events.on('item.updated', updateCartCount)
          window.Snipcart.events.on('cart.reset', updateCartCount)
        } catch (error) {
          console.log('Error setting up Snipcart events:', error)
          // Retry if there's an error
          setTimeout(checkSnipcart, 500)
        }
      } else {
        // Retry if Snipcart isn't ready yet
        setTimeout(checkSnipcart, 500)
      }
    }

    // Wait for Snipcart ready event
    if (window.Snipcart && window.Snipcart.events) {
      window.Snipcart.events.on('snipcart.ready', checkSnipcart)
    } else {
      // Fallback: try checking every 500ms
      setTimeout(checkSnipcart, 500)
    }    // Cleanup function
    return () => {
      if (window.Snipcart && window.Snipcart.events) {
        try {
          // Snipcart v3 uses removeEventListener instead of off
          if (typeof window.Snipcart.events.removeEventListener === 'function') {
            window.Snipcart.events.removeEventListener('cart.opened', handleCartOpen)
            window.Snipcart.events.removeEventListener('cart.closed', handleCartClose)
            window.Snipcart.events.removeEventListener('item.added', updateCartCount)
            window.Snipcart.events.removeEventListener('item.removed', updateCartCount)
            window.Snipcart.events.removeEventListener('item.updated', updateCartCount)
            window.Snipcart.events.removeEventListener('cart.reset', updateCartCount)
            window.Snipcart.events.removeEventListener('snipcart.ready', checkSnipcart)
          } else if (typeof window.Snipcart.events.off === 'function') {
            window.Snipcart.events.off('cart.opened', handleCartOpen)
            window.Snipcart.events.off('cart.closed', handleCartClose)
            window.Snipcart.events.off('item.added', updateCartCount)
            window.Snipcart.events.off('item.removed', updateCartCount)
            window.Snipcart.events.off('item.updated', updateCartCount)
            window.Snipcart.events.off('cart.reset', updateCartCount)
            window.Snipcart.events.off('snipcart.ready', checkSnipcart)
          }
        } catch (error) {
          console.log('Error cleaning up Snipcart events:', error)
        }
      }
    }
  }, [])
  const openCart = () => {
    if (window.Snipcart && window.Snipcart.api && window.Snipcart.api.modal) {
      try {
        window.Snipcart.api.modal.show()
      } catch (error) {
        console.log('Error opening cart:', error)
      }
    }
  }

  const closeCart = () => {
    if (window.Snipcart && window.Snipcart.api && window.Snipcart.api.modal) {
      try {
        window.Snipcart.api.modal.hide()      } catch (error) {
        console.log('Error closing cart:', error)
      }
    }
  }

  const addToCart = (item) => {
    // Create a buy button element and trigger click
    const button = document.createElement('button')
    button.className = 'snipcart-add-item'
    button.setAttribute('data-item-id', item.id)
      // Ensure price is a valid number string
    let price = typeof item.price === 'number' ? item.price.toString() : item.price
    price = parseFloat(price.replace(/[£$,]/g, '')).toFixed(2)
    button.setAttribute('data-item-price', price)
    
    button.setAttribute('data-item-name', item.name)
    button.setAttribute('data-item-description', item.description)
    if (item.image) {
      button.setAttribute('data-item-image', item.image)
    }
    if (item.category) {
      button.setAttribute('data-item-categories', item.category)
    }
    button.style.display = 'none'
    document.body.appendChild(button)
    button.click()
    document.body.removeChild(button)
  }

  const value = {
    cartCount,
    isCartVisible,
    openCart,
    closeCart,
    addToCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
