import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { mainReducer } from './mainReducer';

const reducers = combineReducers({
  main: mainReducer,
});
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
