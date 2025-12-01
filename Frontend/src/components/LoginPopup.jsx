import React, { useState } from "react";
import "../css/LoginPopup.css";

const LoginPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", form.email);
    console.log("Password:", form.password);
    // Optionally close popup after submit
    // setIsOpen(false);
  };

  return (
    <>
      <button className="login-btn" onClick={() => setIsOpen(true)}>
        Login
      </button>

      {isOpen && (
        <div className="login-modal-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="login-modal"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside box
          >
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="actions">
                <button type="button" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPopup;