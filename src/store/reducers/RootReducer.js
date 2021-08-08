import { combineReducers } from "redux";
import { AlertReducer } from "./AlertReducer";
import { AuthReducer } from "./AuthReducer";

const rootReducer = combineReducers({
  alerts: AlertReducer,
  auth: AuthReducer,
});

export default rootReducer;
