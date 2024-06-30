import React, { useState, useEffect } from "react";
import fetchData from "../fetchData";
import '../css/TourCoursePage.css';
import { useLocation, useNavigate } from "react-router-dom";

function TourCoursePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const contentid = searchParams.get('cid');
    const contenttypeid = searchParams.get('ctypeid');
    const title = searchParams.get('title');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetailInfo = async () => {
            try {
                setLoading(true);
                await fetchData('trip/course', setData, setLoading, setError, { contentid, contenttypeid });
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDetailInfo();
    }, [contentid, contenttypeid]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="tour-course-page">
            <h1>{title}</h1>
            <div className="course-list">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index} className="course-item">
                            <h2 className="course-item-title">{item.subname}</h2>
                            {item.subdetailimg && <img className="course-item-image" src={item.subdetailimg} alt={item.subdetailalt} />}
                            <p className="course-item-description">{item.subdetailoverview}</p>
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
}

export default TourCoursePage;
