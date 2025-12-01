import React from 'react'
import { Link } from 'react-router-dom'
import LoginPopup from './LoginPopup'
import SignupPopup from './SignupPopup'

const Navbar = () => {
    return (
        <>
            <nav>
                <ul className='nav'>
                    <Link to="/" className='nav-left'>
                        <img id='logo' src="public/svgs/DU_Logo.png" alt="" />
                        <span className='white'>DUCS PLACEMENTS </span>
                    </Link>
                    <div className="nav-right">
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                        <LoginPopup />
                        <SignupPopup />
                    </div>
                </ul>
            </nav>
        </>
    )
}

export default Navbar