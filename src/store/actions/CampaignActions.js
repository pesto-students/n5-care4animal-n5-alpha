import { campaignConstants } from "appconstants/actions";

const {
  CREATE_CAMPAIGN,
  CREATE_CAMPAIGN_COMPLETED,
  CREATE_CAMPAIGN_FAILED,

  LOAD_ALL_CAMPAIGNS,
  LOAD_ALL_CAMPAIGNS_COMPLETED,

  LOAD_USER_CAMPAIGNS,
  LOAD_USER_CAMPAIGNS_COMPLETED,

  SEARCH_CAMPAIGNS,
  RESET_REDUCER,
} = campaignConstants;

function createCampaignAction(payload) {
  return {
    type: CREATE_CAMPAIGN,
    payload,
  };
}

function createCampaignCompletedAction(payload) {
  return { type: CREATE_CAMPAIGN_COMPLETED, payload };
}

function campaignCreationFailedAction() {
  return { type: CREATE_CAMPAIGN_FAILED };
}

function loadAllCampaignsAction() {
  return {
    type: LOAD_ALL_CAMPAIGNS,
  };
}

function loadAllCampaignsCompletedAction(payload) {
  return {
    type: LOAD_ALL_CAMPAIGNS_COMPLETED,
    payload,
  };
}

function loadUserCampainsAction(payload) {
  return {
    type: LOAD_USER_CAMPAIGNS,
    sessionToken: payload.sessionToken,
    userId: payload.userId,
  };
}

function loadUserCampainsCompletedAction(payload) {
  return {
    type: LOAD_USER_CAMPAIGNS_COMPLETED,
    payload,
  };
}

function searchCampaignsAction(payload) {
  return {
    type: SEARCH_CAMPAIGNS,
    payload,
  };
}

function resetReducer() {
  return {
    type: RESET_REDUCER,
  };
}

export {
  createCampaignAction,
  createCampaignCompletedAction,
  campaignCreationFailedAction,
  loadAllCampaignsAction,
  loadAllCampaignsCompletedAction,
  loadUserCampainsAction,
  loadUserCampainsCompletedAction,
  searchCampaignsAction,
  resetReducer,
};
