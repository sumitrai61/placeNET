import React from 'react'
import Features from './Features'
import '../css/Experiences.css'
import { useEffect, useState } from "react";

const Experiences = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExp = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/seniors/experiences/static/`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                console.log("raw api data:", data);

                // The API returns a direct array of experiences
                if (Array.isArray(data)) {
                    setExperiences(data);
                } else {
                    console.warn("Expected array but got:", typeof data);
                    setExperiences([]);
                }
            } catch (err) {
                console.error("fetch error:", err);
                setExperiences([]);
            } finally {
                setLoading(false);
            }
        };

        fetchExp();
    }, []);
    if (loading) return <p>Loading...</p>;
    if (!Array.isArray(experiences) || experiences.length === 0) return <p>No experiences found.</p>;

    return (
        <>
            <Features />
            <div className="experiences">
                <h2 className="live-place-heading">Experiences</h2>
                <p className='black'>Experiences and tips by seniors for your better placements </p>

                <div>
                    {experiences.map((exp) => (
                        <div key={exp.id} className="experience-container">
                            <div className="experience-items">
                                <div className="emp-name">{exp.student_name || "Unknown Student"}</div>
                                <div className="mailid font14">{exp.student_username || ""}</div>

                                <div className="company justify">
                                    <div className="org">{exp.company_name || "Unknown Company"}</div>
                                    <div className="exp-role font14">{exp.role_title || "N/A"}</div>
                                    <div className="difficulty hard-color">{exp.difficulty || "N/A"}</div>
                                    <div className="avg_package green-text font14">{exp.package_lpa || 0} LPA</div>
                                </div>

                                {exp.summary && (
                                    <div className="summary" style={{ marginTop: "10px", marginBottom: "10px" }}>
                                        <p className="black" style={{ fontSize: "14px" }}>{exp.summary}</p>
                                    </div>
                                )}

                                {exp.details && (
                                    <div className="details" style={{ marginBottom: "10px" }}>
                                        <p className="font14" style={{ color: "rgb(115, 114, 114)" }}>{exp.details}</p>
                                    </div>
                                )}

                                {exp.tips && (
                                    <div className="tips">
                                        <p className="black" style={{ fontWeight: "bold", marginTop: "10px" }}>Tips:</p>
                                        <p className="black">{exp.tips}</p>
                                    </div>
                                )}

                                <div className="justify" style={{ marginTop: "10px", gap: "15px", fontSize: "12px", color: "rgb(115, 114, 114)" }}>
                                    {exp.rounds && <div>Rounds: {exp.rounds}</div>}
                                    {exp.rating && <div>Rating: {exp.rating}/5.0</div>}
                                    {exp.likes !== undefined && <div>Likes: {exp.likes}</div>}
                                    {exp.comments_count !== undefined && <div>Comments: {exp.comments_count}</div>}
                                    {exp.created_at && <div>Date: {new Date(exp.created_at).toLocaleDateString()}</div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Experiences