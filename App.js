import React from "react";
import { Provider } from "react-redux";
import Stations from "./containers/Stations";
import { View } from "react-native";
import store from "./store";
import StatusBar from "./components/StatusBar";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View>
                    <StatusBar />
                    <Stations />
                </View>
            </Provider>
        );
    }
}
