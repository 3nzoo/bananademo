import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Redirect } from "react-router-dom";
import { deleteAccount } from '../../../actions/profileActions';
import { getFile } from '../../../actions/adminActions';
import BannerLinks from '../../banners/BannerLinks';
import Payment from './Payment';
import Address from './Address';
import ProfileActions from './ProfileActions';

class ClientDash extends Component {
  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  test1 = (e) => {
    e.preventDefault();
    this.props.getFile(e);
  };

  render() {
    const { profile } = this.props.profile;
    const { user } = this.props.auth;

    let clientContent;

    // Check if logged in user has profile data
    if (Object.keys(profile).length > 0) {
      clientContent = (
        <div className='row'>
          <div className='col-md-3 pl-1 order-6 order-md-2'>
            <BannerLinks />
          </div>
          <div className='col-md-8 mt-2 ml-auto order-2 order-md-6 '>
            <p className='lead'>
              <strong>Welcome </strong>
              {profile.handle}
            </p>{' '}
            {/* <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn float-right btn-sm btn-danger "
            >
              Delete My Account
            </button> */}
            <p className=' text-muted text-capitalize '>
              Account Type: {profile.position}
              {profile.position === 'premiere' ? (
                <Link
                  to='/professionalRequest'
                  className='btn btn-success float-right btn-sm mx-2'
                >
                  Request to pro
                </Link>
              ) : (
                ''
              )}
            </p>
            <ProfileActions />
            {/* <button onClick={this.test1} value="abc.jpg">
              testit it
            </button> */}
            <br />
            <Payment payment={profile.payment} />
            <div className='border border-light col-122 mx-auto row'></div>{' '}
            <br></br>
            <Address address={profile.address} />
            <div className='border border-light col-122 mx-auto row'></div>{' '}
          </div>
        </div>
      );
    } else {
      const currenTime = Date.now() / 1000;
      // User is logged in but has no profile
      if (user.exp < currenTime) {
        window.location.href = '/';
      } else {
        clientContent = (
          <div className='text-center my-5'>
            <h1 className=' text-muted text-capitalize'>Welcome {user.name}</h1>
            <br />
            <h3 className='mt-3'>Your Account has been approved</h3>

            <p className='mt-3'>
              You may now setup your profile, <br />
              Please add some info before starting your order. <br />
              Thank you!
            </p>
            <Link
              to='/create-profile'
              className='mt-3 btn SignU btn-lg btn-light'
            >
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return <div>{clientContent}</div>;
  }
}
ClientDash.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getFile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteAccount, getFile })(ClientDash);
