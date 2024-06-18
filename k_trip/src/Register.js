import React, { useState } from "react";
import "./styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    nickname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("User Registered:", formData);

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

  return (
    <div className="register-container">
      <h2 className="register-title">K-Trip 회원 가입</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="id" className="register-label">
          아이디
        </label>
        <input
          type="text"
          id="id"
          name="id"
          className="register-input"
          value={formData.id}
          onChange={handleChange}
          required
        />

        <label htmlFor="password" className="register-label">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="register-input"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword" className="register-label">
          비밀번호 확인
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="register-input"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <label htmlFor="name" className="register-label">
          이름
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="register-input"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email" className="register-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="register-input"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="nickname" className="register-label">
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          className="register-input"
          value={formData.nickname}
          onChange={handleChange}
          required
        />

        <button type="submit" className="register-button">
          회원 가입
        </button>
      </form>
    </div>
  );
};

export default Register;
