import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // react-modal import
import fetchData from "../fetchData";

const RecommendPage = ({ areacode, sigungucode, areaname, sigunguname }) => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        setSelectedCategory(null);
        setData([]);
    }, [areacode, sigungucode]);

    const getAreaBasedList1 = (cat1, pageno) => {
        if(pageno > 1){
            setPage(pageno);
        }
        setSelectedCategory(cat1); // 선택된 카테고리 업데이트
        fetchData('trip/recommend', setData, setError, setLoading, { areacode, sigungucode, pageno: pageno, cat1 });
    };

    const buttons = [
        { label: "자연", value: "A01" },
        { label: "인문", value: "A02" },
        { label: "레포츠", value: "A03" },
        { label: "쇼핑", value: "A04" },
        { label: "음식", value: "A05" },
        { label: "숙박", value: "A06" },
        { label: "추천 코스", value: "A07" }
    ];

    return (
        <div className="recommend-page">
            <header className="page-header">
                <h1>{`${areaname} ${sigunguname}`}</h1>
                <div className="button-row">
                    {buttons.map((button, index) => (
                        <button key={index} onClick={() => getAreaBasedList1(button.value)}>
                            {button.label}
                        </button>
                    ))}
                </div>
            </header>
            <main className="page-content">
                {error && <p>선택한 카테고리에 해당하는 정보가 없습니다.</p>}
                {!loading && !error && data.length === 0 && <p>카테고리를 선택해주세요.</p>}
                {!loading && !error && data.length > 0 && (
                    <div className="recommendation-list">
                        {data.map((item) => (
                            <div key={item.contentId} className="recommendation-item">
                                <button>
                                    {item.title}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <footer className="page-footer">
                <button onClick={() => getAreaBasedList1(selectedCategory, page + 1)}>더 보기</button>
            </footer>
        </div>
    );
};

export default RecommendPage;