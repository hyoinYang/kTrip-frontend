import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import postReviewData from "../postReivewData";
import Modal from 'react-modal';
import '../index.css';

const MAX_STARS = 5;


const customModalStyles = {
    overlay: {

        zIndex: 1000
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '600px', // 예시로 최대 너비 지정
        padding: '20px' // 예시로 패딩 지정
    }
};

const ReviewModal = ({ isOpen, onClose }) => {
    const [point, setPoint] = useState(5);
    const [content, setContent] = useState(null);

    const handleClick = (value) => {
        setPoint(value);
    };

    const handleClose = () => {
        setPoint(5);
        setContent(null);
        onClose();
    };

    const handleSubmit = async () => {
        const reviewData = {
            point: point,
            content: content
        };

        try {
            await postReviewData(reviewData);
            console.log('리뷰 등록 성공');
            handleClose();
        } catch (error) {
            console.error('리뷰 등록 실패:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customModalStyles}
            contentLabel="리뷰 작성"
            ariaHideApp={false}
            portalClassName="modal-portal"
        >
            <div>
                {[...Array(MAX_STARS)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <FaStar
                            key={index}
                            size="24"
                            onClick={() => handleClick(starValue)}
                            color={starValue <= point ? '#ffc107' : '#e4e5e9'}
                            style={{ cursor: 'pointer' }}
                        />
                    );
                })}
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="리뷰를 작성해주세요"
                    style={{ width: '100%', height: '100px', marginTop: '10px' }}
                />
                <button onClick={handleClose}>닫기</button>
                <button onClick={handleSubmit}>등록</button>
            </div>
        </Modal>
    );
};

export default ReviewModal;
