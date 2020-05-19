import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deletePayment, setPayment } from "../../../actions/profileActions";
class Payment extends Component {
  onDeleteClick(id) {
    this.props.deletePayment(id);
  }

  onPaymentDefault(id) {
    this.props.setPayment(id);
  }
  onSetDefault(e) {}

  render() {
    const payment = this.props.payment.map((pay) => (
      <tr className="pay text-center" key={pay._id}>
        <td>{pay.nameCard}</td>
        <td>
          {"****" +
            pay.cardNum.substring(pay.cardNum.length - 4, pay.cardNum.length)}
        </td>
        <td>{pay.expiration}</td>
        <td>
          <div
            className={pay.is_Default === true ? "text-dark" : "myDefault"}
            onClick={this.onPaymentDefault.bind(this, pay._id)}
          >
            {pay.is_Default === true ? "default" : "set Deftault"}
          </div>
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, pay._id)}
            className="btn btn-danger btn-sm py-0 mr-2"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="small">
        <h5 className="mb-0 bannerLink p-2">Payment Info</h5>
        <table className="table table-sm">
          <thead>
            <tr className="text-center">
              <th>Name on the Card</th>
              <th>Card Number</th>
              <th>Expiration Date</th>
              <th>Default</th>
              <th />
            </tr>
            {payment}
          </thead>
        </table>
        {/* <p className="text-center">Click Card Number to edit</p> */}
      </div>
    );
  }
}

Payment.propTypes = {
  setPayment: PropTypes.func.isRequired,
  deletePayment: PropTypes.func.isRequired,
};

export default connect(null, { deletePayment, setPayment })(Payment);
