import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import VinlyBanner13 from './components/banners/VinylBanner13';
import VinlyBanner18 from './components/banners/VinylBanner18';
import MeshBanner from './components/banners/MeshBanner';
import SuperSmooth from './components/banners/SuperSmooth';

import Dashboard from './components/dashboard/Dashboard';

import AdminDash from './components/admin/AdminDash';

import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddPayment from './components/add-info/AddPayment';
import AddAddress from './components/add-info/AddAddress';
import Cart from './components/dashboard/client/Cart';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import ProRequest from './components/dashboard/client/ProRequest';
//footer
import Contact from './components/footerLinks/Contact';
import Terms from './components/footerLinks/Terms';
import HelpCenter from './components/footerLinks/HelpCenter';
import NotFound from './components/not-found/NotFound';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App d-flex flex-column'>
            <Navbar />

            <div className='container'>
              <Route exact path='/' component={Landing} />

              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />

              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:handle' component={Profile} />
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <Route path='/cart' component={Cart} />
                <Route path='/vinyl13' component={VinlyBanner13} />
                <Route path='/vinyl18' component={VinlyBanner18} />
                <Route path='/meshBanner' component={MeshBanner} />
                <Route path='/superSmooth' component={SuperSmooth} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/AdminDash' component={AdminDash} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/create-profile'
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/edit-profile'
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/add-payment'
                  component={AddPayment}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/professionalRequest'
                  component={ProRequest}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path='/add-address'
                  component={AddAddress}
                />
              </Switch>
              <Route exact path='/not-found' component={NotFound} />

              <Route exact path='/contact' component={Contact} />
              <Route exact path='/HelpCenter' component={HelpCenter} />
              <Route exact path='/terms' component={Terms} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
