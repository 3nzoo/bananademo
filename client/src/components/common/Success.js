import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
class Register extends Component {
  render() {
    const { errors } = this.state;

    return (
      <div className="success">
        <div className="container">
          <div className="row">
            <div className="col-md-4 pl-1 small order-6 order-md-2">
              <div className="list-group my-3 ">
                <h6 className="list-group-item py-2 bg-warning">BANNERS</h6>
                <a
                  className="list-group-item bannerLink list-group-item-action"
                  href="/vinyl13"
                >
                  Vinyl Banner (13oz.)
                  <small className="float-right"> ></small>
                </a>
                <a
                  className="list-group-item bannerLink list-group-item-action"
                  href="/vinyl18"
                >
                  Vinyl Banner (18oz.)
                  <small className="float-right"> ></small>
                </a>
                <a
                  className="list-group-item bannerLink list-group-item-action"
                  href="/meshBanner"
                >
                  Mesh Banner (13oz.)<small className="float-right"> ></small>
                </a>
                <a
                  className="list-group-item bannerLink list-group-item-action"
                  href="/superSmooth"
                >
                  Super Smooth <small className="float-right"> ></small>
                </a>
              </div>

              <div className="col-md-12 mt-2">
                <h2 className="text-center py-4">
                  <i className="fab fa-cc-paypal mr-1"></i>
                  <i className="fab fa-cc-mastercard ml-1"></i>
                  <i className="fab fa-cc-visa ml-2"></i>
                  <i className="fab fa-cc-amex ml-2"></i>
                </h2>

                <p className=" text-center">
                  High quality affordable banners, ordered from anywhere, sent
                  anywhere: worldwide.
                </p>
                <p className="text-center">
                  <i className="fas fa-clock"></i> Mon - Sun: 8:00 am to 5:00 pm
                </p>
              </div>
            </div>
            <div className="col-md-6 m-auto order-2 order-md-6">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Premiere Account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input
                  type="submit"
                  className="btn SignU btn-block text-white mt-4 mb-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
