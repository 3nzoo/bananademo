// main page for admin
// List of unapproved accounts and latest orders
// list of latest messages
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUnapprovedUser } from "../../actions/adminActions";
import Spinner from "../common/Spinner";
import Pagination from "../common/Pagination";

import Unapproved from "../../components/admin/homeContent/Unapproved";

class AdminDash extends Component {
  componentDidMount() {
    this.props.getUnapprovedUser();
  }

  // onPageChanged1 = data => {
  //   const { currentPage, totalPages, pageLimit } = data;
  //   this.setState({ allUnapproved: this.props.profile.unapproved });
  //   const offset = (currentPage - 1) * pageLimit;
  //   const unapprovedNow = this.props.profile.unapproved.slice(
  //     offset,
  //     offset + pageLimit
  //   );
  //   this.setState({ currentUnapproved: unapprovedNow });
  //   this.setState({ totalPages: totalPages });
  //   console.log(totalPages);
  // };

  render() {
    const { user } = this.props.auth;
    const { unapproved, loading } = this.props.profile;
    let AdminContent;
    if (loading) {
      AdminContent = <Spinner />;
    } else if (unapproved === null) {
    } else {
      AdminContent = <Unapproved unapproved={unapproved} />;
    }

    return (
      <div>
        <p className="lead">
          <strong>Welcome </strong>
          {user.name}
        </p>
        {AdminContent} <br></br>
        <h4 className="mb-0 mt-4 text-center bannerLink p-2">
          Professional Account Request
        </h4>
        <table className="table text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Task</th>
            </tr>
          </thead>
        </table>
        <h4 className="mb-0 text-center bannerLink p-2">Orders</h4>
        <table className="table text-center">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Payment Status</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

AdminDash.propTypes = {
  getUnapprovedUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getUnapprovedUser
})(AdminDash);
