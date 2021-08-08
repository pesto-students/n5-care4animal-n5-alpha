import { API_ERROR_MSG } from "appconstants/messages";
import { APPLICATION_ID, REST_KEY, HOST_URL } from "appconstants/_appkeys";

export default async function httpRequest({
  method,
  requestUrl,
  sessionToken,
  payload = {},
}) {
  const url = HOST_URL + requestUrl;
  const requestHeader = {
    headers: {
      "X-Parse-Application-Id": APPLICATION_ID,
      "X-Parse-REST-API-Key": REST_KEY,
      "X-Parse-Session-Token": sessionToken,
      "Content-Type": "application/json",
    },
    method,
  };

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
