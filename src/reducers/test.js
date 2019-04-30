import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = {
    value: 0,
};

const test = handleActions(
    {
        [actions.incValue](state) {
            return { ...state, value: state.value + 1 };
        },
    },
    initialState,
);

export default test;
