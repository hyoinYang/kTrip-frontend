import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';

function ReviewItem({ review }) {
    // 별점을 렌더링하는 함수
    console.log(review.nickname)
    const renderStars = (point) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={i <= point ? faStar : faStarEmpty}
                    size={20}
                    color="#FFD700"
                />
            );
        }
        return stars;
    };

    return (
        <>
            <View style={styles.card}>
                <View style={styles.container}>
                    <Text >{review.nickname}</Text>
                    <Text style={styles.descriptionText}>{review.content}</Text>
                    <View style={styles.starsContainer}>
                        {renderStars(review.point)}
                    </View>
                    <Text style={styles.dateText}>{review.writedate}</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 10,
    },
    container: {
        width: '90%',
        padding: 10,
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderRadius: 5,
        borderWidth: 1,
    },
    nameText: {
        marginVertical: 5,
        color: '#000000',
        fontFamily: 'SB Sans Interface, sans-serif',
        fontSize: 14,
        lineHeight: 18,
    },
    dateText: {
        marginVertical: 5,
        color: 'rgba(0, 0, 0, 0.4)',
        fontFamily: 'SB Sans Interface, sans-serif',
        fontSize: 12,
        lineHeight: 15,
    },
    descriptionText: {
        marginVertical: 5,
        color: '#000000',
        fontFamily: 'SB Sans Display, sans-serif',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 18,
    },
    starsContainer: {
        flexDirection: 'row',
        marginVertical: 5,
    },
});

export default ReviewItem;
