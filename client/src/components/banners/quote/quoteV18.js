import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import SmallTextFieldGroup from "../../common/SmallTextFieldGroup";
import SmallSelectListGroup from "../../common/SmallSelectListGroup";

import { optionsSlides } from "./options";
import { optionsTurnaround } from "./options";
import { optionsHem } from "./options";
import { optionsWebbing } from "./options";
import { optionsWindslit } from "./options";
import { optionsGrommet } from "./options";
import { optionsPole } from "./options";
import { optionsCorners } from "./options";
import { optionsShipping } from "./options";
import { optionsRope } from "./options";

class QuoteV18 extends Component {
  constructor() {
    super();
    this.state = {
      totalBanner: "",
      widthFt: "",
      widthIn: "",
      heightFt: "",
      heightIn: "",
      widthFeet: "",
      widthInch: "",
      heightFeet: "",
      heightInch: "",
      widthTot: "",
      heightTot: "",
      numSlides: "",
      quantity: "",
      price: "",
      displayMoreOptions: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  totHeight(hfeet, hinch) {
    this.setState({ heightTot: hfeet + hinch }, () => {
      this.totalBan(this.state.widthTot, this.state.heightTot);
    });
  }
  totWidth(hfeet, hinch) {
    this.setState({ widthTot: hfeet + hinch }, () => {
      this.totalBan(this.state.widthTot, this.state.heightTot);
    });
  }

  totalBan(wtot, htot) {
    const totalSize = Math.round(((htot * wtot) / 144) * 100) / 100;
    this.setState({ totalBanner: totalSize });
  }
  onChange = e => {
    // Disable alphabetic
    const re = /^[0-9\b]+$/;
    if (isNaN(e.target.value)) {
      return;
    }
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    }

    const press = Number(e.target.value);
    if (e.target.name === "widthFt") {
      this.setState({ widthFeet: press * 12 }, () => {
        this.totWidth(this.state.widthFeet, this.state.widthInch);
      });
    } else if (e.target.name === "widthIn") {
      this.setState({ widthInch: press }, () => {
        this.totWidth(this.state.widthFeet, this.state.widthInch);
      });
    } else if (e.target.name === "heightFt") {
      this.setState({ heightFeet: press * 12 }, () => {
        this.totHeight(this.state.heightFeet, this.state.heightInch);
      });
    } else if (e.target.name === "heightIn") {
      this.setState({ heightInch: press }, () => {
        this.totHeight(this.state.heightFeet, this.state.heightInch);
      });
    }
  };

  render() {
    const { errors, displayMoreOptions } = this.state;
    if (errors.isApproved) {
      errors.email = errors.isApproved;
    }

    let moreInputs;
    if (displayMoreOptions) {
      moreInputs = (
        <div>
          <div className="row mt-3 mx-auto">
            <span className="ml-3 my-1 ">Hem</span>
            <div className="col-md-7 ml-auto">
              <SmallSelectListGroup
                className="small"
                placeholder="Business Type"
                name="hem"
                value={this.state.hem}
                onChange={this.onChange}
                options={optionsHem}
                error={errors.hem}
              />
            </div>
          </div>
          <div className="row mx-auto">
            <span className="ml-3 my-1 ">Windslit</span>
            <div className="col-md-7 ml-auto">
              <SmallSelectListGroup
                className="small"
                placeholder="Business Type"
                name="windSlit"
                value={this.state.windSlit}
                onChange={this.onChange}
                options={optionsWindslit}
                error={errors.windSlit}
              />
            </div>
          </div>
          <div className="row  mx-auto">
            <span className="ml-3 my-1 ">Windslit</span>
            <div className="col-md-7  ml-auto">
              <SmallSelectListGroup
                className="small"
                placeholder="Business Type"
                name="businessType"
                value={this.state.businessType}
                onChange={this.onChange}
                options={optionsWindslit}
                error={errors.businessType}
              />
            </div>
          </div>

          <div className="row  mx-auto">
            <span className="ml-3 my-1 ">Webbing</span>
            <div className="col-md-7  ml-auto">
              <SmallSelectListGroup
                className="small"
                placeholder="Business Type"
                name="businessType"
                value={this.state.businessType}
                onChange={this.onChange}
                options={optionsWebbing}
                error={errors.businessType}
              />
            </div>
          </div>

          <div className="row  mx-auto">
            <span className="ml-3 my-1 ">Corners</span>
            <div className="col-md-7  ml-auto">
              <SmallSelectListGroup
                className="small"
                placeholder="Business Type"
                name="businessType"
                value={this.state.businessType}
                onChange={this.onChange}
                options={optionsCorners}
                error={errors.businessType}
              />
            </div>
          </div>

          <div className="row  mx-auto">
            <span className="ml-3 my-1 ">Rope</span>
            <div className="col-md-7  ml-auto">
              <SmallSelectListGroup
                className="small"
                placeholder="Business Type"
                name="businessType"
                value={this.state.businessType}
                onChange={this.onChange}
                options={optionsRope}
                error={errors.businessType}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="small">
        <div className="row">
          <div className="p-0 mx-0 mb-3">
            <h5 className="py-2 pl-3 bg-warning">Quote</h5>
            <div className="row  mb-2 mx-auto">
              <span className="ml-3 my-auto ">Width</span>

              <div className="col-md-3 p-0 ml-md-auto ml-3 mr-3 bg-warning ">
                <SmallTextFieldGroup
                  className="small"
                  placeholder={"0 ft"}
                  name="widthFt"
                  value={this.state.widthFt}
                  onChange={this.onChange}
                  error={errors.widthFt}
                />
              </div>
              <div className="col-md-3 p-0 mr-3 ml-3 ml-md-0">
                <SmallTextFieldGroup
                  className="small"
                  placeholder={"0 in"}
                  name="widthIn"
                  value={this.state.widthIn}
                  onChange={this.onChange}
                  error={errors.widthIn}
                />
              </div>
            </div>
            <div className="row  mx-auto">
              <span className="ml-3 my-auto ">Height</span>

              <div className="col-md-3 p-0 ml-md-auto ml-3 mr-3 bg-warning ">
                <SmallTextFieldGroup
                  className="small"
                  placeholder={"0 ft"}
                  name="heightFt"
                  value={this.state.heightFt}
                  onChange={this.onChange}
                  error={errors.heightFt}
                />
              </div>
              <div className="col-md-3 p-0 mr-3 ml-3 ml-md-0">
                <SmallTextFieldGroup
                  className="small"
                  placeholder={"0 in"}
                  name="heightIn"
                  value={this.state.heightIn}
                  onChange={this.onChange}
                  error={errors.heightIn}
                />
              </div>
              <div
                className="col-md-12 my-3 text-right 
              "
              >
                {this.state.widthTot == null || !this.state.widthTot
                  ? "0"
                  : this.state.widthTot}
                " x{" "}
                {this.state.heightTot == null || !this.state.heightTot
                  ? "0"
                  : this.state.heightTot}
                " ={" "}
                {this.state.totalBanner == null || !this.state.totalBanner
                  ? "0"
                  : this.state.totalBanner}{" "}
                ft
                <sup>2</sup>
              </div>
              <div className="row ml-3 mb-2">
                Materials:
                <span className="ml-4"> 18oz. Blockout Vinyl Banner</span>
              </div>
            </div>
            <div className="row mb-1  mx-auto">
              <span className="ml-3 my-1 "># of Slides</span>
              <div className="col-md-7  ml-auto">
                <SmallSelectListGroup
                  placeholder="1"
                  name="numSlides"
                  value={this.state.numSlides}
                  onChange={this.onChange}
                  options={optionsSlides}
                  error={errors.numSlides}
                />
              </div>
            </div>

            <div className="row border-top border-dark pt-3 mt-2 mx-auto">
              <span className="ml-3 my-1 ">Pole Pocket</span>
              <div className="col-md-7  ml-auto">
                <SmallSelectListGroup
                  placeholder="No Pole Pockets"
                  name="pockets"
                  value={this.state.pockets}
                  onChange={this.onChange}
                  options={optionsPole}
                  error={errors.pockets}
                />
              </div>
            </div>
            <div className="row  mx-auto">
              <span className="ml-3 my-1 ">Grommet</span>
              <div className="col-md-7 small ml-auto">
                <SmallSelectListGroup
                  className="small"
                  placeholder="Business Type"
                  name="grommet"
                  value={this.state.grommet}
                  onChange={this.onChange}
                  options={optionsGrommet}
                  error={errors.grommet}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  this.setState(prevState => ({
                    displayMoreOptions: !prevState.displayMoreOptions
                  }));
                }}
                className={"btn ml-3 btn-sm btn-dark mt-2"}
              >
                More Options
              </button>
            </div>

            {moreInputs}

            <div className="row mt-3 mb-2 mx-auto py-2 bg-primary align-items-center text-white">
              <span className="ml-3 my-auto ">QUANTITY</span>

              <div className="col-md-3 p-0 ml-4 mr-2 bg-warning ">
                <SmallTextFieldGroup
                  placeholder="1"
                  name="quantity"
                  type="quantity"
                  value={this.state.quantity}
                  onChange={this.onChange}
                  error={errors.quantity}
                />
              </div>
              <strong className="ml-auto pr-2 ">
                {" "}
                {/* {console.log(this.state.price + "ere")}$ */}
                {isNaN(this.state.price) ||
                this.state.price == null ||
                this.state.price === 0
                  ? "0.00"
                  : this.state.price}
              </strong>
            </div>
            <div className="row mt-4 mx-auto">
              <span className="ml-3 my-1 ">Turnaround</span>
              <div className="col-md-7  ml-auto">
                <SmallSelectListGroup
                  placeholder="Business Type"
                  name="turnaround"
                  value={this.state.businessType}
                  onChange={this.onChange}
                  options={optionsTurnaround}
                  error={errors.businessType}
                />
              </div>
            </div>
            <div className="row mt-2 pt-3 mx-auto bg-warning mb-4">
              <span className="ml-3 my-1 ">Shipping</span>
              <div className="col-md-7  ml-auto">
                <SmallSelectListGroup
                  placeholder="Business Type"
                  name="shipping"
                  value={this.state.businessType}
                  onChange={this.onChange}
                  options={optionsShipping}
                  error={errors.businessType}
                />
              </div>
            </div>

            <input
              type="submit"
              className="btn SignU text-white btn-block col-md-6 text-center m-auto "
            />
          </div>
        </div>
      </div>
    );
  }
}

QuoteV18.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(QuoteV18);
