import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AreaModal from "./modals/AreaModal";
import ReviewModal from "./modals/ReviewModal";
import fetchData from "./fetchData";
import GuideModal from "./modals/GuideModal";

const URL = "/areaCode1";
function Navbar() {
  const [locationModalIsOpen, setLocationModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [guideModalIsOpen, setGuideModalIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetchData 함수 호출 (areaCode가 필요한 경우)
    fetchData(URL, setData, setError, setLoading);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (!data) return null;

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className="nav-link active btn btn-info"
                  aria-current="page"
                  onClick={() => setLocationModalIsOpen(true)}
                >
                  지역
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link active btn btn-info"
                  aria-current="page"
                >
                  유형
                </button>
              </li>
              <li className="nav-item dropdown">
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
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link active btn btn-info"
                  aria-current="page"
                  onClick={() => setReviewModalIsOpen(true)}
                >
                  리뷰
                </button>
              </li>
              <li className="nav-item">
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
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <AreaModal
        isOpen={locationModalIsOpen}
        onClose={() => setLocationModalIsOpen(false)}
        data={data}
      />
      <ReviewModal
        isOpen={reviewModalIsOpen}
        onClose={() => setReviewModalIsOpen(false)}
      />
      <GuideModal
        isOpen={guideModalIsOpen}
        onClose={() => setGuideModalIsOpen(false)}
      />
    </div>
  );
}

export default Navbar;
