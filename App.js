import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import departureReducer from "./departures/reducer";
import Departures from "./departures/Departures";

const rootReducer = combineReducers({
    departures: departureReducer,
});

const store = createStore(rootReducer);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Departures />
            </Provider>
        );
    }
}
