import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // react-modal import
import { StyleSheet } from 'react-native';
import fetchData from "../fetchData";
const URL = '/areaCode1';
const AreaModal = ({ isOpen, onClose, data }) => {
    const itemsPerPage = 9; // 페이지당 아이템 수 (3x3 그리드 형태로 출력)

    // 페이지 관련 상태
    const [page, setPage] = useState(1);
    const [data2, setData2] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const currentPageItems = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handleCloseModal = () => {
        setPage(1);
        onClose();
    };

    // 페이지 이동 함수
    const handleNextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, pageCount)); // 다음 페이지로 이동하되, 마지막 페이지를 넘어가지 않도록 함
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1)); // 이전 페이지로 이동하되, 첫 페이지 미만으로 가지 않도록 함
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal} // 모달 닫힐 때 페이지 초기화 함수를 호출
            contentLabel="Example Modal"
            style={modalStyle}
            ariaHideApp={false}
            portalClassName="modal-portal"
        >
            <div>지역 선택</div>
            <div className="grid-container">
                {currentPageItems.map((item, index) => (
                    <button key={index} className="grid-item btn btn-primary" onClick={() =>
                        fetchData(URL, setData2, setError, setLoading, item.code)
                    }>{item.name}</button>
                ))}
            </div>
            <div>
                <button onClick={handlePrevPage} disabled={page === 1}>이전</button>
                <span>{page}/{pageCount}</span>
                <button onClick={handleNextPage} disabled={page === pageCount}>다음</button>
            </div>
            <button onClick={handleCloseModal}>닫기</button>

        </Modal>
    );
};

const modalStyle = StyleSheet.create({
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)' // 배경에 흐릿한 효과를 줄 때 사용합니다.
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '80%',
        maxHeight: '80%',
        overflow: 'auto',
        backgroundColor: 'white', // 모달의 배경색을 지정합니다.
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // 그림자 효과를 추가할 수 있습니다.
    }
});

export default AreaModal;
