import React from 'react';
import { StyleSheet } from 'react-native';
import * as variables from '../style/variables';
import {  Text, Button, View } from 'native-base';
import IncomingCall from '../containers/IncomingCall';

class IncomingCallScreen extends React.Component {
    onCallDisconnected = () => {
        this.props.navigation.goBack();
    };

    onCallAnswered = () => {
        this.props.navigation.replace('ActiveCall');
    };

    render() {
        return (
            <View style={style.container}>
                <Text style={style.header}>Incoming call</Text>
                <IncomingCall
                    onCallDisconnected={this.onCallDisconnected}
                    onCallAnswered={this.onCallAnswered}
                />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: variables.fontXXLarge,
        color: variables.primaryTextColor,
        marginBottom: 30
    }
});

export default IncomingCallScreen;
