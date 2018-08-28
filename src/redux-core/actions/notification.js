import {notification} from '../types';

const {TOGGLE_SNACKBAR} = notification;

export function toggleSnackbar(message = '') {
  return {
    type: TOGGLE_SNACKBAR,
    payload: message,
  }
}