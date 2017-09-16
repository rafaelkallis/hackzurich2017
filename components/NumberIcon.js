import React from "react";
import {StyleSheet, Text} from "react-native";


export default function(props){
        return(
            <Text style={store[props.number]||styles.default}>{props.number}</Text>
        );
    
};

const commonAttr = {
    color: "white",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
    overflow: "hidden",
    fontSize: 20,
};

const styles = StyleSheet.create({
    two:{
        ...commonAttr,
        backgroundColor:"red",
    },
    three:{
        ...commonAttr,
        backgroundColor:"green",
    },
    four:{
        ...commonAttr,
        backgroundColor:"purple",
    },
    five:{
        ...commonAttr,
        backgroundColor:"brown",
    },
    six:{
        ...commonAttr,
        backgroundColor:"brown",
    },
    seven:{
        ...commonAttr,
        backgroundColor:"black",
    },
    eight:{
        ...commonAttr,
        backgroundColor:"green",
    },
    nine:{
        ...commonAttr,
        backgroundColor:"maroon",
    },
    ten:{
        ...commonAttr,
        backgroundColor:"red",
    },
    eleven:{
        ...commonAttr,
        backgroundColor:"green",
    },
    thirteen:{
        ...commonAttr,
        backgroundColor:"orange",
    },
    forteen:{
        ...commonAttr,
        backgroundColor:"teal",
    },
    fifteen:{
        ...commonAttr,
        backgroundColor:"red",
    },
    seventeen:{
        ...commonAttr,
        backgroundColor:"purple",
    },
    default:{ 
        ...commonAttr,
        backgroundColor:"darkblue",
    },
});

const store = {
    2: styles.two,
    3: styles.three,
    4: styles.four,
    5: styles.five,
    6: styles.six,
    7: styles.seven,
    8: styles.eight,
    9: styles.nine,
    10: styles.ten,
    11: styles.eleven,
    13: styles.thirteen,
    14: styles.forteen,
    15: styles.fifteen,
    17: styles.seventeen,    
}