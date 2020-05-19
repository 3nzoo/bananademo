import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import superSmooth from "../../img/superSmooth.jpg";
import Login from "../auth/Login";
import QuoteSuperSmooth from "./quote/quoteSuper";
import BannerLinks from "./BannerLinks";
class SuperSmooth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: "superSmooth",
      errors: {},
    };
  }

  componentDidMount() {}

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { user } = this.props.auth;
    const { errors } = this.state;
    let client = false;
    const currenTime = Date.now() / 1000;
    if (user.exp < currenTime) {
      window.location.href = "/";
    }
    if (errors.isApproved) {
      errors.email = errors.isApproved;
    }
    if (isAuthenticated && !user.is_admin) {
      client = true;
    }
    return (
      <div className="superSmooth">
        <div className="container">
          <div className="row">
            <div
              className={
                "col-md-3 pl-1  " +
                (isAuthenticated ? "order-6 order-md-2 " : "order-6 order-md-2")
              }
            >
              <BannerLinks banner={this.state.banner} />
            </div>

            <div
              className={
                "col-md-5 small p-0 mt-3 mx-auto ml-auto " +
                (isAuthenticated ? "order-2 order-md-4" : "order-4")
              }
            >
              <img
                className="img-fluid mb-4"
                src={superSmooth}
                alt="superSmooth"
              />
              <h4 className="display-5 text-center">Super Smooth</h4>
              <p className="text-left">
                Our premium super smooth banner is great for displaying graphics
                indoors. The smooth surface ensures your vivid prints will come
                to life. With the material's low memory, your graphic will hang
                flawlessly without creases.
              </p>
              <strong>Features</strong>
              <ul>
                <li>Maximum Size: 52" x 100'</li>
                <li>Finishing: Flush cut; Custom Grommets</li>
                <li>Usage: Indoor use with UV printing to last for years</li>
              </ul>
            </div>
            <div
              className={
                "col-md-3 mb-4 mt-3 ml-auto loginBG  " +
                (isAuthenticated ? "order-4 order-md-6" : "order-2 order-md-6")
              }
            >
              {client ? <QuoteSuperSmooth /> : <Login />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SuperSmooth.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(SuperSmooth);
