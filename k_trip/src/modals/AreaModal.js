import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // react-modal import
import { StyleSheet } from "react-native";
import fetchData from "../fetchData";
import "./modalStyles/areamodal.css";

const AreaModal = ({ isOpen, onClose }) => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]); // Initialize data as an empty array
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAreaCode, setSelectedAreaCode] = useState(null); // State to store selected area code
    const [selectedSigunguCode, setSelectedSigunguCode] = useState(null);
    const handleCloseModal = () => {
        setPage(1);
        setSelectedAreaCode(null); // Clear selected area code when modal closes
        onClose();
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1); // Increase page number
        fetchData('trip/area', setData, setError, setLoading, { areacode: selectedAreaCode, pageno: page + 1 });
    };

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1)); // Decrease page number but not below 1
        fetchData('trip/area', setData, setError, setLoading, { areacode: selectedAreaCode, pageno: page - 1 });
    };

    const handleSelectArea = (code) => {
        if (selectedAreaCode === null) {
            setSelectedAreaCode(code); // Update selected area code
            fetchData('trip/area', setData, setError, setLoading, { areacode: code, pageno: 1 }); // Fetch data for selected area
        } else {
            setSelectedSigunguCode(code); // Update selected sigungu code
            fetchData('trip/area', setData, setError, setLoading, { areacode: selectedAreaCode, sigungucode: code, pageno: 1 }); // Fetch data for selected sigungu within selected area
        }
        console.log({selectedAreaCode, selectedSigunguCode});
    };


    useEffect(() => {
        if (isOpen) {
            fetchData('trip/area', setData, setError, setLoading, { pageno: 1 });
        }
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal} // 모달 닫힐 때 페이지 초기화 함수를 호출
            contentLabel="Example Modal"
            style={modalStyle}
            ariaHideApp={false}
            portalClassName="modal-portal"
        >
            <div className="title">지역 선택</div>
            <div className="grid-container">
                {data.map((item, index) => (
                    <button
                        key={index}
                        className="grid-item btn btn-primary"
                        onClick={() => handleSelectArea(item.code)}
                    >
                        {item.name}
                    </button>
                ))}
            </div>

            <div className="page-move-container">
                <button
                    className="prev-btn"
                    onClick={handlePrevPage}
                    disabled={page === 1}
                >
                    이전
                </button>
                <button
                    className="next-btn"
                    onClick={handleNextPage}
                >
                    다음
                </button>
            </div>
            <button className="close-btn" onClick={handleCloseModal}>
                닫기
            </button>
        </Modal>
    );
};

const modalStyle = StyleSheet.create({
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경에 흐릿한 효과를 줄 때 사용합니다.
    },
    content: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "80%",
        maxHeight: "80%",
        overflow: "auto",
        backgroundColor: "white", // 모달의 배경색을 지정합니다.
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 그림자 효과를 추가할 수 있습니다.
    },
});

export default AreaModal;
