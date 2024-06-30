import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/my-page.css";
import fetchData from "../fetchData";

import checkTokenValidity from '../CheckToken.js';
import postData from "../postData";
function MyPage(){
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [myReview, setMyReview] = useState([]);
    const [myFavorite, setMyFavorite] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [valid, setIsValid] = useState(null);



    const handleChangeNicknameClick = () => {
        return navigate("/mypage/nickname");
    };
    const handleChangePasswordClick = () => {
        return navigate("/mypage/password");
    };
    // checkTokenValidity();
    const handleRevDeleteClick = async (rid) => {
        try {
            setLoading(true);
            const response = await postData('mypage/revdelete', setError, setLoading, {rid});
            console.log("Data fetched:", response);
            alert('내가 쓴 리뷰에서 삭제되었습니다.');
            window.location.reload()
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    const handleFavDeleteClick = async (fid) => {
        try {
            setLoading(true);
            const response = await postData('mypage/favdelete',  setError, setLoading, {fid});
            console.log("Data fetched:", response);
            alert('즐겨찾기에서 삭제되었습니다.');
            window.location.reload()
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
            setIsValid(true);
        }
    }, [navigate]);

    useEffect(() => {
        if (valid) {
            const fetchUserData = async () => {
                try {
                    setLoading(true);
                    const response = await fetchData('mypage', setData, setError, setLoading, {});
                    console.log("Data fetched:", response);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };

            const fetchMyReviewData = async () => {
                try {
                    setLoading(true);
                    const response = await fetchData('mypage/review', setMyReview, setError, setLoading, {});
                    console.log("Data fetched:", response);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };
            const fetchMyFavoriteData = async () => {
                try {
                    setLoading(true);
                    const response = await fetchData('mypage/favorite', setMyFavorite, setError, setLoading, {});
                    console.log("Data fetched:", response);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserData();
            fetchMyReviewData();
            fetchMyFavoriteData();
        }
    }, [valid, setData, setLoading, setError, setMyReview]);

    return (
        <div className="mypage-container">
            <div className="my-info-container">
                <span className="my-info-title top-title">내 정보</span>
                <span className="user-nickname">{data.nickname} 님</span> {/* 예시로 nickname 데이터 표시 */}
                <span className="user-email">{data.email}</span> {/* 예시로 email 데이터 표시 */}
                <button
                    className="change-user-info-btn"
                    onClick={() => handleChangeNicknameClick()}
                >
                    닉네임 변경
                </button>
                <a className="change-password-btn" onClick={() => handleChangePasswordClick()}>
                    패스워드 재설정
                </a>
            </div>
            <div className="my-review-container">
                <span className="my-review-title top-title">작성한 리뷰</span>
                {myReview.length > 0 ? (
                    myReview.map((review, index) => (
                        <div className="review-container" key={index}>
                            <div className = "review-info">
                                <span className="review-content">{review.content} </span>
                                <span className="review-date">{review.writedate} </span>
                                <span className="review-point">{review.point}점</span>
                            </div>
                            <button className="delete-btn" onClick={() =>  handleRevDeleteClick(review.rid)}>X</button>
                        </div>
                    ))
                ) : (
                    <span className="no-review-message">작성한 리뷰가 없습니다</span>
                )}
            </div>
            <div className="saved-loc-container">
                <span className="my-loc-title top-title">저장한 여행지</span>
                {myFavorite.length > 0 ? (
                    myFavorite.map((favorite, index) => (
                        <div className="favorite-container" key={index}>
                            <div className = "favorite-info">
                                <span>{favorite.cname}</span>
                                <button className="delete-btn" onClick={() =>  handleFavDeleteClick(favorite.fid)}>X</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className="no-review-message">작성한 리뷰가 없습니다</span>
                )}
            </div>
        </div>
    );
};

export default MyPage;
