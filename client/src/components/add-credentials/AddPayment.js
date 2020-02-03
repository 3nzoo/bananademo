import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPayment } from "../../actions/profileActions";
// import SelectListGroup from "../common/SelectListGroup";
class AddPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNum: "",
      nameCard: "",
      expiration: "",
      cvCode: "",
      is_Default: false,
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const payData = {
      cardNum: this.state.cardNum,
      nameCard: this.state.nameCard,
      expiration: this.state.expiration,
      cvCode: this.state.cvCode,
      is_Default: this.state.is_Default
    };

    this.props.addPayment(payData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      is_Default: !this.state.is_Default
    });
  }

  render() {
    const { errors } = this.state;

    const options = [
      { label: "01", value: "01" },
      { label: "02", value: "02" },
      { label: "03", value: "03" },
      { label: "04", value: "04" },
      { label: "05", value: "05" },
      { label: "06", value: "06" },
      { label: "07", value: "07" },
      { label: "08", value: "08" },
      { label: "09", value: "09" },
      { label: "10", value: "10" },
      { label: "11", value: "11" },
      { label: "12", value: "12" }
    ];

    const optionsYear = [
      { label: "2020", value: "2020" },
      { label: "2021", value: "2021" },
      { label: "2023", value: "2023" },
      { label: "2024", value: "2024" },
      { label: "2025", value: "2025" },
      { label: "2026", value: "2026" },
      { label: "2027", value: "2027" },
      { label: "2028", value: "2028" },
      { label: "2029", value: "2029" },
      { label: "2030", value: "2030" }
    ];

    return (
      <div className="add-payment">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Payment Card</h1>
              <p className="lead text-center">
                Please complete the fields to add Payment Info
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-check mb-4">
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
                  placeholder="* Name on The Card"
                  name="nameCard"
                  value={this.state.nameCard}
                  onChange={this.onChange}
                  error={errors.nameCard}
                />
                <TextFieldGroup
                  placeholder="* Card Number"
                  name="cardNum"
                  value={this.state.cardNum}
                  onChange={this.onChange}
                  error={errors.cardNum}
                />
                <TextFieldGroup
                  placeholder="* Month/Year"
                  name="expiration"
                  value={this.state.expiration}
                  onChange={this.onChange}
                  error={errors.expiration}
                />
                {/* <div className="row">
                  <div className="col-md-2">
                    <SelectListGroup
                      placeholder="Month"
                      name="expiration"
                      value={this.state.expiration}
                      onChange={this.onChange}
                      options={options}
                      error={errors.expiration}
                      info="Month"
                    />
                  </div>

                  <div className="col-md-2">
                    <SelectListGroup
                      placeholder="Year"
                      name="expirationyear"
                      value={
                        this.state.expiration + "/" + this.state.expiration
                      }
                      onChange={this.onChange}
                      options={optionsYear}
                      error={errors.expiration}
                      info="Year"
                    />
                  </div>
                </div> */}

                <TextFieldGroup
                  placeholder="* cvv"
                  name="cvCode"
                  value={this.state.cvCode}
                  onChange={this.onChange}
                  error={errors.cvCode}
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addPayment })(withRouter(AddPayment));
