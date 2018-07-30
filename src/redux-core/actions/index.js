import {countryList, radioStation} from '../types';

import {
  getCountries,
  getStationsByCountry,
} from 'root/firebase-core/firestore';

const {
  GET_COUNTRIES_LIST,
  FETCH_COUNTRIES_LIST,
  SET_COUNTRY,
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

export const getStations = country => {
  const stationsCache = localStorage.getItem(country);

  return dispatch => stationsCache
    ? dispatch({
      type: GET_STATIONS_BY_COUNTRY,
      payload: JSON.parse(stationsCache),
    })
    : dispatch({
      type: FETCH_STATIONS_BY_COUNTRY,
      payload: getStationsByCountry(country)
        .then(stations =>
          stations
            ? ({[country]: stations})
            : null
        ),
    })
};

export const setCountry = country => ({
  type: SET_COUNTRY,
  payload: country,
});

export const setGenre = genre => ({
  type: SET_GENRE,
  payload: genre,
});

export const setStation = station => ({
  type: SET_STATION,
  payload: station,
});