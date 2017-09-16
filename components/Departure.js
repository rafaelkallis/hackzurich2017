import React from "react";
import { View, Text } from "react-native";

export default function({ to, category, number, departureTime }) {
    return (
        <View>
            <Text>
                {category} {number}
            </Text>
            <Text>{to}</Text>
            <Text>{departureTime}</Text>
        </View>
    );
}
