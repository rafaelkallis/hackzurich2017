import React from "react";
import { Provider } from "react-redux";
import Departures from "./departures/Departures";
import store from "./store";
import Departure from "./departure";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Departure from="Hello" />
            </Provider>
        );
    }
}
