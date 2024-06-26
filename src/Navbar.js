import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AreaModal from "./modals/AreaModal";
import ReviewModal from "./modals/ReviewModal";
import GuideModal from "./modals/GuideModal";
import RecommendPage from "./pages/RecommendPage";
import SpotInfoPage from "./pages/SpotInfoPage";
import { Outlet } from "react-router-dom";
import LocationComponent from "./LocationComponent";
import fetchData from "./fetchData";

function Navbar() {
    const [locationModalIsOpen, setLocationModalIsOpen] = useState(false);
    const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
    const [guideModalIsOpen, setGuideModalIsOpen] = useState(false);
    const [recommendPageIsOpen, setRecommendPageIsOpen] = useState(false);
    const [spotInfoPageIsOpen, setSpotInfoPageIsOpen] = useState(false);
    const [selectedAreaCode, setSelectedAreaCode] = useState(null);
    const [selectedAreaName, setSelectedAreaName] = useState(null);
    const [selectedSigunguCode, setSelectedSigunguCode] = useState(null);
    const [selectedSigunguName, setSelectedSigunguName] = useState(null);
    const [selectedContentId, setSelectedContentId] = useState(null);
    const [selectedContentTypeId, setSelectedContentTypeId] = useState(null);
    const [location, setLocation] = useState(true);

    const handleAreaSelect = (areaCode, sigunguCode, areaName, sigunguName) => {
        setSelectedAreaCode(areaCode);
        setSelectedSigunguCode(sigunguCode);
        setSelectedAreaName(areaName);
        setSelectedSigunguName(sigunguName);
        setLocationModalIsOpen(false);
        setRecommendPageIsOpen(true);
        setLocation(false);

    };

    const handleItemClick = (contentid, contenttypeid) => {
        setSelectedContentId(contentid);
        setSelectedContentTypeId(contenttypeid);
        setRecommendPageIsOpen(false);
        setSpotInfoPageIsOpen(true);
    };

    const handleCloseRecommendPage = () => {
        setSelectedAreaCode(null);
        setSelectedSigunguCode(null);
        setSelectedAreaName(null);
        setSelectedSigunguName(null);
        setRecommendPageIsOpen(false);
    };

    return (
        <>
            <div className="App">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            K-Trip
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item nav-element">
                                    <button
                                        className="nav-link active btn btn-info"
                                        aria-current="page"
                                        onClick={() => setLocationModalIsOpen(true)}
                                    >
                                        지역
                                    </button>
                                </li>
                                <li className="nav-item nav-element">
                                    <button
                                        className="nav-link active btn btn-info"
                                        aria-current="page"
                                    >
                                        유형
                                    </button>
                                </li>
                                <li className="nav-item dropdown nav-element">
                                    <a
                                        className="nav-link dropdown-toggle btn btn-info"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Action
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Another action
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Something else here
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item nav-element">
                                    <button
                                        className="nav-link active btn btn-info"
                                        aria-current="page"
                                        onClick={() => setReviewModalIsOpen(true)}
                                    >
                                        리뷰
                                    </button>
                                </li>
                                <li className="nav-item nav-element">
                                    <button
                                        className="nav-link active btn btn-info"
                                        aria-current="page"
                                        onClick={() => setGuideModalIsOpen(true)}
                                    >
                                        길찾기
                                    </button>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <button
                                    className="btn btn-outline-success search_btn"
                                    type="submit"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>
                <LocationComponent isLocation={location}/>
                <AreaModal
                    isOpen={locationModalIsOpen}
                    onClose={() => setLocationModalIsOpen(false)}
                    onSelectArea={handleAreaSelect}
                />
                <ReviewModal
                    isOpen={reviewModalIsOpen}
                    onClose={() => setReviewModalIsOpen(false)}
                />
                <GuideModal
                    isOpen={guideModalIsOpen}
                    onClose={() => setGuideModalIsOpen(false)}
                />
                    {recommendPageIsOpen && (
                        <RecommendPage
                            areacode={selectedAreaCode}
                            sigungucode={selectedSigunguCode}
                            areaname={selectedAreaName}
                            sigunguname={selectedSigunguName}
                            onItemClick={handleItemClick}
                            onClose={handleCloseRecommendPage}
                        />
                    )}
                    {spotInfoPageIsOpen && (
                        <SpotInfoPage
                            contentid={selectedContentId}
                            contenttypeid={selectedContentTypeId}
                        />
                    )}
            </div>
            <Outlet/>
        </>
    );
}

export default Navbar;