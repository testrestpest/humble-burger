import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Humble Burger</h3>
            <p className="footer-text">
              Serving the finest gourmet burgers made with fresh, locally-sourced ingredients.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Hours</h4>
            <p className="footer-text">Monday - Thursday: 11AM - 10PM</p>
            <p className="footer-text">Friday - Saturday: 11AM - 11PM</p>
            <p className="footer-text">Sunday: 12PM - 9PM</p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact</h4>
            <p className="footer-text">📍 123 Burger Street, Food City, FC 12345</p>
            <p className="footer-text">📞 (555) 123-BURGER</p>
            <p className="footer-text">✉️ hello@humbleburger.com</p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Humble Burger. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
