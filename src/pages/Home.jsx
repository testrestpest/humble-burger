import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  const [featuredItems, setFeaturedItems] = useState([])

  useEffect(() => {
    // In a real app, this would fetch from your CMS
    // For now, we'll use some sample data
    setFeaturedItems([
      {
        id: 1,
        name: "Classic Humble Burger",
        description: "Our signature beef patty with lettuce, tomato, onion, and our special sauce",
        price: "$12.99",
        image: "🍔"
      },
      {
        id: 2,
        name: "BBQ Bacon Deluxe",
        description: "Smoky BBQ sauce, crispy bacon, and caramelized onions",
        price: "$15.99",
        image: "🥓"
      },
      {
        id: 3,
        name: "Mushroom Swiss",
        description: "Sautéed mushrooms and melted Swiss cheese with garlic aioli",
        price: "$14.99",
        image: "🧀"
      }
    ])
  }, [])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="highlight">Humble Burger</span>
            </h1>
            <p className="hero-subtitle">
              Where gourmet meets comfort. Every burger is crafted with passion, 
              using the freshest ingredients and served with a smile.
            </p>
            <div className="hero-actions">
              <Link to="/menu" className="btn btn-primary">
                View Our Menu
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="featured py-16">
        <div className="container">
          <h2 className="section-title text-center mb-8">
            Featured Favorites
          </h2>
          <div className="featured-grid">
            {featuredItems.map(item => (
              <div key={item.id} className="featured-item card">
                <div className="item-image">
                  <span className="item-emoji">{item.image}</span>
                </div>
                <div className="item-content">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="item-footer">
                    <span className="item-price">{item.price}</span>
                    <button className="btn btn-primary btn-sm">Order Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose py-16">
        <div className="container">
          <h2 className="section-title text-center mb-8">
            Why Choose Humble Burger?
          </h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🥩</div>
              <h3>Premium Ingredients</h3>
              <p>We source only the finest, locally-raised beef and fresh produce for every burger.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">👨‍🍳</div>
              <h3>Expert Craftsmanship</h3>
              <p>Our chefs hand-craft each burger to perfection, ensuring every bite is memorable.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🌱</div>
              <h3>Sustainable Practices</h3>
              <p>We're committed to sustainable sourcing and environmentally friendly practices.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">❤️</div>
              <h3>Made with Love</h3>
              <p>Every burger is prepared with care and passion by our dedicated team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta py-16">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready for the Ultimate Burger Experience?</h2>
            <p>Visit us today or order online for pickup. Your taste buds will thank you!</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary">
                Visit Us Today
              </Link>
              <Link to="/menu" className="btn btn-secondary">
                Browse Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
