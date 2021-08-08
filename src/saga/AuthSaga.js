import { put, all, call, takeLatest } from "redux-saga/effects";
import {
  requestUserLogin,
  requestUserLogout,
  requestSignUp,
  requestUserDetails,
} from "services/authService";

import { userConstants, alertConstants } from "appconstants/actions";
import {
  SIGN_OUT_SUCCESS_MSG,
  SIGN_UP_SUCCESS_MSG,
} from "appconstants/messages";
const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_DETAILS,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} = userConstants;
const { ERROR, SUCCESS } = alertConstants;

export function* registration(action) {
  const { data, error } = yield call(requestSignUp, action.payload);
  if (data) {
    yield all([
      put({ type: REGISTER_SUCCESS, user: data }),
      put({
        type: SUCCESS,
        message: SIGN_UP_SUCCESS_MSG,
      }),
    ]);
  } else {
    yield all([
      put({ type: REGISTER_FAILURE, message: error }),
      put({ type: ERROR, message: error }),
    ]);
  }
}

export function* login(action) {
  const { data, error } = yield call(requestUserLogin, action.payload);
  if (data) {
    yield put({ type: LOGIN_SUCCESS, user: data });
  } else {
    yield all([
      put({ type: LOGIN_FAILURE, message: error }),
      put({ type: ERROR, message: error }),
    ]);
  }
}

export function* getUser(action) {
  const { data, error } = yield call(
    requestUserDetails,
    action.payload.sessionToken
  );
  if (data) {
    yield put({ type: LOGIN_SUCCESS, user: data });
  } else {
    yield all([
      put({ type: LOGIN_FAILURE, message: error }),
      put({ type: ERROR, message: error }),
    ]);
  }
}

export function* logout(action) {
  const { data, error } = yield call(requestUserLogout, action.payload);
  if (data) {
    yield put({ type: SUCCESS, message: SIGN_OUT_SUCCESS_MSG });
  } else {
    yield put({ type: ERROR, message: error });
  }
}

export default function* watchUserAuthentication() {
  yield takeLatest(REGISTER_REQUEST, registration);
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(GET_USER_DETAILS, getUser);
  yield takeLatest(LOGOUT, logout);
}
