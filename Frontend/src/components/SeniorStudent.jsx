import Features from './Features'
import '../css/SeniorStudent.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SeniorStudent = () => {
  const navigate = useNavigate()
  const [companyUpdates, setCompanyUpdates] = useState([])
  const [loadingUpdates, setLoadingUpdates] = useState(true)
  const [highValuePlacements, setHighValuePlacements] = useState([])
  const [loadingHighValue, setLoadingHighValue] = useState(true)

  useEffect(() => {
    const fetchCompanyUpdates = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/company-updates/`)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        console.log('raw api data:', data)

        // The API returns a direct array of company updates
        if (Array.isArray(data)) {
          setCompanyUpdates(data)
        } else {
          console.warn('Expected array but got:', typeof data)
          setCompanyUpdates([])
        }
      } catch (err) {
        console.error('Error fetching company updates:', err)
        setCompanyUpdates([])
      } finally {
        setLoadingUpdates(false)
      }
    }

    fetchCompanyUpdates()
  }, [])

  useEffect(() => {
    const fetchHighValuePlacements = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upcoming-high-value-placements/`)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        console.log('raw high-value placements data:', data)

        // The API returns a direct array of high-value placements
        if (Array.isArray(data)) {
          setHighValuePlacements(data)
        } else {
          console.warn('Expected array but got:', typeof data)
          setHighValuePlacements([])
        }
      } catch (err) {
        console.error('Error fetching high-value placements:', err)
        setHighValuePlacements([])
      } finally {
        setLoadingHighValue(false)
      }
    }

    fetchHighValuePlacements()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userName')
    navigate('/')
  }

  return (
    <>
      <div className="main1">
        <Features />
        <div className="right_Sen">
          <div className="dashboard-header">
            <h1>Senior Student Dashboard</h1>
            <button className="login-btn desktop-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
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
                <div><span>42</span></div>
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
              {loadingUpdates ? (
                <p>Loading company updates...</p>
              ) : companyUpdates.length === 0 ? (
                <p>No company updates found.</p>
              ) : (
                companyUpdates.map((item, index) => (
                  <div key={index} className="company-updates-items">
                    <div className="title justify">
                      <h4>{item.company || 'Unknown Company'}</h4>
                      <div className="status">{item.status || 'N/A'}</div>
                    </div>
                    <div className="details justify">
                      <div id="package" className='font14'>
                        <div>Package:</div>
                        <span className='green-text bold'>{item.package_lpa || 0}LPA</span>
                      </div>
                      <div id="rounds" className='font14'>
                        <div>Rounds:</div>
                        <span>{item.rounds || 0}</span>
                      </div>
                      <div id="diff" className='font14'>
                        <div>Difficulty:</div>
                        <span className='med-color bold'>{item.difficulty || 'N/A'}</span>
                      </div>
                      <div id="hired" className='font14'>
                        <div>Hired:</div>
                        <span className='bold'>{item.hired_students || 0} students</span>
                      </div>
                    </div>
                    {item.skills && Array.isArray(item.skills) && item.skills.length > 0 && (
                      <div className="requirements justify">
                        {item.skills.map((skill, skillIndex) => (
                          <div key={skillIndex}><span>{skill}</span></div>
                        ))}
                      </div>
                    )}
                    {item.application_deadline && (
                      <div className="deadline">
                        <span>Application deadline: {item.application_deadline}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="high-val-placement-section">
              <h4>Upcoming High-Value Placements</h4>
              <p>Premium companies recruiting soon</p>
              {loadingHighValue ? (
                <p>Loading high-value placements...</p>
              ) : highValuePlacements.length === 0 ? (
                <p>No high-value placements found.</p>
              ) : (
                highValuePlacements.map((item, index) => (
                  <div key={index} className="section-items">
                    <div id="company-name"><span>{item.company || 'Unknown Company'}</span></div>
                    <div id="date">{item.date || 'N/A'}</div>
                    <div id='offer'>{item.package_lpa || 0} LPA</div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default SeniorStudent