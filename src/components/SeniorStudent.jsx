import Features from './Features'
import '../css/SeniorStudent.css'
const SeniorStudent = () => {
  return (
    <>
      <div className="main1">
        <Features />
        <div className="right_Sen">
          <h1>Senior Student Dashboard</h1>
          <p>Share your placement experiences and help juniors</p>
          <div className="statistics_Sen">
            <div className="stats-item_Sen">
              <img src="svgs/placement.svg" alt="" />
              <div>
                <div><h4>Active Companies</h4></div>
                <div><span>3</span></div>
              </div>
            </div>
            <div className="stats-item_Sen">
              <img src="svgs/two-person.svg" alt="" />
              <div>
                <div><h4>Students Placed</h4></div>
                <div><span>89</span></div>
              </div>
            </div>
            <div className="stats-item_Sen">
              <img src="svgs/calender.svg" alt="" />
              <div>
                <div><h4>Upcoming Drives</h4></div>
                <div><span>3</span></div>
              </div>
            </div>
          </div>

          <div className="section-1_Sen">
            <div className="company-updates">
              <h4>Company Updates</h4>
              <p>Latest placement opportunities and requirements</p>
              <div className="company-updates-items">
                <div className="title justify">
                  <h4>Tech Mahindra</h4>
                  <div className="status">Active</div>
                </div>
                <div className="details justify">
                  <div id="package" className='font14'>
                    <div>Package:</div>
                    <span className='green-text bold'>6.5LPA</span>
                  </div>
                  <div id="rounds" className='font14'>
                    <div>Rounds:</div>
                    <span>4</span>
                  </div>
                  <div id="diff" className='font14'>
                    <div>Difficulty:</div>
                    <span className='med-color bold'>Medium</span>
                  </div>
                  <div id="hired" className='font14'>
                    <div>Hired:</div>
                    <span className='bold'>12 students</span>
                  </div>
                </div>
                <div className="requirements justify">
                  <div><span>Full stack</span></div>
                  <div><span>React</span></div>
                  <div><span>Node.js</span></div>
                </div>
                <div className="deadline"><span>Application deadline: 2025-01-30</span></div>
              </div>
              <div className="company-updates-items">
                <div className="title justify">
                  <h4>Tech Mahindra</h4>
                  <div className="status">Active</div>
                </div>
                <div className="details justify">
                  <div id="package" className='font14'>
                    <div>Package:</div>
                    <span className='green-text bold'>6.5LPA</span>
                  </div>
                  <div id="rounds" className='font14'>
                    <div>Rounds:</div>
                    <span>4</span>
                  </div>
                  <div id="diff" className='font14'>
                    <div>Difficulty:</div>
                    <span className='med-color bold'>Medium</span>
                  </div>
                  <div id="hired" className='font14'>
                    <div>Hired:</div>
                    <span className='bold'>12 students</span>
                  </div>
                </div>
                <div className="requirements justify">
                  <div><span>Full stack</span></div>
                  <div><span>React</span></div>
                  <div><span>Node.js</span></div>
                </div>
                <div className="deadline"><span>Application deadline: 2025-01-30</span></div>
              </div>
              <div className="company-updates-items">
                <div className="title justify">
                  <h4>Tech Mahindra</h4>
                  <div className="status">Active</div>
                </div>
                <div className="details justify">
                  <div id="package" className='font14'>
                    <div>Package:</div>
                    <span className='green-text bold'>6.5LPA</span>
                  </div>
                  <div id="rounds" className='font14'>
                    <div>Rounds:</div>
                    <span>4</span>
                  </div>
                  <div id="diff" className='font14'>
                    <div>Difficulty:</div>
                    <span className='med-color bold'>Medium</span>
                  </div>
                  <div id="hired" className='font14'>
                    <div>Hired:</div>
                    <span className='bold'>12 students</span>
                  </div>
                </div>
                <div className="requirements justify">
                  <div><span>Full stack</span></div>
                  <div><span>React</span></div>
                  <div><span>Node.js</span></div>
                </div>
                <div className="deadline"><span>Application deadline: 2025-01-30</span></div>
              </div>
              <div className="company-updates-items">
                <div className="title justify">
                  <h4>Tech Mahindra</h4>
                  <div className="status">Active</div>
                </div>
                <div className="details justify">
                  <div id="package" className='font14'>
                    <div>Package:</div>
                    <span className='green-text bold'>6.5LPA</span>
                  </div>
                  <div id="rounds" className='font14'>
                    <div>Rounds:</div>
                    <span>4</span>
                  </div>
                  <div id="diff" className='font14'>
                    <div>Difficulty:</div>
                    <span className='med-color bold'>Medium</span>
                  </div>
                  <div id="hired" className='font14'>
                    <div>Hired:</div>
                    <span className='bold'>12 students</span>
                  </div>
                </div>
                <div className="requirements justify">
                  <div><span>Full stack</span></div>
                  <div><span>React</span></div>
                  <div><span>Node.js</span></div>
                </div>
                <div className="deadline"><span>Application deadline: 2025-01-30</span></div>
              </div>
            </div>
            <div className="high-val-placement-section">
              <h4>Upcoming High-Value Placements</h4>
              <p>Premium companies recruiting soon</p>
              <div className="section-items">
                <div id="company-name"><span>Microsoft</span></div>
                <div id="date">2025-02-15</div>
                <div id='offer'>18.5 LPA</div>
              </div>
              <div className="section-items">
                <div id="company-name"><span>Microsoft</span></div>
                <div id="date">2025-02-15</div>
                <div id='offer'>18.5 LPA</div>
              </div>
              <div className="section-items">
                <div id="company-name"><span>Microsoft</span></div>
                <div id="date">2025-02-15</div>
                <div id='offer'>18.5 LPA</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default SeniorStudent