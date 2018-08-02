import cacheConfig from 'root/config/cache';

import {countryList, radioStation} from '../types';

import {
  getCountries,
  getStationsByCountry,
} from 'root/firebase-core/firestore';

const {
  GET_COUNTRIES_LIST,
  FETCH_COUNTRIES_LIST,
} = countryList;
const {
  GET_STATIONS_BY_COUNTRY,
  FETCH_STATIONS_BY_COUNTRY,
  SET_GENRE,
  SET_STATION,
} = radioStation;


export const fetchCountriesList = () => ({
  type: FETCH_COUNTRIES_LIST,
  payload: getCountries(),
});

export const getCountriesListCache = list => ({
  type: GET_COUNTRIES_LIST,
  payload: JSON.parse(list),
});

export const getLastCountryStations = lastCountry => ({
  type: GET_STATIONS_BY_COUNTRY,
  payload: lastCountry,
});

export const getCountryStations = country => {
  const cache = localStorage.getItem(cacheConfig.currentCountry.key);

  return dispatch =>
    (!cache || JSON.parse(cache).label !== country)
      ? dispatch({
        type: FETCH_STATIONS_BY_COUNTRY,
        payload: getStationsByCountry(country)
          .then(stations =>
            stations
              ? ({[country]: stations})
              : null
          ),
      })
      : dispatch({
        type: GET_STATIONS_BY_COUNTRY,
        payload: JSON.parse(cache),
      })
};

export const setGenre = genre => ({
  type: SET_GENRE,
  payload: genre,
});

export const setStation = station => ({
  type: SET_STATION,
  payload: station,
});