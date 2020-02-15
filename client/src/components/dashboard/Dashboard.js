import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Payment from "./Payment";
import Address from "./Address";
import Account from "./admin/Account";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (user.is_admin == true) {
        dashboardContent = (
          <div>
            <p className="lead">
              <strong>Welcome </strong>
              {user.name}
            </p>
            <p className="lead text-muted">Account Type: {user.position}</p>
            <Account account={user.account} />
          </div>
        );
      } else {
        // Check if logged in user has profile data
        if (Object.keys(profile).length > 0) {
          dashboardContent = (
            <div>
              <div className="col-md-6">
                <div className="col-md-6 pl-1 order-6 order-md-2">
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
                      className="list-group-item bannerLink list-group-item-action"
                      href="/meshBanner"
                    >
                      Mesh Banner (13oz.)
                      <small className="float-right"> ></small>
                    </a>
                    <a
                      className="list-group-item bannerLink list-group-item-action active"
                      href=""
                    >
                      Super Smooth <small className="float-right"> ></small>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <p className="lead">
                  <strong>Welcome </strong>
                  {profile.handle}
                  {/* <Link to={`/profile/${profile.handle}`}>{profile.handle} </Link> */}
                </p>
                <button
                  onClick={this.onDeleteClick.bind(this)}
                  className="btn float-right btn-danger "
                >
                  Delete My Account
                </button>
                <p className="lead text-muted">
                  Account Type: {profile.position}
                </p>
                <ProfileActions />

                <Payment payment={profile.payment} />
                <br></br>
                <Address address={profile.address} />
              </div>
            </div>
          );
        } else {
          // User is logged in but has no profile
          dashboardContent = (
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
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
