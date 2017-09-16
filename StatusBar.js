import React from "react";
import { StyleSheet, View, Platform } from "react-native";

export default () => <View style={styles.container} />;

const styles = StyleSheet.create({
    container: {
        height: Platform.OS === "ios" ? 20 : 0,
        backgroundColor: "#fff",
    },
});
