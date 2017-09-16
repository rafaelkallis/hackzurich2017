import { createStore, applyMiddleware } from "redux";
import { AsyncStorage } from "react-native";
import middleware from "./middleware";
import rootReducer from "./reducer";

const store = createStore(rootReducer, middleware);

store.dispatch({
    type: "GET_FAVOURITES_REQUESTED",
});

export default store;
