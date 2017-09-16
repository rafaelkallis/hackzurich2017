import React from "react";
import { Provider } from "react-redux";
import Stations from "./containers/Stations";
import { View, StyleSheet } from "react-native";
import store from "./store";
import StatusBar from "./components/StatusBar";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <StatusBar />
                    <Stations />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
});
