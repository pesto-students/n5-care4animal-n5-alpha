import {
  CAMPAIGN_CREATED_SUCCESS,
  CAMPAIGN_CREATION_FAILED,
} from "appconstants/messages";
import { put, all, call, takeLatest } from "redux-saga/effects";

import {
  createCampaign,
  getAllCampaigns,
  getCampaignDetails,
  getUserCampaign,
  uploadImage,
} from "services/campaignService";
import { campaignConstants } from "appconstants/actions";

import {
  successAlertAction,
  errorAlertAction,
} from "store/actions/AlertActions";
import {
  campaignCreationFailedAction,
  createCampaignCompletedAction,
  getCampaignDetailCompletedAction,
  loadAllCampaignsCompletedAction,
  loadUserCampainsCompletedAction,
} from "store/actions/CampaignActions";

function* loadCampaignDetailsSaga(action) {
  const { sessionToken, campaignId } = action.payload;
  const { data, error } = yield call(
    getCampaignDetails,
    sessionToken,
    campaignId
  );

  if (data) {
    yield all([put(getCampaignDetailCompletedAction(data))]);
  } else {
    yield all([put(getCampaignDetailCompletedAction())]);
  }
}

function* loadAllCampaign(params) {
  const { data, error } = yield call(getAllCampaigns);

  if (data) {
    yield all([put(loadAllCampaignsCompletedAction(data.result))]);
  } else {
    yield all([put(loadAllCampaignsCompletedAction([]))]);
  }
}

function* loadUserCampaignSaga(action) {
  const { data, error } = yield call(
    getUserCampaign,
    action.sessionToken,
    action.userId
  );
  if (data) {
    yield all([put(loadUserCampainsCompletedAction(data.result))]);
  } else {
    yield all([put(loadUserCampainsCompletedAction([]))]);
  }
}

function* createCampaignSaga(action) {
  // upload a file
  const { campaignFile, campaign, sessionToken } = action.payload;
  const { data: result, error: errorData } = yield call(
    uploadImage,
    campaignFile
  );

  // add file into payload and create a payload
  if (result) {
    const campaignPayload = {
      ...campaign,
      image: {
        __type: "File",
        ...result,
      },
    };
    const { data, error } = yield call(
      createCampaign,
      sessionToken,
      campaignPayload
    );

    if (data) {
      yield all([
        put(createCampaignCompletedAction(data)),
        put(successAlertAction(CAMPAIGN_CREATED_SUCCESS)),
      ]);
    } else if (error) {
      yield all([
        put(campaignCreationFailedAction()),
        put(errorAlertAction(CAMPAIGN_CREATION_FAILED)),
      ]);
    }
  } else {
    yield all([
      put(campaignCreationFailedAction()),
      put(errorAlertAction(errorData)),
    ]);
  }
}

export default function* watchCampaignSaga() {
  yield takeLatest(campaignConstants.CREATE_CAMPAIGN, createCampaignSaga);
  yield takeLatest(campaignConstants.LOAD_USER_CAMPAIGNS, loadUserCampaignSaga);
  yield takeLatest(campaignConstants.LOAD_ALL_CAMPAIGNS, loadAllCampaign);
  yield takeLatest(
    campaignConstants.GET_CAMPAIGN_DETAILS,
    loadCampaignDetailsSaga
  );
}
