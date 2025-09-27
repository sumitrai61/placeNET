import Features from './Features'
import '../css/StudentPage.css'
const StudentPage = () => {
  const myStyle = {
    backgroundColor: '#f0f0f0'
  }
  return (
    <>
      <div className="main1">
        <Features />
        <div className="right">
          <h1>Junior Student Dashboard</h1>
          <p>Live placement updates and student experiences</p>
          <div className="statistics">
            <div className="stats-item">
              <img src="svgs/arrow.svg" alt="" />
              <div>
                <div><h4>Placement Rate</h4></div>
                <div><span>57%</span></div>
                <div><p>89/156 students</p></div>
              </div>
            </div>
            <div className="stats-item">
              <img src="svgs/dollar.svg" alt="" />
              <div>
                <div><h4>Average Packages</h4></div>
                <div><span>₹6.2 LPA</span></div>
                <div><p>Highest: ₹18.5 LPA</p></div>
              </div>
            </div>
            <div className="stats-item">
              <img src="svgs/placement.svg" alt="" />
              <div>
                <div><h4>Companies</h4></div>
                <div><span>24</span></div>
                <div><p>Visited this year</p></div>
              </div>
            </div>
            <div className="stats-item">
              <img src="svgs/two-person.svg" alt="" />
              <div>
                <div><h4>Still Looking</h4></div>
                <div><span>67</span></div>
                <div><p>Students seeking placement</p></div>
              </div>
            </div>
          </div>
          <div className='section-1'>
            <div className="live-updates">
              <h4>Live Updates</h4>
              <div><p>Real-time placement notifications</p></div>
              <div className="live-updates-items">
                <div id='circle'></div>
                <div>
                  <div><span>Rahul Sharma placed at Amazon - ₹15.5 LPA</span></div>
                  <div><p>2 hours ago</p></div>
                </div>
              </div>
              <div className="live-updates-items">
                <div id='circle'></div>
                <div>
                  <div><span>Rahul Sharma placed at Amazon - ₹15.5 LPA</span></div>
                  <div><p>2 hours ago</p></div>
                </div>
              </div>
              <div className="live-updates-items">
                <div id='circle'></div>
                <div>
                  <div><span>Rahul Sharma placed at Amazon - ₹15.5 LPA</span></div>
                  <div><p>2 hours ago</p></div>
                </div>
              </div>
              <div className="live-updates-items">
                <div id='circle'></div>
                <div>
                  <div><span>Rahul Sharma placed at Amazon - ₹15.5 LPA</span></div>
                  <div><p>2 hours ago</p></div>
                </div>
              </div>
            </div>
            <div className="placement-stats">
              <h4>Placement Trend (2024-25)</h4>
              <p>Monthly placement progress</p>
            </div>
          </div>
          <div className="section-2">
            <h4>Recent Placement Experiences</h4>
            <div><p>Learn from seniors' interview experiences</p></div>
            <div className="exp">
              <div className="exp-items">

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentPage