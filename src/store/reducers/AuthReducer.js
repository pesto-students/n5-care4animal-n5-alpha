import { userConstants } from "appconstants/actions";
const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  GET_USER_DETAILS,
  UPDATE_USER_PROFILE,
  UPLOAD_PROFILE_PIC,
  UPDATE_USER_COMPLETE,
} = userConstants;

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {},
  updating: false,
};

export function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DETAILS:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
      };

    case LOGOUT:
      return {
        loggedOut: true,
      };

    case REGISTER_REQUEST:
      return { loading: true, ...state };

    case REGISTER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
      };

    case UPLOAD_PROFILE_PIC:
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        updating: true,
      };

    case UPDATE_USER_COMPLETE:
      return {
        ...state,
        updating: false,
      };

    default:
      return state;
  }
}
