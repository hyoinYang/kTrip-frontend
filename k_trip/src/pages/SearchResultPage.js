import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetchData from "../fetchData";

function SearchResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('q'); // URL 쿼리 파라미터에서 검색어 추출
    const [page, setPage] = useState(1); // 페이지 초기값 설정
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [inputValue, setInputValue] = useState(page);

    useEffect(() => {
        if (keyword) {
            getSearchKeyword(page);
            setInputValue(page); // 페이지 값과 input 값 동기화
        }
    }, [keyword, page]);

    const getSearchKeyword = (pageno) => {
        setLoading(true);
        fetchData('trip/search', (response) => {
            setTotalCount(response[0]);
            setItemsPerPage(response[1]);
            setData(response.slice(2));
            setLoading(false);
        }, setError, setLoading, { keyword, pageno });
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

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
                    onClick={() => handlePageClick(i)}
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

    const handleSearchItemClick = (contentid, contenttypeid, title) => {
        navigate(`/spotinfo?cid=${contentid}&ctypeid=${contenttypeid}&title=${title}`);
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
        setInputValue(pageNumber);

        // URL 업데이트
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('page', pageNumber.toString());
        navigate(`/trip/search?q=${encodeURIComponent(keyword)}&page=${pageNumber}`);
    };

    const handlePageInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handlePageInputBlur = () => {
        let parsedValue = parseInt(inputValue, 10); // 정수로 변환
        let pageNumber = Math.min(totalPages, Math.max(1, parsedValue));

        if (parsedValue < 1 || parsedValue > totalPages) {
            alert(`페이지는 1에서 ${totalPages} 사이의 값을 가져야 합니다.`);
            // 입력이 잘못된 경우 현재 페이지로 다시 설정
            pageNumber = page;
        }

        setPage(pageNumber);
        setInputValue(pageNumber);

        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('page', pageNumber.toString());
        navigate(`/trip/search?q=${encodeURIComponent(keyword)}&page=${pageNumber}`);
    };

    const handlePageInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            let parsedValue = parseInt(inputValue, 10); // 정수로 변환
            let pageNumber = Math.min(totalPages, Math.max(1, parsedValue));

            if (parsedValue < 1 || parsedValue > totalPages) {
                alert(`페이지는 1에서 ${totalPages} 사이의 값을 가져야 합니다.`);
                // 입력이 잘못된 경우 현재 페이지로 다시 설정
                pageNumber = page;
            }

            setPage(pageNumber);
            setInputValue(pageNumber);

            const newSearchParams = new URLSearchParams(location.search);
            newSearchParams.set('page', pageNumber.toString());
            navigate(`/trip/search?q=${encodeURIComponent(keyword)}&page=${pageNumber}`);
        }
    };

    return (
        <div className="recommend-page">
            <main className="page-content">
                {error && <p>입력한 값에 해당하는 정보가 없습니다.</p>}
                {!loading && data.length === 0 && <p>검색 결과가 없습니다.</p>}
                {!loading && !error && data.length > 0 && (
                    <div className="recommendation-list">
                        {data.map((item) => (
                            <div key={item.contentid} className="recommendation-item">
                                <button
                                    className="button button--size-m button--text-medium bg-1 button--winona"
                                    onClick={() => {
                                        handleSearchItemClick(item.contentid, item.contenttypeid, item.title);
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
                                <button onClick={() => handlePageClick(1)}>맨 앞으로</button>
                                <button onClick={() => handlePageClick(page - 1)}>이전</button>
                            </>
                        )}
                        {renderPageNumbers()}
                        {page < totalPages && (
                            <>
                                <button onClick={() => handlePageClick(page + 1)}>다음</button>
                                <button onClick={() => handlePageClick(totalPages)}>맨 뒤로</button>
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

export default SearchResultPage;
