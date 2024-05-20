import axios from "axios";

const fetchData = async (URL, setData, setError, setLoading, areaCode) => {
  try {
    setError(null);
    setData(null);
    setLoading(true);

    const params = {
      numOfRows: "50",
      MobileOS: "WIN",
      MobileApp: "K-trip",
      _type: "json",
      serviceKey:
        "B4FraEdNAEHerMG6ZQUi5OXCzio/QJ4IRx9rOOz7+eiPBh4L8pX4XAygutNaYnOoL+D8vS/3qZ53efN6daHZ/g==",
    };

    if (areaCode) {
      params.areaCode = areaCode;
    }
    const response = await axios.get(URL, { params });

    const dataArray = Object.values(response.data.response.body.items.item);
    setData(dataArray);
    console.log(dataArray);
  } catch (e) {
    setError(e);
  }
  setLoading(false);
};

export default fetchData;
