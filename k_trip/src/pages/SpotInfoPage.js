import React, { useState, useEffect } from "react";
import fetchData from "../fetchData";
import postData from "../postData";
import "./SpotInfoPage.css";
import {FaStar} from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";
import ReviewModal from "../modals/ReviewModal";

function SpotInfoPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const contentid = searchParams.get('cid');
    const contenttypeid = searchParams.get('ctypeid');
    const title = searchParams.get('title');
    const [data, setData] = useState([]);
    const [review, setReview] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchDetailInfo = async () => {
            try {
                setLoading(true);
                await fetchData('trip/detailinfo', setData, setError, setLoading, { contentid, contenttypeid });
                await fetchData('reviews', setReview, setError, setLoading, {ctypeid: contenttypeid, cid: contentid});
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDetailInfo();
    }, [contentid, contenttypeid]);

    const handleFavoriteClick = (event, contentid, contentname) => {
        event.preventDefault(); // 클릭 시 기본 동작 방지 (옵션)
        setIsFavorite(prevIsFavorite => !prevIsFavorite);
        console.log(typeof contentid);
        const toggleValue = isFavorite ? 0 : 1;
        postData('favorite/toggle', setLoading, {
            cid: contentid,
            cname: contentname,
            toggleValue: toggleValue
        });
    };
    const handleCourseClick = (contentid, contenttypeid, title) =>{
        navigate(`/course?cid=${contentid}&ctypeid=${contenttypeid}&title=${title}`);
    }
    const renderReview = (item) => {
        return (
            <div className="recommendation-item">
                <p><strong>Point:</strong>{item.point}</p>
                <p><strong>작성자:</strong> {item.mid}</p>
                <p><strong>내용:</strong> {item.content}</p>
                <p><strong>작성일자:</strong> {item.writedate}</p>
            </div>
        )
    }
    const contentTypeComponents = {
        12: (item) => (
            <div className="recommendation-item">
                <div className="item-header">
                    {item.firstimage && <img src={item.firstimage} alt={item.title} />}
                </div>
                <div className="item-header">
                    <h2>{item.title}</h2>
                    <button onClick={() => setReviewModalIsOpen(true)} className="button button--size-m button--text-medium bg-1 button--winona">
                        리뷰 쓰기
                    </button>
                    <button onClick={(event) => handleFavoriteClick(event, contentid, item.title)} className="favorite-button">
                        <FaStar size={30} color={isFavorite ? "yellow" : "gray"} />
                    </button>
                </div>
                <p><strong>주소:</strong> {item.addr1} {item.addr2}</p>
                <p><strong>전화번호:</strong> {item.infocenter}</p>
                <p><strong>소개:</strong> {item.overview}</p>
                <p><strong>주차장:</strong> {item.parking}</p>
                <p><strong>반려동물 동반 여부:</strong> {item.chkpet}</p>
                <p><strong>휴무일:</strong> {item.restdate}</p>
                <p><strong>유모차 대여 여부:</strong> {item.chkbabycarriage}</p>
                <p><strong>부가 정보:</strong> {item.infoname} ({item.infotext})</p>
                <p><strong>최근 수정 시간:</strong> {item.modifiedtime}</p>
                <p><strong>수용 인원:</strong> {item.accomcount}</p>
            </div>
        ),
        14: (item) => (
            <div className="recommendation-item">
                <div className="item-header">
                    {item.firstimage && <img src={item.firstimage} alt={item.title} />}
                </div>
                <div className="item-header">
                    <h2>{item.title}</h2>
                    <button onClick={(event) => handleFavoriteClick(event, contentid, item.title)} className="favorite-button">
                        <FaStar size={30} color={isFavorite ? "yellow" : "gray"} />
                    </button>
                </div>
                <p><strong>주소:</strong> {item.addr1} {item.addr2}</p>
                <p><strong>전화번호:</strong> {item.infocenterculture}</p>
                <p><strong>소개:</strong> {item.overview}</p>
                <p><strong>주차장:</strong> {item.parking}</p>
                <p><strong>반려동물 동반 여부:</strong> {item.chkpetculture}</p>
                <p><strong>운영 시간:</strong> {item.usetimeculture}</p>
                <p><strong>유모차 대여 여부:</strong> {item.chkbabycarriageculture}</p>
                <p><strong>수정 시간:</strong> {item.modifiedtime}</p>
                <p><strong>휴무일:</strong>{item.resttimeculture}</p>
                <p><strong>수용 인원:</strong>{item.accomcountculture}</p>
                <p><strong>소요 시간:</strong>{item.spendtime}</p>
                <p><strong>이용 요금:</strong>{item.usefee}</p>
                <p><strong>부가 정보:</strong> {item.infoname} ({item.infotext})</p>
            </div>
        ),
        15: (item) => (
            <div className="recommendation-item">
                <div className="item-header">
                    {item.firstimage && <img src={item.firstimage} alt={item.title} />}
                </div>
                <div className="item-header">
                    <h2>{item.title}</h2>
                    <button onClick={(event) => handleFavoriteClick(event, contentid, item.title)} className="favorite-button">
                        <FaStar size={30} color={isFavorite ? "yellow" : "gray"} />
                    </button>
                </div>
                <p><strong>주소:</strong> {item.addr1} {item.addr2}</p>
                <p><strong>전화번호:</strong> {item.tel}</p>
                <p><strong>소개:</strong> {item.overview}</p>
                <p><strong>주차장:</strong> {item.parking}</p>
                <p><strong>운영시간:</strong> {item.playtime}</p>
                <p><strong>이용 요금:</strong> {item.usetimefestival}</p>
                <p><strong>장소:</strong> {item.eventplace}</p>
                <p><strong>소요 시간:</strong> {item.spendtimefestival}</p>
                <p><strong>수정 시간:</strong> {item.modifiedtime}</p>
                <p><strong>종료 일자:</strong> {item.eventenddate}</p>
                <p><strong>프로그램:</strong> {item.program}</p>
                <p><strong>연령 제한:</strong> {item.agelimit}</p>
            </div>
        ),
        25: (item) => (
            <div className="recommendation-item">
                <div className="item-header">
                    {item.firstimage && <img src={item.firstimage} alt={item.title} />}
                </div>
                <div className="item-header">
                    <h2>{item.title}</h2>
                    <button onClick={() => setReviewModalIsOpen(true)} className="button button--size-m button--text-medium bg-1 button--winona">
                        리뷰 쓰기
                    </button>
                    <button onClick={(event) => handleCourseClick(contentid, contenttypeid, item.title)} className="button button--size-m button--text-medium bg-1 button--winona">
                        코스 상세보기
                    </button>
                    <button onClick={(event) => handleFavoriteClick(event, contentid, item.title)} className="favorite-button">
                        <FaStar size={30} color={isFavorite ? "yellow" : "gray"} />
                    </button>
                </div>
                <p><strong>주소:</strong> {item.addr1} {item.addr2}</p>
                <p><strong>전화번호:</strong> {item.infocenterculture}</p>
                <p><strong>코스 거리:</strong> {item.distance}</p>
                <p><strong>소요시간:</strong> {item.taketime}</p>
                <p><strong>고객센터:</strong> {item.infocentertourcourse}</p>
            </div>
        ),
        28: (item) => (
            <div className="recommendation-item">
                <div className="item-header">
                    {item.firstimage && <img src={item.firstimage} alt={item.title} />}
                </div>
                <div className="item-header">
                    <h2>{item.title}</h2>
                    <button onClick={(event) => handleFavoriteClick(event, contentid, item.title)} className="favorite-button">
                        <FaStar size={30} color={isFavorite ? "yellow" : "gray"} />
                    </button>
                </div>
                <p><strong>주소:</strong> {item.addr1} {item.addr2}</p>
                <p><strong>유모차 대여 여부:</strong> {item.chkbabycarriageleports}</p>
                <p><strong>전화번호:</strong> {item.infocenterleports}</p>
                <p><strong>소개:</strong> {item.overview}</p>
                <p><strong>주차장:</strong> {item.parking}</p>
                <p><strong>반려동물 동반 여부:</strong> {item.chkpetleports}</p>
                <p><strong>운영시간:</strong> {item.usetimeleports}</p>
                <p><strong>이용 요금:</strong> {item.usefeeleports}</p>
                <p><strong>주차 요금:</strong> {item.parkingfeeleports}</p>
                <p><strong>수용 인원:</strong> {item.accomcountleports}</p>
                <p><strong>수정 시간:</strong> {item.modifiedtime}</p>
            </div>
        ),
        32: (item) => (
            <div className="recommendation-item">
                <div className="item-header">
                    {item.firstimage && <img src={item.firstimage} alt={item.title} />}
                </div>
                <div className="item-header">
                    <h2>{item.title}</h2>
                    <button onClick={(event) => handleFavoriteClick(event, contentid, item.title)} className="favorite-button">
                        <FaStar size={30} color={isFavorite ? "yellow" : "gray"} />
                    </button>
                </div>
                <p><strong>주소:</strong> {item.addr1} {item.addr2}</p>
                <p><strong>전화번호:</strong> {item.infocenterculture}</p>
                <p><strong>소개:</strong> {item.overview}</p>
                <p><strong>주차장:</strong> {item.parking}</p>
                <p><strong>반려동물 동반 여부:</strong> {item.chkpetculture}</p>
                <p><strong>운영시간:</strong> {item.usetimeculture}</p>
                <p><strong>유모차 대여 여부:</strong> {item.chkbabycarriageculture}</p>
                <p><strong>수정 시간:</strong> {item.modifiedtime}</p>
            </div>
        ),
        38: (item) => (
            <div className="recommendation-item">
                <div className="item-header">
                    {item.firstimage && <img src={item.firstimage} alt={item.title} />}
                </div>
                <div className="item-header">
                    <h2>{item.title}</h2>
                    <button onClick={(event) => handleFavoriteClick(event, contentid, item.title)} className="favorite-button">
                        <FaStar size={30} color={isFavorite ? "yellow" : "gray"} />
                    </button>
                </div>
                <p><strong>주소:</strong> {item.addr1} {item.addr2}</p>
                <p><strong>소개:</strong> {item.overview}</p>
                <p><strong>고객센터:</strong> {item.infocentershopping}</p>
                <p><strong>주차:</strong> {item.parkingshopping}</p>
                <p><strong>반려동물 동반 여부:</strong> {item.chkpetshopping}</p>
                <p><strong>영업시간:</strong> {item.opentime}</p>
                <p><strong>판매품목:</strong> {item.saleitem}</p>
                <p><strong>휴업일:</strong> {item.restdateshopping}</p>
            </div>
        ),
        39: (item) => (
            <div className="recommendation-item">
                <div className="item-header">
                    {item.firstimage && <img src={item.firstimage} alt={item.title} />}
                </div>
                <div className="item-header">
                    <h2>{item.title}</h2>
                    <button onClick={(event) => handleFavoriteClick(event, contentid, item.title)} className="favorite-button">
                        <FaStar size={30} color={isFavorite ? "yellow" : "gray"} />
                    </button>
                </div>
                <p><strong>주소:</strong> {item.addr1} {item.addr2}</p>
                <p><strong>소개:</strong> {item.overview}</p>
                <p><strong>영업 시간:</strong> {item.opentimefood}</p>
                <p><strong>전화번호:</strong> {item.infocenterfood}</p>
                <p><strong>메뉴:</strong> {item.treatmenu}</p>
                <p><strong>어린이놀이방:</strong> {item.kidsfacility}</p>
                <p><strong>포장 여부:</strong> {item.packing}</p>
                <p><strong>예약 안내:</strong> {item.reservationfood}</p>
                <p><strong>주차:</strong> {item.parkingfood}</p>
            </div>
        )
    };
    const renderContent = (item) => {
        const contentTypeComponent = contentTypeComponents[item.contenttypeid];
        if (contentTypeComponent) {
            return contentTypeComponent(item);
        }
        return null; // 해당하는 contenttypeid에 대한 처리가 없을 경우 null을 반환하거나 다른 처리 방법을 사용할 수 있음
    };

    return (
        <div className="spot-info-page">
            <main className="page-content">
                {error && <p>Error: {error}</p>}
                {loading && <p>Loading...</p>}
                {!loading && !error && data.length === 0 && <p>정보가 없습니다.</p>}
                {!loading && !error && data.length > 0 && (
                    <div className="recommendation-list">
                        {data.map(item => renderContent(item))}
                    </div>
                )}
                {!loading && !error && review.length === 0 && <p>작성된 리뷰가 없습니다.</p>}
                {!loading && !error && review.length > 0 && (
                    <div className="recommendation-list">
                        {review.map(item => renderReview(item))}
                    </div>
                )}
            </main>
            <ReviewModal
                isOpen={reviewModalIsOpen}
                onClose={() => setReviewModalIsOpen(false)}
            />
        </div>
    );
};

export default SpotInfoPage;