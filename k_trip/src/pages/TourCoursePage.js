import React, { useState, useEffect } from "react";
import fetchData from "../fetchData";
import './SpotInfoPage.css';
import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import ReviewModal from "../modals/ReviewModal";

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
        console.log(contentid);
        console.log(contenttypeid);
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
            <button>코스 경로보기</button>
            <div className="course-list">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index} className="course-item">
                            <h2>{item.subname}</h2>
                            {item.subdetailimg && <img src={item.subdetailimg} alt={item.subdetailalt} />}
                            <p>{item.subdetailoverview}</p>
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