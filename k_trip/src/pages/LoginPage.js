import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 임포트
import postData from "../postData"; // postData 함수 임포트
import '../css/LoginPage.css';
function LoginPage(){
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const params = {
                id: id,
                password: password
            };

            const responseData = await postData('signIn', setLoading, params);
            console.log('Login successful:', responseData);
            // 리다이렉션 처리
            navigate('/'); // 로그인 성공 시 '/' 경로로 이동
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
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
        </div>
    );
};

export default LoginPage;
