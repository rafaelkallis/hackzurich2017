const initState = {
    data: {},
    allStations: {},
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
        case "GET_STATION_FULFILLED":
            const stationArray = action.payload
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
            return {
                ...state,
                pending: false,
                allStations: {
                    ...state.allStations,
                    ...stationArray,
                },
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
            return {
                ...state,
                allStations: { ...state.allStations, ...stations },
                data: stations,
                pending: false,
            };
        default:
            return state;
    }
};
