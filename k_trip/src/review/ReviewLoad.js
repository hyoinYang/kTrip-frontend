import React, {useEffect, useState} from "react";
import axios from 'axios'; // axios 라이브러리를 임포트합니다.
import ReviewItem from "./ReviewItem";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function ReviewLoad() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/reviews?ctypeid=0&cid=3", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(reviewData => {
                // 객체를 배열로 변환
                const dataArray = Object.values(reviewData);
                setReviews(dataArray);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);



    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            {reviews.map((review, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <ReviewItem review={review} />
                </div>
            ))}
        </div>
    );

}

export default ReviewLoad;
