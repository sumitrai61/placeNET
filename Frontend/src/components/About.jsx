import React from "react";
import "../css/About.css";

const About = () => {
  return (
    <div className="container">
      <div className="box"></div>
      <section className="about-page">
        <h1>About LPUCS Placements</h1>
        <p className="about-subtitle">
          A centralized platform that connects coordinators, HRs, seniors and juniors
          for a smarter, transparent and data-driven placement experience.
        </p>
        <div className="about-grid">
          <div className="about-highlight">
            <h2>Unified Placement Portal</h2>
            <p>
              Manage drives, interviews, and results in one place with real-time
              updates and automated workflows tailored for DUCS.
            </p>
          </div>
          <div className="about-highlight">
            <h2>Student-Centric Experience</h2>
            <p>
              Track opportunities, learn from senior experiences, and stay prepared
              with up-to-date placement statistics and resources.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;