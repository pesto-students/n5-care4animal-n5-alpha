import { API_ERROR_MSG } from "appconstants/messages";

const APPLICATION_ID = process.env.REACT_APP_APPLICATION_ID;
const REST_KEY = process.env.REACT_APP_REST_KEY;
const HOST_URL = process.env.REACT_APP_HOST_URL;

const getDefaultHeader = () => {
  return {
    method: "POST",
    headers: {
      "X-Parse-Application-Id": APPLICATION_ID,
      "X-Parse-REST-API-Key": REST_KEY,
      "Content-Type": "application/json",
    },
  };
};

export async function uploadImageResource({ requestUrl, payload = {} }) {
  const url = HOST_URL + requestUrl;

  var requestOptions = {
    ...getDefaultHeader(),
    body: payload,
  };

  try {
    const apiResponse = await fetch(url, requestOptions);
    const parsedResponse = await apiResponse.json();
    if (apiResponse.status === 200 || apiResponse.status === 201) {
      return {
        data: parsedResponse,
      };
    }
    return {
      error: parsedResponse.error,
    };
  } catch (error) {
    console.log("API error", error);
    return {
      error: API_ERROR_MSG,
    };
  }
}

export default async function httpRequest({
  method,
  requestUrl,
  sessionToken,
  payload = {},
}) {
  const url = HOST_URL + requestUrl;

  const requestHeader = { ...getDefaultHeader() };
  requestHeader.method = method;

  if (sessionToken) {
    requestHeader.headers["X-Parse-Session-Token"] = sessionToken;
  }

  if (method !== "GET") {
    requestHeader.body = JSON.stringify(payload);
  }

  try {
    const apiResponse = await fetch(url, requestHeader);
    const parsedResponse = await apiResponse.json();
    if (apiResponse.status === 200 || apiResponse.status === 201) {
      return {
        data: parsedResponse,
      };
    }
    return {
      error: parsedResponse.error,
    };
  } catch (error) {
    console.log("API error", error);
    return {
      error: API_ERROR_MSG,
    };
  }
}
