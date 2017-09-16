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

export const getCloseDepartures = () => async (dispatch, getState) => {
    dispatch(getCloseDeparturesRequested());
    try {
        const { coords: { latitude, longitude } } = await getPosition();
        const { stations } = await fetchApi("locations", {
            x: 47.3901869,
            y: 8.5136578,
        });

        const stationBoards = await Promise.all(
            stations.slice(0, 3).map(async ({ id, name }) => {
                const { stationboard } = await fetchApi("stationboard", {
                    id,
                    station: name,
                });

                return stationboard;
            }),
        );

        const journeys = stationBoards.reduce(
            (conns, loc) => conns.concat(loc),
            [],
        );

        dispatch(getCloseDeparturesFulfilled(journeys));
    } catch (error) {
        dispatch(getCloseDeparturesError(error));
    }
};
