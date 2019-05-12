import React from 'react';
import { Voximplant } from 'react-native-voximplant';
import { setIncomingCall, removeIncomingCall } from "../actions";
import { navigate } from "../navigation/navigationService";
import PushManager from '../manager/PushManager';
import { AppState } from 'react-native';
import { store } from '../store';


class CallManager {

    showIncomingCallScreen = false;
    client = Voximplant.getInstance();

    init() {
        this.client.on(Voximplant.ClientEvents.IncomingCall, this.onIncomingCall);
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    onIncomingCall = async e => {
        const { call, video } = e;
        console.log(e);
        if (store.getState().call.currentCall || store.getState().call.incomingCall) {
            return call.decline();
        }
        store.dispatch(setIncomingCall({
            call: call,
            isVideo: video
        }));
        call.on(Voximplant.CallEvents.Disconnected, this.onCallDisconnected);
        call.on(Voximplant.CallEvents.Failed, this.onCallDisconnected);
        call.on(Voximplant.CallEvents.Connected, this.onCallConnected);
        this.showIncomingScreenOrNotification(e)
    };

    onCallDisconnected() {
        if (store.getState().call.currentCall === null) {
            store.dispatch(removeIncomingCall());
        }
        this.showIncomingCallScreen = false;
    }

    onCallConnected() {
        store.dispatch(removeIncomingCall());
    }

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
