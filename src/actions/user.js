import { Voximplant } from "react-native-voximplant";
import { createAction } from 'redux-actions';
import * as API from "../api/user";
import AsyncStorage from '@react-native-community/async-storage';

export const authRequest = createAction('USER_AUTH_REQUEST');
export const authFailure = createAction('USER_AUTH_FAILURE');
export const authSuccess = createAction('USER_AUTH_SUCCESS');

export const auth = ({ username, password }) => async dispatch => {
    dispatch(authRequest());
    const { success, error, tokens } = await API.loginWithPassword(username, password);
    if (!success) {
        return dispatch(authFailure(error));
    }
    await Promise.all[
        AsyncStorage.setItem('user_name', username),
        AsyncStorage.setItem('tokens', JSON.stringify(tokens))
    ];
    const data = await API.getUserData(username);
    dispatch(authSuccess(data));
};

export const checkAuth = () => async dispatch => {
    dispatch(authRequest());
    try {
        const user_name = await AsyncStorage.getItem('user_name');
        const state = await Voximplant.getInstance().getClientState();
        if (state === Voximplant.ClientState.LOGGED_IN) {
            const data = await API.getUserData(user_name);
            dispatch(authSuccess(data));
        }
        const { success, error, tokens } = await API.loginWithSavedToken();
        if (!success) {
            return dispatch(authFailure(error));
        }
        const data = await API.getUserData(user_name);
        dispatch(authSuccess(data));
    } catch (e) {
        return dispatch(authFailure(null));
    }

};

export const createUser = data => async dispatch => {
    dispatch(authRequest());
    const res = await API.createUser(data);
    if (res.error) {
        return dispatch(authFailure(res.error.msg));
    }
    const { user_password, user_name } = data;
    dispatch(auth({
        username: user_name,
        password: user_password
    }));
};

export const clearUserData = createAction('USER_CLEAR_DATA');

export const logout = () => async dispatch => {
    dispatch(clearUserData());
    API.logout();
    AsyncStorage.removeItem('user_name');
    AsyncStorage.removeItem('tokens');
};
