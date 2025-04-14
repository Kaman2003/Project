// src/pages/Careers.jsx
import React from 'react';
import '../../css/carrers.css';

const Careers = () => {
  return (
    <div className="careers">
      <section className="careers-hero">
        <div className="careers-hero-content">
          <h1 className="careers-title">
            Join the <span className="highlight">Team</span>
          </h1>
          <p className="careers-subtitle">
            Help us shape the future. We're building something amazing, and we want you to be part of it.
          </p>
        </div>
        <div className="careers-hero-wave"></div>
      </section>

      <section className="careers-openings">
        <h2 className="section-title">Open Positions</h2>
        <p className="section-subtitle">We're hiring across multiple roles. Come work with us!</p>

        <div className="job-list">
          <div className="job-card">
            <h3 className="job-title">Frontend Developer</h3>
            <p className="job-location">Remote / Hybrid</p>
            <p className="job-desc">We’re looking for a React wizard who loves clean UI and reusable components.</p>
            <a href="mailto:carrers@h2flow.com?subject=Application for Frontend Developer" className="apply-btn">
              Apply Now
            </a>
          </div>

          <div className="job-card">
            <h3 className="job-title">UI/UX Designer</h3>
            <p className="job-location">Bangalore, India</p>
            <p className="job-desc">Craft beautiful user experiences that make complex things feel simple.</p>
            <a href="mailto:carrers@h2flow.com?subject=Application for Frontend Developer" className="apply-btn">
              Apply Now
            </a>
          </div>

          <div className="job-card">
            <h3 className="job-title">Product Manager</h3>
            <p className="job-location">Remote</p>
            <p className="job-desc">Own the roadmap and work cross-functionally to deliver impact.</p>
            <a href="mailto:carrers@h2flow.com?subject=Application for Frontend Developer" className="apply-btn">
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
