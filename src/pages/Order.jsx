import { useContent } from '../hooks/useContent'
import { useCart } from '../contexts/CartContext'
import { Link } from 'react-router-dom'
import './Order.css'

function Order() {
  const { content, loading, error } = useContent('order')
  const { cartCount, openCart } = useCart()

  if (error) return <div className="error">Error loading page content.</div>
  if (loading) return <div />

  // Handle both possible data structures
  const page = content?.[0]?.attributes || content?.[0] || {}

  if (!page || !page.title) return <div>Page content not found.</div>

  return (
    <div className="order-page">
      <div className="container">
        <h1>{page.title}</h1>

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
            <a
              href={page.click_collect_button_link}
              className="btn"
            >
              {page.click_collect_button_text}
            </a>
          </div>

          <div className="order-option">
            <h2>{page.eat_in_title}</h2>
            {page.eat_in_content && (
              <div dangerouslySetInnerHTML={{ __html: page.eat_in_content }} />
            )}
          </div>

          <div className="order-option">
            <h2>{page.delivery_title}</h2>
            {page.delivery_content && (
              <div dangerouslySetInnerHTML={{ __html: page.delivery_content }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
