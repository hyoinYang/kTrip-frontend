import axios from "axios";

const postReviewData = async (reviewData) => {
    try {
        const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

        const response = await axios.post(
            "http://localhost:8080/reviews/write" ,
            reviewData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "여기에 토큰 넣으면 동작"

                }
            }
        );
        return response.data; // 요청이 성공하면 서버에서 받은 데이터를 반환
    } catch (error) {
        throw error; // 요청이 실패하면 에러를 던짐
    }
};

export default postReviewData;
