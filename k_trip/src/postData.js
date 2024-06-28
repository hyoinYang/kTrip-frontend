import axios from "axios";

const baseURL = "http://localhost:8080/";

const postData = async (endpoint, setLoading, params) => {
    try {
        const url = `${baseURL}${endpoint}`;
        await axios.post(url, null, {
            params: params
        });
    } finally {
        setLoading(false);
    }
};

export default postData;
