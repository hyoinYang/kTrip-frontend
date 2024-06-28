import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // react-modal import
import fetchData from "../fetchData";
import "./modalStyles/areamodal.css";
import "../css/button.css";
import {useNavigate} from "react-router-dom";

const AreaModal = ({ isOpen, onClose, isLocation}) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAreaCode, setSelectedAreaCode] = useState(null);
    const [selectedAreaName, setSelectedAreaName] = useState(null);

    const handleCloseModal = () => {
        setPage(1);
        setSelectedAreaCode(null);
        setSelectedAreaName(null);
        onClose();
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
        fetchData('trip/area', setData, setError, setLoading, { areacode: selectedAreaCode, pageno: page + 1 });
    };

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
        fetchData('trip/area', setData, setError, setLoading, { areacode: selectedAreaCode, pageno: page - 1 });
    };

    const handleSelectArea = (code, name) => {
        if (selectedAreaCode === null) {
            setSelectedAreaCode(code);
            setSelectedAreaName(name);
            fetchData('trip/area', setData, setError, setLoading, { areacode: code, pageno: 1 });
        } else {
            console.log({ selectedAreaName, name });
            setSelectedAreaCode(null);
            setSelectedAreaName(null);
            navigate({
                pathname: '/recommend/area',
                search: `?areacode=${selectedAreaCode}&areaname=${selectedAreaName}&sigungucode=${code}&sigunguname=${name}`
            });
            handleCloseModal();
        }
    };

    useEffect(() => {
        fetchData('trip/area', setData, setError, setLoading, { pageno: 1 });
        if (isOpen) {
            setPage(1);
            setSelectedAreaCode(null);
            isLocation();
        }
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Example Modal"
            style={modalStyle}
            ariaHideApp={false}
            portalClassName="modal-portal"
        >
            <div className="title">지역 선택</div>
            <div className="grid-container">
                {data.filter(item => item.rnum).map((item, index) => (
                    <button
                        key={index}
                        className="grid-item button button--size-m button--text-medium bg-1 button--winona"
                        onClick={() => handleSelectArea(item.code, item.name)}
                    >
                        {item.name}
                    </button>
                ))}
            </div>

            <div className="page-move-container">
                <button
                    className="prev-btn button button--size-m button--text-medium bg-1 button--winona"
                    onClick={handlePrevPage}
                    disabled={page === 1}
                >
                    이전
                </button>
                <button
                    className="next-btn button button--size-m button--text-medium bg-1 button--winona"
                    onClick={handleNextPage}
                >
                    다음
                </button>
            </div>
            <button className="close-btn button button--size-m button--text-medium bg-1 button--winona" onClick={handleCloseModal}>
                닫기
            </button>
        </Modal>
    );
};

const modalStyle = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "80%",
        maxHeight: "80%",
        overflow: "auto",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
};

export default AreaModal;
