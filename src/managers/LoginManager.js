import React from 'react';
import { Voximplant } from 'react-native-voximplant';
import { loginWithSavedToken } from "../api/user";
import { navigate } from "../navigation/navigationService";
import { clearUserData, setConnected, setDisconnected } from '../actions';
import { store } from '../store';

class LoginManager {

    client = Voximplant.getInstance({});

    init() {
        this.client.on(Voximplant.ClientEvents.ConnectionClosed, this.onConnectionClosed);
    }

    destroy() {
        this.client.off(Voximplant.ClientEvents.ConnectionClosed, this.onConnectionClosed);
    }

    onConnectionClosed = () => {
        store.dispatch(setDisconnected());
        navigate('ConnectionLoading');
        const intervalFun = async () => {
            try {
                await this.client.connect();
                await loginWithSavedToken();
                clearInterval(interval);
                store.dispatch(setConnected());
                navigate('Home');
            } catch (e) {
                // ...
            }
        };
        const interval = setInterval(intervalFun, 1000);
        intervalFun();
    };
}

const manager = new LoginManager();

export default manager;
