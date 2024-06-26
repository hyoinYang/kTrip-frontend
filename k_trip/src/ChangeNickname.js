import React, { useState } from "react";
import "./styles/change-nickname.css";

const ChangeNickname = () => {
  const [newNickname, setNewNickname] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/mypage/nickname", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newNickname }),
      });

      if (response.ok) {
        setMessage("닉네임이 성공적으로 변경되었습니다.");
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "닉네임 변경에 실패했습니다.");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("닉네임 변경 중 오류가 발생했습니다.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="cn-container">
      <h2 className="cn-title">닉네임 변경</h2>
      <form className="cn-form" onSubmit={handleSubmit}>
        <div>
          <label className="cn-label">새 닉네임:</label>
          <input
            type="text"
            className="cn-input"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="cn-button">
          닉네임 변경하기
        </button>
      </form>
      {message && (
        <p className={`cn-message ${isSuccess ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ChangeNickname;
