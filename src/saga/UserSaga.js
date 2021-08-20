import { put, all, call, takeLatest } from "redux-saga/effects";
import { postUserProfile, updateUser } from "services/userService";

import { userConstants } from "appconstants/actions";
import {
  PROFILE_PIC_UPDATE_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
} from "appconstants/messages";
import {
  errorAlertAction,
  successAlertAction,
} from "store/actions/AlertActions";
import {
  uploadProfilePicCompletedAction,
  updateUserProfileAction,
  updateUserProfileCompleteAction,
} from "store/actions/UserActions";
import { requestUserDetails } from "services/authService";

const { UPLOAD_PROFILE_PIC, UPDATE_USER_PROFILE } = userConstants;

export function* updateUserProfile(action) {
  const { sessionToken, userPayload, userId, message } = action.payload;

  const { data, error } = yield call(
    updateUser,
    sessionToken,
    userId,
    userPayload
  );
  if (data) {
    const { data: userDeta } = yield call(requestUserDetails, sessionToken);

    yield all([
      put(updateUserProfileCompleteAction(userDeta || null)),
      put(successAlertAction(message || PROFILE_UPDATE_SUCCESS)),
    ]);
  } else {
    yield all([
      put(updateUserProfileCompleteAction()),
      put(errorAlertAction(error)),
    ]);
  }
}

export function* uploadProfilePic(action) {
  const { sessionToken, profileImageData, userId } = action.payload;
  const { data: imageUploadResponse, error: imageUploadError } = yield call(
    postUserProfile,
    profileImageData
  );

  if (imageUploadResponse) {
    const userPayload = {
      displayPic: {
        __type: "File",
        ...imageUploadResponse,
      },
    };

    const act = {
      sessionToken,
      userPayload,
      userId,
      message: PROFILE_PIC_UPDATE_SUCCESS,
    };

    yield put(updateUserProfileAction(act));

    const { data: userDeta } = yield call(requestUserDetails, sessionToken);

    yield put(updateUserProfileCompleteAction(userDeta || null));
  } else {
    yield all([
      put(uploadProfilePicCompletedAction()),
      put(errorAlertAction({ imageUploadError })),
    ]);
  }
}

export default function* watchUserSaga() {
  yield takeLatest(UPLOAD_PROFILE_PIC, uploadProfilePic);
  yield takeLatest(UPDATE_USER_PROFILE, updateUserProfile);
}
