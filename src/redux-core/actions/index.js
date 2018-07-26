import {countryList, radioStationList} from '../types';

import {
  getCountries,
  getStationsByCountry,
} from 'root/firebase-core/firestore';

const {GET_COUNTRIES_LIST, FETCH_COUNTRIES_LIST} = countryList;
const {GET_STATIONS_BY_COUNTRY, FETCH_STATIONS_BY_COUNTRY} = radioStationList;

export function fetchCountriesList() {
  return {
    type: FETCH_COUNTRIES_LIST,
    payload: getCountries(),
  }
}

export function getCountriesListCache(list) {
  return {
    type: GET_COUNTRIES_LIST,
    payload: JSON.parse(list),
  }
}

export function fetchStationsByCountry(country) {
  return {
    type: FETCH_STATIONS_BY_COUNTRY,
    payload: getStationsByCountry(country)
      .then(stations => ({
        [country]: stations,
      }))
  }
}

export function getStationsCache(stations) {
  return {
    type: GET_STATIONS_BY_COUNTRY,
    payload: JSON.parse(stations),
  }
}