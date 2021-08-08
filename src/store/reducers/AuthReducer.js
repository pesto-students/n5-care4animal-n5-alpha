import { userConstants } from "appconstants/actions";
const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_USER_DETAILS,
} = userConstants;
// temp - change it to cookie based auto login
let user = JSON.parse(localStorage.getItem("user"));

const initialState = { isAuthenticated: false, loading: false, user };

export function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DETAILS:
      return {
        ...state,
        loading: true,
        // isAuthenticated: false,
        // user: {
        //   ...action.payload,
        // },
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
        user: action.user,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case LOGOUT:
      return {};

    case REGISTER_REQUEST:
      return { loading: true, ...state };

    case REGISTER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.user,
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
