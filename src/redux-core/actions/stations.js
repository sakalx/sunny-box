import cacheConfig from 'root/config/cache';
import {getStationsByCountry} from 'root/api';
import {setCountryIndex} from './countries';
import {setGenreIndex, setGenreList} from './genres';

import {promise, stationsTypes} from '../types';

const {FULFILLED} = promise;

const {
  SET_CURRENT_STATION,
  SET_LIST_OF_STATIONS,
  SET_STATIONS_BY_COUNTRY,
} = stationsTypes;


export const setCurrentStation = station => (dispatch, getState) => {
  const prevAudio = getState().stations.station.audio;
  prevAudio.pause();

  delete station.audio;
  localStorage.setItem(cacheConfig.station.key, JSON.stringify(station));

  if (station.uid) {
    const src = station.src.map(({stream}) => stream);
    const audio = new Audio(src);

    audio.play();

    const payload = new Promise((resolve, reject) => {
      audio.addEventListener('loadeddata', () => {
        resolve({...station, audio});
      });
      audio.addEventListener('error', () => {
        reject({...station, audio});
      });
    });

    dispatch({
      type: SET_CURRENT_STATION,
      payload,
    });

  } else {
    dispatch({
      type: SET_CURRENT_STATION + FULFILLED,
      payload: station,
    })
  }
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
