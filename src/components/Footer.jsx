
import '../style/footer/Footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>EventMaster</h3>
            <p>Your premier destination for event discovery and booking.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        <div className="footer-section">
  <h4>Contact Info</h4>
  <p>Email: <a href="mailto:info@eventmaster.com">info@eventmaster.com</a></p>
  <p>Phone: <a href="tel:+917349078324">7349078324</a></p>
</div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 EventMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
