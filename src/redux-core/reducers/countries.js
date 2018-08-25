import {countiesTypes} from '../types';

const {
  SET_LIST_OF_COUNTRIES,
  SET_CURRENT_COUNTRY,
} = countiesTypes;

const initState = {
  index: false,
  list: [],
};

export default function counties(state = initState, {type, payload}) {

  switch (type) {

    case SET_CURRENT_COUNTRY:
      return ({
        ...state,
        index: payload,
      });

    case SET_LIST_OF_COUNTRIES:
      return ({
        ...state,
        list: payload,
      });
  }

  return state;
}