import cacheConfig from 'root/config/cache';
import {getStationsByCountry} from 'root/api';

import {setCountryIndex} from './countries';
import {setGenreIndex, setGenreList} from './genres';
import {toggleSnackbar} from './notification';

import {promise, stationsTypes} from '../types';

const {FULFILLED} = promise;

const {
  SET_CURRENT_STATION,
  SET_LIST_OF_STATIONS,
  SET_STATIONS_BY_COUNTRY,
} = stationsTypes;

const audioListener = (prevAudio, station, dispatch) => {
  const audio = new Audio(station.src);

  return new Promise((resolve, reject) => {

    const timerId = setTimeout(() => {
      handleError(reject);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadeddata', handleLoaded);
    }, 8000);

    const handleError = () => {
      dispatch(toggleSnackbar('hmm... looks like this station not available now 🤤🍄'));
      reject();
      clearTimeout(timerId);
    };

    const handleLoaded = () => {
      localStorage.setItem(cacheConfig.station.key, JSON.stringify(station));
      prevAudio.pause();
      audio.play()
        .then(() => resolve({...station, audio}))
        .catch(() => reject());
      clearTimeout(timerId);
    };

    audio.addEventListener('loadeddata', handleLoaded);
    audio.addEventListener('error', handleError);
  });
};


export const setCurrentStation = station => (dispatch, getState) => {
  const prevAudio = getState().stations.station.audio;

  !station.uid && (
    prevAudio.pause(),
      localStorage.setItem(cacheConfig.station.key, JSON.stringify(station))
  );

  delete station.audio;

  station.uid
    ? dispatch({
      type: SET_CURRENT_STATION,
      payload: audioListener(prevAudio, station, dispatch),
    })
    : dispatch({
      type: SET_CURRENT_STATION + FULFILLED,
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