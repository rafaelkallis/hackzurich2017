import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import Checkpoint from "./Checkpoint";
import { connect } from "react-redux";

export default ({ checkpoints }) => (
    <ScrollView>
        {(checkpoints &&
            checkpoints.map(checkpoint => (
                <Checkpoint
                    key={`${checkpoint.station.id}_${checkpoint.arrival}`}
                    {...checkpoint}
                />
            ))) ||
            null}
    </ScrollView>
);

/*
<Checkpoints
    checkpoints={[
        {
            station: {
                name: "Zürich",
                type: "Bus",
            },
            arrival: Date.now(),
        },
        {
            station: {
                name: "Bern",
                type: "Zug",
            },
            arrival: Date.now(),
        },
    ]}
/>;
*/
