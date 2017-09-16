import React from "react";
import { Provider } from "react-redux";
import Departures from "./departures/Departures";
import { View } from "react-native";
import store from "./store";
import Departure from "./departure";
import StatusBar from "./StatusBar";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View>
                    <StatusBar />
                    <Departures />
                </View>
            </Provider>
        );
    }
}
