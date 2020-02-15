import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import logo from "../../img/LOGO.png";
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
            <div className="col-md-3 pl-1 ">
              <div className="list-group my-3 ">
                <p className="list-group-item lead bg-warning">BANNERS</p>
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
              <div className="mt-2">
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

            <div className="col-md-8 ml-auto">
              <div className="col-md-12">
                <img
                  className="img-fluid col-md-5  position-relative
                float-right"
                  src={logo}
                  alt="Logo"
                />
              </div>
              <h1 className="text-left py-1">bananabanners.com</h1>
              <h3 className="text-left font-weight-normal">
                From your desktop to your door
              </h3>
              <p
                style={{ lineHeight: 2 }}
                className="text-left mt-4 col-md-8 p-0"
              >
                Upload your designed file from your phone or your laptop and
                have your high quality affordable banners, ordered from
                anywhere, sent anywhere: worldwide Design. Upload. Done.
              </p>

              <Link to="/register" className="btn SignU text-white mt-4">
                Get Started
              </Link>

              <p
                style={{ lineHeight: 2 }}
                className="text-left my-4 col-md-12 p-0 pb-4"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur eaque laborum nisi maiores amet modi porro,
                reiciendis molestias praesentium iste odit sunt suscipit
                dolorum. Nobis laborum praesentium eos nesciunt repudiandae?
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
