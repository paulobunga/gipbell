import React from 'react';
import {
    PermissionsAndroid,
    StyleSheet
} from 'react-native';
import { Button, Text, View, Spinner } from 'native-base';
import { Voximplant } from 'react-native-voximplant';
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import { getUserData } from "../api/user";
import ForeignProfileInfo from '../components/ForeignProfileInfo';
import CallManager from '../managers/CallManager';
import * as variables from "../style/variables";
import CallButton from "../components/CallButton";

class IncomingCall extends React.Component {

    state = {
        participant: null,
        isAwaitingResponse: false
    };

    async answer(sendVideo) {
        CallManager.stopSound();
        const { call } = this.props.incomingCall;
        const permissions = [
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ...(sendVideo ? [ PermissionsAndroid.PERMISSIONS.CAMERA ] : [])
        ];
        const permissionsResponse = await PermissionsAndroid.requestMultiple(permissions);
        this.props.setCurrentCall({
            call,
            isVideo: sendVideo,
            isIncoming: true,
            participant: this.state.participant
        });
        this.props.onCallAnswered();
    }

    decline() {
        const { call } = this.props.incomingCall;
        call.decline();
    }

    async componentDidMount() {
        const { call } = this.props.incomingCall;
        call.on(Voximplant.CallEvents.Disconnected, this.onCallDisconnected);
        const endpoints = call.getEndpoints();
        if (!endpoints.length) {
            call.on(Voximplant.CallEvents.EndpointAdded, this.onCallEndpointAdded);
        } else {
            const { userName } = endpoints[0];
            this.setState({ isAwaitingResponse: true });
            const participant = await getUserData(userName);
            this.setState({ participant, isAwaitingResponse: false });
        }
    }

    componentWillUnmount() {
        if (!this.props.incomingCall) {
            return;
        }
        const { call } = this.props.incomingCall;
        call.off(Voximplant.CallEvents.Disconnected, this.onCallDisconnected);
        call.off(Voximplant.CallEvents.EndpointAdded, this.onCallEndpointAdded);
    }

    onCallDisconnected = (event) => {
        this.props.onCallDisconnected();
    };

    onCallEndpointAdded = async event => {
        this.setState({ isAwaitingResponse: true });
        const { userName } = event.endpoint;
        const participant = await getUserData(userName);
        this.setState({ participant });
    };

    render() {
        if (this.state.isAwaitingResponse) {
            return <Spinner />
        } else if (this.state.participant) {
            return (
                <View style={style.container}>
                    <ForeignProfileInfo {...this.state.participant} />
                    <View style={style.buttonsContainer}>
                            <CallButton
                                icon_name='call'
                                color={variables.sucessBgColor}
                                buttonPressed={() => this.answer(false)}
                                style={style.button}
                            />
                            <CallButton
                                icon_name='videocam'
                                color={variables.sucessBgColor}
                                buttonPressed={() => this.answer(true)}
                                style={style.button}
                            />
                            <CallButton
                                icon_name='call-end'
                                color={variables.dangerBgColor}
                                buttonPressed={() => this.decline()}
                                style={style.button}
                            />
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }
}

const style = StyleSheet.create({
    container: {
        width: '90%'
    },
    buttonsContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    button: {
        marginLeft: 7,
        marginRight: 7
    }
});

const mapStateToProps = state => state.call;

export default connect(
    mapStateToProps,
    actionCreators,
)(IncomingCall);
