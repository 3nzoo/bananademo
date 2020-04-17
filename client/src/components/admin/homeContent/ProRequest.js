import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  postApproveProRequest,
  getFile,
  declineProRequest,
} from "../../../actions/adminActions";
import Pagination from "../../common/Pagination";

class ProRequest extends Component {
  state = {
    allUnapproved: [],
    currentUnapproved: [],
    currentPage: null,
    totalPages: null,
  };

  onApproveClick(e) {
    const payData = {
      id: e,
    };
    this.props.postApproveProRequest(payData);
  }

  onDownload = (e) => {
    if (e !== undefined) {
      this.props.getFile(e);
    }
  };

  onDeclineClick(e) {
    this.props.declineProRequest(e);
  }

  onPageChanged1 = (data) => {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentUnapproved = this.props.proRequest.slice(
      offset,
      offset + pageLimit
    );

    this.setState({ currentPage, currentUnapproved, totalPages });
  };

  render() {
    const totalItems = this.props.proRequest.length;
    if (totalItems === 0) return null;
    if (totalItems === undefined) {
    }
    let proForm;
    const unapproved = this.state.currentUnapproved.map((item) => (
      <tr className="professional" key={item.user}>
        <td>{item.handle}</td>
        <td>
          {item.docs[0] !== undefined ? (
            <p>
              {console.log(proForm)}
              {"..." +
                item.docs[0].title.substr(
                  Number(item.docs[0].title.length) - 7,
                  7
                )}
              <button
                onClick={this.onDownload.bind(
                  this,
                  item.docs[0].newFileName.toString()
                )}
                className={
                  "btn btn-warning btn-sm py-1 ml-2 pr-1" +
                  (item.docs[0].newFileName === undefined
                    ? " visible"
                    : "invisible")
                }
              >
                <i className="fas fa-download " />
              </button>
            </p>
          ) : (
            <div></div>
          )}
        </td>
        <td>
          {item.docs[1] !== undefined ? (
            <p>
              {"..." +
                item.docs[1].title.substr(
                  Number(item.docs[1].title.length) - 7,
                  7
                )}

              <button
                onClick={this.onDownload}
                value={
                  item.docs[1].newFileName === undefined
                    ? item.docs[1].newFileName.toString()
                    : item.docs[1].newFileName.toString()
                }
                className={
                  "btn btn-warning btn-sm py-1 ml-2 pr-1" +
                  (item.docs[1].newFileName === undefined
                    ? " visible"
                    : "invisible")
                }
              >
                <i className="fas fa-download " />
              </button>
            </p>
          ) : (
            <div></div>
          )}
        </td>
        <td>
          <button
            onClick={this.onApproveClick.bind(this, item.user)}
            className="btn btn-dark btn-sm py-1 mr-2"
          >
            Approve
          </button>
          <button
            onClick={this.onDeclineClick.bind(this, item.user)}
            className="btn btn-danger btn-sm py-1 mr-2"
          >
            Decline
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="mb-4 ">
        <h4 className="mb-0 bannerLink p-2 text-center">
          Professional Account Request
        </h4>
        <table className="table text-center table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Form</th>
              <th>Permit</th>
              <th>Task</th>

              <th />
            </tr>
            {unapproved}
          </thead>
        </table>

        <div className="float-right">
          <Pagination
            totalRecords={totalItems}
            pageLimit={4}
            pageNeighbours={1}
            onPageChanged={this.onPageChanged1}
          />
        </div>
      </div>
    );
  }
}

ProRequest.propTypes = {
  postApproveProRequest: PropTypes.func.isRequired,
  getFile: PropTypes.func.isRequired,
  declineProRequest: PropTypes.func.isRequired,
};

export default connect(null, {
  postApproveProRequest,
  getFile,
  declineProRequest,
})(ProRequest);
