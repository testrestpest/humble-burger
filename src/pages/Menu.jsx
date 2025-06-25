import { useState, useEffect } from 'react'
import { fetchContent } from '../utils/contentLoader'
import AddToCartButton from '../components/AddToCartButton'
import './Menu.css'

function Menu() {
  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState([])
  const [categorySettings, setCategorySettings] = useState({})
  const [activeCategory, setActiveCategory] = useState('burgers')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true)
      try {
        // Load both menu items and settings (including categories)
        const [items, settings] = await Promise.all([
          fetchContent('menu'),
          fetchContent('settings')
        ])
        
        setMenuItems(items)
        
        // Use managed categories if available, otherwise fall back to auto-generated
        if (settings.categories?.categories) {
          const enabledCategories = settings.categories.categories
            .filter(cat => cat.enabled !== false)
            .sort((a, b) => (a.order || 999) - (b.order || 999))
          
          // Create category settings lookup
          const categoryLookup = {}
          enabledCategories.forEach(cat => {
            categoryLookup[cat.name.toLowerCase()] = cat
          })
          setCategorySettings(categoryLookup)
          
          const categoryNames = enabledCategories.map(cat => cat.name.toLowerCase())
          setCategories(categoryNames)
          
          // Set first enabled category as default if burgers isn't available
          if (categoryNames.length > 0 && !categoryNames.includes('burgers')) {
            setActiveCategory(categoryNames[0])
          }
        } else {
          // Fallback: auto-generate from menu items
          const uniqueCategories = [...new Set(items.map(item => item.category.toLowerCase()))]
          const categoryOrder = ['burgers', 'sides', 'bowls', 'kids', 'drinks', 'desserts', 'specials']
          
          const sortedCategories = uniqueCategories.sort((a, b) => {
            const aIndex = categoryOrder.indexOf(a)
            const bIndex = categoryOrder.indexOf(b)
            
            if (aIndex !== -1 && bIndex !== -1) {
              return aIndex - bIndex
            } else if (aIndex !== -1) {
              return -1
            } else if (bIndex !== -1) {
              return 1
            } else {
              return a.localeCompare(b)
            }
          })
          
          setCategories(sortedCategories)
        }
      } catch (error) {
        console.error('Error loading content:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])
  const filteredItems = menuItems.filter(item => item.category.toLowerCase() === activeCategory && item.available !== false)
  const getCategoryName = (category) => {
    // Use managed category display name if available
    if (categorySettings[category.toLowerCase()]) {
      return categorySettings[category.toLowerCase()].displayName
    }
    
    // Convert to title case without hardcoded fallbacks
    return category.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ')
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
            <div
              key={item.id}
              className={`menu-item card ${item.popular ? 'popular' : ''}`}
              style={{
                backgroundImage: item.image && item.image.startsWith('/')
                  ? `url(${item.image})`
                  : 'none',
                backgroundSize: '100% 100%', // stretch to fill container
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '0 0'
              }}
            >
              {item.popular && <div className="popular-badge">Popular</div>}
              <div className="item-details">
                <div className="item-content">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                </div>
                <div className="item-footer">
                  <span className="item-price">{item.price}</span>
                  <AddToCartButton item={item} />
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
