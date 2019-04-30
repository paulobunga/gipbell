import thunk from 'redux-thunk';
import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';

export default createStore(reducers, applyMiddleware(thunk));
