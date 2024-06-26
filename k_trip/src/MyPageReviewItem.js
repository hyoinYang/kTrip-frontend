import React from "react";
import "./styles/my-page-review-item.css";

const MyPageReviewItem = ({ name, rating, comment, date }) => {
  return (
    <div className="review-section">
      <div className="comment-part">
        <p>
          <strong>{name}</strong> ({rating}/5): {comment}
        </p>
      </div>
      <div className="control-part">
        <span className="date-info">{date}</span>
        <button className="edit-btn">수정</button>
        <button className="delete-btn">삭제</button>
      </div>
    </div>
  );
};

export default MyPageReviewItem;
