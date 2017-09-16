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

export default connect(state => ({
    pending: state.departures.pending,
    departures: state.departures.data,
}))(({ pending, departures, dispatch }) => (
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
        {departures.map(({ from, to, category, number, departureTime }) => (
            <Departure
                key={`${category}_${number}_${departureTime}`}
                {...{ from, to, category, number, departureTime }}
            />
        ))}
    </ScrollView>
));

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
});
