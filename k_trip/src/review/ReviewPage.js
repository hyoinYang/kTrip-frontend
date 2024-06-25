import React from 'react';
import './Review.css'; // Review 컴포넌트를 스타일링하기 위한 CSS 파일

// Review 컴포넌트: 리뷰를 표시하는 컴포넌트
function Review({ name, rating, comment }) {
    return (
        <div className="review">
            <h3>{name}</h3>
            <div className="rating">Rating: {rating}</div>
            <p>{comment}</p>
        </div>
    );
}

// ReviewList 컴포넌트: 여러 리뷰를 표시하는 컴포넌트
function ReviewList({ reviews }) {
    return (
        <div className="review-list">
            <h2>Reviews</h2>
            {reviews.map(review => (
                <Review key={review.id} {...review} />
            ))}
        </div>
    );
}

// ReviewPage 컴포넌트: ReviewList 컴포넌트를 렌더링하는 최상위 컴포넌트
function ReviewPage() {
    const reviews = [
        { id: 1, name: 'John', rating: 4, comment: 'Great place!' },
        { id: 2, name: 'Alice', rating: 5, comment: 'Wonderful experience!' },
        { id: 3, name: 'Bob', rating: 3, comment: 'Okay, but could be better.' }
    ];

    return (
        <div className="review-page">
            <h1>Travel Reviews</h1>
            <ReviewList reviews={reviews} />
        </div>
    );
}

export default ReviewPage;
