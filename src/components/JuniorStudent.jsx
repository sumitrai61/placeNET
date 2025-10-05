import Features from './Features'
 
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
                <div id="heading just-between">
                  <div>
                    <h4>Amazon</h4>
                    <div>SDE I</div>
                  </div>
                  <div id="star">
                    <img src="svgs/star.svg" alt="" />
                    <p>4.5</p>
                  </div>
                </div>
                <div id="package" className='just-between'>
                    <div><p>Package:</p></div>
                    <div className='colorGreen'>15.5 LPA</div>
                </div>
                <div id="difficulty" className='just-between'>
                    <div><p>Difficulty:</p></div>
                    <div className=''>Hard</div>
                </div>
                <div className="desc">
                  Challenging but rewarding experience. Focus on DSA and system design...
                </div>
                <div className='provider just-between'>
                  <div>By Vikash Kumar</div>
                  <button>Read More</button>
                </div>
              </div>
              <div className="exp-items">
                <div id="heading just-between">
                  <div>
                    <h4>Amazon</h4>
                    <div>SDE I</div>
                  </div>
                  <div id="star">
                    <img src="svgs/star.svg" alt="" />
                    <p>4.5</p>
                  </div>
                </div>
                <div id="package" className='just-between'>
                    <div><p>Package:</p></div>
                    <div className='colorGreen'>15.5 LPA</div>
                </div>
                <div id="difficulty" className='just-between'>
                    <div><p>Difficulty:</p></div>
                    <div className=''>Hard</div>
                </div>
                <div className="desc">
                  Challenging but rewarding experience. Focus on DSA and system design...
                </div>
                <div className='provider just-between'>
                  <div>By Vikash Kumar</div>
                  <button>Read More</button>
                </div>
              </div>
              <div className="exp-items">
                <div id="heading just-between">
                  <div>
                    <h4>Amazon</h4>
                    <div>SDE I</div>
                  </div>
                  <div id="star">
                    <img src="svgs/star.svg" alt="" />
                    <p>4.5</p>
                  </div>
                </div>
                <div id="package" className='just-between'>
                    <div><p>Package:</p></div>
                    <div className='colorGreen'>15.5 LPA</div>
                </div>
                <div id="difficulty" className='just-between'>
                    <div><p>Difficulty:</p></div>
                    <div className=''>Hard</div>
                </div>
                <div className="desc">
                  Challenging but rewarding experience. Focus on DSA and system design...
                </div>
                <div className='provider just-between'>
                  <div>By Vikash Kumar</div>
                  <button>Read More</button>
                </div>
              </div>
            </div>
          </div>
          <div className="section-3">
             <h4>Recent Placement Experiences</h4>
            <div><p>Learn from seniors' interview experiences</p></div>
            <div className="opportunity">
              <div className="oppo-items">
                <div className='just-between'>
                  <h4>Microsoft</h4>
                  <div>Premium</div>
                </div>
                <div>18.5 LPA</div>
                <div className='justify'>
                  <img src="svgs/calender.svg" alt="" />
                  <div>2025-02-15</div>
                </div>
                <div>Difficulty:Hard</div>
                <div>Required Skills:</div>
                <div className='justify'>
                  <div><p>DSA</p></div>
                  <div><p>System Design</p></div>
                  <div><p>Azure</p></div>
                </div>
              </div>
              <div className="oppo-items">
                <div className='just-between'>
                  <h4>Microsoft</h4>
                  <div>Premium</div>
                </div>
                <div>18.5 LPA</div>
                <div className='justify'>
                  <img src="svgs/calender.svg" alt="" />
                  <div>2025-02-15</div>
                </div>
                <div>Difficulty:Hard</div>
                <div>Required Skills:</div>
                <div className='justify'>
                  <div><p>DSA</p></div>
                  <div><p>System Design</p></div>
                  <div><p>Azure</p></div>
                </div>
              </div>
              <div className="oppo-items">
                <div className='just-between'>
                  <h4>Microsoft</h4>
                  <div>Premium</div>
                </div>
                <div>18.5 LPA</div>
                <div className='justify'>
                  <img src="svgs/calender.svg" alt="" />
                  <div>2025-02-15</div>
                </div>
                <div>Difficulty:Hard</div>
                <div>Required Skills:</div>
                <div className='justify'>
                  <div><p>DSA</p></div>
                  <div><p>System Design</p></div>
                  <div><p>Azure</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentPage