import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import Cards from "react-credit-cards";
import { connect } from "react-redux";
import "react-credit-cards/es/styles-compiled.css";
import PropTypes from "prop-types";
import { addPayment } from "../../actions/profileActions";

import valid from "card-validator";
// import SelectListGroup from "../common/SelectListGroup";
class AddPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cvc: "",
      expiry: "",
      focus: "",
      name: "",
      number: "",
      cardValid: "",
      cardType: "",

      is_Default: false,
      errors: {},
      disabled: false,
    };

    // this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    // Disable alphabetic

    const { name, value } = e.target;

    if (
      e.target.name === "number" ||
      e.target.name === "cvc" ||
      e.target.name === "expiry"
    ) {
      if (isNaN(e.target.value)) {
        return;
      } else {
        this.setState({ [name]: value });
      }
    } else {
      this.setState({ [name]: value });
    }

    if (isNaN(e.target.value)) {
      return;
    }

    if (e.target.name === "number") {
      if (e.target.value.length >= 13) {
        this.checkCard(e.target.value);
      } else {
        this.checkCard(12);
      }
    }
  };

  checkCard(e) {
    const cardStat = valid.number(e);
    this.setState({ cardValid: cardStat });
    if (cardStat.isValid) {
      if (cardStat.card) {
        this.setState({ cardType: cardStat.card.type });
      }
    } else {
      this.setState({ cardType: "" });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const payData = {
      cardNum: this.state.number,
      nameCard: this.state.name,
      expiration: this.state.expiry,
      cvCode: this.state.cvc,
      is_Default: this.state.is_Default,
    };

    this.props.addPayment(payData, this.props.history);
  }

  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.value });
  // }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      is_Default: !this.state.is_Default,
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-payment">
        <div className="container">
          <div className="row">
            <div className="col-md-7 m-auto">
              <Link to="/dashboard" className="btn btn-secondary mb-1">
                Go Back
              </Link>

              <h1 className=" mt-4 text-center">Add Payment Card</h1>
              <p className="text-center my-3">
                Please complete the fields to add Payment Info
              </p>
              <Cards
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focus}
                name={this.state.name}
                number={this.state.number}
              />
              <div className="text-center text-success mt-2 text-capitalize">
                {this.state.cardValid.isValid === true ? "Valid Card: " : ""}
                {this.state.cardType !== null ||
                this.state.cardType !== undefined
                  ? this.state.cardType
                  : ""}
              </div>

              <form onSubmit={this.onSubmit}>
                <div className="form-check mt-3 mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    // name="is_Default"
                    value={this.state.is_Default}
                    // checked={this.state.is_Default}
                    onChange={this.onCheck}
                    id="is_Default"
                  />

                  <label htmlFor="is_Default" className="form-check-label">
                    Set as Default
                  </label>
                </div>

                <TextFieldGroup
                  placeholder="* Card Number"
                  type="text"
                  name="number"
                  value={this.state.number}
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  error={errors.number}
                  maxLength="19"
                />
                <TextFieldGroup
                  placeholder="* Name on the Card"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  error={errors.name}
                  maxLength="23"
                />
                <TextFieldGroup
                  placeholder="* Expiration Date"
                  type="text"
                  name="expiry"
                  value={this.state.expiry}
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  error={errors.expiry}
                  maxLength="4"
                />
                <TextFieldGroup
                  placeholder="* cvc"
                  type="text"
                  name="cvc"
                  value={this.state.cvc}
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  error={errors.cvc}
                  maxLength="3"
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn SignU btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddPayment.propTypes = {
  addPayment: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addPayment })(withRouter(AddPayment));
