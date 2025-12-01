import Features from './Features'
import '../css/JuniorStudent.css'
import { useEffect, useState } from "react";

function JuniorStudent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/`);
        const json = await res.json();
        // console.log("Dashboard:", json);
        setData(json);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };

    fetchDashboard();
  }, []);

  const [premium, setPremium] = useState([]);

  useEffect(() => {
    const fetchPremium = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/`);
        const data = await res.json();
        setPremium(Array.isArray(data.premium_upcoming) ? data.premium_upcoming : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPremium();
  }, []);

  if (!data) return <p>Loading dashboard...</p>;
  return (
    <>
      <div className="main1">
        <Features />
        <div className="right">
          <div>
            {Array.isArray(data.experiences) && (
              <div>
                <h3>Recent Experiences</h3>
                <ul>
                  {data.experiences.map(exp => (
                    <li key={exp.id}>
                      <strong>{exp.title}</strong> — {exp.company} (Rating: {exp.rating})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ---- Messages ---- */}
            {Array.isArray(data.messages) && (
              <div>
                <h3>Messages</h3>
                <ul>
                  {data.messages.map(msg => (
                    <li key={msg.id}>
                      <strong>{msg.subject}</strong>: {msg.body}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <h1></h1>

          <h1>Junior Student Dashboard</h1>
          <p>Live placement updates and student experiences</p>
          <div className="statistics">
            <div className="stats-item">
              <img src="svgs/arrow.svg" alt="" />
              <div>
                <div><h4>Placement Rate</h4></div>
                <div><span>{data.placement_rate_percent}%</span></div>
                <div><p>{data.placed_students_count}/{data.total_students_count} students</p></div>
              </div>
            </div>
            <div className="stats-item">
              <img src="svgs/dollar.svg" alt="" />
              <div>
                <div><h4>Average Packages</h4></div>
                <div><span>₹{data.avg_package_lpa} LPA</span></div>
                <div><p>Highest: ₹{data.highest_package_lpa} LPA</p></div>
              </div>
            </div>
            <div className="stats-item">
              <img src="svgs/placement.svg" alt="" />
              <div>
                <div><h4>Companies</h4></div>
                <div><span>{data.companies_count}</span></div>
                <div><p>Visited this year</p></div>
              </div>
            </div>
            <div className="stats-item">
              <img src="svgs/two-person.svg" alt="" />
              <div>
                <div><h4>Still Looking</h4></div>
                <div><span>{data.still_looking}</span></div>
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
          <div className="section-3">
             <h4>Recent Placement Experiences</h4>
            <div><p>Learn from seniors' interview experiences</p></div>
            <div className="opportunity">
              {premium.map((item) => {
                const skills = item.required_skills
                  ? item.required_skills.split(",").map((s) => s.trim())
                  : [];

                return (
                  <div key={item.id} className="oppo-items">
                    <div className="just-between">
                      <h4>{item.company.name}</h4>
                      <div>{item.title}</div>
                    </div>

                    <div className="green-text bold">{item.package_lpa} LPA</div>

                    <div className="justify">
                      <img src="svgs/calender.svg" alt="" />
                      <div>{item.date}</div>
                    </div>

                    <div className="justify">
                      Difficulty: <div className="hard-color bold">{item.difficulty}</div>
                    </div>

                    <div>Required Skills:</div>

                    <div className="requirements justify">
                      {skills.map((skill, index) => (
                        <div key={index}>
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JuniorStudent