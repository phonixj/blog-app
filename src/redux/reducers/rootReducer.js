import { combineReducers } from 'redux';

import articleReducer from './articleReducer';
import authReducer from './authReducer';
import appReducer from './appReducer';

const rootReducer = combineReducers({ articleReducer, authReducer, appReducer });

export default rootReducer;
