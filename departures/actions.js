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

const getPosition = () => {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject),
    );
};

export const getCloseDepartures = () => (dispatch, getState) => {
    dispatch(getCloseDeparturesRequested());

    getPosition()
        .then(({ coords: { latitude, longitude } }) =>
            fetchApi("locations", {
                x: 47.3901869,
                y: 8.5136578,
            }),
        )
        .then(({ stations }) =>
            Promise.all(
                stations.map(({ name, id }) =>
                    fetchApi("stationboard", {
                        id,
                        station: name,
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
