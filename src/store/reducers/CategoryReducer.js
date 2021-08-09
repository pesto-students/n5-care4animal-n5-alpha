import { categoryConstants } from "appconstants/actions";

const { CATEGORY_LOADED } = categoryConstants;

const initialState = {
  categories: [],
};

export function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_LOADED:
      return {
        ...state,
        categories: action.categories || [],
      };
    default:
      return state;
  }
}
