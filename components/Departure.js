import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function({ to, category, number, departureTime }) {
    return (
        <View>
            <View style={styles.row}>
                <View style={styles.departureLeft}>
                    <Text style={styles.number}>{number}</Text>
                </View>
                <View style={styles.departureRight}>
                    <Text style={styles.departureTime}>
                        {new Date(
                            new Date(departureTime * 1000) - new Date(),
                        ).getMinutes()}'
                    </Text>
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.to}>{to}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
    },
    departure: {
        marginTop: 4,
        flex: 1,
        flexDirection: "row",
        height: 100,
    },
    departureLeft: {
        flex: 1,
        padding: 10,
        alignItems: "flex-start",
    },
    departureRight: {
        flex: 1,
        alignItems: "flex-end",
    },
    category: {},
    number: {
        color: "white",
        backgroundColor: "darkblue",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,
        overflow: "hidden",
        fontSize: 20,
    },
    to: {
        fontSize: 15,
        paddingLeft: 10,
        paddingRight: 10,
    },
    departureTime: {
        fontSize: 30,
        marginRight: 20,
    },
});
