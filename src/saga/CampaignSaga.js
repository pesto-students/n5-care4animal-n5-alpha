import {
  CAMPAIGN_CREATED_SUCCESS,
  CAMPAIGN_CREATION_FAILED,
} from "appconstants/messages";
import { put, all, call, takeLatest } from "redux-saga/effects";

import {
  createCampaign,
  getAllCampaigns,
  getUserCampaign,
  uploadImage,
} from "services/campaignService";
import { campaignConstants } from "appconstants/actions";

import {
  successAlertAction,
  errorAlertAction,
} from "store/actions/AlertActions";
import {
  createCampaignCompletedAction,
  loadAllCampaignsCompletedAction,
  loadUserCampainsCompletedAction,
} from "store/actions/CampaignActions";

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
  // const response = yield call(uploadImage, sessionToken, {
  //   file: campaignFile,
  //   name: campaignFile.name,
  // });

  // add file into payload and create a payload
  const { data, error } = yield call(createCampaign, sessionToken, campaign);

  if (data) {
    yield all([
      put(createCampaignCompletedAction(data)),
      put(successAlertAction(CAMPAIGN_CREATED_SUCCESS)),
    ]);
  } else if (error) {
    yield all([
      put(createCampaignCompletedAction()),
      put(errorAlertAction(CAMPAIGN_CREATION_FAILED)),
    ]);
  }
}

export default function* watchCampaignSaga() {
  yield takeLatest(campaignConstants.CREATE_CAMPAIGN, createCampaignSaga);
  yield takeLatest(campaignConstants.LOAD_USER_CAMPAIGNS, loadUserCampaignSaga);
  yield takeLatest(campaignConstants.LOAD_ALL_CAMPAIGNS, loadAllCampaign);
}
