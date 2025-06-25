import { useContent } from '../hooks/useContent'
import { useCart } from '../contexts/CartContext'
import './Order.css'

function Order() {
  const { content, loading, error } = useContent('order')
  const { cartCount, openCart } = useCart()

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error loading page content.</div>

  // Handle both possible data structures
  const page = content?.[0]?.attributes || content?.[0] || {}

  if (!page || !page.title) return <div>Page content not found.</div>

  return (
    <div className="order-page">
      <div className="container">
        <h1>{page.title}</h1>
        
        {/* Cart Summary Section */}
        <div className="cart-summary">
          <h2>Your Order</h2>
          {cartCount > 0 ? (
            <div className="cart-info">
              <p>You have {cartCount} item{cartCount !== 1 ? 's' : ''} in your cart.</p>
              <button className="btn view-cart-btn" onClick={openCart}>
                View Cart & Checkout
              </button>
            </div>
          ) : (
            <div className="empty-cart">
              <p>Your cart is empty. <a href="/menu">Browse our menu</a> to add items.</p>
            </div>
          )}
        </div>

        <div className="order-options-grid">
          <div className="order-option">
            <h2>{page.takeaway_title}</h2>
            {page.takeaway_content && (
              <div dangerouslySetInnerHTML={{ __html: page.takeaway_content }} />
            )}
          </div>
          <div className="order-option">
            <h2>{page.click_collect_title}</h2>
            {page.click_collect_content && (
              <div dangerouslySetInnerHTML={{ __html: page.click_collect_content }} />
            )}
            <a href={page.click_collect_button_link} className="btn">{page.click_collect_button_text}</a>
          </div>
          <div className="order-option">
            <h2>{page.delivery_title}</h2>
            {page.delivery_content && (
              <div dangerouslySetInnerHTML={{ __html: page.delivery_content }} />
            )}
          </div>
          <div className="order-option">
            <h2>{page.eat_in_title}</h2>
            {page.eat_in_content && (
              <div dangerouslySetInnerHTML={{ __html: page.eat_in_content }} />
            )}
          </div>
        </div>
        <div className="map-section">
            <h2>{page.map_title}</h2>
            <iframe 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(page.map_address)}`}>
            </iframe>
        </div>
      </div>
    </div>
  );
}

export default Order;
