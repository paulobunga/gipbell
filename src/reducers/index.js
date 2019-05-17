import { combineReducers } from 'redux';
import user from './user';
import call from './call';
import connection from './connection';

export default combineReducers({
    user,
    call,
    connection
});
