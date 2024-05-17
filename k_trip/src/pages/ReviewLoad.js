import React, {useEffect, useState} from "react";
import axios from 'axios'; // axios 라이브러리를 임포트합니다.
import ReviewItem from "./ReviewItem";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function ReviewLoad() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/review?ctypeid=0&cid=1", {
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
        <table style={{width:"100%"}}>
            <tbody>
                {reviews.map((review, index) => (
                    <ReviewItem key={index} review={review} />
                ))}
            </tbody>
        </table>
    );
}

export default ReviewLoad;
