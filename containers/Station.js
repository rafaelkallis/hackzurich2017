import React from "react";
import Departure from "../components/Departure";
import {
    StyleSheet,
    Text,
    ScrollView,
    RefreshControl,
    View,
} from "react-native";
import { connect } from "react-redux";
import Checkpoints from "../checkpoints/Checkpoints";
import SwipeList from "react-native-smooth-swipe-list";
import Icon from "react-native-vector-icons/FontAwesome";

const toggleFavourite = async id => {
    let favourites = [];
    let isFavourite = false;
    const favouritesJSON = await AsyncStorage.getItem("favourites");

    if (favouritesJSON) favourites = JSON.parse(favouritesJSON);

    if (!(isFavourite = favourites.includes(id))) favourites.push(id);
    else favourites = favourites.filter(fav => fav !== id);

    await AsyncStorage.setItem("favourites", JSON.stringify(favourites));

    return isFavourite;
};

const generateRandomParts = () => {
    const numParts = Math.floor(Math.random() * 4) + 2;

    const items = [];
    for (var i = 0; i < numParts; i++)
        // Occupationlevels 1-3
        items.push(Math.floor(Math.random() * 3));

    return items;
};

const departureRowData = ({
    favourite,
    to,
    category,
    number,
    departureTimestamp,
}) => ({
    id: `${category}_${number}_${departureTimestamp}`,
    leftSubViewOptions: {
        fullWidth: true,
    },
    leftSubView: (
        <View style={styles.warnView}>
            {generateRandomParts().map((occupation, idx, parts) => {
                const partStyles = [styles.part];
                switch (occupation) {
                    case 1:
                        partStyles.push(styles.partWarnOccupied);
                        break;
                    case 2:
                        partStyles.push(styles.partOccupied);
                        break;
                }

                if (idx === 0) partStyles.push(styles.partLeft);
                if (idx === parts.length - 1) partStyles.push(styles.partRight);

                return <View key={idx} style={partStyles} />;
            })}
        </View>
    ),
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
            key={`${to}_${category}_${number}_${departureTimestamp}`}
            to={to}
            category={category}
            number={number}
            departureTime={departureTimestamp}
        />
    ),
    style: favourite ? styles.lightgold : styles.white,
});

export default connect((state, { stationId }) => {
    const station = state.stations.data[stationId];
    const stationboard = state.stationboards[stationId];
    if (!station || !stationboard) {
        return { ready: false };
    }
    return {
        ready: true,
        name: station.name,
        distance: station.distance,
        pending: stationboard.pending,
        departures: stationboard.data,
    };
})(
    class extends React.Component {
        render() {
            const { ready, name, pending, departures } = this.props;
            if (!ready) {
                return null;
            }
            return (
                <View>
                    <Text>{name}</Text>
                    <SwipeList rowData={departures.map(departureRowData)} />
                    {/* {departures.map(
                        ({ to, category, number, departureTimestamp }) => (
                            <Departure
                                key={`${to}_${category}_${number}_${departureTimestamp}`}
                                to={to}
                                category={category}
                                number={number}
                                departureTime={departureTimestamp}
                            />
                        ),
                    )} */}
                </View>
            );
        }
    },
);

const styles = StyleSheet.create({
    white: {
        backgroundColor: "white",
    },
    lightgold: {
        backgroundColor: "lightgoldenrodyellow",
    },
    warnView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgoldenrodyellow",
    },
    part: {
        width: 60,
        height: 20,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "black",
        marginRight: 5,
    },
    partLeft: {
        borderTopLeftRadius: 4,
    },
    partRight: {
        borderTopRightRadius: 4,
        marginRight: 0,
    },
    partWarnOccupied: {
        backgroundColor: "#ffcc80",
    },
    partOccupied: {
        backgroundColor: "#ef9a9a",
    },
    rightSubView: {
        flex: -1,
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: "100%",
        backgroundColor: "steelblue",
    },
});
