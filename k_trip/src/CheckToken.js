// CheckToken.js
import axios from 'axios';

const checkTokenValidity = async (authToken) => {
    const tokenIssueTime = localStorage.getItem('tokenIssueTime');
    if (tokenIssueTime) {
        const currentTime = new Date().getTime();
        const timeDifference = (currentTime - tokenIssueTime) / 1000;
        if (timeDifference > 50*60) { //테스트 하기 위해서 15로 변경하면 15초 이후 다시 로그인하게 설정됩니ㅏㅇ 지금은 50분
            try {
                await axios.post('http://localhost:8080/logout', {}, {
                    headers: {
                        Authorization: `${authToken}`
                    }
                });
            } catch (error) {
                console.error('로그아웃 요청 실패', error);
            } finally {
                window.location.href = 'http://localhost:3000/login';
            }
            return false;
        }
    }
    return true;
};

export default checkTokenValidity;
