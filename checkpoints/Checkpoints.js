import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import Checkpoint from "./Checkpoint";
import { connect } from "react-redux";

export default ({ checkpoints }) => (
    <ScrollView style={styles.container}>
        {(checkpoints &&
            checkpoints.map((checkpoint, idx) => (
                <Checkpoint
                    key={`${checkpoint.station.id}_${checkpoint.arrival}`}
                    index={idx}
                    numPoints={checkpoints.length}
                    stationId={checkpoint.station.id}
                />
            ))) ||
            null}
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
});
