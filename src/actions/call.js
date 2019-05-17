import { createAction } from 'redux-actions';

export const setCurrentCall = createAction('CALL_SET_CURRENT');
export const setCurrentCallProperty = createAction('CALL_SET_PROPERTY_CURRENT');
export const removeCurrentCall = createAction('CALL_REMOVE_CURRENT');
export const setIncomingCall = createAction('CALL_SET_INCOMING');
export const removeIncomingCall = createAction('CALL_REMOVE_INCOMING');
