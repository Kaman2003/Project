import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWater,
  faTint,
  faLeaf,
  faRecycle,
  faUsers,
  faGlobe,
  faFlask,
  faCog,
  faChartLine,
  faMedal,
  faHandshake,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import "../../css/about.css";

const About = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const navigate = useNavigate();
  const renderTabContent = () => {
    switch (activeTab) {
      case "mission":
        return (
          <div className="ss-about-tab-content ss-about-mission">
            <h3 className="ss-about-tab-title">Our Mission</h3>
            <p className="ss-about-tab-text">
              At H2Flow, we aim to redefine how water is consumed — not by changing
              the water itself, but by changing the way it's delivered. Our mission is
              to make hydration smarter, more efficient, and environmentally conscious.
            </p>
            <div className="ss-about-mission-goals">
              <div className="ss-about-mission-goal">
                <FontAwesomeIcon icon={faTint} className="ss-about-icon" />
                <h4>Efficient Dispensing</h4>
                <p>
                  Eliminate over-pouring and reduce waste with accurate smart water flow control.
                </p>
              </div>
              <div className="ss-about-mission-goal">
                <FontAwesomeIcon icon={faRecycle} className="ss-about-icon" />
                <h4>Sustainable Use</h4>
                <p>
                  Encourage reusable containers and reduce single-use plastic habits.
                </p>
              </div>
              <div className="ss-about-mission-goal">
                <FontAwesomeIcon icon={faChartLine} className="ss-about-icon" />
                <h4>Hydration Awareness</h4>
                <p>
                  Empower users with data about their daily water intake through integrated smart app tracking.
                </p>
              </div>
            </div>
          </div>
        );

      case "story":
        return (
          <div className="ss-about-tab-content ss-about-story">
            <h3 className="ss-about-tab-title">Our Story</h3>
            <div className="ss-about-timeline">
              <div className="ss-about-timeline-item">
                <div className="ss-about-timeline-date">Jan 2025</div>
                <h4>The Idea Was Born</h4>
                <p>
                  Concerned by the rising water waste across homes and institutions,
                  our founders envisioned a smarter way to dispense water more efficiently.
                </p>
              </div>
              <div className="ss-about-timeline-item">
                <div className="ss-about-timeline-date">Feb 2025</div>
                <h4>Research & Development</h4>
                <p>
                  A team of developers, designers, and sustainability advocates came together to build the future of smart hydration.
                </p>
              </div>
              <div className="ss-about-timeline-item">
                <div className="ss-about-timeline-date">Mar 2025</div>
                <h4>Concept to Reality</h4>
                <p>
                  After multiple brainstorming sessions and early mockups, the idea of a sensor-based dispenser became our core product.
                </p>
              </div>
              <div className="ss-about-timeline-item">
                <div className="ss-about-timeline-date">April 2025</div>
                <h4>Prototype Built</h4>
                <p>
                  We developed a hardware design powered by sensors for flow, touch, and light — and brought it to life through software integration.
                </p>
              </div>
              <div className="ss-about-timeline-item">
                <div className="ss-about-timeline-date">Today</div>
                <h4>Ongoing Innovation</h4>
                <p>
                  H2Flow is evolving every day. We continue improving our tech, expanding access, and pushing for smarter water usage everywhere.
                </p>
              </div>
            </div>
          </div>
        );

      case "technology":
        return (
          <div className="ss-about-tab-content ss-about-technology">
            <h3 className="ss-about-tab-title">Our Technology</h3>
            <div className="ss-about-tech-showcase">
              <div className="ss-about-tech-item">
                <FontAwesomeIcon icon={faFlask} className="ss-about-icon" />
                <h4>Advanced Dispansing</h4>
                <p>
                  Our multi-stage Dispansing system.
                </p>
              </div>
              <div className="ss-about-tech-item">
                <FontAwesomeIcon icon={faCog} className="ss-about-icon" />
                <h4>Smart Monitoring</h4>
                <p>
                  AI-powered sensors continuously monitor flow
                  rate.
                </p>
              </div>
              <div className="ss-about-tech-item">
                {/* <FontAwesomeIcon icon={faChartLine} className="ss-about-icon" /> */}
                <h4>Data Analytics</h4>
                <p>
                  Our app provides real-time insights into your water
                  consumption and quality trends.
                </p>
              </div>
            </div>
          </div>
        );
      case "impact":
        return (
          <div className="ss-about-tab-content ss-about-impact">
            <h3 className="ss-about-tab-title">Our Future Impact</h3>
            <div className="ss-about-impact-stats">
              <div className="ss-about-impact-stat">
                <span className="ss-about-impact-number">1B+</span>
                <span className="ss-about-impact-label">Litres Dispensed Efficiently</span>
              </div>
              <div className="ss-about-impact-stat">
                <span className="ss-about-impact-number">50M+</span>
                <span className="ss-about-impact-label">Overpours Prevented</span>
              </div>
              <div className="ss-about-impact-stat">
                <span className="ss-about-impact-number">20M+</span>
                <span className="ss-about-impact-label">Plastic Bottles Avoided</span>
              </div>
            </div>
            <div className="ss-about-impact-testimonials">
              <h4>Why It Matters</h4>
              <div className="ss-about-testimonial">
                <p>
                  "Globally, over <strong>30%</strong> of dispensed water is wasted
                  due to over-pouring and lack of measurement. H2Flow helps bring
                  that number down — one smart sip at a time."
                </p>
                <span>- Water Efficiency Report 2024</span>
              </div>
              <div className="ss-about-testimonial">
                <p>
                  "H2Flow supports sustainable hydration by encouraging smart usage and data-backed tracking — helping reduce waste at scale."
                </p>
                <span>- Environmental Tech Watch</span>
              </div>
            </div>
          </div>
        );

      case "team":
        return (
          <div className="ss-about-tab-content ss-about-team">
            <h3 className="ss-about-tab-title">Our Team</h3>
            <div className="ss-about-team-grid">
              <div className="ss-about-team-member">
                <img
                  src="kaman.png"
                  alt="Kamandeep Image"
                  className="ss-about-team-photo"
                />
                <h4>Kamandeep Singh</h4>
              </div>
              <div className="ss-about-team-member">
                <img
                  src="meen.png"
                  alt="Hyungmeen Ko"
                  className="ss-about-team-photo"
                />
                <h4>Hyungmeen Ko</h4>

              </div>
              <div className="ss-about-team-member">
                <img
                  src="nawa.png"
                  alt="Nawaz Sharief Kotikalapudi"
                  className="ss-about-team-photo"
                />
                <h4>Nawaz Sharief Kotikalapudi</h4>
              </div>
              {/* <div className="ss-about-team-member">
                <img
                  src="alex.jpg"
                  alt="Alex Johnson"
                  className="ss-about-team-photo"
                />
                <h4>Clarence Oriola</h4>
              
              </div> */}
              <div className="ss-about-team-member">
                <img
                  src="ikeena.jpg"
                  alt="Victor Igbojionu"
                  className="ss-about-team-photo"
                />
                <h4>Victor Igbojionu</h4>
              </div>
            </div>
            <div className="ss-about-join-team">
              <h4>Join Our Team</h4>
              <p>
                We're always looking for passionate individuals to join our
                mission. Check out our current openings:
              </p>
              <a href="/careers" className="ss-about-careers-link">
                View Open Positions
              </a>
            </div>
          </div>
        );
      case "future":
        return (
          <div className="ss-about-tab-content ss-about-future">
            <h3 className="ss-about-tab-title">Our Future</h3>
            <div className="ss-about-future-vision">
              <h4>Vision 2030</h4>
              <p>By 2030, we aim to:</p>
              <ul>
                <li>Optimize water dispensing in 100 million households globally</li>
                <li>Prevent over 1 billion liters of water waste annually</li>
                <li>Become the leading solution for sustainable hydration habits</li>
              </ul>
            </div>
            <div className="ss-about-future-initiatives">
              <h4>Upcoming Initiatives</h4>
              <div className="ss-about-initiative">
                <FontAwesomeIcon icon={faGlobe} className="ss-about-icon" />
                <h5>Hydration Analytics Dashboard</h5>
                <p>
                  Aggregating anonymized data from H2Flow devices to provide global insights on water consumption trends and efficiency.
                </p>
              </div>
              <div className="ss-about-initiative">
                <FontAwesomeIcon icon={faRocket} className="ss-about-icon" />
                <h5>Smart Dispensing in Extreme Conditions</h5>
                <p>
                  Innovating H2Flow technology for remote, mobile, or disaster-relief scenarios where precision hydration is critical.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="ss-about-page">
      <header className="ss-about-header">
        <h1 className="ss-about-title">About Smart Sip</h1>
        <p className="ss-about-subtitle">
          Revolutionizing Water Consumption, One Sip at a Time
        </p>
      </header>

      <nav className="ss-about-nav">
        <button
          className={`ss-about-nav-btn ${activeTab === "mission" ? "active" : ""
            }`}
          onClick={() => setActiveTab("mission")}
        >
          Our Mission
        </button>
        <button
          className={`ss-about-nav-btn ${activeTab === "story" ? "active" : ""
            }`}
          onClick={() => setActiveTab("story")}
        >
          Our Story
        </button>
        <button
          className={`ss-about-nav-btn ${activeTab === "technology" ? "active" : ""
            }`}
          onClick={() => setActiveTab("technology")}
        >
          Our Technology
        </button>
        <button
          className={`ss-about-nav-btn ${activeTab === "impact" ? "active" : ""
            }`}
          onClick={() => setActiveTab("impact")}
        >
          Our Impact
        </button>
        <button
          className={`ss-about-nav-btn ${activeTab === "team" ? "active" : ""}`}
          onClick={() => setActiveTab("team")}
        >
          Our Team
        </button>
        <button
          className={`ss-about-nav-btn ${activeTab === "future" ? "active" : ""
            }`}
          onClick={() => setActiveTab("future")}
        >
          Our Future
        </button>
      </nav>

      <main className="ss-about-main">{renderTabContent()}</main>

      <section className="ss-about-cta">
        <h2 className="ss-about-cta-title">Join the H2Flow Revolution</h2>
        <p className="ss-about-cta-text">
          Experience the future of hydration — with smarter dispensing and less waste.
        </p>
        <div className="ss-about-cta-buttons">
          <button
            onClick={() => navigate('/product')}
            className="ss-about-cta-btn ss-about-cta-btn-primary"
          >
            Explore Our Products
          </button>
        </div>
      </section>

      <footer className="ss-about-footer">
        <div className="ss-about-footer-links">
          <a href="/privacy" className="ss-about-footer-link">
            Privacy Policy
          </a>
          <a href="/terms" className="ss-about-footer-link">
            Terms of Service
          </a>
          <a href="/faq" className="ss-about-footer-link">
            FAQ
          </a>
        </div>
        <div className="ss-about-footer-social">
          <a
            href="https://facebook.com/smartsip"
            className="ss-about-social-link"
          >
            <FontAwesomeIcon icon={["fab", "facebook"]} />
          </a>
          <a
            href="https://twitter.com/smartsip"
            className="ss-about-social-link"
          >
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </a>
          <a
            href="https://instagram.com/smartsip"
            className="ss-about-social-link"
          >
            <FontAwesomeIcon icon={["fab", "instagram"]} />
          </a>
          <a
            href="https://linkedin.com/company/smartsip"
            className="ss-about-social-link"
          >
            <FontAwesomeIcon icon={["fab", "linkedin"]} />
          </a>
        </div>
        <p className="ss-about-footer-copyright">
          &copy; 2025 H2Flow. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
