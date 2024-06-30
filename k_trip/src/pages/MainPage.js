import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/searchIcon.css';



function MainPage() {

    const navigate = useNavigate();

    const handleSearchSubmit = (event) => {
        event.preventDefault(); // 기본 제출 동작 방지
        const formData = new FormData(event.target);
        const keyword = formData.get('keyword'); // 폼 데이터에서 검색어 추출
        navigate(`/trip/search?q=${encodeURIComponent(keyword)}&page=1`);
    };

    return (
        <div className="main-page">
            <h1 className="main-title">Welcome to K-Trip!</h1>
            <p className="main-subtitle">Discover your next travel adventure.</p>

            {/* 검색 폼 */}
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                    type="text"
                    name="keyword"
                    placeholder="Search for your destination..."
                    // className="search-input"
                    className="form-control me-2 search-input"
                />
            </form>

        </div>
    );
}
export default MainPage;
