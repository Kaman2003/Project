import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowUp } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      {/* Back to Top Button */}
      <button className="footer-back-to-top" onClick={scrollToTop}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>

      {/* Footer Content */}
      <div className="footer-content">
        {/* Footer Logo and Description */}
        <div className="footer-section footer-logo">
          <div className="footer-logo-animation">
            <div className="footer-drop"></div>
            <div className="footer-wave"></div>
          </div>
          <h2>H2Flow</h2>
          <p>
            H2Flow is your ultimate solution for smart water dispensers. Stay
            hydrated, stay healthy.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/gallery">Gallery</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/product">Product</a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />{" "}
              <a href="mailto:info@h2flow.com">info@h2flow.com</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />{" "}
              <a href="mailto:support@h2flow.com">support@h2flow.com</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />{" "}
              <a href="mailto:sales@h2flow.com">sales@h2flow.com</a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer-section footer-social">
          <h3>Follow Us</h3>
          <div className="footer-social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://www.x.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://github.com/Kaman2003/Project"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>

       
        
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 H2Flow. All rights reserved.</p>
        <p>
          <a href="https://www.privacypolicies.com/live/ac8fc286-8acb-43ed-a6d4-ebc3a041d2e4">Privacy Policy</a> |{" "}
          <a href="https://www.termsfeed.com/live/bac88253-9aae-4b2d-9aa9-4ffca3724060">Term and Conditions</a> |{" "}
          
        </p>
      </div>
    </footer>
  );
}

export default Footer;
