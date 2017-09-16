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
}))(({ pending, departures }) => (
    <ScrollView
        refreshControl={
            <RefreshControl
                refreshing={pending}
                onRefresh={() => {
                    props.dispatch(getCloseDepartures());
                }}
            />
        }
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
        flex: 1,
        backgroundColor: "#fff",
        marginTop: "auto",
        // alignItems: "center",
        // justifyContent: "center",
    },
});
