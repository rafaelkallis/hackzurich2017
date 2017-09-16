const generateRandomParts = () => {
    const numParts = Math.floor(Math.random() * 6) + 4;

    const items = [];
    for (var i = 0; i < numParts; i++) {
        const exp = Math.random();
        // Occupationlevels 1-3
        items.push(Math.floor(exp * exp * 3));
    }

    return items;
};

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
                            passList: checkpoints,
                        }) => ({
                            category,
                            number,
                            to,
                            departureTimestamp,
                            checkpoints,
                            occupations: generateRandomParts(),
                        }),
                    ),
                    pending: false,
                },
            };
        default:
            return state;
    }
};
