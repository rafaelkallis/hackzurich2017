import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    RefreshControl,
    View,
} from "react-native";
import { connect } from "react-redux";
import Checkpoints from "../checkpoints/Checkpoints";
import { stationIdsByDistance } from "../selectors";
import Station from "./Station";

export default connect(state => {
    return {
        stationIds: stationIdsByDistance(state),
        pending: state.stations.pending,
    };
})(
    class extends React.Component {
        componentDidMount() {
            this.props.dispatch({ type: "GET_LOCATION_REQUESTED" });
        }
        render() {
            const { stationIds, pending, dispatch } = this.props;
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={pending}
                            onRefresh={() => {
                                dispatch({ type: "GET_LOCATION_REQUESTED" });
                            }}
                        />
                    }
                    style={styles.container}
                >
                    {stationIds.map(stationId => (
                        <Station key={stationId} stationId={stationId} />
                    ))}
                </ScrollView>
            );
        }
    },
);

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
});
