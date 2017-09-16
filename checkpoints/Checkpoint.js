import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

export default connect(({ stations }, { stationId }) => ({
    station: stations.allStations[stationId],
}))(
    class extends React.Component {
        componentDidMount() {
            if (!this.props.station)
                this.props.dispatch({
                    type: "GET_STATIONS_REQUESTED",
                    payload: {
                        stationId: parseInt(this.props.stationId),
                        onlyAdd: true,
                    },
                });
        }

        render() {
            const { station, index, numPoints } = this.props;
            const dotStyle = [styles.dot];
            const lineStyle = [styles.line];

            if (index === 0) {
                dotStyle.push(styles.firstDot);
                lineStyle.push(styles.firstLine);
            }

            if (index === numPoints - 1) lineStyle.push(styles.lastLine);

            return (
                (station &&
                station.name && (
                    <View style={styles.container}>
                        <View style={dotStyle} />
                        <View style={lineStyle} />
                        <Text style={styles.text}>{station.name}</Text>
                    </View>
                )) ||
                null
            );
        }
    },
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        height: 60,
        alignItems: "center",
        paddingLeft: 16,
    },
    line: {
        height: "100%",
        width: 2,
        backgroundColor: "#ddd",
        zIndex: 0,
        marginLeft: -7,
        marginRight: 20,
    },
    firstLine: {
        height: "50%",
        marginTop: 30,
        marginLeft: -9,
    },
    lastLine: {
        height: "50%",
        marginTop: -30,
    },
    firstDot: {
        width: 16,
        height: 16,
        marginLeft: 6,
        backgroundColor: "#999",
    },
    dot: {
        borderRadius: 100,
        backgroundColor: "#bbb",
        width: 12,
        height: 12,
        marginLeft: 8,
        zIndex: 100,
    },
    text: {},
});
