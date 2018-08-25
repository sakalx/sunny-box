import {countiesTypes} from '../types';

const {
  SET_CURRENT_COUNTRY,
  SET_LIST_OF_COUNTRIES,
} = countiesTypes;

export const setCountryIndex = index => ({
  type: SET_CURRENT_COUNTRY,
  payload: index,
});

export const setCountryList = list => ({
  type: SET_LIST_OF_COUNTRIES,
  payload: list,
});