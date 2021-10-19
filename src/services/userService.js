import httpRequest, { uploadImageResource } from "./http";
import { USER_API } from "appconstants/constants";

const postUserProfile = (payload) => {
  return uploadImageResource({
    requestUrl: USER_API.UPLOAD_FILE + `/${payload.name}`,
    payload: payload.file,
  });
};

const updateUser = (sessionToken, userId, payload) => {
  return httpRequest({
    method: "PUT",
    requestUrl: USER_API.CLASS_NAME + `/${userId}`,
    sessionToken,
    payload,
  });
};

export { postUserProfile, updateUser };
