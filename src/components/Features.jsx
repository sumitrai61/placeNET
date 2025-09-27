import React from 'react'
import '../css/features.css'
const Features = () => {
  return (
    <>
    <div className="main">
      <div className="heading">
        <h1>DU MCA PORTAL</h1>
        <p>Placement Management</p>
      </div>
      <div className="line"></div>
      <div className="function">
        <div className='func-item'><img src="public/svgs/dashboard.svg" alt="..." />Dashboard</div>
        <div className='func-item'><img src="public/svgs/message.svg" alt="..." />Messages</div>
        <div className='func-item'><img src="public/svgs/placement.svg" alt="..." />Live Placements</div>
        <div className='func-item'><img src="public/svgs/book.svg" alt="..." />Experiences</div>
        <div className='func-item'><img src="public/svgs/stats.svg" alt="..." />Statistics</div>
      </div>
      <div className="line"></div>
      <div className="feature-bottom">
        <div className="user">
          <img src="public/svgs/user.svg" alt="" />
          <div id='profile'>
            <div id="name">josh</div>
            <div id="role">Junior Student</div> 
          </div>
          <img id='arrow' src="public/svgs/tullu.svg" alt="" />
        </div>
        
      </div>
    </div>
    </>
  )
}

export default Features