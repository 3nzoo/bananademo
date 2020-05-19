import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import vinyl13 from "../../img/13oz.jpg";
import Login from "../auth/Login";
import QuoteV13 from "./quote/quoteV13";
import BannerLinks from "./BannerLinks";
class VinylBanner13 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: "vinyl13",
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      // this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      // this.props.history.push("/dashboard");
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
      <div className="vinyl13">
        <div className="container">
          <div className="row">
            <div className="col-md-3 pl-1 order-6 order-md-2">
              <BannerLinks banner={this.state.banner} />
            </div>
            <div className="col-md-5 p-0 small mx-auto mt-3 ml-auto order-4">
              <img className="img-fluid mb-4" src={vinyl13} alt="viny13oz" />
              <h4 className="display-5 text-center">Vinyl Banner (13oz)</h4>
              <p className="text-left">
                We use a premium heavyweight 13 oz. scrim vinyl banner. It has a
                very smooth surface for best printing results. This material is
                typically used for billboards, building wraps, banners, event
                flags, trade show signage, parades, etc.
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
            <div className="col-md-3 mt-3 ml-auto order-2 mb-4 order-md-6 loginBG">
              {client ? <QuoteV13 /> : <Login />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VinylBanner13.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(VinylBanner13);
