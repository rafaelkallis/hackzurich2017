import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import Checkpoint from "./Checkpoint";
import { connect } from "react-redux";

export default ({ checkpoints }) => (
    <ScrollView>
        <Text>Test</Text>
        {checkpoints.map(checkpoint => <Checkpoint {...checkpoint} />)}
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
