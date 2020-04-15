import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_UNAPPROVEDPROFILES,
  GET_PRO_PROFILES,
  GET_PRO_REQUEST
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  unapproved: null,
  proRequest: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case GET_PRO_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case GET_PRO_REQUEST:
      return {
        ...state,
        proRequest: action.payload,
        loading: false
      };
    case GET_UNAPPROVEDPROFILES:
      return {
        ...state,
        unapproved: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
