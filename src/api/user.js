import AsyncStorage from "@react-native-community/async-storage";
import { Voximplant } from 'react-native-voximplant';
import { authFailure, authSuccess } from "../actions";
import PushManager from "../manager/PushManager";
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
        client.registerPushNotificationsToken(PushManager.getPushToken());
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

export const loginWithSavedToken = async () => {
    try {
        const user_name = await AsyncStorage.getItem('user_name');
        const { accessToken } = JSON.parse(await AsyncStorage.getItem('tokens'));
        const state = await client.getClientState();
        if (state === Voximplant.ClientState.DISCONNECTED) {
            await client.connect();
        }
        const authResult = await client.loginWithToken(user_name + APP_POSTFIX, accessToken);
        client.registerPushNotificationsToken(PushManager.getPushToken());
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

export const createUser = async data => {
    return axios.post(`${BASE_URL}/user`, {
        ...data
    }).then(res => res.data);
};

export const getUserData = async username => {
    return axios.get(`${BASE_URL}/user`, {
        params: {
            'user_name': username
        }
    }).then(res => res.data);
};

export const getUserDataById = async user_id => {
    return axios.get(`${BASE_URL}/user`, {
        params: {
            'user_id': user_id
        }
    }).then(res => res.data);
};

export const logout = async () => {
    client.unregisterPushNotificationsToken(PushManager.getPushToken());
    return client.disconnect();
};

export const changeName = (newName, userId) => {
    return axios.put(`${BASE_URL}/user`, {
        user_display_name: newName,
        user_id: userId
    }).then(res => res.data);
};

export const changeUsername = (newUsername, userId) => {
    return axios.put(`${BASE_URL}/user`, {
        new_user_name: newUsername,
        user_id: userId
    }).then(res => res.data);
};

export const changePassword = (newPassword, userId) => {
    return axios.put(`${BASE_URL}/user`, {
        user_password: newPassword,
        user_id: userId
    }).then(res => res.data);
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
