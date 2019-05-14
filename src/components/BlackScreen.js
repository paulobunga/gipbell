import React from 'react';
import { StyleSheet, View } from "react-native";

export default props => {
    return (
        <View style={{...props.style, ...style.item}} />
    )
}

const style = StyleSheet.create({
    item: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black'
    }
});
