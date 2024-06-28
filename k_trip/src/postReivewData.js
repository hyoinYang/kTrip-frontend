import axios from "axios";

const postReviewData = async (reviewData) => {
  try {
    // writepro는 리뷰 작성 결과를 DB에 넣는 역할.
    const response = await axios.post(
      "http://localhost:8080/writepro",
      reviewData
    );
    return response.data; // 요청이 성공하면 서버에서 받은 데이터를 반환
  } catch (error) {
    throw error; // 요청이 실패하면 에러를 던짐
  }
};

export default postReviewData;
