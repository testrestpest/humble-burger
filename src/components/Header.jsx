import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaTiktok, FaGlobe, FaGoogle, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import CartButton from './CartButton'
import useCloseCartOnNavigate from '../hooks/useCloseCartOnNavigate'
import './Header.css'

function Header() {  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [settings, setSettings] = useState({})

  // Close cart when navigating
  useCloseCartOnNavigate()

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings.json')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
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
      case 'email':
        return <FaEnvelope />
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
    { label: "Order", link: "/order", enabled: true },    { label: "Contact", link: "/contact", enabled: true }
  ]
  const navItems = settings.header?.navItems || defaultNavItems
  const showLogoText = settings.header?.showLogoText || false
  const logoText = settings.header?.logoText || "Humble Burger"
  const socialLinks = settings.header?.socialLinks || settings.general?.socialLinks || settings.socialLinks || []
  const logoSrc = settings.assets?.logo
  const logoWidth = settings.assets?.logoWidth || 150
  const logoHeight = settings.assets?.logoHeight || 60

  return (
    <header className={`header ${!isHome ? 'with-bg' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            {logoSrc && (
              <img 
                src={logoSrc} 
                alt="Humble Burger" 
                className="logo-image"
                style={{
                  width: `${logoWidth}px`,
                  height: logoHeight ? `${logoHeight}px` : 'auto'
                }}
              />
            )}
            {showLogoText && (
              <span className="logo-text">{logoText}</span>
            )}
          </Link>
            <div className="nav-container">
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
              
              <div className="social-links-container">
                {socialLinks.filter(social => social.enabled !== false).map((social, index) => (
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

            <div className="header-actions">
              <CartButton />
              
              <button 
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
