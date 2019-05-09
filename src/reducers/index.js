import { combineReducers } from 'redux';
import user from './user';
import call from './call';

export default combineReducers({
    user,
    call
});
