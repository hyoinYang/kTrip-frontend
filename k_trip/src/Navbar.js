
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AreaModal from "./modals/AreaModal";
import GuideModal from "./modals/GuideModal";
import { Outlet } from "react-router-dom";
import LocationComponent from "./LocationComponent";

const URL = '/areaCode1';
function Navbar() {

    const navigate = useNavigate();
    const [locationModalIsOpen, setLocationModalIsOpen] = useState(false);
    const [guideModalIsOpen, setGuideModalIsOpen] = useState(false);
    const [location, setLocation] = useState(true);

    const handleSearchSubmit = (event) => {
        event.preventDefault(); // 기본 제출 동작 방지
        const formData = new FormData(event.target);
        const keyword = formData.get('keyword'); // 폼 데이터에서 검색어 추출
        navigate(`/trip/search?q=${encodeURIComponent(keyword)}&page=1`);
    };

    const onCloseLocation = () => {
        setLocation(false)
    }
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
                                        onClick={() => setGuideModalIsOpen(true)}
                                    >
                                        길찾기
                                    </button>
                                </li>
                            </ul>
                                <form className="d-flex"
                                      role="search"
                                      action="/trip/search"
                                      method = "GET"
                                      onSubmit={handleSearchSubmit}>
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        name="keyword"
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
                    isLocation={onCloseLocation}
                />
                <GuideModal
                    isOpen={guideModalIsOpen}
                    onClose={() => setGuideModalIsOpen(false)}
                />
            </div>
            <Outlet/>
        </>
    );
}

export default Navbar;
