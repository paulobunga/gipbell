import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = {
    isConnected: true
};

const connection = handleActions(
    {
        [actions.setConnected](state) {
            return { ...state, isConnected: true };
        },
        [actions.setDisconnected](state) {
            return { ...state, isConnected: false };
        },
    },
    initialState,
);

export default connection;
