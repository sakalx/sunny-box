import {genresTypes} from '../types';

const {
  SET_CURRENT_GENRE,
  SET_LIST_OF_GENRES,
} = genresTypes;

export const setGenreIndex = index => ({
  type: SET_CURRENT_GENRE,
  payload: index,
});

export const setGenreList = stations => ({
  type: SET_LIST_OF_GENRES,
  payload: Object.keys(stations),
});