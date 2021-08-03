import { USER_DATA_LOADED } from "constants/constants";

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA_LOADED:
      return state;

    default:
      return state;
  }
};

export default userReducer;
