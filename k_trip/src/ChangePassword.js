import React, { useState } from "react";
import "./styles/change-password.css";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    // Add your password change logic here (e.g., API call)
    setMessage("비밀번호가 성공적으로 변경되었습니다.");
  };

  return (
    <div className="cp-container">
      <h2 className="cp-title">비밀번호 변경</h2>
      <form className="cp-form" onSubmit={handleSubmit}>
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
        <p
          className={`cp-message ${
            newPassword !== confirmPassword ? "error" : "success"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ChangePassword;
