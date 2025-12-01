import React from 'react'
import '../css/LivePlacements.css'
import Features from './Features'
import { useEffect, useState } from "react";


const Liveplacements = () => {

  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/live-updates/static/`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("raw api data:", data);

        // The API returns a direct array of live placements
        if (Array.isArray(data)) {
          setPlacements(data);
        } else {
          console.warn("Expected array but got:", typeof data);
          setPlacements([]);
        }
      } catch (err) {
        console.error("Error fetching live placements:", err);
        setPlacements([]);
      }
    };

    fetchLive();
  }, []);

  return (
    <>
      <Features />
      <div className="live-place">
        <h2 className="live-place-heading">Live Placements</h2>

        <div className="live-placements-container">
          {placements.length === 0 ? (
            <p>No live placements found.</p>
          ) : (
            placements.map((p) => (
              <div key={p.id} className="live-place-items">
                <div className="info-1 justify">
                  <div className="justify">
                    <div><p>Role</p></div>
                    <div className="role">{p.role || "N/A"}</div>
                  </div>
                </div>

                <div className="info-2 justify">
                  <div className="justify">
                    <img src="svgs/rupee.svg" alt="" />
                    <div className="package green-text">{p.package_lpa || 0} LPA</div>
                  </div>

                  <div className="justify">
                    <img src="svgs/two-person.svg" alt="" />
                    <div className="student-place">Student Placed - {p.student_name || "Unknown"}</div>
                  </div>

                  <div className="justify">
                    <img src="svgs/placement.svg" alt="" />
                    <div className="comp-visited">Company Visited - {p.company_name || p.company || "Unknown"}</div>
                  </div>
                </div>

                <div className="placed-on">
                  Placed on {p.placed_on 
                    ? new Date(p.placed_on).toLocaleDateString() 
                    : (p.created_at 
                        ? new Date(p.created_at).toLocaleDateString() 
                        : "N/A")}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Liveplacements