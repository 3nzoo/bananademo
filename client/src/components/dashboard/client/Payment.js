import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deletePayment } from "../../../actions/profileActions";
class Payment extends Component {
  onDeleteClick(id) {
    this.props.deletePayment(id);
  }

  onSetDefault(e) {}

  render() {
    const payment = this.props.payment.map(pay => (
      <tr className="pay" key={pay._id}>
        <td>{pay.nameCard}</td>
        <td>
          {"******" +
            pay.cardNum.substring(pay.cardNum.length - 4, pay.cardNum.length)}
        </td>
        <td>{pay.expiration}</td>
        <td>{pay.is_Default.toString()}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, pay._id)}
            className="btn btn-danger mr-2"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-0 bannerLink p-2">Payment Info</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Name on the Card</th>
              <th>Card Number</th>
              <th>Expiration Date</th>
              <th>Default</th>
              <th />
            </tr>
            {payment}
          </thead>
        </table>
      </div>
    );
  }
}

Payment.propTypes = {
  deletePayment: PropTypes.func.isRequired
};

export default connect(null, { deletePayment })(Payment);
