const initialState = {
    pending: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_FAVOURITE_REQUESTED":
            const favStationId = action.payload;
            return {
                ...state,
                [favStationId]: {
                    ...state[favStationId],
                    pending: true,
                },
            };
        case "TOGGLE_FAVOURITE_FULFILLED":
            const { stationId, isFavourite } = action.payload;
            return {
                ...state,
                [stationId]: {
                    pending: false,
                    isFavourite,
                },
            };
        case "GET_FAVOURITES_REQUESTED":
            return {
                ...state,
                pending: true,
            };
        case "GET_FAVOURITES_FULFILLED":
            const favourites = action.payload;

            return favourites.reduce(
                (favs, favId) => ({
                    ...favs,
                    [favId]: {
                        pending: false,
                        isFavourite: true,
                    },
                }),
                {},
            );
        default:
            return state;
    }
};
