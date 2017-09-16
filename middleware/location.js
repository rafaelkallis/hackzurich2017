export default () => ({ dispatch, getState }) => next => action => {
    let watchId = null;
    switch (action.type) {
        case "GET_LOCATION_REQUESTED":
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    dispatch({
                        type: "GET_LOCATION_FULFILLED",
                        payload: { latitude, longitude },
                    });
                },
                error => {
                    dispatch({
                        type: "GET_LOCATION_FAILED",
                        payload: error,
                        error: true,
                    });
                },
            );
            break;
        case "START_WATCH_LOCATION_REQUESTED":
            if (watchId === null) {
                watchId = navigator.geolocation.watchPosition(
                    ({ coords: { latitude, longitude } }) => {
                        dispatch({
                            type: "GET_LOCATION_FULFILLED",
                            payload: { latitude, longitude },
                        });
                    },
                    error => {
                        dispatch({
                            type: "GET_LOCATION_FAILED",
                            payload: error,
                            error: true,
                        });
                    },
                );
            }
            break;
        case "STOP_WATCH_LOCATION_REQUESTED":
            if (watchId !== null) {
                navigator.geolocation.clearWatch(watchId);
            }
            watchId = null;
            break;
    }

    return next(action);
};
