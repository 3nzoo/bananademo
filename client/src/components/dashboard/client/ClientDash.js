import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteAccount } from "../../../actions/profileActions";
import BannerLinks from "../../banners/BannerLinks";
import Payment from "./Payment";
import Address from "./Address";
import ProfileActions from "./ProfileActions";

class ClientDash extends Component {
  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { profile } = this.props.profile;
    const { user } = this.props.auth;
    let clientContent;
    // Check if logged in user has profile data
    if (Object.keys(profile).length > 0) {
      clientContent = (
        <div className="row">
          <div className="col-md-3 pl-1 ">
            <BannerLinks />
          </div>
          <div className="col-md-8 mt-2 ml-auto ">
            <p className="lead">
              <strong>Welcome </strong>
              {profile.handle}
            </p>
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn float-right btn-danger "
            >
              Delete My Account
            </button>
            <p className="lead text-muted">Account Type: {profile.position}</p>
            <ProfileActions />

            <Payment payment={profile.payment} />
            <br></br>
            <Address address={profile.address} />
          </div>
        </div>
      );
    } else {
      // User is logged in but has no profile
      clientContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>Your Account has been approved</p>
          <p>You may now setup your profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
    return <div>{clientContent}</div>;
  }
}
ClientDash.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { deleteAccount })(ClientDash);
