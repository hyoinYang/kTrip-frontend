import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // react-modal import
import fetchData from "../fetchData";

const RecommendPage = ({ areacode, sigungucode }) => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataWrapper = async () => {
            await fetchData('trip/recommend', setData, setError, setLoading, { areacode, sigungucode, pageno: page });
        };
        console.log(areacode, sigungucode);
        fetchDataWrapper();
    }, [areacode, sigungucode, page]);

    return (
        <div className="recommend-page">
            <header className="page-header">
                <h1>추천 여행지</h1>
            </header>
            <main className="page-content">
                {loading && <p>로딩 중...</p>}
                {error && <p>오류 발생: {error.message}</p>}
                {!loading && !error && data.length === 0 && <p>추천 여행지가 없습니다.</p>}
                {!loading && !error && data.length > 0 && (
                    <div className="recommendation-list">
                        {data.map((item) => (
                            <div key={item.contentId} className="recommendation-item">
                                <h3>{item.title}</h3>
                                <img src={item.firstimage} alt={item.title} className="recommendation-image" />
                                <p>{item.addr1}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <footer className="page-footer">
                <button onClick={() => setPage((prev) => prev + 1)}>더 보기</button>
            </footer>
        </div>
    );
};

export default RecommendPage;