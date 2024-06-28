import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./my-page.css";
import fetchData from "../fetchData";

function MyPage(){
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChangeNickname = () => {
        return navigate("/mypage/nickname");
    };

    useEffect(() => {
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

        fetchUserData();
    }, [setData, setLoading, setError]); // 상태 변경에 따라 fetchData를 다시 호출

    return (
        <div className="mypage-container">
            <div className="my-info-container">
                <span className="my-info-title top-title">내 정보</span>
                <span className="user-nickname">{data.nickname} 님</span> {/* 예시로 nickname 데이터 표시 */}
                <span className="user-email">{data.email}</span> {/* 예시로 email 데이터 표시 */}
                <button
                    className="change-user-info-btn"
                    onClick={handleChangeNickname}
                >
                    닉네임 변경
                </button>
                <a className="change-password-btn" href="/mypage/password">
                    패스워드 재설정
                </a>
            </div>
            <div className="saved-loc-container">
                <span className="my-loc-title top-title">저장한 여행지</span>
            </div>
        </div>
    );
};

export default MyPage;
