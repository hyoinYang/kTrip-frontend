import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

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

    // 서버 응답 연결
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
      console.log("Successfully posted");
    });
  };

  const navigate = useNavigate();
  const handleSignup = () => {
    return navigate("/signup");
  };

  const handleFindPassword = () => {
    alert("Redirect to find password page");
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
      {/* <button onClick={handleFindPassword} className="login-secondary-button">
        비밀번호 찾기
      </button> */}
      <button onClick={handleSignup} className="login-secondary-button">
        회원가입
      </button>
    </div>
  );
};

export default Login;
