import React, { useState } from "react";
import axios from "axios";
import postData from "../postData";
import { useNavigate } from "react-router-dom";
import "../css/SignUpPage.css";
import fetchData from "../fetchData";
function SignUpPage() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    nickname: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [idValid, setIdValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "id") {
      setIdValid(false);
    } else if (name === "nickname") {
      setNicknameValid(false);
    } else if (name === "email") {
      setEmailValid(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(idValid, nicknameValid, emailValid);
    if (idValid && nicknameValid && emailValid) {
      try {
        setLoading(true);
        const responseData = await postData(
          "signUp/request",
          setLoading,
          setError,
          formData
        );
        console.log(formData);
        console.log("SignUp successful:", responseData);
        alert("회원가입이 완료되었습니다.");
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
      }
    } else if (idValid === false) {
      alert("아이디 중복 확인이 필요합니다.");
    } else if (nicknameValid === false) {
      alert("닉네임 중복 확인이 필요합니다.");
    } else if (emailValid === false) {
      alert("이메일 중복 확인이 필요합니다.");
    }
  };
  const handleIdCheck = async () => {
    try {
      setLoading(true);
      const response = await fetchData(
        "signUp/valid",
        null,
        setLoading,
        setError,
        { id: `${formData.id}` }
      );
      if (response === 200) {
        if (formData.id == "") {
          setIdValid(false);
          alert("유효한 ID를 입력하세요.");
        } else {
          setIdValid(true);
          alert("사용 가능한 아이디입니다.");
        }
      } else if (response !== 200) {
        setIdValid(false);
        alert("이미 존재하는 아이디입니다.");
      }
    } catch (error) {
      console.error("Error checking ID:", error);
    }
  };

  const handleNicknameCheck = async () => {
    try {
      setLoading(true);
      const response = await fetchData(
        "signUp/valid",
        null,
        setLoading,
        setError,
        { nickname: `${formData.nickname}` }
      );
      console.log(response);
      if (response === 200) {
        if (formData.nickname == "") {
          setIdValid(false);
          alert("유효한 닉네임을 입력하세요.");
        } else {
          setNicknameValid(true);
          alert("사용 가능한 닉네임입니다.");
        }
      } else if (response !== 200) {
        setNicknameValid(false);
        alert("이미 존재하는 닉네임입니다.");
      }
    } catch (error) {
      console.error("Error checking Nickname:", error);
    }
  };
  const handleEmailCheck = async () => {
    try {
      setLoading(true);
      const response = await fetchData(
        "signUp/valid",
        null,
        setLoading,
        setError,
        { email: `${formData.email}` }
      );
      console.log(response);
      if (response === 200) {
        if (formData.email == "") {
          setIdValid(false);
          alert("유효한 이메일을 입력하세요.");
        } else {
          setEmailValid(true);
          alert("사용 가능한 이메일입니다.");
        }
      } else if (response !== 200) {
        setEmailValid(false);
        alert("이미 존재하는 이메일입니다.");
      }
    } catch (error) {
      console.error("Error checking Email:", error);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">K-Trip 회원 가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="duplicate-group">
          <input
            type="text"
            name="id"
            className="register-label register-input"
            value={formData.id}
            onChange={handleChange}
            placeholder="아이디"
            required
          />
          <button
            type="button"
            className="check-duplicate-button"
            onClick={handleIdCheck}
          >
            중복 확인
          </button>
        </div>
        <input
          type="text"
          name="name"
          className="register-label register-input nickname-input"
          value={formData.name}
          onChange={handleChange}
          placeholder="이름"
          required
        />
        <div className="duplicate-group">
          <input
            type="text"
            name="nickname"
            className="register-label register-input"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임"
            required
          />
          <button
            type="button"
            className="check-duplicate-button"
            onClick={handleNicknameCheck}
          >
            중복 확인
          </button>
        </div>
        <input
          type="password"
          name="password"
          className="register-label register-input password-input"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          required
        />
        <div className="duplicate-group">
          <input
            type="email"
            name="email"
            className="register-label register-input"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일"
            required
          />
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
    </div>
  );
}

export default SignUpPage;
