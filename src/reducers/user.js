import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = {
    isAuthorized: false,
};

const user = handleActions(
    {
        [actions.setAuthorized](state, { payload }) {
            return { ...state, isAuthorized: payload };
        },
    },
    initialState,
);

export default user;
