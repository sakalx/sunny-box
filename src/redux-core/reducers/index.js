import {combineReducers} from 'redux';

import sterling from './sterling';
import cache from './cache';

const rootReducer = combineReducers({
  cache,
  sterling,
});

export default rootReducer;