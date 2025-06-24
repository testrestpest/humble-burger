import { FaShoppingCart } from 'react-icons/fa'
import './CartButton.css'

function CartButton() {
  return (
    <button className="cart-button-wrapper snipcart-checkout">
      <FaShoppingCart className="cart-icon" />
      <span className="snipcart-items-count"></span>
    </button>
  )
}

export default CartButton
