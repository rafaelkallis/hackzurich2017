import { AsyncStorage } from "react-native";

const toggleFavourite = async id => {
    let favourites = [];
    let isFavourite = false;
    id = parseInt(id);
    const favouritesJSON = await AsyncStorage.getItem("favourites");

    if (favouritesJSON) favourites = JSON.parse(favouritesJSON);

    if (!favourites.includes(id)) {
        favourites.push(id);
        isFavourite = true;
    } else {
        favourites = favourites.filter(fav => fav != id);
        isFavourite = false;
    }

    await AsyncStorage.setItem("favourites", JSON.stringify(favourites));

    return isFavourite;
};

export default () => ({ dispatch, getState }) => next => action => {
    switch (action.type) {
        case "TOGGLE_FAVOURITE_REQUESTED":
            toggleFavourite(action.payload).then(isFavourite =>
                dispatch({
                    type: "TOGGLE_FAVOURITE_FULFILLED",
                    payload: {
                        stationId: action.payload,
                        isFavourite,
                    },
                }),
            );
            break;
        case "GET_FAVOURITES_REQUESTED":
            AsyncStorage.getItem("favourites")
                .then(favJSON => JSON.parse(favJSON))
                .then(favourites => {
                    if (favourites !== null) {
                        dispatch({
                            type: "GET_FAVOURITES_FULFILLED",
                            payload: favourites,
                        });
                    }
                });
            break;
    }

    return next(action);
};
