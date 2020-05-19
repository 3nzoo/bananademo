import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import SmallTextFieldGroup from "../common/SmallTextFieldGroup";
import { loginUser } from "../../actions/authActions";
class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { errors } = this.state;
    const { isAuthenticated } = this.props.auth;
    const { user } = this.props.auth;
    const isValid = user.is_admin;
    const authLinks = (
      <ul className="navbar-nav text-center ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">
            <i className="fas fa-shopping-cart mr-1"></i>
          </Link>
        </li>
        <li className="nav-item dropdown ">
          <Link
            className="nav-link dropdown-toggle"
            to="/#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-user mr-1"></i>{" "}
          </Link>

          <div
            className="dropdown-menu navLink text-center"
            aria-labelledby="navbarDropdown"
          >
            <Link className="dropdown-item small bannerLink" to="/settings">
              Account Settings
            </Link>
            <Link
              className="dropdown-item small bannerLink"
              to="/change_password"
            >
              Change Password
            </Link>

            <div className="dropdown-divider small border-white"></div>
            <Link className="dropdown-item small bannerLink" to="/orders">
              Order Status
            </Link>
            <Link className="dropdown-item small bannerLink" to="/unpaidOrders">
              Pending Payment
            </Link>
            <div className="dropdown-divider border-white"></div>
            <Link
              className="dropdown-item small bannerLink"
              onClick={this.onLogoutClick.bind(this)}
              to="/landing"
            >
              LOGOUT
            </Link>
          </div>
        </li>
      </ul>
    );

    const adminLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item text-center">
          <Link
            className="nav-link"
            onClick={this.onLogoutClick.bind(this)}
            to="/landing"
          >
            Logout
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <form onSubmit={this.onSubmit}>
        <ul className="navbar-nav ">
          <li className="nav-item my-1 my-lg-auto my-md-auto mx-1">
            <SmallTextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
          </li>
          <li className="nav-item my-1 my-lg-auto my-md-auto mx-1">
            <SmallTextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
          </li>

          <li className="nav-item my-1 my-lg-auto my-md-auto mx-1">
            <input
              type="submit"
              value="Login"
              className="btn btn-sm btn-dark btn-block"
            />
          </li>
          <li className="nav-item my-1 my-lg-auto my-md-auto mx-1">
            <Link className=" btn btn-sm btn-danger btn-block " to="/register">
              Sign Up
            </Link>
          </li>
        </ul>
      </form>
    );

    return (
      <nav className="navbar navbar-expand-md navbar-light bg-warning mb-4">
        <div className="container  ">
          <Link className="navbar-brand ml-2 " to="/">
            Banana Banners
          </Link>{" "}
          <button
            className="navbar-toggler float-right"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className=" collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto ">
              {!isValid ? (
                <li className="nav-item">
                  <a
                    className="nav-link text-center small text-dark muted mr-auto"
                    href="tel:1(808)739-2842"
                  >
                    <i className="fas fa-phone mr-1"></i>
                    1(808)739-2842
                  </a>
                </li>
              ) : (
                <div></div>
              )}
            </ul>
            {isAuthenticated ? (isValid ? adminLinks : authLinks) : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  loginUser,
  logoutUser,
  clearCurrentProfile,
})(withRouter(Navbar));
