import React from "react";
import "../../css/home.css";
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/', { 
      state: { 
        showAuthModal: true,
        initialTab: 'register' // This will open the registration tab
      } 
    });
  };
  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="home-hero-background">
          {/* Animated water waves */}
          <div className="home-hero-wave home-hero-wave-1"></div>
          <div className="home-hero-wave home-hero-wave-2"></div>
          <div className="home-hero-wave home-hero-wave-3"></div>
        </div>
        <div className="home-hero-content">
          <h1 className="home-hero-title">
            Welcome to{" "}
            <span className="home-hero-title-highlight">H2Flow</span>
          </h1>
          <p className="home-hero-subtitle">
            Stay Hydrated, Stay Healthy with Our Smart Water Dispensers
          </p>
          <div className="home-hero-buttons">
            <button
              className="home-hero-button home-hero-button-primary"
              onClick={() => navigate('/about')}
            >
              <span className="home-hero-button-icon">💧</span>
              Learn More About us
            </button>
          </div>
          <div className="home-hero-features">
            <div className="home-hero-feature">
              <span className="home-hero-feature-icon">🌿</span>
              <p className="home-hero-feature-text">Eco-Friendly Design</p>
            </div>
            <div className="home-hero-feature">
              <span className="home-hero-feature-icon">📱</span>
              <p className="home-hero-feature-text">Smart App Integration</p>
            </div>
            <div className="home-hero-feature">
              <span className="home-hero-feature-icon">💡</span>
              <p className="home-hero-feature-text">
                Advanced Sensor Technology
              </p>
            </div>
          </div>
        </div>
        <div className="home-hero-image">
          <img
            src="hero.png"
            alt="H2Flow Water Dispenser"
            className="home-hero-image-dispenser"
          />
          <div className="home-hero-image-overlay"></div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="home-features">
        <div className="home-features-container">
          <h2 className="home-features-title">Why Choose H2Flow?</h2>
          <p className="home-features-subtitle">
            Discover the features that make H2Flow the ultimate choice for
            hydration.
          </p>
          <div className="home-features-grid">
            <div className="home-feature-card">
              <div className="home-feature-card-icon">🤖</div>
              <h3 className="home-feature-card-title">Smart Technology</h3>
              <p className="home-feature-card-description">
                Our dispensers use advanced sensors to provide the perfect water
                temperature and flow.
              </p>
              <div className="home-feature-card-overlay"></div>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-card-icon">🌍</div>
              <h3 className="home-feature-card-title">Eco-Friendly</h3>
              <p className="home-feature-card-description">
                Reduce plastic waste with our reusable bottle-friendly design.
              </p>
              <div className="home-feature-card-overlay"></div>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-card-icon">❤️</div>
              <h3 className="home-feature-card-title">Health Monitoring</h3>
              <p className="home-feature-card-description">
                Track your hydration levels and receive personalized
                recommendations.
              </p>
              <div className="home-feature-card-overlay"></div>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-card-icon">🧹</div>
              <h3 className="home-feature-card-title">Easy Maintenance</h3>
              <p className="home-feature-card-description">
                Simple cleaning and maintenance for hassle-free use.
              </p>
              <div className="home-feature-card-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built H2Flow Section */}
