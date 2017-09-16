export default () => ({ dispatch, getState }) => next => action => {
    switch (action.type) {
        case "GET_STATIONS_REQUESTED":
            const { latitude, longitude, onlyAdd, stationId } = action.payload;
            let queryString = `?x=${latitude}&y=${longitude}`;

            if (stationId) queryString = `?query=${stationId}`;

            fetch(`http://transport.opendata.ch/v1/locations` + queryString)
                .then(response => response.json())
                .then(({ stations }) => {
                    dispatch({
                        type: "GET_STATIONS_FULFILLED",
                        payload: stations,
                        onlyAdd,
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
