const endpoint = "http://transport.opendata.ch/v1/";

const fetchApi = (api, query) => {
    const queryString = Object.keys(query)
        .reduce((qs, key) => qs + `&${key}=${query[key]}`, "")
        .slice(1);

    const url = endpoint + api + "?" + queryString;

    return fetch(url).then(response => response.json());
};

export const GET_CLOSE_DEPARTURES_REQUESTED = "GET_CLOSE_DEPARTURES_REQUESTED";
export const GET_CLOSE_DEPARTURES_FULFILLED = "GET_CLOSE_DEPARTURES_FULFILLED";
export const GET_CLOSE_DEPARTURES_ERROR = "GET_CLOSE_DEPARTURES_ERROR";

const getCloseDeparturesRequested = () => ({
    type: GET_CLOSE_DEPARTURES_REQUESTED,
});

const getCloseDeparturesFulfilled = departures => ({
    type: GET_CLOSE_DEPARTURES_FULFILLED,
    payload: departures,
});

const getCloseDeparturesError = error => ({
    type: GET_CLOSE_DEPARTURES_ERROR,
    payload: error,
    error: true,
});

export const getCloseDepartures = (lat, lon) => (dispatch, getState) => {
    dispatch(getCloseDeparturesRequested());

    return fetchApi("locations", {
        x: lat,
        y: lon,
    })
        .then(locations =>
            Promise.all(
                locations.stations.map(location =>
                    fetchApi("stationboard", {
                        station: location.name,
                        id: location.id,
                    }),
                ),
            ),
        )
        .then(stationboardResponses =>
            stationboardResponses.map(response => {
                const stationboard = response.stationboard;
                stationboard.from = response.station;
                return stationboard;
            }),
        )
        .then(stationboards =>
            stationboards.reduce((conns, loc) => conns.concat(loc), []),
        )
        .then(connections => getCloseDeparturesFulfilled(connections))
        .catch(error => dispatch(getCloseDeparturesError(error)));
};
