import React, {useEffect, useState} from 'react';
import fetchData from "./fetchData";
import SpotInfoPage from "./pages/SpotInfoPage";
import RecommendPage from "./pages/RecommendPage";
import {useNavigate} from "react-router-dom";
import "./css/button.css";
import "./css/recommend-page.css";

const LocationComponent = () => {

    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [inputValue, setInputValue] = useState(1); // Keep track of the input value separately
    const [selectedContentId, setSelectedContentId] = useState(null);
    const [selectedContentTypeId, setSelectedContentTypeId] = useState(null);
    const [recommendPageIsOpen, setRecommendPageIsOpen] = useState(true);
    const [spotInfoPageIsOpen, setSpotInfoPageIsOpen] = useState(false);
    const navigate = useNavigate();


    const handleItemClick = (contentid, contenttypeid, title) => {
        setRecommendPageIsOpen(false);
        navigate(`/spotinfo?cid=${contentid}&ctypeid=${contenttypeid}&title=${title}`);
    };
    useEffect(() => {
        // 위치 정보 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    setLocation({latitude, longitude});
                    // 서버에 위치 정보 전송 예시
                    fetchData(`trip/location?mapX=${encodeURIComponent(longitude)}&mapY=${encodeURIComponent(latitude)}&radius=2000`, (response) => {

                        setTotalCount(response[0]);
                        setItemsPerPage(response[1]);
                        setData(response.slice(2));
                        setLoading(false);
                    }, setError, setLoading,)
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError('Geolocation is not supported.');
        }
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 합니다.


    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 10;
        const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
        let startPage = Math.max(1, page - halfMaxPagesToShow);
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        if (startPage > 1) {
            pageNumbers.push(<span key="start-ellipsis">...</span>);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={page === i ? "active curr-pg" : "pg-num-btn"}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            pageNumbers.push(<span key="end-ellipsis">...</span>);
        }

        return pageNumbers;
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const handlePageInputChange = (e) => {
        setInputValue(e.target.value);
    };


    const handlePageInputBlur = () => {
        let parsedValue = parseInt(inputValue, 10); // 정수로 변환
        let pageNumber = Math.max(1, Math.min(totalPages, parsedValue));

        if (parsedValue !== pageNumber) {
            alert(`페이지는 1에서 ${totalPages} 사이의 값을 가져야 합니다.`);
            // 입력이 잘못된 경우 현재 페이지로 다시 설정
            pageNumber = page;
        }

        setPage(pageNumber);
        setInputValue(pageNumber);
    };

    const handlePageInputKeyDown = (e) => {
        if (e.key === "Enter") {
            let parsedValue = parseInt(inputValue, 10); // 정수로 변환
            let pageNumber = Math.max(1, Math.min(totalPages, parsedValue));

            if (parsedValue !== pageNumber) {
                alert(`페이지는 1에서 ${totalPages} 사이의 값을 가져야 합니다.`);
                // 입력이 잘못된 경우 현재 페이지로 다시 설정
                pageNumber = page;
            }

            setPage(pageNumber);
            setInputValue(pageNumber);
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            { recommendPageIsOpen && (
                <div>
                    <main className="page-content">
                        <div className="recommendation-list">
                            {
                                data.map((item) => (
                                    <div key={item.contentid} className="recommendation-item">
                                        <button
                                            className="button button--size-m button--text-medium bg-1 button--winona"
                                            onClick={() => handleItemClick(item.contentid, item.contenttypeid)}>
                                            {item.title}
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    </main>
                    {data.length > 0 && (
                        <footer className="page-footer">
                            <div className="pagination-controls">
                                {page > 1 && (
                                    <>
                                        <button className="most-front-btn" onClick={() => setPage(1)}>
                                            맨 앞으로
                                        </button>
                                        <button className="prev-btn" onClick={() => setPage(page - 1)}>
                                            이전
                                        </button>
                                    </>
                                )}
                                {renderPageNumbers()}
                                {page < totalPages && (
                                    <>
                                        <button className="next-btn" onClick={() => setPage(page + 1)}>
                                            다음
                                        </button>
                                        <button
                                            className="most-back-btn"
                                            onClick={() => setPage(totalPages)}
                                        >
                                            맨 뒤로
                                        </button>
                                    </>
                                )}
                            </div>
                            <div className="page-input">
                                <input
                                    type="number"
                                    min="1"
                                    max={totalPages}
                                    value={inputValue}
                                    onChange={handlePageInputChange}
                                    onBlur={handlePageInputBlur}
                                    onKeyDown={handlePageInputKeyDown}
                                />
                                <span> / {totalPages}</span>
                            </div>
                        </footer>
                        )}
                </div>
            )}
            {/* SpotInfoPage 컴포넌트 */}
            {spotInfoPageIsOpen && (
                <SpotInfoPage
                    contentid={selectedContentId}
                    contenttypeid={selectedContentTypeId}
                />)}
        </div>
    );
};



export default LocationComponent;