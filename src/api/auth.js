import { Voximplant } from 'react-native-voximplant';
import { APP_POSTFIX, BASE_URL } from "./constants";
import axios from 'axios';

const client = Voximplant.getInstance({});
client.disconnect();

export const loginWithPassword = async (username, password) => {
    try {
        const state = await client.getClientState();
        if (state === Voximplant.ClientState.DISCONNECTED) {
            await client.connect();
        }
        const authResult = await client.login(username + APP_POSTFIX, password);
        console.log(authResult);
        return {
            success: true,
            error: null,
            tokens: authResult.tokens
        };
    } catch (e) {
        return {
            success: false,
            error: mapCodeToMessage(e.code),
            tokens: null
        }
    }
};

export const loginWithToken = async (username, token) => {
    try {
        const state = await client.getClientState();
        if (state === Voximplant.ClientState.DISCONNECTED) {
            await client.connect();
        }
        const authResult = await client.loginWithToken(username + APP_POSTFIX, token);
        return {
            success: true,
            error: null,
            tokens: authResult.tokens
        };
    } catch (e) {
        return {
            success: false,
            error: e.code,
            tokens: null
        }
    }
};

export const getUserData = async username => {
    return axios.get(`${BASE_URL}/user`, {
        params: {
            'user_name': username
        }
    }).then(res => res.data);
};

export const logout = async () => {
    return client.disconnect();
};

const mapCodeToMessage = code => {
    switch (code) {
        case 401:
            return 'Invalid password';
        case 403:
            return 'Account frozen';
        case 404:
            return 'Invalid username';
        case 701:
            return 'Token expired';
        default:
        case 500:
            return 'Internal error';
    }
};
