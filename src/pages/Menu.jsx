import { useState, useEffect } from 'react'
import './Menu.css'

function Menu() {
  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    // In a real app, this would fetch from your CMS
    // For now, we'll use sample data
    const sampleMenuItems = [
      {
        id: 1,
        name: "Classic Humble Burger",
        description: "Our signature beef patty with lettuce, tomato, onion, and our special sauce on a brioche bun",
        price: "$12.99",
        category: "burgers",
        image: "🍔",
        featured: true
      },
      {
        id: 2,
        name: "BBQ Bacon Deluxe",
        description: "Smoky BBQ sauce, crispy bacon, caramelized onions, and cheddar cheese",
        price: "$15.99",
        category: "burgers",
        image: "🥓",
        featured: true
      },
      {
        id: 3,
        name: "Mushroom Swiss",
        description: "Sautéed mushrooms, melted Swiss cheese, and garlic aioli",
        price: "$14.99",
        category: "burgers",
        image: "🧀",
        featured: false
      },
      {
        id: 4,
        name: "Spicy Jalapeño",
        description: "Jalapeños, pepper jack cheese, chipotle mayo, and lettuce",
        price: "$13.99",
        category: "burgers",
        image: "🌶️",
        featured: false
      },
      {
        id: 5,
        name: "Sweet Potato Fries",
        description: "Crispy sweet potato fries with a hint of cinnamon",
        price: "$6.99",
        category: "sides",
        image: "🍟",
        featured: false
      },
      {
        id: 6,
        name: "Onion Rings",
        description: "Beer-battered onion rings served with ranch dipping sauce",
        price: "$7.99",
        category: "sides",
        image: "🧅",
        featured: false
      },
      {
        id: 7,
        name: "Chocolate Milkshake",
        description: "Rich and creamy chocolate milkshake topped with whipped cream",
        price: "$5.99",
        category: "drinks",
        image: "🥤",
        featured: false
      },
      {
        id: 8,
        name: "Fresh Lemonade",
        description: "Freshly squeezed lemonade with a touch of mint",
        price: "$3.99",
        category: "drinks",
        image: "🍋",
        featured: false
      }
    ]

    setMenuItems(sampleMenuItems)
    setCategories(['all', 'burgers', 'sides', 'drinks'])
  }, [])

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)

  const getCategoryName = (category) => {
    const names = {
      all: 'All Items',
      burgers: 'Burgers',
      sides: 'Sides',
      drinks: 'Drinks'
    }
    return names[category] || category
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
              {item.featured && <div className="featured-badge">Featured</div>}
              <div className="item-image">
                <span className="item-emoji">{item.image}</span>
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
