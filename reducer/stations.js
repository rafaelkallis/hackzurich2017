const initState = {
    data: {},
    pending: false,
};

export default (state = initState, action) => {
    console.log(action.type);
    switch (action.type) {
        case "GET_STATIONS_REQUESTED":
            return {
                ...state,
                pending: true,
            };
        case "GET_STATIONS_FULFILLED":
            return {
                ...state,
                data: action.payload
                    .map(station => ({
                        id: station.id,
                        name: station.name,
                        coordinate: {
                            latitude: station.coordinate.x,
                            longitude: station.coordinate.y,
                        },
                        distance: station.distance,
                    }))
                    .filter(x => x.id !== null)
                    .reduce(
                        (acc, station) => ({ ...acc, [station.id]: station }),
                        {},
                    ),
                pending: false,
            };
        default:
            return state;
    }
};
