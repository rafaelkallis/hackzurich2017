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
import { stationsByFavouriteAndDistance } from "../selectors";
import Station from "./Station";
import Accordion from "react-native-collapsible/Accordion";
import Icon from "react-native-vector-icons/FontAwesome";

export default connect(state => {
    return {
        stations: stationsByFavouriteAndDistance(state),
        pending: state.stations.pending,
    };
})(
    class extends React.Component {
        componentDidMount() {
            this.props.dispatch({ type: "GET_STATIONS_REQUESTED" });
        }
        render() {
            const { stations, pending, dispatch } = this.props;
            return (
                <View>
                    <View style={styles.header}>
                        <Text style={styles.title}>Stations</Text>
                    </View>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={pending}
                                onRefresh={() => {
                                    dispatch({
                                        type: "GET_STATIONS_REQUESTED",
                                    });
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
                                    <Text style={styles.headerText}>
                                        {name}
                                    </Text>
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
                                            name={
                                                isFavourite ? "star" : "star-o"
                                            }
                                            size={30}
                                            color="gold"
                                        />
                                    )}
                                </View>
                            )}
                            renderContent={({ id }) => (
                                <Station key={id} stationId={id} />
                            )}
                            easing="easeInOutCubic"
                            underlayColor="#ddd"
                        />
                    </ScrollView>
                </View>
            );
        }
    },
);

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    header: {
        paddingTop: 16,
        paddingLeft: 12,
        paddingBottom: 16,
        backgroundColor: "#42a5f5",
    },
    title: {
        fontSize: 20,
    },
    accordionHeader: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        height: 60,
    },
    headerText: {
        fontSize: 16,
        flexGrow: 1,
    },
});
