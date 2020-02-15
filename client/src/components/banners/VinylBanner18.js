import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link } from "react-router-dom";
import vinyl18 from "../../img/18oz.png";
import Login from "../auth/Login";
import QuoteV13 from "../quote/quoteV13";

class VinylBanner18 extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      //   this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      //   this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { user } = this.props.auth;
    const { errors } = this.state;
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
            <div className="col-md-3 pl-1 order-6 order-md-2">
              <div className="list-group my-3 ">
                <p className="list-group-item lead bg-warning">BANNERS</p>
                <a
                  className="list-group-item bannerLink list-group-item-action "
                  href="/vinyl13"
                >
                  Vinyl Banner (13oz.)
                  <small className="float-right"> ></small>
                </a>
                <a
                  className="list-group-item bannerLink list-group-item-action active"
                  href="#"
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
                <h1 className="text-center py-4">
                  <i className="fab fa-cc-paypal mr-1"></i>
                  <i className="fab fa-cc-mastercard ml-1"></i>
                  <i className="fab fa-cc-visa ml-2"></i>
                  <i className="fab fa-cc-amex ml-2"></i>
                </h1>

                <p className=" text-center">
                  High quality affordable banners, ordered from anywhere, sent
                  anywhere: worldwide.
                </p>
                <p className="text-center">
                  <i className="fas fa-clock"></i> Mon - Sun: 8:00 am to 5:00 pm
                </p>
              </div>
            </div>
            <div className="col-md-5 p-0 mt-3 mx-auto ml-auto order-4">
              <img className="img-fluid mb-4" src={vinyl18} alt="vinly18oz" />
              <h3 className="display-5 text-center">Vinyl Banner (18oz)</h3>
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
            <div className="col-md-3 mb-4 mt-3 ml-auto order-2 order-md-6 loginBG">
              {client ? <QuoteV13 /> : <Login />}
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(VinylBanner18);