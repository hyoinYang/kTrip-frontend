import "./styles/my-page.css";

const MyPage = () => {
  return (
    <div className="mypage-container">
      <div className="my-info-container">
        <span className="my-info-title top-title">내 정보</span>
        <div className="profile-photo"></div>
        <span className="user-nickname">nickname 님</span>
        <span className="user-email">abcd@naver.com</span>
        <button className="change-user-info-btn">내 정보 변경</button>
        <a href="#">패스워드 재설정</a>
      </div>
      <div className="my-review-container">
        <span className="my-review-title top-title">내가 쓴 후기</span>
        <div className="review-section">
          <div className="comment-part">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam
            ligula, consectetur vitae est ac, euismod porttitor turpis.
            Pellentesque sagittis nisi nec cursus fermentum.{" "}
          </div>
          <div className="control-part">
            <span className="date-info">2024.01.01</span>
            <button className="edit-btn">수정</button>
            <button className="delete-btn">삭제</button>
          </div>
        </div>

        <div className="review-section">
          <div className="comment-part">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam
            ligula, consectetur vitae est ac, euismod porttitor turpis.
            Pellentesque sagittis nisi nec cursus fermentum.{" "}
          </div>
          <div className="control-part">
            <span className="date-info">2024.01.01</span>
            <button className="edit-btn">수정</button>
            <button className="delete-btn">삭제</button>
          </div>
        </div>
      </div>
      <div className="saved-loc-container">
        <span className="my-loc-title top-title">저장한 여행지</span>
      </div>
    </div>
  );
};

export default MyPage;
