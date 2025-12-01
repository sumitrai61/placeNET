import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPopup.css";

const SignupPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/accounts/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // use email as username for simplicity
            username: form.email,
            password: form.password,
            email: form.email,
            first_name: form.name,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to sign up. Please try again.");
        setLoading(false);
        return;
      }

      const token = data.token;
      const role = data.student?.role;
      const user = data.user;

      if (token) {
        localStorage.setItem("authToken", token);
      }
      if (role) {
        localStorage.setItem("userRole", role);
      }
      if (user) {
        const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");
        localStorage.setItem("userName", fullName || user.username || user.email || "");
      }

      // notify other components (like Navbar) that auth state changed
      window.dispatchEvent(new Event("authChanged"));

      // Redirect based on role (new users default to Junior unless PC/HR/etc.)
      if (role === "Junior") {
        navigate("/junior");
      } else if (role === "Senior") {
        navigate("/senior");
      } else if (role === "PC") {
        navigate("/pc");
      } else {
        navigate("/");
      }

      setIsOpen(false);
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="login-btn" onClick={() => setIsOpen(true)}>
        Sign Up
      </button>

      {isOpen && (
        <div className="login-modal-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="login-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="login-header">
              <div className="login-title">
                <img
                  src="public/svgs/cap.svg"
                  alt="Scholar cap"
                  className="login-cap-icon"
                />
                <div>
                  <h2>Sign Up</h2>
                  <p className="login-subtitle">Create your account to access placements</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {error && <p className="login-error">{error}</p>}
              <div className="form-group">
                <label htmlFor="signup-name">Name</label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
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

export default SignupPopup;


