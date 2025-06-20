import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaTiktok, FaGlobe } from 'react-icons/fa'
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

  // Map platform names to React icons
  const getIconComponent = (platform, customIcon) => {
    const platformLower = platform.toLowerCase()
    
    switch (platformLower) {
      case 'instagram':
        return <FaInstagram />
      case 'facebook':
        return <FaFacebookF />
      case 'twitter':
        return <FaTwitter />
      case 'linkedin':
        return <FaLinkedinIn />
      case 'youtube':
        return <FaYoutube />
      case 'tiktok':
        return <FaTiktok />
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
    { label: "Menu", link: "/menu", enabled: true },
    { label: "About", link: "/about", enabled: true },
    { label: "Contact", link: "/contact", enabled: true }
  ]
  
  const navItems = settings.header?.navItems || defaultNavItems
  const showLogoText = settings.header?.showLogoText || false
  const logoText = settings.header?.logoText || "Humble Burger"
  const socialLinks = settings.header?.socialLinks || settings.general?.socialLinks || settings.socialLinks || []
  const logoSrc = settings.assets?.logo

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
