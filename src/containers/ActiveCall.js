import React from 'react';
import {
    Text,
    View,
    Modal,
    TouchableHighlight,
    Platform,
    SafeAreaView,
    StatusBar,
    FlatList,
    PermissionsAndroid
} from 'react-native';
import { Voximplant } from 'react-native-voximplant';
import { connect } from "react-redux";
import Proximity from 'react-native-proximity';
import * as actionCreators from "../actions";
import VIForegroundService from "@voximplant/react-native-foreground-service";
import CallButton from '../components/CallButton';
import styles from '../style/styles';
import * as variables from '../style/variables';
import BlackScreen from '../components/BlackScreen';
import CALL_STATES from '../constants/callStates';

class ActiveCall extends React.Component {

    componentDidMount() {
        Proximity.addListener(this.onProximityChange);
        const { call, isIncoming, isVideo } = this.props.currentCall;
        Object.keys(Voximplant.CallEvents).forEach((eventName) => {
            const callbackName = `_onCall${eventName}`;
            if (typeof this[callbackName] !== 'undefined') {
                call.on(eventName, this[callbackName]);
            }
        });
        if (isIncoming) {
            call.getEndpoints().forEach(endpoint => {
                this._setupEndpointListeners(endpoint, true);
            });
        }
        Object.keys(Voximplant.Hardware.AudioDeviceEvents).forEach((eventName) => {
            const callbackName = `_onAudio${eventName}`;
            if (typeof this[callbackName] !== 'undefined') {
                Voximplant.Hardware.AudioDeviceManager.getInstance().on(eventName, this[callbackName]);
            }
        });

        if (isIncoming) {
            const callSettings = {
                video: {
                    sendVideo: isVideo,
                    receiveVideo: true
                }
            };
            call.answer(callSettings);
        }
        this.props.setCurrentCallProperty({
            callState: CALL_STATES.CONNECTING
        });
    }

    unsubscribe() {
        const { call } = this.props.currentCall;
        Object.keys(Voximplant.CallEvents).forEach((eventName) => {
            const callbackName = `_onCall${eventName}`;
            if (typeof this[callbackName] !== 'undefined') {
                call.off(eventName, this[callbackName]);
            }
        });
        Object.keys(Voximplant.Hardware.AudioDeviceEvents).forEach((eventName) => {
            const callbackName = `_onAudio${eventName}`;
            if (typeof this[callbackName] !== 'undefined') {
                Voximplant.Hardware.AudioDeviceManager.getInstance().off(eventName, this[callbackName]);
            }
        });
        Proximity.removeListener(this.onProximityChange);
    }

    onProximityChange = e => {
        this.props.setCurrentCallProperty({
            shouldDisableScreen: e.proximity
        })
    };

    muteAudio() {
        const { call } = this.props.currentCall;
        const isMuted = this.props.currentCall.isAudioMuted;
        call.sendAudio(isMuted);
        this.props.setCurrentCallProperty({isAudioMuted: !isMuted});
    }

