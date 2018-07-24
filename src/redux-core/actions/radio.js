import {
  GET_COUNTRIES_LIST,
  GET_RADIO_BY_COUNTRY,
} from '../types';

import {
  getCountries,
  getRadioByCountry,
} from 'root/firebase-core/firestore';


export function getCountriesList() {
  return {
    type: GET_COUNTRIES_LIST,
    payload: getCountries(),
  }
}

export function getRadioStationsByCountry(country) {
  return {
    type: GET_RADIO_BY_COUNTRY,
    payload: getRadioByCountry(country)
      .then(stations => ({
        [country]: stations,
      }))
  }
}