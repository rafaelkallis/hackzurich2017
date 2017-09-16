import error from "./error";
import stationboards from "./stationboards";
import stations from "./stations";
import favourites from "./favourites";
import { combineReducers } from "redux";

export default combineReducers({
    error,
    stationboards,
    stations,
    favourites,
});
