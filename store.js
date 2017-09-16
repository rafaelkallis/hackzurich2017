import { createStore, combineReducers, applyMiddleware } from "redux";
import departureReducer from "./departures/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    departures: departureReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
