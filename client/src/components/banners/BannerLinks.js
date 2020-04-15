import React, { Component } from "react";
import { Link } from "react-router-dom";

class BannerLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: props.banner
    };
  }
  render() {
    return (
      <div>
        <div className="list-group my-3 ">
          <p className="list-group-item py-2 bg-warning">BANNERS</p>

          <Link
            to={this.state.banner === "vinyl13" ? "#" : "/vinyl13"}
            className={
              "list-group-item small bannerLink list-group-item-action" +
              (this.state.banner === "vinyl13" ? " active" : "")
            }
          >
            Vinyl Banner (13oz.)
            <small className="float-right"> ></small>
          </Link>

          <Link
            to={this.state.banner === "vinyl18" ? "#" : "/vinyl18"}
            className={
              "list-group-item small bannerLink list-group-item-action" +
              (this.state.banner === "vinyl18" ? " active" : "")
            }
          >
            Vinyl Banner (18oz.)
            <small className="float-right"> ></small>
          </Link>
          <Link
            to={this.state.banner === "meshBanner" ? "#" : "/meshBanner"}
            className={
              "list-group-item small bannerLink list-group-item-action" +
              (this.state.banner === "meshBanner" ? " active" : "")
            }
          >
            Mesh Banner (13oz.)
            <small className="float-right"> ></small>
          </Link>
          <Link
            to={this.state.banner === "superSmooth" ? "#" : "/superSmooth"}
            className={
              "list-group-item small bannerLink list-group-item-action" +
              (this.state.banner === "superSmooth" ? " active" : "")
            }
          >
            Super Smooth
            <small className="float-right"> ></small>
          </Link>
        </div>

        <div className="col-md-12 mt-2 small">
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
    );
  }
}

export default BannerLinks;
