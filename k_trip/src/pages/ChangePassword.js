import React, {useEffect, useState} from "react";
import "../styles/change-password.css";
import postData from "../postData";
import {useNavigate} from "react-router-dom";
import fetchData from "../fetchData";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const params = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };

    const responseData = await postData('mypage/password', setLoading, setError, params);
    if (responseData.error) {
      alert('비밀번호 변경에 실패했습니다. 다시 입력해주세요.');
    }
    else {
      navigate('/mypage'); // 로그인 성공 시 '/' 경로로 이동
    }
  };

  return (
    <div className="cp-container">
      <h2 className="cp-title">비밀번호 변경</h2>
      <form className="cp-form" onSubmit={handleSubmit}>
        <div>
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
