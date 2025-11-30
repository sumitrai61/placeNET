import React from 'react'
import Features from './Features'
import '../css/PlaceCoordinator.css'
const PlaceCoordinator = () => {
    return (
        <>
            <Features />
            <div className="right">
                <h2>Placement Coordinator Dashboard</h2>
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
                                <div>Tech Mahindra</div>
                                <div className='parcipants'>Full Stack Development</div>
                                <div className='justify parcipants'>
                                    <div>2025-01-25</div>
                                    <div>10:00 AM</div>
                                </div>
                            </div>
                            <div className='item-right'>
                                <div className="status">confirmed</div>
                                <div className='parcipants'>45 applicants</div>
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
                                <div className='activity-info'>New message from Tech Mahindra HR</div>
                                <div className='time'>2 hours ago</div>
                            </div>
                        </div>
                        <div className="recent-activity-items">
                            <div className='green'></div>
                            <div>
                                <div className='activity-info'>New message from Tech Mahindra HR</div>
                                <div className='time'>2 hours ago</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaceCoordinator