import { useState, useEffect } from 'react'
import { fetchContent } from '../utils/contentLoader'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [contactContent, setContactContent] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const pages = await fetchContent('pages')
        setContactContent(pages.contact || {})
      } catch (error) {
        console.error('Error loading contact content:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would submit to your backend or Netlify Forms
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  if (loading) {
    return <div /> // Prevent flash of loading content
  }

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        {contactContent.title && (
          <div className="contact-header">
            <h1 className="page-title">{contactContent.title}</h1>
            {contactContent.subtitle && (
              <p className="page-subtitle">
                {contactContent.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <form 
              className="contact-form" 
              onSubmit={handleSubmit}
              name="contact"
              method="POST"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="contact" />
              
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="form-input"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Send Message
              </button>
            </form>
          </div>          {/* Contact Info */}
          <div className="contact-info-section">
            <h2>Visit Us</h2>
            
            <div className="info-card">
              {contactContent.address && (
                <div className="info-item">
                  <div className="info-icon">📍</div>
                  <div>
                    <h3>Address</h3>
                    <p>{contactContent.address}</p>
                  </div>
                </div>
              )}

              {contactContent.phone && (
                <div className="info-item">
                  <div className="info-icon">📞</div>
                  <div>
                    <h3>Phone</h3>
                    <p>{contactContent.phone}</p>
                  </div>
                </div>
              )}

              {contactContent.email && (
                <div className="info-item">
                  <div className="info-icon">✉️</div>
                  <div>
                    <h3>Email</h3>
                    <p>{contactContent.email}</p>
                  </div>
                </div>
              )}
            </div>

            {contactContent.hours && contactContent.hours.length > 0 && (
              <div className="hours-card">
                <h3>Hours of Operation</h3>
                <div className="hours-list">
                  {contactContent.hours.map((hour, index) => (
                    <div key={index} className="hours-item">
                      <span>{hour.days}</span>
                      <span>{hour.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="social-card">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link">
                  <span>📱</span> Instagram
                </a>
                <a href="#" className="social-link">
                  <span>👍</span> Facebook
                </a>
                <a href="#" className="social-link">
                  <span>🐦</span> Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
