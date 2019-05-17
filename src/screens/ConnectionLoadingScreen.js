import React from 'react';
import { View, Spinner, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import * as variables from '../style/variables';

export default () => (
    <View style={style.container}>
        <Text style={style.header}>Connection error occurred.</Text>
        <Text style={style.subheader}>Trying to reconnect.</Text>
        <Spinner/>
    </View>
);


const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        color: variables.darkTextColor,
        fontSize: variables.fontLarge,
        textAlign: 'center'
    },
    subheader: {
        marginBottom: 10,
        color: variables.darkTextColor,
        fontSize: variables.fontMedium,
        textAlign: 'center'
    }
});
