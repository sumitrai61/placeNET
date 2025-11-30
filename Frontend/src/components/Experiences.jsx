import React from 'react'
import Features from './Features'
import '../css/Experiences.css'
import { useEffect, useState } from "react";

const Experiences = () => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const fetchExp = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/`);
                const data = await res.json();

                // Try to find experiences in a few possible places
                let arr = [];

                if (Array.isArray(data.experiences)) {
                    arr = data.experiences;
                } else if (Array.isArray(data.live_updates?.experiences)) {
                    arr = data.live_updates.experiences;
                } else if (Array.isArray(data.recent_experiences)) {
                    arr = data.recent_experiences;
                }

                setExperiences(arr);
            } catch (err) {
                setExperiences([]);
            }
        };
        fetchExp();
    }, []);

    return (
        <>
            <Features />
            <div className="experiences">
                <h2 className="live-place-heading">Experiences</h2>
                <p className='black'>Experiences and tips by seniors for your better placements </p>

                <div className='experience-container'>
                    {experiences.map((exp) => (
                        <div key={exp.id} className="experience-items">
                                <div className="emp-name">{exp.student?.user?.first_name} {exp.student?.user?.last_name}</div>
                                <div className="mailid font14">{exp.student?.user?.email}</div>
                                <div className="company justify">
                                    <div className="org">{exp.company?.name}</div>
                                    <div className="exp-role font14">{exp.title}</div>
                                    <div className="difficulty hard-color">{exp.difficulty}</div>
                                    <div className="avg_package green-text font14">{exp.package_lpa} LPA</div>
                                </div>

                                <div className="tips">
                                    <p className="black">{exp.content}</p>
                                </div>
                            </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Experiences