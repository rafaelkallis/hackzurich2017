import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    RefreshControl,
    View,
    ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import Checkpoints from "../checkpoints/Checkpoints";
import { stationsByDistance } from "../selectors";
import Station from "./Station";
import Accordion from "react-native-collapsible/Accordion";
import Icon from "react-native-vector-icons/FontAwesome";

export default connect(state => {
    return {
        stations: stationsByDistance(state),
        pending: state.stations.pending,
    };
})(
    class extends React.Component {
        componentDidMount() {
            this.props.dispatch({ type: "GET_LOCATION_REQUESTED" });
        }
        render() {
            const { stations, pending, dispatch } = this.props;
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
                    <Accordion
                        sections={stations}
                        renderHeader={({
                            id,
                            name,
                            isFavouritePending,
                            isFavourite,
                        }) => (
                            <View style={styles.accordionHeader}>
                                <Text style={styles.headerText}>{name}</Text>
                                {isFavouritePending ? (
                                    <ActivityIndicator animating={true} />
                                ) : (
                                    <Icon
                                        onPress={() =>
                                            this.props.dispatch({
                                                type:
                                                    "TOGGLE_FAVOURITE_REQUESTED",
                                                payload: id,
                                            })}
                                        name={isFavourite ? "star" : "star-o"}
                                        size={20}
                                        color="gold"
                                    />
                                )}
                            </View>
                        )}
                        renderContent={({ id }) => (
                            <View>
                                <Station key={id} stationId={id} />
                            </View>
                        )}
                        easing="easeInOutCubic"
                        underlayColor="#ddd"
                    />
                </ScrollView>
            );
        }
    },
);

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    accordionHeader: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    headerText: {
        fontSize: 16,
        flexGrow: 1,
    },
});