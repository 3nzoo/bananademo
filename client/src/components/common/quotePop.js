import React, { Component } from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
class quotePop extends Component {
  state = {
    poperror,
    open: false,
  };

  render() {
    return (
      <div>
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closePop}
        >
          <div className="modal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            nobis nemo veritatis alias minima, error, totam eveniet voluptatum
            optio praesentium possimus doloremque suscipit nulla. Expedita ullam
            nostrum rerum debitis assumenda.
          </div>
        </Popup>
      </div>
    );
  }
}

quotePop.prototypes = {
  poperror: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default quotePop;
