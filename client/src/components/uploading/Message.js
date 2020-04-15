import React from "./node_modules/react";
import PropTypes from "./node_modules/prop-types";

const Message = ({ msg }) => {
  return (
    <div className="alert alert-info alert-dismissible fade show" role="alert">
      {msg}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;
