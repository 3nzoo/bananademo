import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  postApproveRegister,
  declineRegistration
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

    // console.log(this.props);
    this.props.postApproveRegister(payData);

    // console.log(this.props.unapproved);
  }

  onDeclineClick(e) {
    const payData = {
      id: e
    };
    this.props.declineRegistration(payData);
    console.log(payData);
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
            className="btn btn-dark mr-2"
          >
            Approve
          </button>
          <button
            onClick={this.onDeclineClick.bind(this, item._id)}
            className="btn btn-danger mr-2"
          >
            Decline
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="mb-4">
        <h4 className="mb-0 bannerLink p-2 text-center">Payment Info</h4>
        <table className="table text-center">
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
  declineRegistration: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  postApproveRegister,
  declineRegistration
})(Unapproved);
