import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import './footer.css';
import mm from '../assets/mm1.jpeg'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <img src={mm} alt="mm-hall" width={100}/>
            <h3>MM Function Hall</h3>
            <p>The premier venue for weddings, parties, and special events in Kalikiri. We create unforgettable memories with exceptional service and beautiful spaces.</p>
            <div className="social-links">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/events">Our Events</a></li>
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-events">
            <h3>Our Events</h3>
            <ul>
              <li><a href="/events/weddings">Weddings</a></li>
              <li><a href="/events/engagements">Engagements</a></li>
              <li><a href="/events/birthdays">Birthdays</a></li>
              <li><a href="/events/naming-ceremonies">Naming Ceremonies</a></li>
              <li><a href="/events/corporate">Corporate Events</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Contact Us</h3>
            <ul>
              <li><FaMapMarkerAlt /> Govt College Road,Beside Noorani Masjid, Kalikiri, Andhra Pradesh</li>
              <li><FaPhone /> +91 94913 01258</li>
              <li><FaEnvelope /> info@mmfunctionhall.com</li>
              <li><FaClock /> Open 24/7 for inquiries</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MM Function Hall. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;