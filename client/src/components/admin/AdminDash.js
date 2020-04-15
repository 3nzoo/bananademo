// main page for admin
// List of unapproved accounts and latest orders
// list of latest messages
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUnapprovedUser, getProRequest } from "../../actions/adminActions";
import Spinner from "../common/Spinner";

import Unapproved from "../../components/admin/homeContent/Unapproved";
import ProRequest from "../../components/admin/homeContent/ProRequest";

class AdminDash extends Component {
  componentDidMount() {
    this.props.getUnapprovedUser();
    this.props.getProRequest();
  }

  test1 = e => {
    this.props.getFile(e);
  };

  render() {
    const { user } = this.props.auth;
    const { unapproved, proRequest, loading } = this.props.profile;

    let AdminContent;
    if (loading) {
      AdminContent = <Spinner />;
    } else if (unapproved === null || proRequest === null) {
    } else {
      AdminContent = (
        <div>
          <Unapproved key={unapproved.id} unapproved={unapproved} /> <br />
          <br />
          <ProRequest key={proRequest.user} proRequest={proRequest} />
          <br />
        </div>
      );
    }

    return (
      <div>
        <p className="lead text-capitalize">
          <strong>Welcome </strong>
          {user.name}
        </p>
        <div className="small mb-2">{AdminContent}</div> <br />
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
  getProRequest: PropTypes.func.isRequired,
  getUnapprovedUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getUnapprovedUser,

  getProRequest
})(AdminDash);
