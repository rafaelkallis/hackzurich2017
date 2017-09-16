export const stationIdsByDistance = state =>
    Object.values(state.stations.data)
        .map(({ id, name, distance }) => ({ id, distance }))
        .sort((a, b) => parseInt(a.distance, 10) - parseInt(b.distance, 10))
        .map(({ id }) => id);
