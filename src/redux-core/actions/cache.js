import {CACHE} from '../types';

import {initStorage} from 'root/helpers/caching-local-storage';

export function initLocalStorage() {
  return {
    type: CACHE,
    payload: initStorage(),
  }
}