import axios from 'axios';

const baseURL = 'http://localhost:8080/';

const fetchData = async (endpoint, setData, setError, setLoading, params) => {
    try {
        setError(null);
        setLoading(true);
        if(endpoint === 'signIn' || endpoint.startsWith('mypage') || endpoint.startsWith('favorite')){

            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get(`${baseURL}${endpoint}`, {
                params,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken ? `${accessToken}` : ''
                },
                withCredentials: true
            });
            const dataArray = response.data;
            setData(dataArray);
            return response;
        }
        else if(endpoint === 'signUp/valid'){
            const response = await axios.get(`${baseURL}${endpoint}`, { params });
            const status = response.status;
            return status;
        }

        else{
            const response = await axios.get(`${baseURL}${endpoint}`, { params });
            const dataArray = response.data;
            setData(dataArray);
        }

    } catch (error) {
        setError(error);
    } finally {
        setLoading(false);
    }
};

export default fetchData;
