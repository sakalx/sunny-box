import {notification as alert} from '../types';

const {TOGGLE_SNACKBAR} = alert;

const initState = {
  openSnackBar: false,
  snackBarMsg: '',
};

export default function notification(state = initState, {type, payload}) {

  switch (type) {
    case TOGGLE_SNACKBAR:
      return ({
        ...state,
        openSnackBar: !state.openSnackBar,
        snackBarMsg: payload
      });
  }

  return state;
}