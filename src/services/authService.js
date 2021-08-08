import httpRequest from "./http";
import { AUTH_API } from "appconstants/constants";

const requestSignUp = (payload) => {
  return httpRequest({
    method: "POST",
    requestUrl: AUTH_API.REGISTER_USER,
    payload,
  });
};

const requestUserLogin = (payload) => {
  return httpRequest({
    method: "POST",
    requestUrl: AUTH_API.LOGIN_API,
    payload,
  });
};

const requestUserLogout = (sessionToken) => {
  return httpRequest({
    method: "POST",
    requestUrl: AUTH_API.LOGOUT_API,
    sessionToken,
  });
};

const requestUserDetails = (sessionToken, payload) => {
  return httpRequest({
    method: "GET",
    requestUrl: AUTH_API.GET_CURRENT_USER,
    sessionToken,
    payload,
  });
};

export {
  requestSignUp,
  requestUserLogin,
  requestUserLogout,
  requestUserDetails,
};
