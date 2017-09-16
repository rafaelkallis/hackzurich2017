import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function({ to, category, number, departureTime }) {
    return (
        <View style={styles.departure}>
            <View style={styles.departureLeft}>
              <Text>
                <Text style={styles.category}>{category} - </Text>
                <Text style={styles.number}>{number}</Text>
              </Text>
              <Text style={styles.to}>{to}</Text>
            </View>
            <View style={styles.departureRight}>
              <Text style={styles.departureTime}>{departureTime}</Text>
            </View>
        </View>

    );
};


const styles = StyleSheet.create({
  departure:{
    marginTop:4,
    flex: 1,
    flexDirection: 'row',
  },
  departureLeft:{
    flex: 1,
    backgroundColor:'red',
    alignItems:'center',
  },
  departureRight:{
    flex:1,
    backgroundColor:'blue',
    alignItems:'center',
  },
  category:{
    color:'green',
    fontSize:20,
  },
  number:{
    color:'green',
  },
  to:{
    color:'yellow',
  },
  departureTime:{

  },

});
