import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4 " role="group">
      <Link to="/add-payment" className="btn btn-light mr-3">
        <i className="fas fa-credit-card text-info mr-1" />
        Payment
      </Link>
      <Link to="/add-address" className="btn btn-light">
        <i className="fas fa-map-marker text-info mr-1" />
        Delivery Address
      </Link>
    </div>
  );
};

export default ProfileActions;
