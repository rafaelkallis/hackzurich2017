const initState = {
    data: {},
    allStations: {},
    pending: false,
};

export default (state = initState, action) => {
    switch (action.type) {
        case "GET_STATIONS_REQUESTED":
            return {
                ...state,
                pending: true,
            };
        case "GET_STATIONS_FULFILLED":
            const stations = action.payload
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
                );
            if (action.onlyAdd) console.log(action.payload);
            return {
                ...state,
                allStations: { ...state.allStations, ...stations },
                data: action.onlyAdd ? state.data : stations,
                pending: false,
            };
        default:
            return state;
    }
};
