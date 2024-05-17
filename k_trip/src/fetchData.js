import axios from "axios";

const fetchData = async (URL, setData, setError, setLoading, areaCode) => {
    try {
        setError(null);
        setData(null);
        setLoading(true);

        const params = {
            numOfRows:'50',
            MobileOS: 'WIN',
            MobileApp: 'K-trip',
            _type: 'json',
            serviceKey: '본인의 서비스키 입력'
        };

        if (areaCode) {
            params.areaCode = areaCode;
        }
        const response = await axios.get(URL, { params });

        const dataArray = Object.values(response.data.response.body.items.item);
        setData(dataArray);
        console.log(dataArray);
    } catch(e) {
        setError(e);
    }
    setLoading(false);
};

export default fetchData;
