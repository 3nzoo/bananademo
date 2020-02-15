import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

class BannerLinks extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isPressed: props.isPressed
    };
  }
  toggle() {
    this.setState({
      isPressed: !this.state.isPressed
    });
  }
  render() {
    // const buttonClass = this.state.isPressed ? "pressed" : null;
    return (
      <div>
        <button onClick={this.toggle} href="/vinyl18">
          Click me
        </button>

        <div className="list-group my-3 ">
          <p className="list-group-item lead bg-warning">BANNERS</p>
          <a
            className={classnames(
              "list-group-item bannerLink list-group-item-action ",
              { active: this.state.isPressed }
            )}
            href="/vinyl13"
            label="vinyl13"
          >
            Vinyl Banner (13oz.)
            <small className="float-right"> ></small>
          </a>
          <a
            className="list-group-item bannerLink list-group-item-action "
            href="/vinyl18"
            label="vinly18"
          >
            Vinyl Banner (18oz.)
            <small className="float-right"> ></small>
          </a>
          <a
            className={classnames(
              "list-group-item bannerLink list-group-item-action ",
              { active: this.state.isPressed }
            )}
            onClick={this.toggle}
            href="/meshBanner"
            label="meshBanner"
          >
            Mesh Banner (13oz.)<small className="float-right"> ></small>
          </a>
          <a
            className="list-group-item list-group-item-action bannerLink"
            href="/superSmooth"
            label="superSmooth"
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
    );
  }
}

BannerLinks.defaultProps = {
  isPressed: false
};
export default BannerLinks;
