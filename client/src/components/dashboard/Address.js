import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteAddress } from "../../actions/profileActions";

class Address extends Component {
  onDeleteClick(id) {
    this.props.deleteAddress(id);
  }

  render() {
    const address = this.props.address.map(myadd => (
      <tr key={myadd._id}>
        <td>{myadd.name}</td>
        <td>{myadd.company}</td>
        <td>
          {myadd.streetAddress}
          {myadd.city}
          {myadd.state}
        </td>
        <td> {myadd.zipCode}</td>
        <td>{myadd.deliveryAdd.toString()}</td>
        <td>{myadd.billingAdd.toString()}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, myadd._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-0 bannerLink p-2">Address Book</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Address</th>
              <th>zipCode</th>
              <th> Shipping</th>
              <th> Billing</th>
            </tr>
            {address}
          </thead>
        </table>
      </div>
    );
  }
}

Address.propTypes = {
  deleteAddress: PropTypes.func.isRequired
};

export default connect(null, { deleteAddress })(Address);
