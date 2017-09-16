import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import departures from "./departures/reducer";

const rootReducer = combineReducers({
    departures,
});

export default createStore(rootReducer, applyMiddleware(thunk));
