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
  GET_PRO_PROFILES,
  GET_PRO_REQUEST
  // GET_CURRENTCLIENTPROFILE,
  // DELETE_CLIENTACCOUNT,
  // GET_PROFILE
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

// Get Professional Profiles
export const getProfessionals = () => dispatch => {
  axios
    .get("/api/profile/all/pro")
    .then(res =>
      dispatch({
        type: GET_PRO_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRO_PROFILES,
        payload: null
      })
    );
};

// Get Professional Profiles
export const getProRequest = () => dispatch => {
  axios
    .get("/api/profile/all/proRequest")
    .then(res =>
      dispatch({
        type: GET_PRO_REQUEST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRO_REQUEST,
        payload: null
      })
    );
};

export const getFile = e => dispatch => {
  // console.log(e.target.value);
  axios
    .get(`/api/files/download/${e.target.value}`, { responseType: "blob" })
    .then(res => {
      let blob = new Blob([res.data], { type: res }),
        downloadUrl = window.URL.createObjectURL(blob),
        filename = "",
        disposition = res.headers["content-disposition"];
      if (disposition && disposition.indexOf("attachment") !== -1) {
        let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
          matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, "");
        }
      }
      let a = document.createElement("a");
      if (typeof a.download === "undefined") {
        window.location.href = downloadUrl;
      } else {
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
      }
    })
    .catch(err => {
      console.log(err);
    });
};

// Approve Premiere Registration
export const postApproveRegister = e => dispatch => {
  axios.post("/api/users/approve", e).then(res => window.location.reload(true));
};

// Approve Professional Account Request
export const postApproveProRequest = e => dispatch => {
  axios
    .post("/api/profile/approvePro", e)
    .then(res => window.location.reload(true));
};

// Decline Pro Request
export const declineProRequest = id => dispatch => {
  axios
    .post(`/api/profile/declineProRequest/${id}`)
    .then(res => window.location.reload(true))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete decline registration
export const declineRegistration1 = id => dispatch => {
  axios
    .delete(`/api/users/declineRequest1/${id}`)
    .then(res => window.location.reload(true))
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
