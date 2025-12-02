import React from 'react'

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div id='logo'>
          <img src="/svgs/DU_Logo.png" alt="" />
          <h1>LPU MCA PLACEMENT</h1>
        </div>
        <div>
            <h1>Quick Links</h1>
            <div>About Us</div>
            <div>How It Works</div>
            <div>Success Stories</div>
            <div>Contact</div>
        </div>
        <div>
            <h1>For Students</h1>
            <div>Registration</div>
            <div>Placement Tips</div>
            <div>Interview Prep</div>
            <div>Resources</div>
        </div>
        <div>
          <h1>Contact Info</h1>
            <div className='foot-svg'><img src="/email.svg" alt="" />placement@lpu.ac.in</div>
            <div className='foot-svg'><img src="/telephone.svg" alt="" />+91 11 2766 7208</div>
            <div className='foot-svg'><img src="/location.svg" alt="" />LPU, Punjab</div>
        </div>
      </div>
      <div className="separator">
      </div>
      <div id='copyright'>&copy; 2024 DU MCA Placement Portal. All rights reserved. | Privacy Policy | Terms of Service</div>
    </>
  )
}

export default Footer