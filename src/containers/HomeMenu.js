import { Button, Text, View } from "native-base";
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import LogoutButton from "../containers/LogoutButton";
import * as actionCreators from '../actions';

class HomeMenu extends React.Component {

    onScan() {
        this.props.navigation.navigate('CodeScanner')
    }

    onGenerate() {
        this.props.navigation.navigate('CodeGenerator')
    }

    onEditInfo() {
        this.props.navigation.navigate('EditInfo');
    }

    onLogout = () => {
        this.props.navigation.navigate('Auth');
    };

    onActiveCall = () => {
        this.props.navigation.navigate('ActiveCall');
    };

    getButtons() {
        const { currentCall } = this.props.call;
        const logoutButton = <LogoutButton style={style.button} onLogout={this.onLogout}/>;
        if (currentCall) {
            return (
                <View style={{ width: '100%'}}>
                    <Button
                        block
                        success
                        onPress={() => this.onActiveCall()}
                    >
                        <Text>Active call</Text>
                    </Button>
                    {logoutButton}
                </View>
            )
        } else {
            return (
                <View style={{ width: '100%'}}>
                    <Button
                        block
                        primary
                        onPress={() => this.onScan()}
                        style={style.button}
                    >
                        <Text>Scan QR code</Text>
                    </Button>
                    <Button
                        block
                        primary
                        onPress={() => this.onGenerate()}
                        style={style.button}
                    >
                        <Text>Get your QR code</Text>
                    </Button>
                    <Button
                        block
                        primary
                        onPress={() => this.onEditInfo()}
                        style={style.button}
                    >
                        <Text>Edit your information</Text>
                    </Button>
                    {logoutButton}
                </View>
            )
        }
    }

    render() {
        return (
            <View style={style.container}>
                {this.getButtons()}
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        width: '100%'
    },
    button: {
        marginTop: 10
    }
});

const mapStateToProps = state => state;

export default connect(
    mapStateToProps,
    actionCreators,
)(HomeMenu);
