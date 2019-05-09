import React from 'react';
import { Text, View } from 'native-base';
import { StyleSheet } from "react-native";
import * as variables from "../style/variables";

const ForeignProfileInfo = props => {
    return (
        <View style={style.container}>
            <View style={style.row}>
                <View style={style.label}>
                    <Text style={style.labelText}>Username:</Text>
                </View>
                <View style={style.value}>
                    <Text style={style.valueText}>{props.user_name}</Text>
                </View>
            </View>
            <View style={style.row}>
                <View style={style.label}>
                    <Text style={style.labelText}>Name:</Text>
                </View>
                <View style={style.value}>
                    <Text style={style.valueText}>{props.user_display_name}</Text>
                </View>
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
    label: {
        width: '50%'
    },
    labelText: {
        color: variables.mutedTextColor,
        textAlign: 'right',
        fontSize: variables.fontMedium
    },
    value: {
        width: '50%',
        marginLeft: 20
    },
    valueText: {
        color: variables.darkTextColor,
        fontSize: variables.fontLarge
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    }
});

export default ForeignProfileInfo;
