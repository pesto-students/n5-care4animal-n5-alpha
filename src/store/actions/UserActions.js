import { userConstants } from "appconstants/actions";

const {
  UPLOAD_PROFILE_PIC,
  UPLOAD_PROFILE_PIC_COMPLETED,
  UPDATE_USER_PROFILE,
  UPDATE_USER_COMPLETE,
} = userConstants;

export {
  uploadProfilePicAction,
  uploadProfilePicCompletedAction,
  updateUserProfileAction,
  updateUserProfileCompleteAction,
};

function uploadProfilePicAction(payload) {
  return { type: UPLOAD_PROFILE_PIC, payload };
}

function uploadProfilePicCompletedAction() {
  return { type: UPLOAD_PROFILE_PIC_COMPLETED };
}

function updateUserProfileAction(payload) {
  return { type: UPDATE_USER_PROFILE, payload };
}

function updateUserProfileCompleteAction() {
  return { type: UPDATE_USER_COMPLETE };
}
