import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroupContact";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addMessage } from "../../actions/profileActions";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { user } = this.props.auth;
    if (this.props.auth.isAuthenticated) {
      this.setState({ name: user.name });
      this.setState({ email: user.email });
    }
  }

  onChange(e) {
    if (!this.props.auth.isAuthenticated) {
      this.setState({ [e.target.name]: e.target.value });
    }
    if (e.target.name === "message") {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  onSet = () => {
    this.setState({ name: this.props.auth.user.name }, () => {
      this.setState({ email: this.props.auth.user.email });
    });
  };

  onSubmit(e) {
    e.preventDefault();
    const newMessage = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
    };

    this.props.addMessage(newMessage, this.props.history);
  }

  render() {
    const { user } = this.props.auth;
    const currenTime = Date.now() / 1000;
    if (user.exp < currenTime || user.is_admin) {
      window.location.href = "/";
    }
    return (
      <div className="contact">
        <div className="container">
          <div className="row">
            <div className="col-md-4 pl-1 small order-6 order-md-2">
              <div className="list-group my-3 ">
                <h6 className="list-group-item py-2 bg-warning">BANNERS</h6>
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

              <div className="col-md-12 mt-2">
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
            <div className="col-md-6 m-auto order-2 order-md-6 ">
              <h1 className="text-center px-3 text-success mt-2">
                Send Us a Message!
              </h1>
              <p className="text-center px-4 my-4">
                We would love to hear your suggestions and feedback. If you need
                assistance with a live order email us at info@bananabanners.com
                or call 1(808)739-2842 Home
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder={this.state.name ? this.state.name : "Fullname"}
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  placeholder={this.state.email ? this.state.email : "Email"}
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <TextAreaFieldGroup
                  placeholder="Message"
                  name="message"
                  value={this.state.message}
                  onChange={this.onChange}
                />
                <input
                  type="submit"
                  className="btn SignU btn-block text-white mt-4 mb-4"
                />
              </form>
              <div className="col-md-12 small mt-5">
                <p className=" text-center font-weight-bold">OFFICE HOURS</p>
                <p className="text-center">
                  <i className="fas fa-clock"></i> Monday - Friday: 8:00 am to
                  5:00 pm
                </p>
                <div className="row col-8 mb-3 mx-auto text-center border"></div>
                <p className=" text-center font-weight-bold">
                  STORE PICK UP HOURS
                </p>
                <p className="text-center">
                  <i className="fas fa-people-carry"></i> Monday - Friday: 8:00
                  am to 5:00 pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Contact.propTypes = {
  addMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addMessage })(Contact);
