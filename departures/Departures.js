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
import Checkpoints from "../checkpoints/Checkpoints";

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
                    <Departure
                          category={"Category"}
                          to={"Somewhere"}
                          number={"Number"}
                          departureTime={"TIME"}
                    />
                </ScrollView>
            );
        }
    },
);

    // {departures.map(
    //     ({ from, to, category, number, departureTime }) => (
    //         <Departure
    //             key={`${from.name}_${category}_${number}_${departureTime}`}
    //             {...{
    //                 from,
    //                 to,
    //                 category,
    //                 number,
    //                 departureTime,
    //             }}
    //         />
    //     ),
    // )}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
});
