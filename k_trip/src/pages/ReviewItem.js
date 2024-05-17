import {StyleSheet, View, Text } from 'react-native';

function ReviewItem({review}) {
    return (
        <>
            <View className="card">
                <View className="card-body" style={styles.container}>
                    <Text className="card-title" style={styles.descriptionText}>{review.content}</Text>
                    <Text className="card-title">{review.point}</Text>
                    <Text className="card-title" style={styles.dateText}>{review.writedate}</Text>
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        padding: 10,
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10,
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
});

export default ReviewItem;
