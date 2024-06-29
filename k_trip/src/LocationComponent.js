import React, {useEffect, useState} from 'react';
import fetchData from "./fetchData";
import SpotInfoPage from "./pages/SpotInfoPage";
import RecommendPage from "./pages/RecommendPage";
import {useNavigate} from "react-router-dom";
import "./css/button.css";

const LocationComponent = ({isLocation}) => {
    console.log("locationcomponent: ", isLocation);

    const [location, setLocation] = useState(null);
    const [isAgree, setIsAgree] = useState(isLocation)
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [inputValue, setInputValue] = useState(1); // Keep track of the input value separately
    const [selectedContentId, setSelectedContentId] = useState(null);
    const [selectedContentTypeId, setSelectedContentTypeId] = useState(null);
    const [recommendPageIsOpen, setRecommendPageIsOpen] = useState(true);
    const [spotInfoPageIsOpen, setSpotInfoPageIsOpen] = useState(false);
    const navigate = useNavigate();

    console.log("isAgree: ", isAgree);
    const handleItemClick = (contentid, contenttypeid, title) => {
        setRecommendPageIsOpen(false);
        navigate(`/spotinfo?cid=${contentid}&ctypeid=${contenttypeid}&title=${title}`);
    };
    useEffect(() => {
        // 위치 정보 가져오기
        if (navigator.geolocation && isLocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    setLocation({latitude, longitude});
                    setIsAgree(true);
                    // 서버에 위치 정보 전송 예시
                    fetchData(`trip/location?mapX=${encodeURIComponent(longitude)}&mapY=${encodeURIComponent(latitude)}&radius=2000`, (response) => {

                        setTotalCount(response[0]);
                        setItemsPerPage(response[1]);
                        setData(response.slice(2));
                        setLoading(false);
                    }, setError, setLoading,)
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError('Geolocation is not supported.');
        }
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 합니다.


    return (
        <div>
            {error && <p>{error}</p>}
            {isLocation && recommendPageIsOpen && (
                <div>
                    <main className="page-content">
                        <div className="recommendation-list">
                            {
                                data.map((item) => (
                                    <div key={item.contentid} className="recommendation-item">
                                        <button
                                            className="button button--size-m button--text-medium bg-1 button--winona"
                                            onClick={() => handleItemClick(item.contentid, item.contenttypeid)}>
                                            {item.title}
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    </main>
                </div>
            )}
            {/* SpotInfoPage 컴포넌트 */}
            {isLocation && spotInfoPageIsOpen && (
                <SpotInfoPage
                    contentid={selectedContentId}
                    contenttypeid={selectedContentTypeId}
                />)}
        </div>
    );
};



export default LocationComponent;