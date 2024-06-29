import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import postReviewData from "../postReviewData";
import Modal from 'react-modal';
import '../index.css';
import checkTokenValidity from '../CheckToken';

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
        maxWidth: '600px',
        padding: '20px'
    }
};

const ReviewModal = ({ isOpen, onClose, contentId, contentTypeId }) => {
    const [point, setPoint] = useState(5);
    const [content, setContent] = useState('');
    const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken') || '');

    // 별점 클릭 처리 함수
    const handleClick = (value) => {
        setPoint(value);
    };

    // 모달 닫기 처리 함수
    const handleClose = () => {
        setPoint(5);
        setContent('');
        onClose();
    };

    // 리뷰 제출 처리 함수
    const handleSubmit = async () => {
        if (!(await checkTokenValidity(authToken))) {
            return;
        }

        const reviewData = {
            point: point,
            content: content,
            cid: contentId,
            ctypeid: contentTypeId
        };

        try {
            const response = await postReviewData(reviewData, authToken);
            alert('리뷰가 정상적으로 등록되었습니다.');
            handleClose();
        } catch (error) {
            console.error('리뷰 등록에 실패했습니다.', error);
            alert('리뷰 등록에 실패했습니다.');
        }
    };

    // 인증 토큰을 localStorage에 저장하는 함수
    const storeAuthToken = (token) => {
        const tokenIssueTime = new Date().getTime();
        setAuthToken(token);
        localStorage.setItem('Authorization', token);
        localStorage.setItem('tokenIssueTime', tokenIssueTime);
    };

    // 페이지 로드 시 URL 파라미터를 검사하여 인증 토큰을 처리
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authTokenFromReissue = urlParams.get('token');

        if (authTokenFromReissue) {
            storeAuthToken(authTokenFromReissue);
            // 토큰 저장 후 URL 파라미터를 지워줌
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        checkTokenValidity(authToken); // Pass authToken to checkTokenValidity
    }, []);

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
