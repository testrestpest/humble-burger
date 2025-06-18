import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

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

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <div className="contact-header">
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">
            We'd love to hear from you! Whether you have questions, feedback, 
            or just want to say hello, don't hesitate to reach out.
          </p>
        </div>

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
          </div>

          {/* Contact Info */}
          <div className="contact-info-section">
            <h2>Visit Us</h2>
            
            <div className="info-card">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div>
                  <h3>Address</h3>
                  <p>123 Burger Street<br />Food City, FC 12345</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📞</div>
                <div>
                  <h3>Phone</h3>
                  <p>(555) 123-BURGER</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p>hello@humbleburger.com</p>
                </div>
              </div>
            </div>

            <div className="hours-card">
              <h3>Hours of Operation</h3>
              <div className="hours-list">
                <div className="hours-item">
                  <span>Monday - Thursday</span>
                  <span>11:00 AM - 10:00 PM</span>
                </div>
                <div className="hours-item">
                  <span>Friday - Saturday</span>
                  <span>11:00 AM - 11:00 PM</span>
                </div>
                <div className="hours-item">
                  <span>Sunday</span>
                  <span>12:00 PM - 9:00 PM</span>
                </div>
              </div>
            </div>

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
