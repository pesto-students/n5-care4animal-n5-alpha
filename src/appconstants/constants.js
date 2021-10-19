export const AUTH_API = {
  LOGIN_API: "login",
  LOGOUT_API: "logout",
  REGISTER_USER: "users",
  GET_CURRENT_USER: "users/me",
};

export const CATEGORY_API = {
  GET_CATEGORIES: "functions/getCategoriesApi",
};

export const CAMPAIGN_API = {
  CREATE_CAMPAIGN: "classes/CampaignInfo",
  UPDATE_USER_CAMPAIGN: "classes/CampaignInfo",
  GET_CAMPAIGN: "functions/CampaignInfoById",
  GET_ALL_CAMPAIGNS: "functions/getCampaignInfo",
  GET_TRANDING_CAMPAIGNS: "functions/get_tranding_campaigns",
  GET_ALL_USER_CAMPAIGNS: "functions/getCampaignInfoByUserId",
  UPLOAD_FILE: "files",
  SEARCH_CAMPAIAGNS: "functions/searchCampaignInfo",
};

export const USER_API = {
  CLASS_NAME: "users",
  UPLOAD_FILE: "files",
};

export const FUND_RAISER_INFO = {
  CREATE_ORDER: "functions/orders",
  ORDER_SUCCESS: "functions/payment_success",
  ORDER_FAILURE: "functions/payment_failed",
  GET_ORDERS: "functions/getorders",
};
