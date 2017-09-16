export default () => ({ dispatch, getState }) => next => action => {
    switch (action.type) {
        case "GET_STATION_REQUESTED":
            const stationId = action.payload;

            fetch(
                `http://transport.opendata.ch/v1/locations?query=${stationId}`,
            )
                .then(response => response.json())
                .then(({ stations }) => {
                    dispatch({
                        type: "GET_STATION_FULFILLED",
                        payload: stations,
                    });
                })
                .catch(e => {
                    dispatch({
                        type: "GET_STATION_FAILED",
                        payload: e,
                        error: true,
                    });
                });
            break;
        case "GET_STATIONS_REQUESTED":
            const { latitude, longitude } = action.payload;

            fetch(
                `http://transport.opendata.ch/v1/locations?x=${latitude}&y=${longitude}`,
            )
                .then(response => response.json())
                .then(({ stations }) => {
                    dispatch({
                        type: "GET_STATIONS_FULFILLED",
                        payload: stations,
                    });
                })
                .catch(e => {
                    dispatch({
                        type: "GET_STATIONS_FAILED",
                        payload: e,
                        error: true,
                    });
                });
            break;
    }
    return next(action);
};