<section className="home-testimonials">
  <div className="home-testimonials-container">
    <h2 className="home-testimonials-title">Why We Built H2Flow</h2>
    <p className="home-testimonials-subtitle">
      Every drop counts — and we’re here to make sure none go to waste.
    </p>

    <div className="home-testimonials-grid">
      {/* Problem Card */}
      <div className="home-testimonial-card">
        <div className="home-testimonial-card-content">
          <div className="home-testimonial-card-icon">🚱</div>
          <p className="home-testimonial-text">
            "Every year, more than <strong>1.7 trillion gallons</strong> of clean water are wasted globally due to
            inefficient usage, leaks, and mismanagement."
          </p>
          <div className="home-testimonial-author">
            <p className="home-testimonial-author-name">UNESCO Report</p>
            <p className="home-testimonial-author-role">Water Facts 2023</p>
          </div>
        </div>
        <div className="home-testimonial-card-background"></div>
      </div>

      {/* Solution Card */}
      <div className="home-testimonial-card">
        <div className="home-testimonial-card-content">
          <div className="home-testimonial-card-icon">💡</div>
          <p className="home-testimonial-text">
            "H2Flow is designed to make hydration smarter. It eliminates overuse, prevents waste, and tracks your consumption — saving water and lives."
          </p>
          <div className="home-testimonial-author">
            <p className="home-testimonial-author-name">Kamandeep Singh</p>
            <p className="home-testimonial-author-role">Founder of H2Flow</p>
          </div>
        </div>
        <div className="home-testimonial-card-background"></div>
      </div>

      {/* Vision Card */}
      <div className="home-testimonial-card">
        <div className="home-testimonial-card-content">
          <div className="home-testimonial-card-icon">🌎</div>
          <p className="home-testimonial-text">
            "By 2030, the world could face a 40% water supply shortfall. Our mission is to empower people to track, conserve, and care — starting with one smart sip at a time."
          </p>
          <div className="home-testimonial-author">
            <p className="home-testimonial-author-name">World Economic Forum</p>
            <p className="home-testimonial-author-role">Water Security Outlook</p>
          </div>
        </div>
        <div className="home-testimonial-card-background"></div>
      </div>
    </div>

    {/* CTA */}
    <div style={{ marginTop: "2rem" }}>
      <button
        className="home-cta-button"
        onClick={() =>
          navigate('/', {
            state: { showAuthModal: true, initialTab: 'register' },
          })
        }
      >
        <span className="home-cta-button-icon">🌊</span>
        Join the Movement — Start Saving Water
      </button>
    </div>
  </div>
</section>
      {/* How It Works Section */}
      <section className="home-how-it-works">
        <div className="home-how-it-works-container">
          <h2 className="home-how-it-works-title">How It Works</h2>
          <p className="home-how-it-works-subtitle">
            Discover the simple steps to transform your hydration experience
            with H2Flow.
          </p>
          <div className="home-how-it-works-steps">
            {/* Step 1: Set Up */}
            <div className="home-how-it-works-step">
              <div className="home-how-it-works-step-icon">📱</div>
              <div className="home-how-it-works-step-content">
                <h3 className="home-how-it-works-step-title">Step 1: Set Up</h3>
                <p className="home-how-it-works-step-description">
                  Connect your H2Flow dispenser to the app and customize your
                  preferences.
                </p>
              </div>
              <div className="home-how-it-works-step-line"></div>
            </div>

            {/* Step 2: Hydrate */}
            <div className="home-how-it-works-step">
              <div className="home-how-it-works-step-icon">💧</div>
              <div className="home-how-it-works-step-content">
                <h3 className="home-how-it-works-step-title">
                  Step 2: Hydrate
                </h3>
                <p className="home-how-it-works-step-description">
                  Use the dispenser to get perfectly measured water every time.
                </p>
              </div>
              <div className="home-how-it-works-step-line"></div>
            </div>

            {/* Step 3: Track */}
            <div className="home-how-it-works-step">
              <div className="home-how-it-works-step-icon">📊</div>
              <div className="home-how-it-works-step-content">
                <h3 className="home-how-it-works-step-title">Step 3: Track</h3>
                <p className="home-how-it-works-step-description">
                  Monitor your hydration levels and receive insights through the
                  app.
                </p>
              </div>
              <div className="home-how-it-works-step-line"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="home-cta">
        <div className="home-cta-background">
          {/* Animated water waves */}
          <div className="home-cta-wave home-cta-wave-1"></div>
          <div className="home-cta-wave home-cta-wave-2"></div>
          <div className="home-cta-wave home-cta-wave-3"></div>
        </div>
        <div className="home-cta-container">
          <h2 className="home-cta-title">
            Ready to{" "}
            <span className="home-cta-title-highlight">Stay Hydrated</span>?
          </h2>
          <p className="home-cta-subtitle">
            Join thousands of happy users and experience the future of
            hydration.
          </p>
          <button className="home-cta-button"
          onClick={handleGetStartedClick}>
            <span className="home-cta-button-icon">🚀</span>
            Register with us now
          </button>
       
          <div className="home-cta-stats">
            <div className="home-cta-stat">
              {/* <span className="home-cta-stat-number">10,000+</span> */}
              <span className="home-cta-stat-promise">What we promise!</span>
            </div>
            <div className="home-cta-stat">
              <span className="home-cta-stat-number">99%</span>
              <span className="home-cta-stat-label">Satisfaction Rate</span>
            </div>
            <div className="home-cta-stat">
              <span className="home-cta-stat-number">24/7</span>
              <span className="home-cta-stat-label">Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
