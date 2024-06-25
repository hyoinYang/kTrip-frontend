import React, { useState, useEffect } from "react";
import fetchData from "../fetchData";

const RecommendPage = ({ areacode, sigungucode, areaname, sigunguname, onItemClick }) => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [inputValue, setInputValue] = useState(1); // Keep track of the input value separately

    useEffect(() => {
        setSelectedCategory(null);
        setData([]);
    }, [areacode, sigungucode]);

    useEffect(() => {
        if (selectedCategory !== null) {
            getAreaBasedList1(selectedCategory, page);
        }
    }, [selectedCategory, page]);

    useEffect(() => {
        setInputValue(page); // Synchronize input value with the page state
    }, [page]);

    const getAreaBasedList1 = (cat1, pageno) => {
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

    const handlePageInputBlur = () => {
        let pageNumber = Math.max(1, Math.min(totalPages, Number(inputValue)));

        if (pageNumber !== inputValue) {
            alert(`페이지는 1에서 ${totalPages} 사이의 값을 가져야 합니다.`);
        }

        setPage(pageNumber);
        setInputValue(pageNumber);
    };

    const handlePageInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            let pageNumber = Math.max(1, Math.min(totalPages, Number(inputValue)));

            if (pageNumber !== inputValue) {
                alert(`페이지는 1에서 ${totalPages} 사이의 값을 가져야 합니다.`);
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
                        <button key={index} onClick={() => {
                            setSelectedCategory(button.value);
                            setPage(1); // 페이지를 1로 초기화
                        }}>
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
                            <div key={item.contentid} className="recommendation-item">
                                <button onClick={() => onItemClick(item.contentid, item.contenttypeid)}>
                                    {item.title}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
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
                        onKeyPress={handlePageInputKeyPress}
                    />
                    <span> / {totalPages}</span>
                </div>
            </footer>
        </div>
    );
};

export default RecommendPage;
