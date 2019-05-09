import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = {
    currentCall: null,
    incomingCall: null
};

const call = handleActions(
    {
        [actions.setCurrentCall](state, { payload }) {
            return { ...state, currentCall: payload };
        },
        [actions.removeCurrentCall](state) {
            return { ...state, currentCall: { call, isVideo }};
        },
        [actions.setIncomingCall](state, { payload }) {
            const { call, isVideo } = payload;
            return { ...state, incomingCall: { call, isVideo } };
        },
        [actions.removeIncomingCall](state) {
            return { ...state, incomingCall: null };
        }
    },
    initialState,
);

export default call;
