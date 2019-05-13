import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = {
    isAuthorized: false,
    isAwaitingResponse: false,
    errorMessage: null,

    acd_status: null,
    balance: null,
    created: null,
    fixed_balance: null,
    frozen: null,
    live_balance: null,
    modified: null,
    parent_accounting: null,
    two_factor_auth_required: null,
    user_active: null,
    user_display_name: null,
    user_id: null,
    user_name: null,

    nameChange: {
        isAwaitingResponse: false,
        errorMessage: null
    },

    usernameChange: {
        isAwaitingResponse: false,
        errorMessage: null
    },

    passwordChange: {
        isAwaitingResponse: false,
        errorMessage: null
    },
};

const user = handleActions(
    {
        [actions.authRequest](state) {
            return { ...state, isAwaitingResponse: true };
        },
        [actions.authSuccess](state, { payload }) {
            return { ...state, ...payload, errorMessage: null, isAwaitingResponse: false, isAuthorized: true };
        },
        [actions.authFailure](state, { payload }) {
            return { ...state, errorMessage: payload, isAwaitingResponse: false }
        },
        [actions.clearUserData]() {
            return initialState;
        },
        [actions.changeNameRequest](state) {
            return { ...state, nameChange: { isAwaitingResponse: true } };
        },
        [actions.changeNameSuccess](state, { payload }) {
            return {
                ...state,
                nameChange: {
                    isAwaitingResponse: false,
                    errorMessage: null
                },
                user_display_name: payload
            }
        },
        [actions.changeNameFailure](state, { payload }) {
            return {
                ...state,
                nameChange: {
                    isAwaitingResponse: false,
                    errorMessage: payload
                }
            }
        },
        [actions.changeUsernameRequest](state) {
            return { ...state, usernameChange: { isAwaitingResponse: true } };
        },
        [actions.changeUsernameSuccess](state, { payload }) {
            return {
                ...state,
                usernameChange: {
                    isAwaitingResponse: false,
                    errorMessage: null
                },
                user_name: payload
            }
        },
        [actions.changeUsernameFailure](state, { payload }) {
            return {
                ...state,
                passwordChange: {
                    isAwaitingResponse: false,
                    errorMessage: payload
                }
            }
        },
        [actions.changePasswordRequest](state) {
            return { ...state, passwordChange: { isAwaitingResponse: true } };
        },
        [actions.changePasswordSuccess](state, { payload }) {
            return {
                ...state,
                passwordChange: {
                    isAwaitingResponse: false,
                    errorMessage: null
                },
                user_password: payload
            }
        },
        [actions.changePasswordFailure](state, { payload }) {
            return {
                ...state,
                passwordChange: {
                    isAwaitingResponse: false,
                    errorMessage: payload
                }
            }
        },
    },
    initialState,
);

export default user;
