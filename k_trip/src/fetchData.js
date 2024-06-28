import axios from "axios";

const baseURL = "http://localhost:8080/";

const fetchData = async (endpoint, setData, setError, setLoading, params) => {
    try {
        setError(null);
        setLoading(true);

        const response = await axios.get(`${baseURL}${endpoint}`, { params });
        // Assuming the array you need is in response.data
        const dataArray = response.data;
        setData(dataArray); // Update the state with the fetched data
        console.log(dataArray);
    } catch (e) {
        setError(e);
    } finally {
        setLoading(false);
    }
};

export default fetchData;
