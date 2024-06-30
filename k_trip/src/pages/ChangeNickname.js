import React, {useEffect, useState} from "react";
import "../styles/change-password.css";
import postData from "../postData";
import {useNavigate} from "react-router-dom";
import fetchData from "../fetchData";
import axios from "axios";
import checkTokenValidity from '../CheckToken';
import {BsX} from "react-icons/bs";
import {Button} from "react-bootstrap";
import '../modals/modalStyles/userInfoModal.css'
const ChangeNickname = () => {
    const navigate = useNavigate();
    const [currentNickname, setCurrentNickname] = useState("");
    const [newNickname, setNewNickname] = useState("");
    const [message, setMessage] = useState("");
    const [data, setData] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken') || '');
    // 토큰 시간 유효성 검사 함수
    const [isHovered, setIsHovered] = useState(false); // 마우스 호버 여부 상태


    useEffect(() => {
        fetchData('mypage', setData, setError, setLoading, {});
    }, []);
    useEffect(() => {
        // Ensure data is not empty and has the nickname field
        checkTokenValidity();
        if (data && data.nickname) {
            setCurrentNickname(data.nickname);
        }
    }, [data]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const params = {
            currentNickname: currentNickname,
            newNickname: newNickname
        };

        const responseData = await postData('mypage/nickname', setLoading, setError, params);
        if (responseData.error) {
            alert('이미 존재하는 닉네임입니다.');
        }
        else {
            navigate('/mypage'); // 로그인 성공 시 '/' 경로로 이동
        }

    };

    const handleCloseSignup = () => {
        navigate('/MyPage');
    };

    return (
        <div className="user-container">
            <div className="user-header">
            <h2 className="cp-title">닉네임 변경</h2>
            <Button
                variant="link"
                className="close"
                onClick={handleCloseSignup}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    transition: 'transform 0.3s',
                    transform: isHovered ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
            >
                <BsX className="icon" style={{ fontSize: '24px' }} />
            </Button>
            </div>
            <form className="cp-form" onSubmit={handleSubmit}>
                <div>
                    <label className="cp-label">현재 닉네임: {currentNickname}</label>

                </div>
                <div>
                    <label className="cp-label">새 닉네임:</label>
                    <input
                        type="text"
                        className="cp-input"
                        value={newNickname}
                        onChange={(e) => setNewNickname(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="cp-button">
                    닉네임 변경하기
                </button>
            </form>

        </div>
    );
};

export default ChangeNickname;
