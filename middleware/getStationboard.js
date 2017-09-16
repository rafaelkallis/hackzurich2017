export default () => ({ dispatch, getState }) => next => action => {
    switch (action.type) {
        case "GET_STATIONBOARD_REQUESTED":
            const { stationId } = action.payload;
            fetch(
                `http://transport.opendata.ch/v1/stationboard?id=${stationId}&limit=10&fields[]=stationboard/to&fields[]=stationboard/stop/departureTimestamp&fields[]=stationboard/category&fields[]=stationboard/number&fields[]=stationboard/passList`,
            )
                .then(response => response.json())
                .then(({ stationboard }) => {
                    dispatch({
                        type: "GET_STATIONBOARD_FULFILLED",
                        payload: { stationId, stationboard },
                    });
                })
                .catch(e => {
                    dispatch({
                        type: "GET_STATIONBOARD_FAILED",
                        payload: e,
                        error: true,
                    });
                });
            break;
    }
    return next(action);
};
