import axios from 'axios';

const baseURL = 'http://localhost:8080/';

const fetchData = async (endpoint, setData, setError, setLoading, params) => {
    try {
        setError(null);
        setLoading(true);
        if(endpoint === 'signIn' || endpoint === 'mypage'){
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
            setData(dataArray); // 상태 업데이트
        }
        else{
            const response = await axios.get(`${baseURL}${endpoint}`, { params });
            // Assuming the array you need is in response.data
            const dataArray = response.data;
            setData(dataArray); // Update the state with the fetched data
            console.log(dataArray);
        }

    } catch (error) {
        setError(error);
    } finally {
        setLoading(false);
    }
};
const accessToken = document.Authorization
export default fetchData;
