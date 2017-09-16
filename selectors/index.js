export const stationsByDistance = state =>
    Object.values(state.stations.data)
        .map(({ id, name, distance }) => ({
            id,
            name,
            distance,
            isFavouritePending:
                state.favourites[id] && state.favourites[id].pending,
            isFavourite:
                state.favourites[id] && state.favourites[id].isFavourite,
        }))
        .sort((a, b) => parseInt(a.distance, 10) - parseInt(b.distance, 10));
