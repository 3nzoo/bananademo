import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      company: "",
      telephone: "",
      fax: "",
      website: "",
      businessType: "",

      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      company: this.state.company,
      telephone: this.state.telephone,
      fax: this.state.fax,
      website: this.state.website,
      businessType: this.state.businessType
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    // Select options for status
    const options = [
      { label: "Please Select", value: 0 },
      { label: "Print Shop", value: "Print Shop" },
      { label: "Sign Shop", value: "Sign Shop" },
      { label: "Graphic Designer", value: "Graphic Designer" },
      { label: "Photographer", value: "Photographer" },
      { label: "Marketing Company", value: "Marketing Company" },
      { label: "Promotional Company", value: "Promotional Company" },
      { label: "Advertising Agency", value: "Advertising Agency" },
      { label: "Screen Printer", value: "Screen Printer" },
      { label: "Embroidery", value: "Embroidery" },
      { label: "Artist Illustrator", value: "Artist Illustrator" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center"></p>
              <small className="d-block pb-3 ">
                <h5 className="text-danger">
                  * <span className="text-dark">required fields</span>
                </h5>{" "}
              </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Contact Number"
                  name="telephone"
                  value={this.state.telephone}
                  onChange={this.onChange}
                  error={errors.telephone}
                />
                <TextFieldGroup
                  placeholder="fax"
                  name="fax"
                  value={this.state.fax}
                  onChange={this.onChange}
                  error={errors.fax}
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />

                <SelectListGroup
                  placeholder="Business Type"
                  name="businessType"
                  value={this.state.businessType}
                  onChange={this.onChange}
                  options={options}
                  error={errors.businessType}
                  info="Click to Choose"
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
