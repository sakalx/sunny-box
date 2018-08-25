import {genresTypes} from '../types';

const {
  SET_CURRENT_GENRE,
  SET_LIST_OF_GENRES,
} = genresTypes;

const initState = {
  index: false,
  list: [],
};

export default function genres(state = initState, {type, payload}) {

  switch (type) {

    case SET_CURRENT_GENRE:
      return ({
        ...state,
        index: payload,
      });

    case SET_LIST_OF_GENRES:
      return ({
        ...state,
        list: payload,
      });
  }

  return state;
}