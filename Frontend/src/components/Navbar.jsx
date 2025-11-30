import React from 'react'

const Navbar = () => {
    return (
        <>
            <nav>
                <ul className='nav'>
                    <div className='nav-left'>
                        <img id='logo' src="public/svgs/DU_Logo.png" alt="" />
                        <span>DUCS PLACEMENTS </span>
                    </div>
                    <div className="nav-right">
                        <a href="/about">About</a>
                        <a href="/contact">Contact</a>
                        <button>Login</button>
                    </div>
                </ul>
            </nav>
        </>
    )
}

export default Navbar