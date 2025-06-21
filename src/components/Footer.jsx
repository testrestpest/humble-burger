import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Where + when</h3>
            <p className="footer-subtitle">(Next to Foggles Bar)</p>
            <p className="footer-address">Munro Place, Elgin, IV30 4LL</p>
            
            <div className="footer-contact">
              <a href="mailto:info@humbleburger.com" className="footer-email">Email</a>
            </div>
            
            <div className="footer-social">
              <a href="#" className="social-icon">📷</a>
              <a href="#" className="social-icon">f</a>
              <a href="#" className="social-icon">X</a>
            </div>
            
            <p className="footer-company">The Humble Burger Ltd SC743154</p>
          </div>
          
          <div className="footer-section footer-hours">
            <h4 className="hours-title">OPENING TIMES</h4>
            <p className="hours-text">Tue - Thu 4:30-8pm</p>
            <p className="hours-text">Fri - Sun 12-3/4:30-8pm</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