    async sendVideo(doSend) {
        const { call } = this.props.currentCall;
        try {
            if (doSend && Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    return;
                }
            }
            await call.sendVideo(doSend);
            this.props.setCurrentCallProperty({isVideoSent: doSend});
        } catch (e) {
            console.warn(`Failed to sendVideo(${doSend}) due to ${e.code} ${e.message}`);
        }
    }

    async hold(doHold) {
        const { call } = this.props.currentCall;
        try {
            await call.hold(doHold);
        } catch (e) {
            console.warn('Failed to hold(' + doHold + ') due to ' + e.code + ' ' + e.message);
        }
    }

    async receiveVideo() {
        const { call } = this.props.currentCall;
        try {
            await call.receiveVideo();
        } catch (e) {
            console.warn('Failed to receiveVideo due to ' + e.code + ' ' + e.message);
        }
    }

    endCall() {
        const { call } = this.props.currentCall;
        call.getEndpoints().forEach(endpoint => {
            this._setupEndpointListeners(endpoint, false);
        });
        call.hangup();
    }

    switchKeypad() {
        let isVisible = this.props.isKeypadVisible;
        this.props.setCurrentCallProperty({isKeypadVisible: !isVisible});
    }

    async switchAudioDevice() {
        let devices = await Voximplant.Hardware.AudioDeviceManager.getInstance().getAudioDevices();
        this.props.setCurrentCallProperty({audioDevices: devices, audioDeviceSelectionVisible: true});
    }

    selectAudioDevice(device) {
        Voximplant.Hardware.AudioDeviceManager.getInstance().selectAudioDevice(device);
        this.props.setCurrentCallProperty({audioDeviceSelectionVisible: false});
    }

    _closeModal() {
        this.props.setCurrentCallProperty({isModalOpen: false, modalText: ''});
        this.unsubscribe();
        this.props.removeCurrentCall();
        this.props.onCallEnded();
    }

    _onCallFailed = (event) => {
        this.props.setCurrentCallProperty({
            callState: CALL_STATES.DISCONNECTED,
            isModalOpen: true,
            modalText: 'Call failed: ' + event.reason,
            remoteVideoStreamId: null,
            localVideoStreamId: null,
        });
    };

    _onCallDisconnected = async (event) => {
        try {
            await VIForegroundService.stopService();
        } catch(e) {
            console.log(e);
        }
        this.unsubscribe();
        this.props.removeCurrentCall();
        this.props.onCallEnded();
    };

    _onCallConnected = (event) => {
        this.props.setCurrentCallProperty({
            callState: CALL_STATES.CONNECTED
        });
        if (Platform.OS === 'android' && Platform.Version >= 26) {
            const channelConfig = {
                id: 'ForegroundServiceChannel',
                name: 'In progress calls',
                description: 'Notify the call is in progress',
                enableVibration: false
            };
            const notificationConfig = {
                channelId: 'ForegroundServiceChannel',
                id: 3456,
                title: 'Call in progress',
                text: `You have one call in progress with ${this.props.currentCall.participant.user_display_name}`,
                icon: 'notification_icon'
            };
            (async() => {
                await VIForegroundService.createNotificationChannel(channelConfig);
                await VIForegroundService.startService(notificationConfig);
            })();
        }
    };

    _onCallLocalVideoStreamAdded = (event) => {
        this.props.setCurrentCallProperty({localVideoStreamId: event.videoStream.id});
    };

    _onCallLocalVideoStreamRemoved = (event) => {
        this.props.setCurrentCallProperty({localVideoStreamId: null});
    };

    _onCallEndpointAdded = (event) => {
        this._setupEndpointListeners(event.endpoint, true);
    };

    _onEndpointRemoteVideoStreamAdded = (event) => {
        this.props.setCurrentCallProperty({remoteVideoStreamId: event.videoStream.id});
    };

    _onEndpointRemoteVideoStreamRemoved = (event) => {
        this.props.setCurrentCallProperty({remoteVideoStreamId: null});
    };

    _onEndpointRemoved = (event) => {
        this._setupEndpointListeners(event.endpoint, false);
    };

    _onEndpointInfoUpdated = (event) => {
    };

    _setupEndpointListeners(endpoint, on) {
        Object.keys(Voximplant.EndpointEvents).forEach((eventName) => {
            const callbackName = `_onEndpoint${eventName}`;
            if (typeof this[callbackName] !== 'undefined') {
                endpoint[(on) ? 'on' : 'off'](eventName, this[callbackName]);
            }
        });
    }

    _onAudioDeviceChanged = (event) => {
        switch (event.currentDevice) {
            case Voximplant.Hardware.AudioDevice.BLUETOOTH:
                this.props.setCurrentCallProperty({audioDeviceIcon: 'bluetooth-audio'});
                break;
            case Voximplant.Hardware.AudioDevice.SPEAKER:
                this.props.setCurrentCallProperty({audioDeviceIcon: 'volume-up'});
                break;
            case Voximplant.Hardware.AudioDevice.WIRED_HEADSET:
                this.props.setCurrentCallProperty({audioDeviceIcon: 'headset'});
                break;
            case Voximplant.Hardware.AudioDevice.EARPIECE:
            default:
                this.props.setCurrentCallProperty({audioDeviceIcon: 'hearing'});
                break;
        }
    };

    _onAudioDeviceListChanged = (event) => {
        (async () => {
            let device = await Voximplant.Hardware.AudioDeviceManager.getInstance().getActiveDevice();
        })();
        this.props.setCurrentCallProperty({audioDevices: event.newDeviceList});
    };

    flatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                    marginTop: 10,
                    marginBottom: 10
                }}
            />
        );
    };

    render() {
        if (!this.props.currentCall) {
            return null;
        }
        if (this.props.currentCall.shouldDisableScreen) {
            return (
                <BlackScreen />
            )
        }
        return (
            <SafeAreaView style={styles.safearea}>
                <View style={styles.useragent}>
                    <View style={styles.videoPanel}>
                        {this.props.currentCall.remoteVideoStreamId ?
                            <Voximplant.VideoView
                                style={styles.remotevideo}
                                videoStreamId={this.props.currentCall.remoteVideoStreamId}
                                scaleType={Voximplant.RenderScaleType.SCALE_FIT}/>
                            : null
                        }

                        {this.props.currentCall.isVideoSent ? (
                            <Voximplant.VideoView style={styles.selfview} videoStreamId={this.props.currentCall.localVideoStreamId}
                                                  scaleType={Voximplant.RenderScaleType.SCALE_FIT} showOnTop={true}/>
                        ) : (
                            null
                        )}
                    </View>

                    <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 5}}>
                        <Text style={styles.call_connecting_label}>Status: {this.props.currentCall.callState}</Text>
                    </View>


                    <View style={styles.call_controls}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            backgroundColor: 'transparent'
                        }}>
                            {this.props.currentCall.isAudioMuted ? (
                                <CallButton icon_name='mic-off' color={variables.infoBgColor}
                                            buttonPressed={() => this.muteAudio()}/>
                            ) : (
                                <CallButton icon_name='mic' color={variables.infoBgColor}
                                            buttonPressed={() => this.muteAudio()}/>
                            )}
                            <CallButton icon_name={this.props.currentCall.audioDeviceIcon} color={variables.infoBgColor}
                                        buttonPressed={() => this.switchAudioDevice()}/>
                            {this.props.currentCall.isVideoSent ? (
                                <CallButton icon_name='video-call' color={variables.infoBgColor}
                                            buttonPressed={() => this.sendVideo(false)}/>
                            ) : (
                                <CallButton icon_name='videocam-off' color={variables.infoBgColor}
                                            buttonPressed={() => this.sendVideo(true)}/>
                            )}
                            <CallButton icon_name='call-end' color={variables.dangerBgColor} buttonPressed={() => this.endCall()}/>

                        </View>
                    </View>

                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.props.currentCall.audioDeviceSelectionVisible}
                        onRequestClose={() => {
                        }}>
                        <TouchableHighlight
                            onPress={() => {
                                this.props.setCurrentCallProperty({audioDeviceSelectionVisible: false})
                            }}
                            style={styles.container}>
                            <View style={[styles.container, styles.modalBackground]}>
                                <View style={[styles.innerContainer, styles.innerContainerTransparent]}>
                                    <FlatList
                                        data={this.props.currentCall.audioDevices}
                                        keyExtractor={(item, index) => item}
                                        ItemSeparatorComponent={this.flatListItemSeparator}
                                        renderItem={({item}) => <Text onPress={() => {
                                            this.selectAudioDevice(item)
                                        }}> {item} </Text>}
                                    />
                                </View>
                            </View>
                        </TouchableHighlight>
                    </Modal>


                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.props.currentCall.isModalOpen}
                        onRequestClose={() => {
                        }}>
                        <TouchableHighlight
                            onPress={(e) => this._closeModal()}
                            style={styles.container}>
                            <View style={[styles.container, styles.modalBackground]}>
                                <View
                                    style={[styles.innerContainer, styles.innerContainerTransparent]}>
                                    <Text>{this.props.currentCall.modalText}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </Modal>
                </View>

            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => state.call;

export default connect(
    mapStateToProps,
    actionCreators,
)(ActiveCall);
