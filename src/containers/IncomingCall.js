import React from 'react';
import {
    PermissionsAndroid,
    StyleSheet
} from 'react-native';
import { Button, Text, View } from 'native-base';
import { Voximplant } from 'react-native-voximplant';
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import { getUserData } from "../api/user";
import Loader from "../components/Loader";
import ForeignProfileInfo from '../components/ForeignProfileInfo';

class IncomingCall extends React.Component {

    state = {
        remoteParticipant: null,
        isAwaitingResponse: false
    };

    async answer(sendVideo) {
        const { call } = this.props.incomingCall;
        const permissions = [
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ...(sendVideo ? [ PermissionsAndroid.PERMISSIONS.CAMERA ] : [])
        ];
        const permissionsResponse = await PermissionsAndroid.requestMultiple(permissions);
        this.props.setCurrentCall({ call, isVideo: sendVideo });
        this.props.navigation.navigate('Call', {
            isVideo: sendVideo,
            isIncoming: true
        });
    }

    decline() {
        const { call } = this.props.incomingCall;
        call.decline();
    }

    componentDidMount() {
        const { call } = this.props.incomingCall;
        call.on(Voximplant.CallEvents.Disconnected, this.onCallDisconnected);
        call.on(Voximplant.CallEvents.EndpointAdded, this.onCallEndpointAdded);
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
        this.props.removeIncomingCall();
        this.props.onCallDisconnected();
    };

    onCallEndpointAdded = async event => {
        const { userName } = event.endpoint;
        const remoteParticipant = await getUserData(userName);
        this.setState({ remoteParticipant });
    };

    render() {
        if (this.state.isAwaitingResponse) {
            return <Loader />
        } else if (this.state.remoteParticipant) {
            return (
                <View style={style.container}>
                    <ForeignProfileInfo {...this.state.remoteParticipant} />
                    <View style={style.buttonsContainer}>
                        <View style={style.answerButtonsContainer}>
                            <Button success
                                    onPress={e => this.answer(false)}
                            >
                                <Text>Answer (audio)</Text>
                            </Button>
                            <Button success
                                    onPress={e => this.answer(true)}
                            >
                                <Text>Answer (video)</Text>
                            </Button>
                        </View>
                        <Button block
                                style={style.declineButton}
                                danger
                                onPress={e => this.decline()}
                        >
                            <Text>Decline</Text>
                        </Button>
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
        justifyContent: 'center'
    },
    answerButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%'
    },
    declineButton: {
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%'
    }
});

const mapStateToProps = state => state.call;

export default connect(
    mapStateToProps,
    actionCreators,
)(IncomingCall);
