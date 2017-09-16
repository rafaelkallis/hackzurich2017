import { applyMiddleware } from "redux";
import getStationboard from "./getStationboard";
import getStations from "./getStations";
import favourites from "./favourites";

export default applyMiddleware(getStationboard(), getStations(), favourites());
