import React from 'react';
import { StyleSheet } from 'react-native';
import CallManager from "../managers/CallManager";
import LoginManager from '../managers/LoginManager';
import * as variables from '../style/variables';
import {  Text, View } from 'native-base';
import HomeMenu from '../containers/HomeMenu';

class HomeScreen extends React.Component {

    componentDidMount() {
        CallManager.init();
    }

    componentWillUnmount() {
        LoginManager.destroy();
    }

    render() {
        return (
            <View style={style.container}>
                <Text style={style.header}>Welcome!</Text>
                <HomeMenu navigation={this.props.navigation}/>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: variables.fontXXLarge,
        color: variables.darkTextColor,
        marginBottom: 40
    }
});

export default HomeScreen;
