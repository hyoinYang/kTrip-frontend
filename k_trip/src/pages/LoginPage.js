import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 임포트
import postData from "../postData"; // postData 함수 임포트
import '../css/LoginPage.css';
import naverLoginBtn from '../image/btnG_완성형.png';
import fetchData from "../fetchData";
import TokenSetter from "./TokenSetter";
import { Button } from 'react-bootstrap'; // React Bootstrap에서 Button 컴포넌트 임포트
import { BsX } from 'react-icons/bs'; // Bootstrap Icons에서 X 아이콘 임포트
import '../modals/modalStyles/userInfoModal.css'



function LoginPage(){
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isValid, setIsValid] = useState(null);
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [isHovered, setIsHovered] = useState(false); // 마우스 호버 여부 상태
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            alert('이미 로그인 되어있습니다.');
            navigate('/');
        } else {
            setIsValid(false);
        }
    }, [navigate]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const params = {
            id: id,
            password: password
        };

        const responseData = await postData('signIn', setLoading, setError, params);
        if (responseData.error) {
            alert('로그인 실패');
        }
        else {
            navigate('/'); // 로그인 성공 시 '/' 경로로 이동
            window.location.reload();
        }
    };
    const handleNaverLogin = (event) => {
        event.preventDefault();
        window.location.href = 'http://localhost:8080/login/oauth2';
    };

    const handleCloseSignup = () => {
        navigate('/');
    };

    return (
        <div className="user-container">
            <div className="user-header">
                <h2 className="login-title">Login</h2>
                {/* X 아이콘을 우측 상단에 위치시킨 닫기 버튼 */}
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
            {!isValid && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            value={id}
                            className="login-input"
                            placeholder="아이디"
                            onChange={(e) => setId(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            className="login-input"
                            placeholder="비밀번호"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        로그인
                    </button>
                </form>
            )}
            <button type="submit" className="login-button" disabled={loading} onClick={handleNaverLogin}>
                <img src={naverLoginBtn} className="naver-login-button" />
            </button>
        </div>
    );
};

export default LoginPage;