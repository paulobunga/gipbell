import React from 'react';
import { StyleSheet } from 'react-native';
import { Label, Text, Button, View } from 'native-base';
import { Voximplant } from 'react-native-voximplant';
import {
    PermissionsAndroid,
    Platform
} from 'react-native';
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import { getUserDataById } from "../api/user";
import Loader from '../components/Loader';
import ForeignProfileInfo from '../components/ForeignProfileInfo';

class ForeignProfile extends React.Component {

    state = {
        isGettingData: false,
        userData: null
    };

    async makeCall(isVideoCall) {
        const { userData } = this.state;
        try {
            const permissions = [
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ...(isVideoCall ? [ PermissionsAndroid.PERMISSIONS.CAMERA ] : [])
            ];
            const permissionsResponse = await PermissionsAndroid.requestMultiple(permissions);
            const callSettings = {
                video: {
                    sendVideo: isVideoCall,
                    receiveVideo: true
                }
            };
            const call = await Voximplant.getInstance().call(userData.user_name, callSettings);
            this.props.setCurrentCall({ call, isVideo: isVideoCall, isIncoming: false });
            this.props.onCallMade();
        } catch (e) {
            console.log(e);
        }
    }

    async componentDidMount() {
        this.setState({
            isGettingData: true
        });
        const userData = await getUserDataById(this.props.user_id);
        this.setState({
            userData,
            isGettingData: false
        });
    }

    render() {
        const { userData } = this.state;
        if (this.state.isGettingData) {
            return <Loader />
        } else if (userData) {
            return (
                <View style={style.container}>
                    <ForeignProfileInfo
                        {...userData}
                    />
                    <View style={style.buttonsContainer}>
                        <Button style={style.button}
                            primary
                            onPress={e => this.makeCall(false)}
                            // disabled={this.props.isAwaitingResponse}
                        >
                            <Text>Audio call</Text>
                        </Button>
                        <Button style={style.button}
                            primary
                            onPress={e => this.makeCall(true)}
                            // disabled={this.props.isAwaitingResponse}
                        >
                            <Text>Video call</Text>
                        </Button>
                    </View>
                </View>

            )
        } else {
            return null
        }

    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
    },
    button: {
        marginLeft: 10,
        marginRight: 10
    },
});

const mapStateToProps = state => state.call;

export default connect(
    mapStateToProps,
    actionCreators,
)(ForeignProfile);
