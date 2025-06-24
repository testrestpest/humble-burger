import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

// Hook to close cart when navigating to different pages
export const useCloseCartOnNavigate = () => {
  const location = useLocation()
  const { closeCart } = useCart()

  useEffect(() => {
    // Close cart when route changes
    closeCart()
  }, [location.pathname, closeCart])
}

export default useCloseCartOnNavigate
