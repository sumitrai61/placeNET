import React from 'react'
import '../css/LivePlacements.css'
import Features from './Features'
import { useEffect, useState } from "react";


const Liveplacements = () => {

  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/`);
        const data = await res.json();

        // make sure it's an array
        const arr = data.live_updates?.placements;
        setPlacements(Array.isArray(arr) ? arr : []);

      } catch (err) {
        console.error("Error fetching live placements:", err);
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
          {placements.map((p) => (
            <div key={p.id} className="live-place-items">

              <div className="info-1 justify">

                <div className="justify">
                  <div><p>Role</p></div>
                  <div className="role">{p.role}</div>
                </div>
              </div>

              <div className="info-2 justify">
                <div className="justify">
                  <img src="svgs/rupee.svg" alt="" />
                  <div className="package green-text">{p.package_lpa} LPA</div>
                </div>

                <div className="justify">
                  <img src="svgs/two-person.svg" alt="" />
                  <div className="student-place">Student Placed - {p.student}</div>
                </div>

                <div className="justify">
                  <img src="svgs/placement.svg" alt="" />
                  <div className="comp-visited">Company Visited - {p.company}</div>
                </div>
              </div>

              <div className="placed-on">Placed on {p.placed_on ?? "N/A"}</div>

            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Liveplacements