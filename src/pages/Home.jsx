import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchContent } from '../utils/contentLoader'
import './Home.css'

function Home() {
  const [pageContent, setPageContent] = useState({})
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load page content
        const pages = await fetchContent('pages')
        setPageContent(pages.home || {})
        
        // Load settings for hero image
        const settingsData = await fetchContent('settings')
        setSettings(settingsData)
      } catch (error) {
        console.error('Error loading content:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  return (
    <div className="home">
      {/* Hero Section */}
      <section 
        className="hero" 
        style={{
          backgroundImage: settings.assets?.heroImage ? `url(${settings.assets.heroImage})` : 'url(/images/hero.jpg)'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            {(settings.assets?.heroTitle || "KEEPING FOOD HUMBLE")
              .split(' ')
              .map((word, idx) => (
                <span key={idx} className="hero-word">{word}</span>
              ))}
          </h1>
        </div>
      </section>

      {/* Section 1 */}
      {pageContent.section_1_title && (
        <section className="feel-good-street-food py-16">
          <div className="container">
            <h2 className="section-title text-center mb-8">
              {pageContent.section_1_title}
            </h2>
            <div 
              className="text-center"
              dangerouslySetInnerHTML={{ __html: pageContent.section_1_content }} 
            />
          </div>
        </section>
      )}

      {/* Section 2 */}
      {pageContent.section_2_title && (
        <section className="click-and-collect">
          <div className="container text-center">
            <h2 className="section-title mb-8">
              {pageContent.section_2_title}
            </h2>
            <div 
              className="mb-8"
              dangerouslySetInnerHTML={{ __html: pageContent.section_2_content }} 
            />
            <Link to="/order" className="btn btn-primary">
              {pageContent.section_2_button_text || 'Order Now'}
            </Link>
          </div>          {/* Wave SVG curve */}
          <svg className="click-curve" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path fill="#fff" d="M0,50 Q25,0 50,50 Q75,100 100,50 V100 H0 Z" />
          </svg>
        </section>
      )}
    </div>
  )
}

export default Home
