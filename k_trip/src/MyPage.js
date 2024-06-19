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
      </div>
      <div className="saved-loc-container">
        <span className="my-loc-title top-title">저장한 여행지</span>
      </div>
    </div>
  );
};

export default MyPage;
