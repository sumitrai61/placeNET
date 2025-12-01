import React, { useEffect, useState } from 'react'
import '../css/features.css'
import { Link, useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("Guest User");
  const [displayRole, setDisplayRole] = useState("Guest");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedRole = localStorage.getItem("userRole");
    if (storedName) {
      setDisplayName(storedName);
    }
    if (storedRole) {
      setDisplayRole(storedRole);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    setIsMenuOpen(false);
    navigate("/");
  };

  // Get dashboard route based on user role
  const getDashboardRoute = () => {
    const role = localStorage.getItem("userRole");
    if (role === "Senior") {
      return "/senior";
    } else if (role === "PC") {
      return "/pc";
    } else if (role === "Junior") {
      return "/junior";
    }
    // Default fallback
    return "/junior";
  };

  return (
    <>
      <div className="main">
        <div className="heading">
          <div className="heading-content">
            <h1>DU MCA PORTAL</h1>
            <p>Placement Management</p>
          </div>
          <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
        <div className={`menu-content ${isMenuOpen ? 'menu-open' : ''}`}>
          <div className="line"></div>
          <div className="function">
            <Link to={getDashboardRoute()} className='func-item' onClick={() => setIsMenuOpen(false)}><img src="public/svgs/dashboard.svg" alt="..." />Dashboard</Link>
            {/* <Link className='func-item'><img src="public/svgs/message.svg" alt="..." />Messages</Link> */}
            <Link to="/live" className='func-item' onClick={() => setIsMenuOpen(false)}><img src="public/svgs/placement.svg" alt="..." />Live Placements</Link>
            <Link to="/experiences" className='func-item' onClick={() => setIsMenuOpen(false)}><img src="public/svgs/book.svg" alt="..." />Experiences</Link>
            {/* <Link className='func-item'><img src="public/svgs/stats.svg" alt="..." />Statistics</Link> */}
          </div>
          <div className="line"></div>
          <div className="feature-bottom">
            <div className="user">
              <img src="public/svgs/user.svg" alt="" />
              <div id='profile'>
                <div id="name">{displayName}</div>
                <div id="role">{displayRole}</div> 
              </div>
              <img id='arrow' src="public/svgs/tullu.svg" alt="" />
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Features