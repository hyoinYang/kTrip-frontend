import React, { useState } from "react";
import "./styles/Login.css";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Logged In:", formData);

    // post_url에 맞게 서버에 fetch 한다.
    const post_url = ""; // post_url에 POST할 url을 입력한다.
    fetch(post_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
      console.log("Successfully posted");
    });
  };

  const handleSignup = () => {
    alert("Redirect to signup page");
    // Add the logic to redirect to the signup page
  };

  const handleFindPassword = () => {
    alert("Redirect to find password page");
    // Add the logic to redirect to the find password page
  };

  const handleCloseSignup = () => {
    alert("Close signup button clicked");
    // Add logic to close signup modal or perform other actions
  };

  return (
    <div className="login-container">
      <h2 className="login-title">K-trip 로그인</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="login-label">
          ID
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="login-input"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password" className="login-label">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="login-input"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="login-button">
          로그인
        </button>
      </form>
      <button onClick={handleSignup} className="login-secondary-button">
        회원가입
      </button>
      <button onClick={handleFindPassword} className="login-secondary-button">
        비밀번호 찾기
      </button>
      {/* X 아이콘을 포함한 닫기 버튼 */}
      <IconButton onClick={handleCloseSignup} className="close-button">
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default Login;
