import React from "react";

export default () => {
  return (
    <footer className="bg-warning text-dark fixed-bottom py-2 text-center">
      <div className="row">
        <div className="col-md-6 my-0">
          <a href="#" className="text-secondary mr-1">
            <small> Terms & Condition</small>
          </a>
          <a href="#" className="text-secondary pr-1">
            <small> Privacy Policy</small>
          </a>
          <a href="#" className="text-secondary mr-1">
            <small> Legal Notice</small>
          </a>
        </div>
        <div className="col-md-0 m-auto float-right">
          <h2 className="text-center position-absolute">
            <a href="#" className="text-dark mr-2">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-dark mr-2">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-dark ">
              <i className="fas fa-envelope"></i>
            </a>
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 my-1">
          <small>
            {" "}
            &copy; {new Date().getFullYear()} 2019 Banana Banners. All Rights
            reserved
          </small>
        </div>
      </div>
    </footer>
  );
};
