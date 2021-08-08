import { alertConstants } from "appconstants/actions";

const { SUCCESS, ERROR, CLEAR } = alertConstants;

export function AlertReducer(state = {}, action) {
  switch (action.type) {
    case SUCCESS:
      return {
        alert: { type: "success", message: action.message },
      };
    case ERROR:
      return {
        alert: {
          type: "error",
          message: action.message,
        },
      };
    case CLEAR:
      return {};
    default:
      return state;
  }
}
