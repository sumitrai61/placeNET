import Features from './Features'
import '../css/JuniorStudent.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function JuniorStudent() {
  const navigate = useNavigate();
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

  const [recentExperiences, setRecentExperiences] = useState([]);
  const [loadingExperiences, setLoadingExperiences] = useState(true);

  useEffect(() => {
    const fetchRecentExperiences = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recent-experiences/`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("raw api data:", data);

        // The API returns a direct array of recent experiences
        if (Array.isArray(data)) {
          setRecentExperiences(data);
        } else {
          console.warn("Expected array but got:", typeof data);
          setRecentExperiences([]);
        }
      } catch (err) {
        console.error("Error fetching recent experiences:", err);
        setRecentExperiences([]);
      } finally {
        setLoadingExperiences(false);
      }
    };

    fetchRecentExperiences();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/");
  };

  if (!data) return <p>Loading dashboard...</p>;
  return (
    <>
      <div className="main1">
        <Features />
        <div className="right">

          <div className="dashboard-header">
            <h1>Junior Student Dashboard</h1>
            <button className="login-btn desktop-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <p>Live placement updates and student experiences</p>
          <div className="statistics">
            <div className="stats-item">
              <img src="svgs/arrow.svg" alt="" />
              <div>
                <div><h4>Placement Rate</h4></div>
                <div><span>63%</span></div>
                <div><p>42/67 students</p></div>
              </div>
            </div>
            <div className="stats-item">
              <img src="svgs/dollar.svg" alt="" />
              <div>
                <div><h4>Average Packages</h4></div>
                <div><span>₹8 LPA</span></div>
                <div><p>Highest: ₹15 LPA</p></div>
              </div>
            </div>
            <div className="stats-item">
              <img src="svgs/placement.svg" alt="" />
              <div>
                <div><h4>Companies</h4></div>
                <div><span>20</span></div>
                <div><p>Visited this year</p></div>
              </div>
            </div>
            <div className="stats-item">
              <img src="svgs/two-person.svg" alt="" />
              <div>
                <div><h4>Still Looking</h4></div>
                <div><span>25</span></div>
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
                  <div><span>Akshay kumar placed at Infosys - ₹9 LPA</span></div>
                  <div><p>3 days ago</p></div>
                </div>
              </div>
              <div className="live-updates-items">
                <div id='circle'></div>
                <div>
                  <div><span>Rahul Sharma placed at Microsoft - ₹16 LPA</span></div>
                  <div><p>7 days ago</p></div>
                </div>
              </div>
              <div className="live-updates-items">
                <div id='circle'></div>
                <div>
                  <div><span>Shaitaan Singh placed at Amazon - ₹15.5 LPA</span></div>
                  <div><p>10 days ago</p></div>
                </div>
              </div>
              <div className="live-updates-items">
                <div id='circle'></div>
                <div>
                  <div><span>Abhishek placed at Mahindra Tech - ₹10.5 LPA</span></div>
                  <div><p>12 days ago</p></div>
                </div>
              </div>
            </div>
            <div className="placement-stats">
              <h4>Placement Trend (2024-25)</h4>
              <p>Monthly placement progress</p>
              <div className="placement-chart-container">
                <svg viewBox="0 0 500 300" className="placement-chart-svg">
                  {/* Y-axis label */}
                  <text x="20" y="150" transform="rotate(-90 20 150)" textAnchor="middle" fontSize="12" fontWeight="600" fill="#333">
                    Number of Students Placed
                  </text>
                  
                  {/* X-axis label */}
                  <text x="250" y="290" textAnchor="middle" fontSize="12" fontWeight="600" fill="#333">
                    Months
                  </text>
                  
                  {/* Grid lines and Y-axis labels */}
                  {[0, 10, 20, 30, 40, 50, 60].map((value, idx) => {
                    const y = 250 - (value / 60) * 200;
                    return (
                      <g key={idx}>
                        <line x1="60" y1={y} x2="480" y2={y} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
                        <text x="55" y={y + 4} textAnchor="end" fontSize="10" fill="#666">{value}</text>
                      </g>
                    );
                  })}
                  
                  {/* X-axis line */}
                  <line x1="60" y1="250" x2="480" y2="250" stroke="#333" strokeWidth="2" />
                  
                  {/* Y-axis line */}
                  <line x1="60" y1="50" x2="60" y2="250" stroke="#333" strokeWidth="2" />
                  
                  {/* Chart data */}
                  {(() => {
                    const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
                    const data = [0, 5, 18, 35, 50, 58]; // Dummy data: students placed per month
                    const maxValue = 60;
                    const chartWidth = 420;
                    const chartHeight = 200;
                    const startX = 60;
                    const startY = 250;
                    
                    // Create path for line
                    const points = data.map((value, idx) => {
                      const x = startX + (idx / (months.length - 1)) * chartWidth;
                      const y = startY - (value / maxValue) * chartHeight;
                      return `${x},${y}`;
                    });
                    const pathData = `M ${points.join(' L ')}`;
                    
                    return (
                      <>
                        {/* Area under line (gradient fill) */}
                        <defs>
                          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.05" />
                          </linearGradient>
                        </defs>
                        <path d={`${pathData} L ${startX + chartWidth},${startY} L ${startX},${startY} Z`} fill="url(#areaGradient)" />
                        
                        {/* Line */}
                        <path d={pathData} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        
                        {/* Data points and labels */}
                        {data.map((value, idx) => {
                          const x = startX + (idx / (months.length - 1)) * chartWidth;
                          const y = startY - (value / maxValue) * chartHeight;
                          return (
                            <g key={idx}>
                              {/* Data point circle */}
                              <circle cx={x} cy={y} r="5" fill="#2563eb" stroke="#fff" strokeWidth="2" />
                              {/* Value label above point */}
                              <text x={x} y={y - 10} textAnchor="middle" fontSize="11" fontWeight="600" fill="#2563eb">
                                {value}
                              </text>
                              {/* Month label */}
                              <text x={x} y={startY + 20} textAnchor="middle" fontSize="11" fontWeight="500" fill="#666">
                                {months[idx]}
                              </text>
                            </g>
                          );
                        })}
                      </>
                    );
                  })()}
                </svg>
              </div>
            </div>
          </div> 
          <div className="section-3">
             <h4>Recent Placement Experiences</h4>
            <div><p>Learn from seniors' interview experiences</p></div>
            {loadingExperiences ? (
              <p>Loading experiences...</p>
            ) : recentExperiences.length === 0 ? (
              <p>No recent experiences found.</p>
            ) : (
              <div className="opportunity">
                {recentExperiences.map((item, index) => {
                  return (
                    <div key={item.read_more_id || index} className="oppo-items">
                      <div className="just-between">
                        <h4>{item.company || "Unknown Company"}</h4>
                        <div>{item.role_title || "N/A"}</div>
                      </div>

                      <div className="green-text bold">{item.package_lpa || 0} LPA</div>

                      <div className="justify">
                        <img src="svgs/calender.svg" alt="" />
                        <div>
                          {item.created_at 
                            ? new Date(item.created_at).toLocaleDateString() 
                            : "N/A"}
                        </div>
                      </div>

                      <div className="justify">
                        Difficulty: <div className="hard-color bold">{item.difficulty || "N/A"}</div>
                      </div>

                      {item.student_name && (
                        <div className="justify" style={{ marginTop: "8px" }}>
                          <div>Student: <strong>{item.student_name}</strong></div>
                        </div>
                      )}

                      {item.summary && (
                        <div style={{ marginTop: "10px" }}>
                          <div style={{ fontSize: "13px", color: "rgb(115, 114, 114)" }}>
                            {item.summary}
                          </div>
                        </div>
                      )}

                      {item.rating && (
                        <div className="justify" style={{ marginTop: "8px", fontSize: "12px" }}>
                          <div>Rating: <strong>{item.rating}/5.0</strong></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default JuniorStudent