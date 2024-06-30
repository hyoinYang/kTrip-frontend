import React, {useEffect, useState} from 'react';
import axios from 'axios';
import postData from "../postData";
import {useNavigate} from "react-router-dom";
import '../css/SignUpPage.css';
import naverLoginBtn from '../image/btnG_완성형.png';
import '../css/button.css'
import { useHistory } from "react-router-dom";
import {BsX} from "react-icons/bs";
import {Button} from "react-bootstrap";

import fetchData from "../fetchData";

function SignUpPage(){
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        nickname: '',
        password: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [idValid, setIdValid] = useState(false);
    const [nicknameValid, setNicknameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [isHovered, setIsHovered] = useState(false); // 마우스 호버 여부 상태


    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'id') {
            setIdValid(false);
        }
        else if (name === 'nickname') {
            setNicknameValid(false);
        }
        else if (name === 'email') {
            setEmailValid(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(idValid, nicknameValid, emailValid);
        if(idValid && nicknameValid && emailValid){
            try {
                setLoading(true);
                const responseData = await postData('signUp/request', setLoading, setError, formData);
                console.log(formData);
                console.log('SignUp successful:', responseData);
                alert("회원가입이 완료되었습니다.");
                navigate('/');
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else if(idValid === false){
            alert('아이디 중복 확인이 필요합니다.');
        }
        else if(nicknameValid === false){
            alert('닉네임 중복 확인이 필요합니다.');
        }
        else if(emailValid === false){
            alert('이메일 중복 확인이 필요합니다.');
        }
    };
//<<<<<<< HEAD

    const handleNaverLogin = (event) => {
        event.preventDefault();
        // 네이버 로그인 페이지로 리다이렉트
        window.location.href = 'http://localhost:8080/login/oauth2';
        // navigate('/')
    };

    const handleCloseSignup = () => {
        navigate('/');
    };
//=======
    const handleIdCheck = async () => {
        try {
            setLoading(true);
            const response = await fetchData('signUp/valid',null, setLoading, setError, {id : `${formData.id}`})
            if (response === 200) {
                setIdValid(true);
                alert('사용 가능한 아이디입니다.');
            } else if (response !== 200) {
                setIdValid(false);
                alert('이미 존재하는 아이디입니다.');
            }
        } catch (error) {
            console.error('Error checking ID:', error);
        }
    };

    const handleNicknameCheck = async () => {
        try {
            setLoading(true);
            const response = await fetchData('signUp/valid', null, setLoading, setError, {nickname : `${formData.nickname}`})
            console.log(response);
            if (response === 200) {
                setNicknameValid(true);
                alert('사용 가능한 닉네임입니다.');
            } else if (response !== 200) {
                setNicknameValid(false);
                alert('이미 존재하는 닉네임입니다.');
            }
        } catch (error) {
            console.error('Error checking Nickname:', error);
        }
    };
    const handleEmailCheck = async () => {
        try {
            setLoading(true);
            const response = await fetchData('signUp/valid', null, setLoading, setError, {email : `${formData.email}`})
            console.log(response);
            if (response === 200) {
                setEmailValid(true);
                alert('사용 가능한 이메일입니다.');
            } else if (response !== 200) {
                setEmailValid(false);
                alert('이미 존재하는 이메일입니다.');
            }
        } catch (error) {
            console.error('Error checking Email:', error);
        }
    };

// >>>>>>> upstream/navbar&loadAPI&kakaomap-jinyoung
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
                <div className="duplicate-group">
                    <input type="text" name="id" className="register-label register-input" value={formData.id} onChange={handleChange} placeholder="아이디" required />
                    <button
                        type="button"
                        className="check-duplicate-button"
                        onClick={handleIdCheck}
                    >
                        중복 확인
                    </button>
                </div>
                <input type="text" name="name" className="register-label register-input" value={formData.name} onChange={handleChange} placeholder="이름" required />
                <div className="duplicate-group">
                    <input type="text" name="nickname" className="register-label register-input" value={formData.nickname} onChange={handleChange} placeholder="닉네임" required />
                    <button
                        type="button"
                        className="check-duplicate-button"
                        onClick={handleNicknameCheck}
                    >
                        중복 확인
                    </button>
                </div>
                <input type="password" name="password" className="register-label register-input" value={formData.password} onChange={handleChange} placeholder="비밀번호" required />
                <div className="duplicate-group">
                    <input type="email" name="email" className="register-label register-input" value={formData.email} onChange={handleChange} placeholder="이메일" required />
                    <button
                        type="button"
                        className="check-duplicate-button"
                        onClick={handleEmailCheck}
                    >
                        중복 확인
                    </button>
                </div>
                <button type="submit">회원가입</button>
            </form>
            <button type="submit" className = "login-button" disabled={loading} onClick={(e) => handleNaverLogin(e)}>
                <img src={naverLoginBtn} className="naver-login-button"/>
            </button>
        </div>
    );
};

export default SignUpPage;
