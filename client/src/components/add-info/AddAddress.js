import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addAddress } from "../../actions/profileActions";
import SelectListGroup from "../common/SelectListGroup";
class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      company: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      deliveryAdd: false,
      billingAdd: false,
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

    const addData = {
      name: this.state.name,
      company: this.state.company,
      streetAddress: this.state.streetAddress,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      deliveryAdd: this.state.deliveryAdd,
      billingAdd: this.state.billingAdd
    };

    this.props.addAddress(addData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;
    const options = [
      { label: "Alaska", value: "Alaska" },
      { label: "Arizona", value: "Arizona" },
      { label: "Arkansas", value: "Arkansas" },
      { label: "California", value: "California" },
      { label: "Colorado", value: "Colorado" },
      { label: "Connecticut", value: "Connecticut" },
      { label: "Delaware", value: "Delaware" },
      { label: "District of Columbia", value: "District of Columbia" },
      { label: "Florida", value: "Florida" },
      { label: "Georgia", value: "Georgia" },
      { label: "Hawaii", value: "Hawaii" },
      { label: "Idaho", value: "Idaho" },
      { label: "Illinois", value: "Illinois" },
      { label: "Indiana", value: "Indiana" },
      { label: "Iowa", value: "Iowa" },
      { label: "Kansas", value: "Kansas" },
      { label: "Kentucky", value: "Kentucky" },
      { label: "Louisiana", value: "Louisiana" },
      { label: "Maine", value: "Maine" },
      { label: "Maryland", value: "Maryland" },
      { label: "Massachusetts", value: "Massachusetts" },
      { label: "Michigan", value: "Michigan" },
      { label: "Minnesota", value: "Minnesota" },
      { label: "Mississippi", value: "Mississippi" },
      { label: "Missouri", value: "Missouri" },
      { label: "Montana", value: "Montana" },
      { label: "Nebraska", value: "Nebraska" },
      { label: "Nevada", value: "Nevada" },
      { label: "New Hampshire", value: "New Hampshire" },
      { label: "New Jersey", value: "New Jersey" },
      { label: "New Mexico", value: "New Mexico" },
      { label: "New York", value: "New York" },
      { label: "North Carolina", value: "North Carolina" },
      { label: "North Dakota", value: "North Dakota" },
      { label: "Ohio", value: "Ohio" },
      { label: "Oklahoma", value: "Oklahoma" },
      { label: "Oregon", value: "Oregon" },
      { label: "Pennsylvania", value: "Pennsylvania" },
      { label: "Rhode Island", value: "Rhode Island" },
      { label: "South Carolina", value: "South Carolina" },
      { label: "South Dakota", value: "South Dakota" },
      { label: "Tennessee", value: "Tennessee" },
      { label: "Texas", value: "Texas" },
      { label: "Utah", value: "Utah" },
      { label: "Vermont", value: "Vermont" },
      { label: "Virginia", value: "Virginia" },
      { label: "Washington", value: "Washington" },
      { label: "West Virginia", value: "West Virginia" },
      { label: "Wisconsin", value: "Wisconsin" },
      { label: "Wyoming", value: "Wyoming" }
    ];
    return (
      <div className="add-address">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h4 className="display-4 mt-4 text-center">
                Add Delivery Address
              </h4>
              <p className="lead text-center">
                Add your new shipping or Billing address
              </p>

              <form onSubmit={this.onSubmit}>
                <div className="form-check mb-3 mt-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    // name="deliveryAdd"
                    value={this.state.deliveryAdd}
                    // checked={this.state.deliveryAdd}
                    onChange={this.onCheck}
                    id="deliveryAdd"
                  />

                  <label htmlFor="deliveryAdd" className="form-check-label">
                    Default Delivery Address
                  </label>
                </div>
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    // name="billingAdd"
                    value={this.state.billingAdd}
                    // checked={this.state.billingAdd}
                    onChange={this.onCheck}
                    id="billingAdd"
                  />

                  <label htmlFor="billingAdd" className="form-check-label">
                    Default Billing Address
                  </label>
                </div>
                <TextFieldGroup
                  placeholder="* name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Street Address"
                  name="streetAddress"
                  value={this.state.streetAddress}
                  onChange={this.onChange}
                  error={errors.streetAddress}
                />
                <TextFieldGroup
                  placeholder="* City"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                />
                <SelectListGroup
                  placeholder="* Select State"
                  name="state"
                  value={this.state.state}
                  onChange={this.onChange}
                  options={options}
                  error={errors.state}
                  info="Click to Choose"
                />
                <TextFieldGroup
                  placeholder="* Zip Code"
                  name="zipCode"
                  value={this.state.zipCode}
                  onChange={this.onChange}
                  error={errors.zipCode}
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

AddAddress.propTypes = {
  addAddress: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addAddress })(withRouter(AddAddress));
