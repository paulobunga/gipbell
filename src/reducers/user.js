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
        }
    },
    initialState,
);

export default user;
