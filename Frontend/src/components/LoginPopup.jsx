import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPopup.css";

const LoginPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
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
        `${import.meta.env.VITE_API_URL}/api/accounts/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // backend expects "username"; we use email as username
            username: form.email,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to login. Please try again.");
        setLoading(false);
        return;
      }

      // Save token, role and basic user info for later API calls / UI
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

      // Redirect based on role
      if (role === "Junior") {
        navigate("/junior");
      } else if (role === "Senior") {
        navigate("/senior");
      } else if (role === "PC") {
        navigate("/pc");
      } else {
        // fallback: go to home
        navigate("/");
      }

      setIsOpen(false);
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
            <div className="login-header">
              <div className="login-title">
                <img
                  src="/svgs/cap.svg"
                  alt="Scholar cap"
                  className="login-cap-icon"
                />
                <div>
                  <h2>Login</h2>
                  <p className="login-subtitle">Enter your credentials to continue</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {error && <p className="login-error">{error}</p>}
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