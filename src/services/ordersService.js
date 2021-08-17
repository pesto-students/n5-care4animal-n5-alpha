import httpRequest from "./http";
import { FUND_RAISER_INFO } from "appconstants/constants";

const getOrders = (sessionToken, payload) => {
  return httpRequest({
    method: "POST",
    requestUrl: FUND_RAISER_INFO.GET_ORDERS,
    sessionToken,
    payload,
  });
};

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

export { getOrders, createOrder, handleOrderSuccess, handleOrderFailure };
