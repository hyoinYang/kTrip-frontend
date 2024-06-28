import React, { useState } from 'react';
import axios from 'axios';
import postData from "../postData";
import {useNavigate} from "react-router-dom";
import '../css/SignUpPage.css';
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
    const navigate = useNavigate(); // useNavigate 훅 사용
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const responseData = await postData('signUp', setLoading, formData);
            console.log('SignUp successful:', responseData);
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="register-container">
            <h2 className="register-title">K-Trip 회원 가입</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="id" className="register-label register-input" value={formData.id} onChange={handleChange} placeholder="아이디" required />
                <input type="text" name="name" className="register-label register-input" value={formData.name} onChange={handleChange} placeholder="이름" required />
                <input type="text" name="nickname" className="register-label register-input" value={formData.nickname} onChange={handleChange} placeholder="닉네임" required />
                <input type="password" name="password" className="register-label register-input" value={formData.password} onChange={handleChange} placeholder="비밀번호" required />
                <input type="email" name="email" className="register-label register-input" value={formData.email} onChange={handleChange} placeholder="이메일" required />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default SignUpPage;
