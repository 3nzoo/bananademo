import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import mesh from "../../img/mesh.png";

import QuoteV13 from "../quote/quoteV13";
import Login from "../auth/Login";

class MeshBanner extends Component {
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
                  className="list-group-item bannerLink list-group-item-action "
                  href="/vinyl18"
                >
                  Vinyl Banner (18oz.)
                  <small className="float-right"> ></small>
                </a>
                <a
                  className="list-group-item bannerLink list-group-item-action active"
                  href=""
                >
                  Mesh Banner (13oz.)<small className="float-right"> ></small>
                </a>
                <a
                  className="list-group-item bannerLink list-group-item-action "
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

            <div className="col-md-5 mx-auto p-0 mt-3 ml-auto order-4">
              <img className="img-fluid mb-4" src={mesh} alt="mesh" />
              <h3 className="display-5 text-center">Mesh Banner</h3>
              <p className="text-left">
                Mesh banners are printed on 10 oz. heavy-duty banner material.
                They are suitable for large outdoor advertisements where wind
                load is an issue. Mesh banners are printed with UV inks.
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

            <div className="col-md-3 mt-3 ml-auto mb-4 order-2 order-md-6 loginBG">
              {client ? <QuoteV13 /> : <Login />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MeshBanner.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(MeshBanner);
