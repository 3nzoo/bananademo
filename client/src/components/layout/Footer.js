import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import SmallTextFieldGroup from "../common/SmallTextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
class Footer extends Component {
  render() {
    const { user } = this.props.auth;

    let showFooter;
    if (user.is_admin === true) {
      showFooter = <div></div>;
    } else {
      showFooter = (
        <footer className="bg-warning text-dark fixed-bottom py-2 text-center">
          <div className="row">
            <div className="col-md-6 my-0 ">
              <Link to="/terms" className="text-secondary mr-2">
                <small> Terms & Condition</small>
              </Link>

              <Link to="/helpCenter" className="text-secondary mr-2">
                <small> Help Center</small>
              </Link>

              <Link to="/contact" className="text-secondary mr-1">
                <small>Contact Us</small>
              </Link>
            </div>
            <div className="m-auto float-right ">
              <h2 className="text-center position-absolute">
                <a href={"http://www.facebook.com"} className="text-dark mr-2">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href={"http://www.instagram.com"} className="text-dark mr-2">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="mailto: abc@example.com" className="text-dark ">
                  <i className="fas fa-envelope"></i>
                </a>
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 my-1">
              <small>
                {" "}
                &copy; {new Date().getFullYear()} Banana Banners. All Rights
                reserved
              </small>
            </div>
          </div>
        </footer>
      );
    }
    return <div className="col-12 ">{showFooter}</div>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Footer);
