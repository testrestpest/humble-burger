import { useState, useEffect } from 'react'
import { fetchContent } from '../utils/contentLoader'
import './Menu.css'

function Menu() {
  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMenuItems = async () => {
      setLoading(true)
      try {
        const items = await fetchContent('menu')
        setMenuItems(items)
        
        // Extract unique categories from items
        const uniqueCategories = [...new Set(items.map(item => item.category))]
        setCategories(['all', ...uniqueCategories])
      } catch (error) {
        console.error('Error loading menu items:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMenuItems()
  }, [])
  const filteredItems = activeCategory === 'all' 
    ? menuItems.filter(item => item.available !== false) 
    : menuItems.filter(item => item.category === activeCategory && item.available !== false)

  const getCategoryName = (category) => {
    const names = {
      all: 'All Items',
      burgers: 'Burgers',
      sides: 'Sides',
      drinks: 'Drinks',
      desserts: 'Desserts'
    }
    return names[category] || category.charAt(0).toUpperCase() + category.slice(1)
  }

  if (loading) {
    return (
      <div className="menu-page">
        <div className="container">
          <div className="menu-header">
            <h1 className="page-title">Our Menu</h1>
            <p className="page-subtitle">Loading delicious items...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="menu-page">
      <div className="container">
        <div className="menu-header">
          <h1 className="page-title">Our Menu</h1>
          <p className="page-subtitle">
            Discover our carefully crafted selection of gourmet burgers, 
            crispy sides, and refreshing drinks.
          </p>
        </div>

        <div className="menu-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {getCategoryName(category)}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredItems.map(item => (
            <div key={item.id} className={`menu-item card ${item.featured ? 'featured' : ''}`}>
              {item.featured && <div className="featured-badge">Featured</div>}              <div className="item-image">
                <span className="item-emoji">{item.emoji || item.image || "🍽️"}</span>
              </div>
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <div className="item-footer">
                  <span className="item-price">{item.price}</span>
                  <button className="btn btn-primary btn-sm">Add to Order</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="no-items">
            <p>No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu
