import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  deleteAddress,
  setBilling,
  setShipping,
} from "../../../actions/profileActions";

class Address extends Component {
  onDeleteClick(id) {
    this.props.deleteAddress(id);
  }

  onSetBillingAdd(id) {
    this.props.setBilling(id);
  }
  onSetShippingAdd(id) {
    this.props.setShipping(id);
  }

  render() {
    const address = this.props.address.map((myadd) => (
      <tr className="pay text-center" key={myadd._id}>
        <td>{myadd.name}</td>
        <td>{myadd.company}</td>
        <td>
          {myadd.streetAddress + " "}
          {myadd.city + " "}
          {myadd.state}
        </td>

        <td>
          <div
            className={myadd.deliveryAdd === true ? "text-dark" : "myDefault"}
            onClick={this.onSetShippingAdd.bind(this, myadd._id)}
          >
            {myadd.deliveryAdd === true ? "default" : "set Deftault"}
          </div>
        </td>
        <td>
          <div
            className={myadd.billingAdd === true ? "text-dark" : "myDefault"}
            onClick={this.onSetBillingAdd.bind(this, myadd._id)}
          >
            {myadd.billingAdd === true ? "default" : "set Deftault"}
          </div>
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, myadd._id)}
            className="btn btn-sm py-0 btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="small">
        <h5 className="mb-0 bannerLink p-2">Address Book</h5>
        <table className="table table-sm">
          <thead>
            <tr className="text-center">
              <th>Name</th>
              <th>Company</th>
              <th>Address</th>
              {/* <th>zipCode</th> */}
              <th> Shipping</th>
              <th> Billing</th>
            </tr>
            {address}
          </thead>
        </table>
        {/* <p className="text-center">Click Address to edit</p> */}
      </div>
    );
  }
}

Address.propTypes = {
  setShipping: PropTypes.func.isRequired,
  setBilling: PropTypes.func.isRequired,
  deleteAddress: PropTypes.func.isRequired,
};

export default connect(null, { deleteAddress, setBilling, setShipping })(
  Address
);
