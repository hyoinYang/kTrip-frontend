import React, {useEffect, useState} from 'react';
import axios from 'axios';
import postData from "../postData";
import {useNavigate} from "react-router-dom";
import '../css/SignUpPage.css';
import '../css/SignUpPage.css';
import naverLoginBtn from '../image/btnG_완성형.png';
import '../css/button.css'
import { useHistory } from "react-router-dom";
import {BsX} from "react-icons/bs";
import {Button} from "react-bootstrap";
function SignUpPage(){
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        nickname: '',
        password: '',
        email: ''
    });
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [isHovered, setIsHovered] = useState(false); // 마우스 호버 여부 상태


    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const responseData = await postData('signUp', setLoading, setError, formData);
            console.log('SignUp successful:', responseData);
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleNaverLogin = (event) => {
        event.preventDefault();
        // 네이버 로그인 페이지로 리다이렉트
        window.location.href = 'http://localhost:8080/login/oauth2';
        navigate('/')
    };

    const handleCloseSignup = () => {
        navigate('/');
    };
    return (
        <div className="register-container">
            <h2 className="register-title">K-Trip 회원 가입</h2>
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
            <form onSubmit={handleSubmit}>
                <input type="text" name="id" className="register-label register-input" value={formData.id} onChange={handleChange} placeholder="아이디" required />
                <input type="text" name="name" className="register-label register-input" value={formData.name} onChange={handleChange} placeholder="이름" required />
                <input type="text" name="nickname" className="register-label register-input" value={formData.nickname} onChange={handleChange} placeholder="닉네임" required />
                <input type="password" name="password" className="register-label register-input" value={formData.password} onChange={handleChange} placeholder="비밀번호" required />
                <input type="email" name="email" className="register-label register-input" value={formData.email} onChange={handleChange} placeholder="이메일" required />
                <button type="submit">회원가입</button>
            </form>
            <button type="submit" className = "login-button" disabled={loading} onClick={(e) => handleNaverLogin(e)}>
                <img src={naverLoginBtn} className="naver-login-button"/>
            </button>
        </div>
    );
};

export default SignUpPage;
