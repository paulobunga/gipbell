import React from 'react';
import { Voximplant } from 'react-native-voximplant';
import { setIncomingCall, removeIncomingCall } from "../actions";
import { navigate } from "../navigation/navigationService";
import PushManager from '../manager/PushManager';
import { AppState, Vibration } from 'react-native';
import { store } from '../store';
import Sound  from 'react-native-sound';
Sound.setCategory('Ring');

class CallManager {

    showIncomingCallScreen = false;
    client = Voximplant.getInstance();
    sound = new Sound('ringtone.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
        }
        this.sound.setNumberOfLoops(-1);
    });

    init() {
        this.client.on(Voximplant.ClientEvents.IncomingCall, this.onIncomingCall);
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    onIncomingCall = async e => {
        this.sound.play();
        Vibration.vibrate([ 0, 400, 200, 400, 200, 400, 200, 400, 200, 400 ]);
        const { call, video } = e;
        if (store.getState().call.currentCall || store.getState().call.incomingCall) {
            return call.decline();
        }
        store.dispatch(setIncomingCall({
            call: call,
            isVideo: video
        }));
        call.on(Voximplant.CallEvents.Disconnected, this.onCallDisconnected);
        call.on(Voximplant.CallEvents.Failed, this.onCallFailed);
        call.on(Voximplant.CallEvents.Connected, this.onCallConnected);
        this.showIncomingScreenOrNotification(e)
    };

    stopSound() {
        this.sound.stop(() => {});
    }

    onCallDisconnected = e => {
        if (store.getState().call.currentCall === null) {
            store.dispatch(removeIncomingCall());
        }
        this.showIncomingCallScreen = false;
        this.stopSound();
    };

    onCallFailed = e => {
        this.stopSound();
    };

    onCallConnected = e => {
        store.dispatch(removeIncomingCall());
    };

    showIncomingScreenOrNotification(e) {
        if (AppState.currentState !== 'active') {
            PushManager.showLocalNotification();
            this.showIncomingCallScreen = true;
        } else {
            navigate('IncomingCall');
        }
    }

    handleAppStateChange = (newState) => {
        if (AppState.currentState === 'active' && store.getState().call.incomingCall !== null) {
            this.showIncomingCallScreen = false;
            PushManager.removeDeliveredNotification();
            navigate('IncomingCall');
        }
        if (AppState.currentState === 'active' && store.getState().call.currentCall !== null) {
            navigate('ActiveCall');
        }
    };
}

const callManager = new CallManager();

export default callManager;
