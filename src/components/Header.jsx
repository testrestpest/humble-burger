import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [settings, setSettings] = useState({})

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings.json')
        const data = await response.json()
        setSettings(data)
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    }
    loadSettings()
  }, [])

  // Default navigation items if not configured in CMS
  const defaultNavItems = [
    { label: "Home", link: "/", enabled: true },
    { label: "Menu", link: "/menu", enabled: true },
    { label: "About", link: "/about", enabled: true },
    { label: "Contact", link: "/contact", enabled: true }
  ]

  const navItems = settings.header?.navItems || defaultNavItems
  const showLogoText = settings.header?.showLogoText || false
  const logoText = settings.header?.logoText || "Humble Burger"

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img 
              src={settings.assets?.logo || "/images/logo.png"} 
              alt="Humble Burger" 
              className="logo-image" 
            />
            {showLogoText && (
              <span className="logo-text">{logoText}</span>
            )}
          </Link>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            {navItems.filter(item => item.enabled).map((item, index) => (
              <Link 
                key={index}
                to={item.link} 
                className="nav-link" 
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
