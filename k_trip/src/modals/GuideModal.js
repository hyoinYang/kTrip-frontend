import React, { useState } from 'react';
import Modal from 'react-modal';
import '../index.css';

const ReviewModal = ({ isOpen, onClose }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');


    const handleClose = () => {
        setFrom('');
        setTo('');
        onClose();
    };
    const handleSubmit = () => {
        // 출발지와 목적지 값이 비어있는지 확인
        if (!from || !to) {
            alert('출발지와 목적지를 입력하세요.');
            return;
        }

        // 출발지와 목적지를 인코딩하여 카카오 맵 URL 생성
        const encodedFrom = encodeURIComponent(from);
        const encodedTo = encodeURIComponent(to);
        const kakaoMapURL = `https://map.kakao.com/?sName=${encodedFrom}&eName=${encodedTo}`;

        // 생성된 URL로 이동
        window.location.href = kakaoMapURL;
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="길찾기"
            ariaHideApp={false}
            portalClassName="modal-portal"
            style={modalStyle}
        >
            <div>
                <textarea
                    value={from}
                    placeholder="출발지"
                    style={inputStyle}
                    onChange={(e) => setFrom(e.target.value)}
                />
                <textarea
                    value={to}
                    placeholder="목적지"
                    style={inputStyle}
                    onChange={(e) => setTo(e.target.value)}
                />
                <button style={buttonStyle} onClick={handleClose}>닫기</button>
                <button style={buttonStyle} onClick={handleSubmit}>길찾기</button>
            </div>
        </Modal>
    );
};
const modalStyle = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        width: '300px',
        margin: 'auto',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }
};

const inputStyle = {
    width: '100%',
    height: '80px',
    marginTop: '10px',
    borderRadius: '5px',
    padding: '10px',
    border: '1px solid #ccc'
};

const buttonStyle = {
    marginTop: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer'
};

export default ReviewModal;
