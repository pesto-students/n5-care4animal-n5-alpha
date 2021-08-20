import { userConstants } from "appconstants/actions";
const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_REQUEST,
  GET_USER_DETAILS,
  REGISTER_SUCCESS,
  LOGIN_FAILED,
  REGISTER_FAILED,
} = userConstants;

export {
  requestLogin,
  loginSuccess,
  loginFailed,
  requestLogout,
  requestUserRegistration,
  registerSuccess,
  registerFailed,
  requestAutoLogin,
};

function requestLogin(payload) {
  return { type: LOGIN_REQUEST, payload };
}

function loginSuccess(payload) {
  return { type: LOGIN_SUCCESS, payload };
}

function loginFailed(payload) {
  return { type: LOGIN_FAILED, payload };
}

function requestAutoLogin(payload) {
  return { type: GET_USER_DETAILS, payload };
}
function registerSuccess(payload) {
  return { type: REGISTER_SUCCESS, payload };
}
function registerFailed(payload) {
  return { type: REGISTER_FAILED, payload };
}

function requestLogout(payload) {
  return { type: LOGOUT, payload };
}

function requestUserRegistration(payload) {
  return { type: REGISTER_REQUEST, payload };
}
