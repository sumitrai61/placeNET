import React, { useEffect, useState } from 'react'
import '../css/features.css'
import { Routes, Route, Link } from "react-router-dom";
import JuniorStudent from './JuniorStudent';
import Experiences from './Experiences';
import Liveplacements from './LivePlacements';

const Features = () => {
  const [displayName, setDisplayName] = useState("Guest User");
  const [displayRole, setDisplayRole] = useState("Guest");

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

  return (
    <>
      <Routes>
        {/* <Route path="*" element={<JuniorStudent/>} /> */}
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/live-placements" element={<Liveplacements />} />   
      </Routes>
      <div className="main">
        <div className="heading">
          <h1>DU MCA PORTAL</h1>
          <p>Placement Management</p>
        </div>
        <div className="line"></div>
        <div className="function">
          <Link to="/" className='func-item'><img src="public/svgs/dashboard.svg" alt="..." />Dashboard</Link>
          {/* <Link className='func-item'><img src="public/svgs/message.svg" alt="..." />Messages</Link> */}
          <Link to="/live" className='func-item'><img src="public/svgs/placement.svg" alt="..." />Live Placements</Link>
          <Link to="/experiences" className='func-item'><img src="public/svgs/book.svg" alt="..." />Experiences</Link>
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
        </div>
      </div>
    </>
  )
}

export default Features