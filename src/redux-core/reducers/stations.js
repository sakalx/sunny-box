import {promise, stationsTypes} from '../types';

const {
  FULFILLED,
  PENDING,
  REJECTED,
} = promise;

const {
  SET_CURRENT_STATION,
  SET_LIST_OF_STATIONS,
  SET_STATIONS_BY_COUNTRY,
} = stationsTypes;

const initState = {
  error: null,
  fetching: false,
  list: {},
  station: {
    audio: null,
    isPlaying: false,
    name: '',
    uid: false,
    countryIndex: false,
    genreIndex: false,
  },
};

export default function stations(state = initState, {type, payload}) {

  switch (type) {

    case SET_CURRENT_STATION:
      return ({
        ...state,
        station: payload,
      });

    case SET_LIST_OF_STATIONS:
      return ({
        ...state,
        list: payload,
      });

    case SET_STATIONS_BY_COUNTRY + FULFILLED:
      return ({
        ...state,
        fetching: false,
      });

    case SET_STATIONS_BY_COUNTRY + PENDING:
      return ({
        ...state,
        fetching: true,
      });

    case SET_STATIONS_BY_COUNTRY + REJECTED:
      return ({
        ...state,
        error: payload,
        // fetching leave as true
      });
  }

  return state;
}
