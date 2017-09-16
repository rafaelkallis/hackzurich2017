const initState = {};

export default (state = initState, action) => {
    switch (action.type) {
        case "GET_STATIONBOARD_REQUESTED":
            const { stationId } = action.payload;
            return {
                ...state,
                [stationId]: {
                    data: [],
                    pending: true,
                },
            };
        case "GET_STATIONBOARD_FULFILLED":
            const { stationboard } = action.payload;
            return {
                ...state,
                [action.payload.stationId]: {
                    ...state[action.payload.stationId],
                    data: stationboard.map(
                        ({
                            category,
                            number,
                            to,
                            stop: { departureTimestamp },
                        }) => ({
                            category,
                            number,
                            to,
                            departureTimestamp,
                        }),
                    ),
                    pending: false,
                },
            };
        default:
            return state;
    }
};
