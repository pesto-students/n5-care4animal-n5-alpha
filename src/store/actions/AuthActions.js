import { userConstants } from "appconstants/actions";
const { LOGIN_REQUEST, LOGOUT, REGISTER_REQUEST, GET_USER_DETAILS } =
  userConstants;

export {
  requestLogin,
  requestLogout,
  requestUserRegistration,
  requestAutoLogin,
};

function requestLogin(payload) {
  return { type: LOGIN_REQUEST, payload };
}

function requestAutoLogin(payload) {
  return { type: GET_USER_DETAILS, payload };
}

function requestLogout(payload) {
  return { type: LOGOUT, payload };
}

function requestUserRegistration(payload) {
  return { type: REGISTER_REQUEST, payload };
}
