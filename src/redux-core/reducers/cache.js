import {
  promise,
  CACHE,
} from '../types';

const {PENDING, REJECTED, FULFILLED} = promise;

const initState = {
  init: false,
  error: null,
  ready: false,
};

export default function cache(state = initState, {type, payload}) {
  switch (type) {
    case CACHE + PENDING:
      return {
        ...state,
        init: true,
      };

    case CACHE + REJECTED:
      return {
        ...state,
        init: false,
        error: payload,
      };

    case CACHE + FULFILLED:
      return {
        ...state,
        init: false,
        ready: true,
      };
  }

  return state;
}