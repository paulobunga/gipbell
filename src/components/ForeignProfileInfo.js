import React from 'react';
import { Text, View } from 'native-base';
import { StyleSheet } from "react-native";
import * as variables from "../style/variables";

const ForeignProfileInfo = props => {
    return (
        <View style={style.container}>
            <View style={style.row}>
                <Text style={style.labelText}>Username:</Text>
                <Text style={style.valueText} numberOfLines={1}>{props.user_name}</Text>
            </View>
            <View style={style.row}>
                <Text style={style.labelText}>Name:</Text>
                <Text style={style.valueText} numberOfLines={1}>{props.user_display_name}</Text>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    labelText: {
        color: variables.infoTextColor,
        fontSize: variables.fontSmall
    },
    valueText: {
        color: variables.darkTextColor,
        fontSize: variables.fontXLarge
    },
    row: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    }
});

export default ForeignProfileInfo;
