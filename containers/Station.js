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

export default connect((state, { stationId }) => {
    // console.log(!state.stations.data[stationId]);
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
                    {departures.map(
                        ({ to, category, number, departureTimestamp }) => (
                            <Departure
                                key={`${to}_${category}_${number}_${departureTimestamp}`}
                                to={to}
                                category={category}
                                number={number}
                                departureTime={departureTimestamp}
                            />
                        ),
                    )}
                </View>
            );
        }
    },
);
