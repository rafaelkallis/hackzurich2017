import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import departureReducer from "./departures/reducer";
import Departures from "./departures/Departures";
import Departure from "./departure";

const rootReducer = combineReducers({
    departures: departureReducer,
});

const store = createStore(rootReducer);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Departure from="Hello"/>
            </Provider>
        );
    }
}
