import httpRequest, { uploadImageResource } from "./http";
import { CAMPAIGN_API } from "appconstants/constants";

const searchCampaignsByCriteria = (payload) => {
  return httpRequest({
    method: "POST",
    requestUrl: CAMPAIGN_API.SEARCH_CAMPAIAGNS,
    payload,
  });
};

const getCampaignDetails = (payload) => {
  return httpRequest({
    method: "POST",
    requestUrl: CAMPAIGN_API.GET_CAMPAIGN,
    payload,
  });
};

const getTrendinCampaigns = () => {
  return httpRequest({
    method: "POST",
    requestUrl: CAMPAIGN_API.GET_TRANDING_CAMPAIGNS,
  });
};

const getAllCampaigns = (sessionToken, userId) => {
  return httpRequest({
    method: "POST",
    requestUrl: CAMPAIGN_API.GET_ALL_CAMPAIGNS,
    sessionToken,
  });
};

const getUserCampaign = (sessionToken, userId) => {
  return httpRequest({
    method: "POST",
    requestUrl: CAMPAIGN_API.GET_ALL_USER_CAMPAIGNS + `?userId=${userId}`,
    sessionToken,
  });
};

const createCampaign = (sessionToken, campaign) => {
  return httpRequest({
    method: "POST",
    requestUrl: CAMPAIGN_API.CREATE_CAMPAIGN,
    sessionToken,
    payload: campaign,
  });
};

const updateCampaign = (sessionToken, campaignId, campaign) => {
  return httpRequest({
    method: "PUT",
    requestUrl: CAMPAIGN_API.UPDATE_USER_CAMPAIGN + campaignId,
    sessionToken,
    payload: campaign,
  });
};

const uploadImage = (payload) => {
  return uploadImageResource({
    requestUrl: CAMPAIGN_API.UPLOAD_FILE + `/${payload.name}`,
    payload: payload.file,
  });
};

export {
  getTrendinCampaigns,
  getAllCampaigns,
  getUserCampaign,
  createCampaign,
  updateCampaign,
  uploadImage,
  getCampaignDetails,
  searchCampaignsByCriteria,
};
