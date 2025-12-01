import React from 'react'
import Features from './Features'
import '../css/PlaceCoordinator.css'
import { useNavigate } from 'react-router-dom'

const PlaceCoordinator = () => {
    const navigate = useNavigate()


    return (
        <>
            <div className="main1">
                <Features />
                <div className="right">
                <div className="dashboard-header">
                    <h2>Placement Coordinator Dashboard</h2>
                    <button className="login-btn desktop-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <p>Manage placements and coordinate with companies</p>
                <div className="statistics">
                    <div className="stats-item">
                        <img src="svgs/two-person.svg" alt="" />
                        <div>
                            <div><h4>Total Students</h4></div>
                            <div><span>156</span></div>
                        </div>
                    </div>
                    <div className="stats-item">
                        <img src="svgs/check.svg" alt="" />
                        <div>
                            <div><h4>Placed Students</h4></div>
                            <div><span>89</span></div>
                        </div>
                    </div>
                    <div className="stats-item">
                        <img src="svgs/placement.svg" alt="" />
                        <div>
                            <div><h4>Active Companies</h4></div>
                            <div><span>24</span></div>
                        </div>
                    </div>
                    <div className="stats-item">
                        <img src="svgs/warning.svg" alt="" />
                        <div>
                            <div><h4>Pending Responses</h4></div>
                            <div><span>7</span></div>
                        </div>
                    </div>
                </div>
                <div className="section-1">
                    <div className="up-placements">
                        <div className='bold'>Upcoming Placements</div>
                        <div><p>Scheduled interviews and placement drives</p></div>
                        <div className="up-place-items">
                            <div className="info">
                                <div>Tech Mahindra</div>
                                <div className='parcipants'>Full Stack Development</div>
                                <div className='justify parcipants'>
                                    <div>2025-01-25</div>
                                    <div>10:00 AM</div>
                                </div>
                            </div>
                            <div>
                                <div className="status">confirmed</div>
                                <div className='parcipants'>45 applicants</div>
                            </div>
                        </div>
                        <div className="up-place-items">
                            <div className="info">
                                <div>Infosys</div>
                                <div className='parcipants'>Full Stack Development</div>
                                <div className='justify parcipants'>
                                    <div>2025-01-27</div>
                                    <div>10:00 AM</div>
                                </div>
                            </div>
                            <div>
                                <div className="status">confirmed</div>
                                <div className='parcipants'>40 applicants</div>
                            </div>
                        </div>
                        <div className="up-place-items">
                            <div className="info">
                                <div>TCS</div>
                                <div className='parcipants'>Front End Developer</div>
                                <div className='justify parcipants'>
                                    <div>2025-01-29</div>
                                    <div>1:00 PM</div>
                                </div>
                            </div>
                            <div className='item-right'>
                                <div className="status">confirmed</div>
                                <div className='parcipants'>38 applicants</div>
                            </div>
                        </div>
                        <div className="up-place-items">
                            <div className="info">
                                <div>Wipro</div>
                                <div className='parcipants'>Back End Developer</div>
                                <div className='justify parcipants'>
                                    <div>2025-02-10</div>
                                    <div>12:00 PM</div>
                                </div>
                            </div>
                            <div className='item-right'>
                                <div className="status">confirmed</div>
                                <div className='parcipants'>40 applicants</div>
                            </div>
                        </div>
                    </div>
                    <div className="recent-activity">
                        <div className='bold'>Recent Activity</div>
                        <div><p>Latest updates and notifications</p></div>
                        <div className="recent-activity-items">
                            <div className='red'></div>
                            <div>
                                <div className='activity-info'>New message from Tech Mahindra HR</div>
                                <div className='time'>2 hours ago</div>
                            </div>
                        </div>
                        <div className="recent-activity-items">
                            <div className='yellow'></div>
                            <div>
                                <div className='activity-info'>New message from Infosys HR</div>
                                <div className='time'>3 hours ago</div>
                            </div>
                        </div>
                        <div className="recent-activity-items">
                            <div className='green'></div>
                            <div>
                                <div className='activity-info'>New message from TCS HR</div>
                                <div className='time'>6 hours ago</div>
                            </div>
                        </div>
                        <div className="recent-activity-items">
                            <div className='red'></div>
                            <div>
                                <div className='activity-info'>New message from Wipro HR</div>
                                <div className='time'>12 hours ago</div>
                            </div>
                        </div>
                        <div className="recent-activity-items">
                            <div className='yellow'></div>
                            <div>
                                <div className='activity-info'>Congratulations! on proper execution of cvent - Cvent HR</div>
                                <div className='time'>16 hours ago</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default PlaceCoordinator