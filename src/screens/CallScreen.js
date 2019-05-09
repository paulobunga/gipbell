import React from 'react';
import { StyleSheet } from 'react-native';
import * as variables from '../style/variables';
import {  Text, Button, View } from 'native-base';

class CallScreen extends React.Component {

    render() {
        return (
            <View style={style.container}>
                <Text>Calling...</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CallScreen;
