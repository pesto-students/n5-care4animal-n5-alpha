import { alertConstants } from "appconstants/actions";

const { SUCCESS, ERROR, CLEAR } = alertConstants;

export { successAlertAction, errorAlertAction, clearAlertAction };

function successAlertAction(message) {
  return { type: SUCCESS, message };
}

function errorAlertAction(message) {
  return { type: ERROR, message };
}

function clearAlertAction() {
  return { type: CLEAR };
}
