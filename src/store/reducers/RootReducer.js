import { combineReducers } from "redux";
import { AlertReducer } from "./AlertReducer";
import { AuthReducer } from "./AuthReducer";
import campaignReducer from "./CampaignReducer";
import { categoryReducer } from "./CategoryReducer";

const rootReducer = combineReducers({
  alerts: AlertReducer,
  auth: AuthReducer,
  category: categoryReducer,
  campaign: campaignReducer,
});

export default rootReducer;
