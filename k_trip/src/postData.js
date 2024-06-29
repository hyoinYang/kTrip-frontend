import axios from 'axios';

const baseURL = 'http://localhost:8080/';

const postData = async (endpoint, setLoading, setError, params) => {
    try {
        setLoading(true);
        setError(false);
        const url = `${baseURL}${endpoint}`;
        console.log(url);
        console.log(params);
        let response;
        if (endpoint === 'signIn' || endpoint === 'signUp') {
            response = await axios.post(url, params, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else if (endpoint.startsWith('mypage') || endpoint.startsWith('favorite')) {
            const accessToken = localStorage.getItem('accessToken');
            response = await axios.post(url, params, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`
                }
            });
        } else {
            response = await axios.post(url, null, {
                params: params
            });
        }

        console.log('Response:', response.data);

        if (endpoint === 'signIn') {
            const accessToken = response.headers['authorization'];
            if (accessToken) {
                const currentTime = new Date().getTime();
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('tokenIssueTime', currentTime);
            }
        }

        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        setError(true);
        return { error: true }; // 에러 발생 시 반환 값에 에러 표시
    } finally {
        setLoading(false);
    }
};

export default postData;
