import cacheConfig from 'root/config/cache';
import {getStationsByCountry} from 'root/api';

import {setCountryIndex} from './countries';
import {setGenreIndex, setGenreList} from './genres';

import {stationsTypes} from '../types';

const {
  SET_CURRENT_STATION,
  SET_LIST_OF_STATIONS,
  SET_STATIONS_BY_COUNTRY,
} = stationsTypes;

export const setCurrentStation = station => {
  localStorage.setItem(cacheConfig.station.key, JSON.stringify(station));

  return ({
    type: SET_CURRENT_STATION,
    payload: station,
  })
};

export const setStationList = list => ({
  type: SET_LIST_OF_STATIONS,
  payload: list,
});


export const setStationsByCountry = (countryIndex, genreIndex = 0) => (dispatch, getState) => {
  const country = getState().countries.list[countryIndex];

  dispatch(setCountryIndex(countryIndex));
  dispatch(setGenreIndex(genreIndex));

  return (
    dispatch({
      type: SET_STATIONS_BY_COUNTRY,
      payload: getStationsByCountry(country)
        .then(stations => {
          dispatch(setGenreList(stations));
          dispatch(setStationList(stations));
        })
    })
  )
};
