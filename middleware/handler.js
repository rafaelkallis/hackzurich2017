export default () => ({ dispatch, getState }) => next => action => {
    switch (action.type) {
        case "GET_LOCATION_FULFILLED":
            const { latitude, longitude } = action.payload;
            dispatch({
                type: "GET_STATIONS_REQUESTED",
                payload: { latitude, longitude },
            });
            break;
        case "GET_STATIONS_FULFILLED":
            action.payload.filter(s => s.id !== null).forEach(({ id }) => {
                dispatch({
                    type: "GET_STATIONBOARD_REQUESTED",
                    payload: { stationId: id },
                });
            });
            break;
    }
    return next(action);
};
