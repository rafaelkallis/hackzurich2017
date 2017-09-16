import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import NumberIcon from "./NumberIcon";

export default function({
    to,
    category,
    number,
    departureTime,
    occupation,
    onPress,
}) {
    return (
        <TouchableHighlight style={styles.container} onPress={onPress}>
            <View style={styles.row}>
                {(occupation && (
                    <Icon
                        name="warning"
                        size={20}
                        color={
                            occupation === 2 ? (
                                "red"
                            ) : occupation === 1 ? (
                                "orange"
                            ) : (
                                "white"
                            )
                        }
                    />
                )) || <View style={styles.placeholder} />}
                <View style={styles.departureLeft}>
                    <NumberIcon number={number} />
                </View>
                <View style={styles.departureTo}>
                    <Text style={styles.to}>{to}</Text>
                </View>
                <View style={styles.departureRight}>
                    <Text style={styles.departureTime}>
                        {Math.max(
                            0,
                            Math.floor(
                                (departureTime -
                                    Math.floor(Date.now() / 1000)) /
                                    60,
                            ),
                        )}'
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 12,
        height: 80,
    },
    row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    departure: {
        marginTop: 4,
        flex: 1,
        flexDirection: "row",
        height: 100,
    },
    departureLeft: {
        flex: -1,
        padding: 10,
        alignItems: "flex-start",
    },
    departureRight: {
        flex: -1,
        alignItems: "flex-end",
    },
    departureTo: {
        flex: 1,
        justifyContent: "center",
    },
    category: {},
    to: {
        fontSize: 15,
        paddingLeft: 10,
        paddingRight: 10,
    },
    departureTime: {
        fontSize: 30,
        marginRight: 20,
    },
    placeholder: {
        marginLeft: 20,
    },
});
