import axios from 'axios';

const baseURL = 'http://localhost:8080/';

const postData = async (endpoint, setLoading, params) => {
    try {
        setLoading(true);
        const url = `${baseURL}${endpoint}`;

        if (endpoint === 'signIn') {
            const response = await axios.post(url, params, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log('Response:', response.data);
            const accessToken = response.headers['authorization'];


            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
            }
        } else if (endpoint === 'signUp') {
            const response = await axios.post(url, params, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log('Response:', response.data);
        } else {
            const response = await axios.post(url, null, {
                params: params
            });
            console.log('Response:', response.data);
        }
    } catch (error) {
        console.error('Error posting data:', error);
    } finally {
        setLoading(false);
    }
};

export default postData;
