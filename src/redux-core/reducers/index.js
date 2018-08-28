import {combineReducers} from 'redux';

import countries from './countries';
import genres from './genres';
import notification from './notification';
import stations from './stations';

const rootReducer = combineReducers({
  countries,
  genres,
  notification,
  stations,
});

export default rootReducer;