import axios from 'axios';

const baseURL = 'http://localhost:8080/';

const postData = async (endpoint, setLoading, setError, params) => {
    try {
        setLoading(true);
        setError(false);
        const url = `${baseURL}${endpoint}`;

        let response;
        if (endpoint === 'signIn' || endpoint === 'signUp') {
            response = await axios.post(url, params, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
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
                localStorage.setItem('accessToken', accessToken);
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
