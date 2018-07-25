import {applyMiddleware, createStore} from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import rootReducer from './reducers';

const middleware = applyMiddleware(promise(), thunk, logger);

const store = createStore(rootReducer, middleware);


export function subscribeStoreCache(callBack) {
  let unsubscribe;

  function cacheChange(callBack) {
    if (store.getState().cache.ready) {
      unsubscribe();
      callBack();
    }
  }

  unsubscribe = store.subscribe(() => cacheChange(callBack));
}


export default store;