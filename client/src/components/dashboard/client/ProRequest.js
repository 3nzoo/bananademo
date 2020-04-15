import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uploadFilePro, sendProRequest } from "../../../actions/profileActions";

class ProRequest extends Component {
  state = {
    selectedForm: null,
    selectedPermit: null,
    submitButton: null
  };
  formFileSelect = e => {
    this.setState({ selectedForm: e.target.files[0] });
    if (
      this.state.selectedPermit === null ||
      this.state.selectedPermit === undefined
    ) {
      this.setState({ submitButton: false });
    } else {
      this.setState({ submitButton: true });
    }
  };

  permitFileSelect = e => {
    this.setState({ selectedPermit: e.target.files[0] });
    if (
      this.state.selectedForm === null ||
      this.state.selectedForm === undefined
    ) {
      this.setState({ submitButton: false });
    } else {
      this.setState({ submitButton: true });
    }
  };

  fileUploadHandler = e => {
    const newForm = new FormData();
    const newPermit = new FormData();
    if (
      this.state.selectedForm === null ||
      this.state.selectedForm === undefined ||
      this.state.selectedPermit === null ||
      this.state.selectedPermit === undefined
    ) {
      return;
    }
    newForm.append(
      "file",
      this.state.selectedForm,
      this.state.selectedForm.name
    );
    newPermit.append(
      "file",
      this.state.selectedPermit,
      this.state.selectedPermit.name
    );
    this.props.sendProRequest(this.props.history);
    // this.props.uploadFileForm(newForm);
    // this.props.uploadFilePermit(newPermit);
    this.props.uploadFilePro(newForm, newPermit);
  };

  render() {
    let butcontent;
    if (this.state.submitButton === true) {
      butcontent = (
        <div className="col-md-12 text-center">
          <button className="btn btn-dark" onClick={this.fileUploadHandler}>
            Send Request
          </button>
        </div>
      );
    }
    return (
      <div className="professionalRequest ">
        <div className="container ">
          <div className="row">
            <div className=" col-md-12">
              <h2 className=" text-center">Why Go for Professional Account?</h2>
              <p className=" text-center text-danger pt-2">
                * List of reasons why customer must avail Professinoal Account
              </p>
              <p className=" text-center ">
                Please Upload the following required Documents. <br />
                We will review these documents before approving your request.
                <br />
                <span className="text-danger small">* means Required </span>
                Thank you!
                <br />
              </p>
              <div className="col-md-12 mt-5 text-center">
                <p>
                  <span className="text-danger">*</span>
                  Form:
                  <input
                    className="ml-2 small "
                    type="file"
                    onChange={this.formFileSelect}
                  />
                </p>
              </div>
              <div className="col-md-12 text-center">
                <p>
                  <span className=" text-danger">*</span>
                  Permit:
                  <input
                    className="ml-2 small "
                    type="file"
                    onChange={this.permitFileSelect}
                  />
                </p>
              </div>
              {butcontent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProRequest.propTypes = {
  uploadFilePro: PropTypes.func.isRequired,
  sendProRequest: PropTypes.func.isRequired
};

export default connect(null, {
  uploadFilePro,
  sendProRequest
})(ProRequest);
