import React from "react";
import Departure from "../departure";
import {
    StyleSheet,
    Text,
    ScrollView,
    RefreshControl,
    View,
} from "react-native";
import { connect } from "react-redux";
import { getCloseDepartures } from "./actions";
import SwipeList from "react-native-smooth-swipe-list";
import Checkpoints from "../checkpoints/Checkpoints";
import Icon from "react-native-vector-icons/FontAwesome";

const toggleFavourite = async id => {
    const favourites = [];
    const isFavourite = false;
    const favouritesJSON = await AsyncStorage.getItem("favourites");

    if (favouritesJSON) favourites = JSON.parse(favouritesJSON);

    if (!(isFavourite = favourites.includes(id))) favourites.push(id);
    else favourites.filter(fav => fav !== id);

    await AsyncStorage.setItem("favourites", JSON.stringify(favourites));

    return isFavourite;
};

const departureRowData = ({
    favourite,
    from,
    to,
    category,
    number,
    departureTime,
}) => ({
    id: `${from.name}_${category}_${number}_${departureTime}`,
    rightSubView: (
        <View style={styles.rightSubView}>
            <Text>
                <Icon
                    name={favourite ? "star" : "star-o"}
                    size={20}
                    color="gold"
                />
            </Text>
        </View>
    ),
    rowView: (
        <Departure
            key={`${from.name}_${category}_${number}_${departureTime}`}
            {...{
                from,
                to,
                category,
                number,
                departureTime,
            }}
        />
    ),
    style: styles.row,
});

export default connect(state => ({
    pending: state.departures.pending,
    departures: state.departures.data,
}))(
    class extends React.Component {
        componentDidMount() {
            this.props.dispatch(getCloseDepartures());
        }
        render() {
            const { pending, departures, dispatch } = this.props;
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={pending}
                            onRefresh={() => {
                                dispatch(getCloseDepartures());
                            }}
                        />
                    }
                    style={styles.container}
                >
                    <SwipeList rowData={departures.map(departureRowData)} />
                </ScrollView>
            );
        }
    },
);

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    row: {
        backgroundColor: "white",
    },
    rightSubView: {
        flex: -1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "steelblue",
        width: 80,
        height: "100%",
    },
});
