import React from 'react'
import LoginPopup from './LoginPopup'

const Body = () => {
    return (
        <>
            <div className="container">
                    <div class="box">
                    </div>
                <div className="home">
                    <div id='info'>
                        <h1>Streamlining MCA Placements</h1>
                        <h1> at DU</h1>
                        <span>Connecting Coordinators, HRs, Seniors, and Juniors seamlessly</span>
                        <span> for a smarter placement experience.</span>
                    </div>  
                    <div className='stats'>
                        <div><h1>65</h1> <span>Students</span></div>
                        <div><h1>20</h1> <span>Companies</span></div>
                        <div><h1>63%</h1> <span>Placement</span></div>
                        <div><h1>10LPA</h1> <span>LPA Average</span></div>
                    </div>
                </div>
            </div>
            <section>
                <div className="about">
                    <div id='heading'>
                        <h1>Why Choose Our Platform?</h1>
                        <span>Experience seamless placement management with cutting-edge features designed for efficiency</span>
                    </div>

                    <div className="cards">
                        <div className="about-card">
                            <div className='svg'><img src="public/svgs/clock.svg" alt="" /></div>
                        <h3>Real-Time Updates</h3>
                        <p>Get instant notifications about interview schedules, results, and placement opportunities</p>
                        </div>
                        <div className="about-card">
                            <div className='svg'><img src="public/svgs/person.svg" alt="" /></div>
                        <h3>Collaborative Platform</h3>
                        <p>Connect coordinators, HRs, and students in one unified ecosystem</p>
                        </div>
                        <div className="about-card">
                            <div className='svg'><img src="public/svgs/tick.svg" alt="" /></div>
                        <h3>Analytics Dashboard</h3>
                        <p>Track placement statistics, success rates, and performance metrics</p>
                        </div>
                        <div className="about-card">
                            <div className='svg'><img src="public/svgs/mobile.svg" alt="" /></div>
                        <h3>Mobile Responsive</h3>
                        <p>Access the platform seamlessly across all devices and screen sizes</p>
                        </div>
                        <div className="about-card">
                            <div className='svg'><img src="public/svgs/guard.svg" alt="" /></div>
                        <h3>Secure & Private</h3>
                        <p>Enterprise-grade security with DU email authentication and data protection</p>
                        </div>
                        <div className="about-card">
                            <div className='svg'><img src="public/svgs/cap.svg" alt="" /></div>
                        <h3>Mentor Network</h3>
                        <p>Connect with seniors for guidance, tips, and interview preparation</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="place-stats">
                    <div id='heading'>
                        <h1>Placement Success Statistics</h1>
                        <span>Our track record speaks for itself - empowering students to achieve their career goals</span>
                    </div>
                    <div className='first'>
                        <div><h1>304</h1> <span>Students Placed</span></div>
                        <div><h1>60</h1> <span>Partner Companies</span></div>
                        <div><h1>70%</h1> <span>Placement Rate</span></div>
                        <div><h1>12LPA</h1> <span>Highest Package</span></div>
                    </div>
                    <div className='first'>
                        <div><h1>42</h1> <span>This Year Placements</span></div>
                        <div><h1>40</h1> <span>Companies visiting</span></div>
                        <div><h1>8.5 LPA</h1> <span>Average Package</span></div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Body