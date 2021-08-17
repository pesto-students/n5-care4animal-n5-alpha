import httpRequest from "./http";
import { FUND_RAISER_INFO } from "appconstants/constants";

const createOrder = (sessionToken, payload) => {
  return httpRequest({
    method: "POST",
    requestUrl: FUND_RAISER_INFO.CREATE_ORDER,
    sessionToken,
    payload,
  });
};

const handleOrderSuccess = (sessionToken, payload) => {
  return httpRequest({
    method: "POST",
    requestUrl: FUND_RAISER_INFO.ORDER_SUCCESS,
    sessionToken,
    payload,
  });
};

const handleOrderFailure = (sessionToken, payload) => {
  return httpRequest({
    method: "POST",
    requestUrl: FUND_RAISER_INFO.ORDER_FAILURE,
    sessionToken,
    payload,
  });
};

export { createOrder, handleOrderSuccess, handleOrderFailure };
