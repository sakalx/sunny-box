import {
  promise,
  GET_COUNTRIES_LIST,
  GET_RADIO_BY_COUNTRY,
} from '../types';

const {PENDING, REJECTED, FULFILLED} = promise;

const initState = {
  fetching: {
    radio: false,
    countries: false,
  },
  error: {
    radio: null,
    countries: null,
  },
  list: {},
};

export default function sterling(state = initState, {type, payload}) {

  const onPending = prop => ({
    ...state,
    fetching: {
      ...state.fetching,
      [prop]: true,
    }
  });

  const onRejected = (prop, error) => ({
    ...state,
    fetching: {
      ...state.fetching,
      [prop]: false,
    },
    error: {
      ...state.error,
      [prop]: error,
    },
  });

  switch (type) {
    // Create list of countries
    case GET_COUNTRIES_LIST + PENDING:
      return onPending('countries', true);

    case GET_COUNTRIES_LIST + REJECTED:
      return onRejected('countries', payload);

    case GET_COUNTRIES_LIST + FULFILLED:
      const list = payload.reduce((acc, next) => {
        acc[next] = null;

        return acc
      }, {});

      return {
        ...state,
        fetching: {
          ...state.fetching,
          countries: false,
        },
        list,
      };


    // Add radio stations to list
    case GET_RADIO_BY_COUNTRY + PENDING:
      return onPending('radio', true);

    case GET_RADIO_BY_COUNTRY + REJECTED:
      return onRejected('radio', payload);

    case GET_RADIO_BY_COUNTRY + FULFILLED:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          radio: false,
        },
        list: {
          ...state.list,
          ...payload,
        },
      };

  }

  return state;
};