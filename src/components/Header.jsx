import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaTiktok, FaGlobe, FaGoogle } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [settings, setSettings] = useState({})
  useEffect(() => {
    const loadSettings = async () => {
      try {
        console.log('Loading settings from /api/settings.json')
        const response = await fetch('/api/settings.json')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log('Settings loaded:', data)
        console.log('Header nav items:', data.header?.navItems)
        setSettings(data)
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    }
    loadSettings()
  }, [])

  // Map platform names to React icons
  const getIconComponent = (platform, customIcon) => {
    const platformLower = platform.toLowerCase()
    
    switch (platformLower) {
      case 'instagram':
        return <FaInstagram />
      case 'facebook':
        return <FaFacebookF />
      case 'x':
      case 'twitter':
        return <FaXTwitter />
      case 'linkedin':
        return <FaLinkedinIn />
      case 'youtube':
        return <FaYoutube />
      case 'tiktok':
        return <FaTiktok />
      case 'google':
        return <FaGoogle />
      case 'website':
      case 'web':
        return <FaGlobe />
      default:
        // Fallback to custom icon if provided, otherwise use globe
        return customIcon || <FaGlobe />
    }
  }
  // Default navigation items if not configured in CMS
  const defaultNavItems = [
    { label: "Home", link: "/", enabled: true },
    { label: "About", link: "/about", enabled: true },
    { label: "Menu", link: "/menu", enabled: true },
    { label: "Order", link: "/order", enabled: true },
    { label: "Contact", link: "/contact", enabled: true }
  ]
    const navItems = settings.header?.navItems || defaultNavItems
  const showLogoText = settings.header?.showLogoText || false
  const logoText = settings.header?.logoText || "Humble Burger"
  const socialLinks = settings.header?.socialLinks || settings.general?.socialLinks || settings.socialLinks || []
  const logoSrc = settings.assets?.logo

  console.log('Current nav items being used:', navItems)
  console.log('Settings object:', settings)

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            {logoSrc && (
              <img 
                src={logoSrc} 
                alt="Humble Burger" 
                className="logo-image" 
              />
            )}
            {showLogoText && (
              <span className="logo-text">{logoText}</span>
            )}
          </Link>
          
          <div className="nav-container">
            <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>              {navItems.filter(item => item.enabled).map((item, index) => (
                <Link 
                  key={index}
                  to={item.link} 
                  className="nav-link" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="social-links-container"> {socialLinks.filter(social => social.enabled !== false).map((social, index) => (
                <a 
                  key={`social-${index}`}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  title={social.platform}
                >
                  {getIconComponent(social.platform, social.icon)}
                </a>
              ))}
              </div>
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
      </div>
    </header>
  )
}

export default Header
