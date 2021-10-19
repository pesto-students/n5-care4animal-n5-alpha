import { categoryConstants } from "appconstants/actions";

const { LOAD_CATEGORY, SET_CATEGORY_LOADED } = categoryConstants;

export { getCategory, setCategory };

function getCategory() {
  return { type: LOAD_CATEGORY };
}

function setCategory(payload) {
  return { type: SET_CATEGORY_LOADED, payload };
}
