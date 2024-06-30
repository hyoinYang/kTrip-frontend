import React, {useEffect, useState} from 'react';
import fetchData from "./fetchData";

import {useNavigate} from "react-router-dom";
import "./css/button.css";
import "./css/recommend-page.css";
import * as buttons from "react-bootstrap/ElementChildren";
import "./css/button.css";
import "./css/recommend-page.css";

const LocationComponent = () => {

    const [location, setLocation] = useState({ latitude: null, longitude: null });
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
    const [isAgree, setIsAgree] = useState(1)



    const handleItemClick = (contentid, contenttypeid, title) => {
        setRecommendPageIsOpen(false);
        navigate(`/spotinfo?cid=${contentid}&ctypeid=${contenttypeid}&title=${title}`);
    };

    // 위치 정보를 가져오는 함수
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    useEffect(() => {
        getLocation(); // 컴포넌트가 마운트될 때 위치 정보 가져오기 시도
    }, []); // 빈 배열을 전달하여 최초 한 번만 실행되도록 설정

    // 위치 정보나 페이지가 변경될 때 데이터를 가져오는 함수
    useEffect(() => {
        if (location && location.latitude && location.longitude) {
            getAreaByUserLocation(location.longitude, location.latitude, page);
        }
    }, [location, page]);

    // 사용자 위치에 따라 데이터를 가져오는 함수
    const getAreaByUserLocation = (longitude, latitude, page) => {
        setLoading(true); // 로딩 상태 설정

        fetchData(
            `trip/location?mapX=${encodeURIComponent(longitude)}&mapY=${encodeURIComponent(latitude)}&radius=2000&pageno=${page}`,
            (response) => {
                setTotalCount(response[0]);
                setItemsPerPage(response[1]);
                setData(response.slice(2));
                setLoading(false); // 로딩 상태 해제
            },

            setError,
            setLoading
        );

    };


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

    const handleRecommendItemClick = (contentid, contenttypeid, title) => {
        navigate(
            `/spotinfo?cid=${contentid}&ctypeid=${contenttypeid}&title=${title}`
        );
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
        <div className="recommend-page">
            <header className="page-header">
                <div className="button-row">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            className="button button--size-m button--text-medium bg-1 button--winona"
                            onClick={() => {
                                setSelectedCategory(button.value);
                                setPage(1); // 페이지를 1로 초기화
                            }}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            </header>
            <main className="page-content">
                {loading && <p>데이터를 불러오는 중입니다...</p>}
                {!loading && data.length > 0 && (
                    <div className="recommendation-list">
                        {data.map((item) => (
                            <div key={item.contentid} className="recommendation-item">
                                <button
                                    className="button button--size-m button--text-medium bg-1 button--winona"
                                    onClick={() => {
                                        handleRecommendItemClick(
                                            item.contentid,
                                            item.contenttypeid,
                                            item.title
                                        );
                                    }}
                                >
                                    {item.title}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
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
    );
}



export default LocationComponent;