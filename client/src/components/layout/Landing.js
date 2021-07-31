// Public Home Page
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import logo from "../../img/LOGO.png";
import BannerLinks from "../banners/BannerLinks";
class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="container">
          <div className="row">
            <div className="col-md-3 pl-1 order-6 order-md-2">
              <BannerLinks />
            </div>
            <div className=" col-md-8 order-2 order-md-6 mt-3 mx-auto">
              <div className="col-lg-4 col-md-12 text-center mb-2 float-md-right">
                <img
                  className="img-fluid img-fluid mb-3 monkey"
                  src={logo}
                  alt="Logo"
                />
              </div>
              <div className="col-lg-8 col-md-12 float-md-left  ">
                <h1 className="text-left px-0  row">bananabanner.store</h1>
                <h3 className="text-left font-weight-normal  row">
                  From your desktop to your door
                </h3>
                <p style={{ lineHeight: 2 }} className="text-left mt-4 p-0 row">
                  Upload your designed file from your phone or your laptop and
                  have your high quality affordable banners, ordered from
                  anywhere, sent anywhere:
                </p>
                <p className="text-left row">worldwide Design. Upload. Done.</p>
                <div className="col-md-3 col-sm-12 text-center ">
                  <Link
                    to="/register"
                    className="btn SignU text-left ml-0 text-white mt-3 "
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="col-12 float-md-left row">
                <p
                  style={{ lineHeight: 2 }}
                  className="text-left my-4 col-md-12 p-0"
                >
                  Banana Banners is one of the fastest growing large format
                  producers in the entire US. Our massive production volume
                  allows us to pass savings onto an ever-growing customer base.
                  We cater to privately owned print shops and brokers, ad
                  agencies, sign shops, graphic designers and photo studios.
                </p>
                <p>
                  We welcome you to our growing family. Please apply for a
                  premiere account today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
