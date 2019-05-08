import React from 'react';
import { View, Spinner } from 'native-base';
import { StyleSheet } from 'react-native';

export default () => (
    <View style={style.container}>
        <Spinner/>
    </View>
);


const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
