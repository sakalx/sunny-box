import cacheConfig from 'root/config/cache';

import {promise, countryList, radioStationList} from '../types';

const {
  FULFILLED,
  PENDING,
  REJECTED,
} = promise;
const {
  FETCH_COUNTRIES_LIST,
  GET_COUNTRIES_LIST,
  SET_COUNTRY,
} = countryList;
const {
  FETCH_STATIONS_BY_COUNTRY,
  GET_STATIONS_BY_COUNTRY,
  SET_GENRE,
} = radioStationList;

const initState = {
  fetchingCountryList: false,
  fetchingStations: false,
  errorCountryList: null,
  errorStations: null,
  list: null,
  currentCountry: {
    index: false,
    label: '',
  },
  currentGenre: {
    index: false,
    label: '',
  },
};

export default function sunny(state = initState, {
  type,
  payload
}) {

  const onPending = key => ({
    ...state,
    [`fetching${key}`]: true,
  });

  const onRejected = (key, error) => ({
    ...state,
    [`fetching${key}`]: false,
    [`error${key}`]: error,
  });

  const setList = list => ({
    ...state,
    fetchingCountryList: false,
    list,
  });

  const setStations = stations => ({
    ...state,
    list: {
      ...state.list,
      ...stations,
    },
  });

  switch (type) {
    // Create list of countries
    case GET_COUNTRIES_LIST:
      return setList(payload);

    case FETCH_COUNTRIES_LIST + PENDING:
      return onPending('CountryList', true);

    case FETCH_COUNTRIES_LIST + REJECTED:
      return onRejected('CountryList', payload);

    case FETCH_COUNTRIES_LIST + FULFILLED:
      const {
        key
      } = cacheConfig.countryList;
      localStorage.setItem(key, JSON.stringify(payload));

      return setList(payload);


    // Add radio stations to list
    case GET_STATIONS_BY_COUNTRY:
      return setStations(payload);

    case FETCH_STATIONS_BY_COUNTRY + PENDING:
      return onPending('Stations', true);

    case FETCH_STATIONS_BY_COUNTRY + REJECTED:
      return onRejected('Stations', payload);

    case FETCH_STATIONS_BY_COUNTRY + FULFILLED:
      if (payload) {
        const keyCountry = Object.keys(payload)[0];
        localStorage.setItem(keyCountry, JSON.stringify(payload));

        return setStations(payload);
      } else {
        return state
      }


    case SET_COUNTRY:
      return {
        ...state,
        currentCountry: payload,
      };
    case SET_GENRE:
      return {
        ...state,
        currentGenre: payload,
      }
  }

  return state;
};