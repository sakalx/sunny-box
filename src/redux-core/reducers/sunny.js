import cacheConfig from 'root/config/cache';

import {promise, countryList, radioStation} from '../types';

const {
  FULFILLED,
  PENDING,
  REJECTED,
} = promise;
const {
  FETCH_COUNTRIES_LIST,
  GET_COUNTRIES_LIST,
} = countryList;
const {
  FETCH_STATIONS_BY_COUNTRY,
  GET_STATIONS_BY_COUNTRY,
  SET_GENRE,
  SET_STATION,
} = radioStation;

const initState = {
  fetchingCountryList: false,
  fetchingStations: false,
  errorCountryList: null,
  errorStations: null,
  countryList: [],
  currentCountry: {
    genres: {},
    index: false,
    label: '',
  },
  currentGenre: {
    index: 0,
    label: '',
  },
  currentStation: {
    uid: false,
    title: '',
    src: [],
    logo: null,
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

  const setCountryList = countryList => ({
    ...state,
    fetchingCountryList: false,
    countryList,
  });

  switch (type) {
    case GET_COUNTRIES_LIST:
      return setCountryList(payload);

    case FETCH_COUNTRIES_LIST + PENDING:
      return onPending('CountryList', true);

    case FETCH_COUNTRIES_LIST + REJECTED:
      return onRejected('CountryList', payload);

    case FETCH_COUNTRIES_LIST + FULFILLED:
      const {key} = cacheConfig.countryList;
      localStorage.setItem(key, JSON.stringify(payload));

      return setCountryList(payload);


    case GET_STATIONS_BY_COUNTRY:
      const currentGenre = Object.keys(payload.genres)[0];

      return ({
        ...state,
        currentCountry: payload,
        currentGenre: {
          index: 0,
          label: currentGenre,
        },
      });

    case FETCH_STATIONS_BY_COUNTRY + PENDING:
      return onPending('Stations', true);

    case FETCH_STATIONS_BY_COUNTRY + REJECTED:
      return onRejected('Stations', payload);

    case FETCH_STATIONS_BY_COUNTRY + FULFILLED:
      if (payload) {
        const countryStations = Object.entries(payload)[0];
        const index = state.countryList.indexOf(countryStations[0]);
        const currentGenre = Object.keys(countryStations[1])[0];

        const currentCountry = {
          genres: countryStations[1],
          index,
          label: countryStations[0],
        };

        localStorage.setItem(cacheConfig.currentCountry.key, JSON.stringify(currentCountry));

        return ({
          ...state,
          fetchingStations: false,
          currentCountry,
          currentGenre: {
            index: 0,
            label: currentGenre,
          },
        })
      } else {
        return state
      }

    case SET_GENRE:
      return {
        ...state,
        currentGenre: payload,
      };
    case SET_STATION:
      localStorage.setItem(cacheConfig.lastStation.key, JSON.stringify(payload));

      const currentStation = {
        ...payload,
        country: {
          index: payload.country.index,
          label: payload.country.label,
        }
      };

      return {
        ...state,
        currentStation,
      }
  }

  return state;
};