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
        /* 
            {
                from,
                to,
                category,
                number,
                departureTime
            }
        */
    ],
    pending: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action) {
        case GET_CLOSE_DEPARTURES_REQUESTED:
            return Object.assign({}, state, { pending: true });
        case GET_CLOSE_DEPARTURES_FULFILLED:
            const journeyData = action.payload;
            const data = journeyData.map(journey => ({
                from: journey.from,
                to: journey.to,
                category: journey.category,
                number: journey.category,
                departureTime: journey.stop.departure,
                checkpoints: journey.passList,
            }));

            return Object.assign({}, state, {
                data,
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
