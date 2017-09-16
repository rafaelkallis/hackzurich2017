import React from "react";
import { Provider } from "react-redux";
import Departures from "./departures/Departures";
import store from "./store";

// Testing
import { getCloseDepartures } from "./departures/actions";

store.dispatch(getCloseDepartures(47.3901869, 8.5136578)).then(console.log);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Departures />
            </Provider>
        );
    }
}
