import { put, all, call, takeLatest } from "redux-saga/effects";
import {
  requestUserLogin,
  requestUserLogout,
  requestSignUp,
  requestUserDetails,
} from "services/authService";

import { userConstants } from "appconstants/actions";
import {
  SIGN_OUT_SUCCESS_MSG,
  SIGN_UP_SUCCESS_MSG,
} from "appconstants/messages";
import {
  errorAlertAction,
  successAlertAction,
} from "store/actions/AlertActions";
import {
  loginFailed,
  loginSuccess,
  registerFailed,
  registerSuccess,
} from "store/actions/AuthActions";
const { LOGIN_REQUEST, GET_USER_DETAILS, LOGOUT, REGISTER_REQUEST } =
  userConstants;

export function* registration(action) {
  const { data, error } = yield call(requestSignUp, action.payload);
  if (data) {
    yield all([
      put(registerSuccess(data)),
      put(successAlertAction(SIGN_UP_SUCCESS_MSG)),
    ]);
  } else {
    yield all([put(registerFailed(error)), put(errorAlertAction(error))]);
  }
}

export function* login(action) {
  const { data, error } = yield call(requestUserLogin, action.payload);
  if (data) {
    yield put(loginSuccess(data));
  } else {
    yield all([put(loginFailed()), put(errorAlertAction(error))]);
  }
}

export function* getUser(action) {
  const { data, error } = yield call(
    requestUserDetails,
    action.payload.sessionToken
  );
  if (data) {
    yield put(loginSuccess(data));
  } else {
    yield all([put(loginFailed(error)), put(errorAlertAction(error))]);
  }
}

export function* logout(action) {
  const { data, error } = yield call(requestUserLogout, action.payload);
  if (data) {
    yield put(successAlertAction(SIGN_OUT_SUCCESS_MSG));
  } else {
    put(errorAlertAction(error));
  }
}

export default function* watchUserAuthentication() {
  yield takeLatest(REGISTER_REQUEST, registration);
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(GET_USER_DETAILS, getUser);
  yield takeLatest(LOGOUT, logout);
}
