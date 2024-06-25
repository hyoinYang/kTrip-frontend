import React, { useState, useEffect } from "react";
import fetchData from "../fetchData";
import "./SpotInfoPage.css";

const SpotInfoPage = ({ contentid, contenttypeid }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchDetailInfo = async () => {
            try {
                setLoading(true);
                const result = await fetchData('trip/detailinfo', setData, setError, setLoading, { contentid, contenttypeid });
                if (result) {
                    const uniqueData = removeDuplicates(result, "contentid");
                    setData(uniqueData);
                    console.log("Data fetched successfully:", uniqueData);
                }
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDetailInfo();
    }, [contentid, contenttypeid]);

    const removeDuplicates = (arr, key) => {
        return arr.filter((item, index, self) =>
                index === self.findIndex((t) => (
                    t[key] === item[key]
                ))
        );
    };

    const renderContent = (item) => {
        return (
            <div className="recommendation-item">
                {item.firstimage && <img src={item.firstimage} alt={item.title} />}
                <h2>{item.title}</h2>
                <p><strong>주소:</strong> {item.addr1} {item.addr2}</p>
                <p><strong>전화번호:</strong> {item.infocenter}</p>
                <p><strong>소개:</strong> {item.overview}</p>
                <p><strong>주차장:</strong> {item.parking}</p>
                <p><strong>반려동물 동반 여부:</strong> {item.chkpet}</p>
                <p><strong>휴무일:</strong> {item.restdate}</p>
                <p><strong>장애인 유모차 대여 여부:</strong> {item.chkbabycarriage}</p>
                <p><strong>화장실:</strong> {item.infoname} ({item.infotext})</p>
                <p><strong>수정 시간:</strong> {item.modifiedtime}</p>
            </div>
        );
    };

    return (
        <div className="spot-info-page">
            <header className="page-header">
                <h1>추천 여행지 정보</h1>
            </header>
            <main className="page-content">
                {error && <p>Error: {error}</p>}
                {loading && <p>Loading...</p>}
                {!loading && !error && data.length === 0 && <p>정보가 없습니다.</p>}
                {!loading && !error && data.length > 0 && (
                    <div className="recommendation-list">
                        {data.map(item => renderContent(item))}
                    </div>
                )}
            </main>
            <footer className="page-footer">
                <button onClick={() => setPage(page + 1)}>더 보기</button>
            </footer>
        </div>
    );
};

export default SpotInfoPage;
