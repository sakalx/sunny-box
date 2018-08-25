import {combineReducers} from 'redux';

import countries from './countries';
import genres from './genres';
import stations from './stations';

const rootReducer = combineReducers({
  countries,
  genres,
  stations,
});

export default rootReducer;