import React, { useEffect, useState } from "react";
import "../styles/change-password.css";
import postData from "../postData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import checkTokenValidity from '../CheckToken';
import {BsX} from "react-icons/bs";
import {Button} from "react-bootstrap";
import '../css/button.css';
import '../modals/modalStyles/userInfoModal.css';
const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken') || '');

  // 토큰 시간 유효성 검사 함수
  const [isHovered, setIsHovered] = useState(false); // 마우스 호버 여부 상태

  // 컴포넌트가 마운트될 때 토큰 유효성 검사
  useEffect(() => {
    checkTokenValidity();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setMessage('새 비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    const params = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };

    const responseData = await postData('mypage/password', setLoading, setError, params);
    if (responseData.error) {
      alert('비밀번호 변경에 실패했습니다. 다시 입력해주세요.');
    } else {
      navigate('/mypage'); // 비밀번호 변경 성공 시 '/mypage' 경로로 이동
    }
  };

  const handleCloseSignup = () => {
    navigate('/MyPage');
  };

  return (
      <div className="user-container">
        <div className="user-header">
          <h2 className="cp-title">비밀번호 변경</h2>
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
            <label className="cp-label">현재 비밀번호:</label>
            <input
                type="password"
                className="cp-input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
            />
          </div>
          <div>
            <label className="cp-label">새 비밀번호:</label>
            <input
                type="password"
                className="cp-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
          </div>
          <div>
            <label className="cp-label">새 비밀번호 확인:</label>
            <input
                type="password"
                className="cp-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
          </div>
          <button type="submit" className="cp-button">
            비밀번호 변경하기
          </button>
        </form>
        {message && (
            <p className={`cp-message ${error ? "error" : "success"}`}>
              {message}
            </p>
        )}
      </div>
  );
};

export default ChangePassword;
