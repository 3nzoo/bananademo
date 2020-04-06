import React, { Component } from "react";
import { connect } from "react-redux";

class Account extends Component {
  render() {
    return (
      <div>
        <h4 className="mb-0 text-center bannerLink p-2">
          Premiere Accounts Approval
        </h4>
        <table className="table text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Approve</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

Account.propTypes = {};

export default connect(null)(Account);
