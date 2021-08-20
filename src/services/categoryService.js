import httpRequest from "./http";
import { CATEGORY_API } from "appconstants/constants";

const requestCategories = (payload) => {
  return httpRequest({
    method: "POST",
    requestUrl: CATEGORY_API.GET_CATEGORIES,
    payload,
  });
};

export { requestCategories };
