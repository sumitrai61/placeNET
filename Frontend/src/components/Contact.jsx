import React from "react";
import "../css/Contact.css";

const Contact = () => {
  return (
    <div className="container">
      <div className="box"></div>
      <section className="contact-page">
        <h1>Contact Us</h1>
        <p className="contact-subtitle">
          Reach out to the DUCS Placement Cell for any queries related to drives,
          schedules, or recruitment.
        </p>
        <div className="contact-card">
          <h2>Placement Cell, DUCS</h2>
          <p>
            <strong>Email:</strong> placement@du.ac.in
          </p>
          <p>
            <strong>Phone:</strong> +91 11 2766 7208
          </p>
          <p>
            <strong>Address:</strong> Delhi University, Delhi
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;


