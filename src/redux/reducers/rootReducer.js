import { combineReducers } from 'redux';

import articleReducer from './articleReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({ articleReducer, authReducer });

export default rootReducer;
