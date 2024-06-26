import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/my-page.css";
import MyPageReviewItem from "./MyPageReviewItem";

const MyPage = () => {
  const navigate = useNavigate();
  const handleChangeNickname = () => {
    return navigate("/mypage/nickname");
  };

  const reviews = [
    {
      id: 1,
      name: "John",
      rating: 4,
      comment: "Great place!",
      date: "2024.01.01",
    },
    {
      id: 2,
      name: "Alice",
      rating: 5,
      comment: "Wonderful experience!",
      date: "2024.01.02",
    },
    {
      id: 3,
      name: "Bob",
      rating: 3,
      comment: "Okay, but could be better.",
      date: "2024.01.03",
    },
    {
      id: 4,
      name: "John",
      rating: 3,
      comment: "Perfect!",
      date: "2024.01.05",
    },
  ];

  return (
    <>
      <div className="mypage-container">
        <div className="my-info-container">
          <span className="my-info-title top-title">내 정보</span>
          <span className="user-nickname">nickname 님</span>
          <span className="user-email">abcd@naver.com</span>
          <button
            className="change-user-info-btn"
            onClick={handleChangeNickname}
          >
            닉네임 변경
          </button>
          <a className="change-password-btn" href="/mypage/password">
            패스워드 재설정
          </a>
        </div>
        <div className="my-review-container">
          <span className="my-review-title top-title">내가 쓴 후기</span>
          {reviews.map((review) => (
            <MyPageReviewItem
              key={review.id}
              name={review.name}
              rating={review.rating}
              comment={review.comment}
              date={review.date}
            />
          ))}
        </div>
        <div className="saved-loc-container">
          <span className="my-loc-title top-title">저장한 여행지</span>
        </div>
      </div>
    </>
  );
};

export default MyPage;
