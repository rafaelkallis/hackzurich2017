import {
    GET_CLOSE_DEPARTURES_REQUESTED,
    GET_CLOSE_DEPARTURES_FULFILLED,
    GET_CLOSE_DEPARTURES_ERROR,
} from "./actions";

/*
    Types from http://transport.opendata.ch/docs.html#api-objects
*/

const initialState = {
    data: [
        /* Connection objects */
    ],
    pending: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action) {
        case GET_CLOSE_DEPARTURES_REQUESTED:
            return Object.assign({}, state, { pending: true });
        case GET_CLOSE_DEPARTURES_FULFILLED:
            return Object.assign({}, state, {
                data: action.payload,
                pending: false,
            });
        case GET_CLOSE_DEPARTURES_ERROR:
            return Object.assign({}, state, {
                pending: false,
                error: action.error,
            });
        default:
            return state;
    }
};
