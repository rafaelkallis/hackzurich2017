import React from "react";
import Departure from "../components/Departure";
import {
    StyleSheet,
    Button,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    View,
    Modal,
    Text,
} from "react-native";
import { connect } from "react-redux";
import Checkpoints from "../checkpoints/Checkpoints";
import SwipeList from "react-native-smooth-swipe-list";

const generateRandomParts = () => {
    const numParts = Math.floor(Math.random() * 6) + 4;

    const items = [];
    for (var i = 0; i < numParts; i++) {
        const exp = Math.random();
        // Occupationlevels 1-3
        items.push(Math.floor(exp * exp * 3));
    }

    return items;
};

const departureRowData = (setSelectedDeparture, departure) => {
    const occupations = generateRandomParts();
    const { to, category, number, departureTimestamp } = departure;

    return {
        id: `${category}_${number}_${departureTimestamp}`,
        leftSubViewOptions: {
            fullWidth: true,
        },
        leftSubView: (
            <View style={styles.warnView}>
                <View style={styles.partsWrapper}>
                    {occupations.map((occupation, idx, parts) => {
                        const partStyles = [styles.part];
                        switch (occupation) {
                            case 1:
                                partStyles.push(styles.partWarnOccupied);
                                break;
                            case 2:
                                partStyles.push(styles.partOccupied);
                                break;
                        }

                        if (idx === 0) partStyles.push(styles.partLeft);
                        if (idx === parts.length - 1)
                            partStyles.push(styles.partRight);

                        return (
                            <View key={idx} style={partStyles}>
                                <View style={styles.partClass}>
                                    <Text style={styles.partNumber}>
                                        {Math.round(Math.random())}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        ),
        rowView: (
            <Departure
                key={`${to}_${category}_${number}_${departureTimestamp}`}
                to={to}
                category={category}
                number={number}
                departureTime={departureTimestamp}
                onPress={() => setSelectedDeparture(departure)}
                occupation={Math.round(
                    occupations.reduce((a, b) => a + b, 0) /
                        (occupations.length || 1),
                )}
            />
        ),
        style: styles.white,
    };
};

export default connect((state, { stationId }) => {
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
        constructor(props) {
            super(props);
            this.state = {
                selectedDeparture: null,
            };
        }
        setSelectedDeparture = departure => {
            this.setState({ selectedDeparture: departure });
        };
        hideModal = () => {
            this.setState({ selectedDeparture: null });
        };
        render() {
            const { ready, name, pending, departures } = this.props;
            if (!ready) {
                return null;
            }
            return (
                <View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={!!this.state.selectedDeparture}
                        onRequestClose={() => null}
                    >
                        <View style={styles.modal}>
                            <Checkpoints
                                checkpoints={
                                    this.state.selectedDeparture &&
                                    this.state.selectedDeparture.checkpoints
                                }
                            />
                            <Button
                                onPress={this.hideModal}
                                style={styles.modalButton}
                                title="Dismiss"
                            />
                        </View>
                    </Modal>

                    <SwipeList
                        rowData={departures.map(departure =>
                            departureRowData(
                                this.setSelectedDeparture,
                                departure,
                            ),
                        )}
                    />
                </View>
            );
        }
    },
);

const styles = StyleSheet.create({
    white: {
        backgroundColor: "white",
    },
    lightgold: {
        backgroundColor: "lightgoldenrodyellow",
    },
    warnView: {
        flex: 1,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    partsWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
    },
    part: {
        flex: 1,
        alignItems: "center",
        width: 35,
        height: 20,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "black",
        marginTop: "-5%",
        marginRight: 5,
    },
    partLeft: {
        borderTopLeftRadius: 8,
    },
    partRight: {
        borderTopRightRadius: 8,
        marginRight: 0,
    },
    partWarnOccupied: {
        backgroundColor: "#ffcc80",
    },
    partOccupied: {
        backgroundColor: "#ef9a9a",
    },
    modal: {
        flex: 1,
        marginTop: 20,
    },
    modalButton: {
        flex: -1,
        justifyContent: "center",
        alignItems: "center",
        margin: 16,
        padding: 16,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#aaa",
        color: "blue",
    },
    partClass: {
        marginTop: 25,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#01579b",
        backgroundColor: "#039be5",
    },
    partNumber: {
        color: "white",
    },
});
