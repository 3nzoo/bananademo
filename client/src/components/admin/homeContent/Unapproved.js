import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  postApproveRegister,
  declineRegistration1
} from "../../../actions/adminActions";
import Pagination from "../../common/Pagination";

class Unapproved extends Component {
  state = {
    allUnapproved: [],
    currentUnapproved: [],
    currentPage: null,
    totalPages: null
  };

  onApproveClick(e) {
    const payData = {
      id: e
    };

    this.props.postApproveRegister(payData);
  }

  onDeclineClick(e) {
    console.log(e);
    this.props.declineRegistration1(e);
  }

  onPageChanged1 = data => {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentUnapproved = this.props.unapproved.slice(
      offset,
      offset + pageLimit
    );

    this.setState({ currentPage, currentUnapproved, totalPages });
  };

  render() {
    // {
    //   console.log(this.props.unapproved.length);
    // }
    const totalItems = this.props.unapproved.length;
    if (totalItems === 0) return null;
    if (totalItems === undefined) {
      console.log(this.props);
    }

    const unapproved = this.state.currentUnapproved.map(item => (
      <tr className="premiere" key={item._id}>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>
          <button
            onClick={this.onApproveClick.bind(this, item._id)}
            className="btn btn-dark btn-sm py-1 mr-2"
          >
            Approve
          </button>
          <button
            onClick={this.onDeclineClick.bind(this, item._id)}
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
          Premiere Account Request
        </h4>
        <table className="table text-center table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
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

Unapproved.propTypes = {
  postApproveRegister: PropTypes.func.isRequired,
  declineRegistration1: PropTypes.func.isRequired
};

export default connect(null, {
  postApproveRegister,
  declineRegistration1
})(Unapproved);
