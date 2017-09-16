import { applyMiddleware } from "redux";
import getStationboard from "./getStationboard";
import getStations from "./getStations";
import location from "./location";
import handler from "./handler";
import favourites from "./favourites";

export default applyMiddleware(
    location(),
    getStationboard(),
    getStations(),
    handler(),
    favourites(),
);
