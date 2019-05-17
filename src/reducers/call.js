import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import CALL_STATES from "../constants/callStates";

const initialState = {
    currentCall: null,
    incomingCall: null
};

const call = handleActions(
    {
        [actions.setCurrentCall](state, { payload }) {
            const { call, isVideo, isIncoming, participant } = payload;
            return { ...state, currentCall:
                {
                    call,
                    isVideo,
                    isIncoming,
                    participant,
                    callState: CALL_STATES.CONNECTING,
                    isAudioMuted: false,
                    isVideoSent: isVideo,
                    isKeypadVisible: false,
                    isModalOpen: false,
                    modalText: '',
                    localVideoStreamId: null,
                    remoteVideoStreamId: null,
                    audioDeviceSelectionVisible: false,
                    audioDevices: [],
                    audioDeviceIcon: 'hearing',
                    shouldDisableScreen: false
                }
            };
        },
        [actions.setCurrentCallProperty](state, { payload }) {
            const { currentCall } = state;
            return { ...state, currentCall: { ...currentCall, ...payload } };
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
