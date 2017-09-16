import React from "react";
import { StyleSheet, Text, ScrollView, RefreshControl } from "react-native";
import { connect } from "react-redux";

export default connect(state => ({ pending: state.pending }))(props => (
    <ScrollView
        refreshControl={
            <RefreshControl
                refreshing={props.pending}
                onRefresh={() => {
                    {
                        /* props.dispatch(); */
                    }
                }}
            />
        }
    >
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
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
