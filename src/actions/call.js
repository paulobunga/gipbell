import { createAction } from 'redux-actions';
import { Voximplant } from 'react-native-voximplant';

const client = Voximplant.getInstance();

export const setCurrentCall = createAction('CALL_SET_CURRENT');
export const removeCurrentCall = createAction('CALL_REMOVE_CURRENT');
export const setIncomingCall = createAction('CALL_SET_INCOMING');
export const removeIncomingCall = createAction('CALL_REMOVE_INCOMING');
