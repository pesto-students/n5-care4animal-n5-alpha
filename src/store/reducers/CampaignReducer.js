import { campaignConstants } from "appconstants/actions";

const {
  CREATE_CAMPAIGN,
  CREATE_CAMPAIGN_COMPLETED,
  CREATE_CAMPAIGN_FAILED,

  LOAD_ALL_CAMPAIGNS,
  LOAD_ALL_CAMPAIGNS_COMPLETED,

  LOAD_USER_CAMPAIGNS,
  LOAD_USER_CAMPAIGNS_COMPLETED,

  GET_CAMPAIGN_DETAILS,
  GET_CAMPAIGN_DETAILS_COMPLETED,

  CAMPAIGN_CREATION_COMPLETED,
  RESET_REDUCER,
} = campaignConstants;

const initialState = {
  campaigns: [],
  campaign: "",
  selectedCampaign: null,
  loading: false,
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CAMPAIGN:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CAMPAIGN_COMPLETED:
      return {
        ...state,
        loading: false,
        campaign: action.payload.objectId,
      };

    case CREATE_CAMPAIGN_FAILED:
      return {
        ...state,
        loading: false,
      };

    case LOAD_USER_CAMPAIGNS:
      return {
        ...state,
        loading: true,
      };

    case LOAD_USER_CAMPAIGNS_COMPLETED:
      const campaignsList = [...action.payload];
      return {
        ...state,
        loading: false,
        campaigns: campaignsList,
      };

    case LOAD_ALL_CAMPAIGNS:
      return {
        ...state,
        loading: true,
      };

    case LOAD_ALL_CAMPAIGNS_COMPLETED:
      return {
        ...state,
        loading: false,
        campaigns: action.payload,
      };

    case GET_CAMPAIGN_DETAILS:
      return {
        ...state,
        loading: true,
      };

    case GET_CAMPAIGN_DETAILS_COMPLETED:
      return {
        ...state,
        loading: false,
        campaign: action.campaign,
      };

    case RESET_REDUCER:
      return {
        ...state,
        loading: false,
        campaign: "",
      };
    default:
      return state;
  }
};

export default campaignReducer;
