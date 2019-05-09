import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = {
    currentCall: null,
    incomingCall: null
};

const call = handleActions(
    {
        [actions.setCurrentCall](state, { payload }) {
            const { call, isVideo, isIncoming } = payload;
            return { ...state, currentCall: { call, isVideo, isIncoming } };
        },
        [actions.removeCurrentCall](state) {
            return { ...state, currentCall: null };
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
