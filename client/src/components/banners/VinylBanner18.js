import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import vinyl18 from "../../img/18oz.png";
import Login from "../auth/Login";
import QuoteV18 from "./quote/quoteV18";
import BannerLinks from "./BannerLinks";

class VinylBanner18 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: "vinyl18",
      errors: {},
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { user } = this.props.auth;
    const { errors } = this.state;
    const currenTime = Date.now() / 1000;
    if (user.exp < currenTime || user.is_admin) {
      window.location.href = "/";
    }
    let client = false;
    if (errors.isApproved) {
      errors.email = errors.isApproved;
    }
    if (isAuthenticated && !user.is_admin) {
      client = true;
    }
    return (
      <div className="vinyl18">
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
              <img className="img-fluid mb-4" src={vinyl18} alt="vinly18oz" />
              <h4 className="display-5 text-center">Vinyl Banner (18oz)</h4>
              <p className="text-left">
                Our 18oz. Blockout Matte Vinyl Banner material is suitable for
                street banners and light pole banners. It is more heavy duty and
                stronger than our standard 13 oz. vinyl banner material.
              </p>
              <strong>Features</strong>
              <ul>
                <li>
                  Single-Sided single piece maximum size 10’ x 145’ w/o pocket
                  and 9.5’ x 145’ w/ pocket ; Double-Sided banners maximum size
                  9.5’ x 145.
                </li>
                <li>
                  Oversized banners will be welded together (Double-Sided
                  Banners are not available oversized)
                </li>
                <li>High resolution digitally printed at 720 x 720</li>
                <li>
                  More optional finishing available Indoor and outdoor use,
                  waterproof and UV safe
                </li>
                <li>
                  Double sided banners are now 1 banner printed front and back
                </li>
              </ul>
            </div>
            <div
              className={
                "col-md-3 mb-4 mt-3 ml-auto loginBG  " +
                (isAuthenticated ? "order-4 order-md-6" : "order-2 order-md-6")
              }
            >
              {client ? <QuoteV18 /> : <Login />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VinylBanner18.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(VinylBanner18);
