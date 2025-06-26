import './Footer.css'
import { FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { useContent } from '../hooks/useContent'

function Footer() {
  const { content } = useContent('contact')
  const contactContent = content?.[0]?.attributes || {}
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <h3 className="footer-title">Where + when</h3>
            <p className="footer-subtitle">(Next to Foggles Bar)</p>
            <p className="footer-address">{contactContent.address}</p>
            
            <div className="footer-social">
              <a href="mailto:info@zaporio.com" className="social-icon" aria-label="Email">
                <FaEnvelope />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon" aria-label="X (Twitter)">
                <FaXTwitter />
              </a>
            </div>
            
            <p className="footer-company">Zaporio Ltd SC743154</p>
          </div>
          
          <div className="footer-right">
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
