import React, { useState, useEffect } from "react";
import fetchData from "../fetchData";
import "../css/button.css";
import { useLocation, useNavigate } from "react-router-dom";

function RecommendPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const areacode = searchParams.get('areacode');
    const areaname = searchParams.get('areaname');
    const sigungucode = searchParams.get('sigungucode');
    const sigunguname = searchParams.get('sigunguname');
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [inputValue, setInputValue] = useState(1);

    useEffect(() => {
        console.log(areacode, areaname, sigungucode, sigunguname);
        setSelectedCategory(null);
        setData([]);
    }, [areacode, sigungucode]);

    useEffect(() => {
        if (selectedCategory !== null) {
            getAreaBasedList(selectedCategory, page);
        }
    }, [selectedCategory, page]);

    useEffect(() => {
        setInputValue(page); // Synchronize input value with the page state
    }, [page]);

    const getAreaBasedList = (cat1, pageno) => {
        setLoading(true);
        fetchData('trip/recommend', (response) => {
            setTotalCount(response[0]);
            setItemsPerPage(response[1]);
            setData(response.slice(2));
            setLoading(false);
        }, setError, setLoading, { areacode, sigungucode, pageno, cat1 });
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const buttons = [
        { label: "자연", value: "A01" },
        { label: "인문", value: "A02" },
        { label: "레포츠", value: "A03" },
        { label: "쇼핑", value: "A04" },
        { label: "음식", value: "A05" },
        { label: "숙박", value: "B02" },
        { label: "추천 코스", value: "C01" }
    ];

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
                    className={page === i ? 'active' : ''}
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

    const handlePageInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleRecommendItemClick = (contentid, contenttypeid, title) => {
        navigate(`/spotinfo?cid=${contentid}&ctypeid=${contenttypeid}&title=${title}`);
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
        if (e.key === 'Enter') {
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
                <h1>{`${areaname} ${sigunguname}`}</h1>
                <div className="button-row">
                    {buttons.map((button, index) => (
                        <button key={index}
                                className="button button--size-m button--text-medium bg-1 button--winona"
                                onClick={() => {
                                    setSelectedCategory(button.value);
                                    setPage(1); // 페이지를 1로 초기화
                                }}>
                            {button.label}
                        </button>
                    ))}
                </div>
            </header>
            <main className="page-content">
                {loading && <p>데이터를 불러오는 중입니다...</p>}
                {!loading && data.length === 0 && selectedCategory && <p>선택한 카테고리에 대한 검색 결과가 없습니다.</p>}
                {!loading && data.length === 0 && !selectedCategory && <p>카테고리를 선택해주세요.</p>}
                {!loading && data.length > 0 && (
                    <div className="recommendation-list">
                        {data.map((item) => (
                            <div key={item.contentid} className="recommendation-item">
                                <button
                                    className="button button--size-m button--text-medium bg-1 button--winona"
                                    onClick={() => {
                                        handleRecommendItemClick(item.contentid, item.contenttypeid, item.title);
                                    }}>
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
                                <button onClick={() => setPage(1)}>맨 앞으로</button>
                                <button onClick={() => setPage(page - 1)}>이전</button>
                            </>
                        )}
                        {renderPageNumbers()}
                        {page < totalPages && (
                            <>
                                <button onClick={() => setPage(page + 1)}>다음</button>
                                <button onClick={() => setPage(totalPages)}>맨 뒤로</button>
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

export default RecommendPage;
