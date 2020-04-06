import React, { Component } from "react";
// import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <p>
          <strong>Name on Card:</strong> {exp.company}
        </p>

        <p>
          <strong>Card Number:</strong> {exp.title}
        </p>
        <p>
          {exp.location === "" ? null : (
            <span>
              <strong>cvv: </strong> {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description === "" ? null : (
            <span>
              <strong>Expiration Date: </strong> {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <p>
          <strong>Contact Person:</strong> {edu.school}
        </p>

        <p>
          <strong>Contact Number:</strong> {edu.degree}
        </p>
        <p>
          <strong>Address:</strong> {edu.fieldofstudy}
        </p>
        <p>
          {edu.description === "" ? null : (
            <span>
              <strong>Description: </strong> {edu.description}
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <br></br>
          <h3 className="text-center text-info">PAYMENT INFO</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Payment Info yet</p>
          )}
        </div>

        <div className="col-md-6">
          <br></br>
          <h3 className="text-center text-info">DELIVERY ADDRESS</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Delivery Address Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
