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

    render() {
        return (
            <View style={style.container}>
                <Button
                    block
                    primary
                    onPress={() => this.onScan()}
                >
                    <Text>Scan QR code</Text>
                </Button>
                <Button
                    block
                    primary
                    onPress={() => this.onGenerate()}
                    style={style.button}
                >
                    <Text>Generate your QR code</Text>
                </Button>
                <Button
                    block
                    primary
                    onPress={() => this.onEditInfo()}
                    style={style.button}
                >
                    <Text>Edit your information</Text>
                </Button>
                <LogoutButton style={style.button} onLogout={this.onLogout}/>
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
