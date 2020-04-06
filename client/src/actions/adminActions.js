// ***** api's for the component/admin folder
// create account,
// approve professional,
// approve new premiere account,
// update shipping status,
// get messages,
// get contact message,
// delete client account
// get orders list
// delete order
// notification for clients
// get artwork from client/ order

import axios from "axios";

import {
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_UNAPPROVEDPROFILES,
  GET_ERRORS,
  // GET_CLIENTPROFILES,
  // GET_PRO_PROFILES,
  // GET_CURRENTCLIENTPROFILE,
  // DELETE_CLIENTACCOUNT,
  GET_PROFILE
} from "./types";

// Get unapproved Profiles
export const getUnapprovedUser = () => dispatch => {
  axios
    .get("/api/profile/unapproved")
    .then(res =>
      dispatch({
        type: GET_UNAPPROVEDPROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_UNAPPROVEDPROFILES,
        payload: null
      })
    );
};

// Approve Premiere Registration
export const postApproveRegister = e => dispatch => {
  axios.post("/api/users/approve", e).then(res => window.location.reload(true));
};

// Delete test
export const declineRegistration = e => dispatch => {
  axios
    .delete(`/api/users/declineRequest/`, e)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
