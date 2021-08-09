import { API_ERROR_MSG } from "appconstants/messages";
import { APPLICATION_ID, REST_KEY, HOST_URL } from "appconstants/_appkeys";

const getDefaultHeader = () => {
  return {
    headers: {
      "X-Parse-Application-Id": APPLICATION_ID,
      "X-Parse-REST-API-Key": REST_KEY,
      "Content-Type": "application/json",
    },
  };
};
export async function uploadImageResource({
  method,
  requestUrl,
  sessionToken,
  payload = {},
}) {
  const url = HOST_URL + requestUrl;
  const requestHeader = {
    ...getDefaultHeader(),
  };
  requestHeader.headers["Content-Type"] = "image/*";
  requestHeader.method = method;
  const formData = new FormData();
  formData.append(payload.name, payload);
  requestHeader.body = formData;

  if (sessionToken) {
    requestHeader.headers["X-Parse-Session-Token"] = sessionToken;
  }
  const apiResponse = await fetch(url, requestHeader);
  return await apiResponse.json();
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
