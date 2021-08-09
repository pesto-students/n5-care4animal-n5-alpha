import { categoryConstants } from "appconstants/actions";

const { LOAD_CATEGORY } = categoryConstants;

export { getCategory };

function getCategory() {
  return { type: LOAD_CATEGORY };
}
