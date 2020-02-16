import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link } from "react-router-dom";
import SmallTextFieldGroup from "../common/SmallTextFieldGroup";
import SmallSelectListGroup from "../common/SmallSelectListGroup";
class QuoteV13 extends Component {
  constructor() {
    super();
    this.state = {
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
      pocket: "",
      quantity: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onChange(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    }

    if (e.target.name == "widthFt") {
      this.state.widthFeet = parseFloat(e.target.value) * 12;
    } else if (e.target.name == "widthIn") {
      this.state.widthInch = parseFloat(e.target.value);
    } else if (e.target.name == "heightFt") {
      this.state.heightFeet = parseFloat(e.target.value) * 12;
      console.log(this.state.heightFeet);
    } else if (e.target.name == "heightIn") {
      this.state.heightInch = parseFloat(e.target.value);
    } else if (e.target.name == "quantity") {
      this.state.quantity = parseFloat(e.target.value);
    }

    if (isNaN(this.state.widthFeet)) {
      this.state.widthFeet = 0;
    } else if (isNaN(this.state.widthInch)) {
      this.state.widthInch = 0;
    } else if (isNaN(this.state.heightInch)) {
      this.state.heightInch = 0;
    } else if (isNaN(this.state.heightFeet)) {
      this.state.heightFeet = 0;
    } else if (isNaN(this.state.quantity || this.state.quantity == 0)) {
      this.state.quantity = 1;
    }

    this.state.widthTot = this.state.widthInch + this.state.widthFeet;
    this.state.heightTot = this.state.heightFeet + this.state.heightInch;
    if (isNaN(this.state.widthTot)) {
      this.state.widthTot = "0";
      //   console.log(this.state.widthTot);
    } else if (isNaN(this.state.heightTot)) {
      this.state.heightTot = "0";
    }
    this.state.totalBanner = (this.state.widthTot * this.state.heightTot) / 144;
    this.state.totalBanner = Math.round(this.state.totalBanner * 100) / 100;
    // console.log(this.state.totalBanner);
  }

  render() {
    const { errors } = this.state;
    if (errors.isApproved) {
      errors.email = errors.isApproved;
    }
    const optionsSlides = [
      { label: "1", value: "1" },
      { label: "2", value: "2" }
    ];

    const optionsTurnaround = [
      { label: "Next Day", value: "Next Day" },
      { label: "Same Day", value: "Same Day" }
    ];

    const optionsHem = [
      { label: "All Sides", value: "All Sides" },
      { label: "no Hem", value: "no Hem" }
    ];

    const optionsShipping = [
      { label: "Store Pickup", value: "Store Pickup" },
      { label: "Default Ship", value: "Default Ship" }
    ];
    const optionsRope = [
      { label: "No Rope Sewn", value: "No Rope Sewn" },
      { label: '3/16" - Top Only', value: "3/16 - Top Only" },
      { label: '3/16" - Bottom Only', value: "3/16 - Bottom Only" },
      { label: '3/16" - Top and Bottom', value: "3/16 - Top and Bottom" },
      { label: '5/16" - Top Only', value: "3/16 - Top Only" },
      { label: '5/16" - Bottom Only', value: "3/16 - Bottom Only" },
      { label: '5/16" - Top And Bottom ', value: "3/16 - Bottom " }
    ];

    const optionsCorners = [
      { label: "No Reinforced Corners", value: "No Reinforced Corners" },
      { label: "Reinforce Top Only", value: "Reinforce Top Only" },
      { label: "Reinforce Bottom Only", value: "Reinforce Bottom Only" },

      { label: "Reinforce All Corners", value: "Reinforce All Corners" }
    ];

    const optionsPole = [
      { label: "No Pole Pockets", value: "No Pole Pockets" },
      {
        disabled: true,
        label: "----------------",
        value: ""
      },
      { label: '2" - Top & Bottom', value: '2" - Top & Bottom' },
      { label: '3" - Top & Bottom', value: '3" - Top & Bottom' },
      { label: '4" - Top & Bottom', value: '4" - Top & Bottom' },

      {
        disabled: true,
        label: "----------------",
        value: ""
      },
      { label: '2" - Top Only', value: '2" - Top Only' },
      { label: '3" - Top Only', value: '3" - Top Only' },
      { label: '4" - Top Only', value: '4" - Top Only' }
    ];

    const optionsGrommet = [
      { label: "Every 2' All Sides", value: "Every 2' All Sides" },

      {
        label: "Every 2' Top & Bottom",
        value: "Every 2' Top & Bottom"
      },
      {
        label: "Every 2' Left & Right",
        value: "Every 2' Left & Right"
      },
      { label: "4 Corner Only", value: "4 Corner Only" },

      {
        disabled: true,
        label: "----------------",
        value: ""
      },
      { label: "No Grommet", value: "No Grommet" }
    ];

    const optionsWindslit = [
      { label: "No Windslit", value: "No Windslit" },
      { label: "All Sides", value: "All Sides" }
    ];
    const optionsWebbing = [
      { label: "No Webbing, No D-rings", value: "No Webbing, No D-rings" },
      { label: '1" Webbing', value: '1" Webbing' },

      { label: '1" Webbing w/D-rings', value: '1" Webbing w/D-rings' },
      { label: '1" Velcro - All Side', value: '1" Velcro - All Side' }
    ];

    return (
      <div className="">
        <div className="row">
          <div className="p-0 mx-0">
            <p className="py-2 pl-3 bg-warning">Quote</p>
            <div className="row  mb-2 mx-auto">
              <span className="ml-3 my-auto ">Width</span>

              <div className="col-md-3 p-0 ml-md-auto ml-3 mr-3 bg-warning ">
                <SmallTextFieldGroup
                  placeholder={"0" + " ft"}
                  name="widthFt"
                  type="widthFt"
                  value={this.state.widthFt}
                  onChange={this.onChange}
                  error={errors.widthFt}
                />
              </div>
              <div className="col-md-3 p-0 mr-3 ml-3 ml-md-0">
                <SmallTextFieldGroup
                  placeholder={"0" + " in"}
                  name="widthIn"
                  type="widthIn"
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
                  placeholder={"0" + " ft"}
                  name="heightFt"
                  type="heightFt"
                  value={this.state.heightFt}
                  onChange={this.onChange}
                  error={errors.heightFt}
                />
              </div>
              <div className="col-md-3 p-0 mr-3 ml-3 ml-md-0">
                <SmallTextFieldGroup
                  placeholder={"0" + " in"}
                  name="heightIn"
                  type="heightIn"
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
                  name="businessType"
                  value={this.state.businessType}
                  onChange={this.onChange}
                  options={optionsPole}
                  error={errors.businessType}
                />
              </div>
            </div>
            <div className="row  mx-auto">
              <span className="ml-3 my-1 ">Grommet</span>
              <div className="col-md-7  ml-auto">
                <SmallSelectListGroup
                  placeholder="Business Type"
                  name="businessType"
                  value={this.state.businessType}
                  onChange={this.onChange}
                  options={optionsGrommet}
                  error={errors.businessType}
                />
              </div>
            </div>

            <div className="row  mx-auto">
              <span className="ml-3 my-1 ">Hem</span>
              <div className="col-md-7  ml-auto">
                <SmallSelectListGroup
                  placeholder="Business Type"
                  name="businessType"
                  value={this.state.businessType}
                  onChange={this.onChange}
                  options={optionsHem}
                  error={errors.businessType}
                />
              </div>
            </div>

            <div className="row  mx-auto">
              <span className="ml-3 my-1 ">Windslit</span>
              <div className="col-md-7  ml-auto">
                <SmallSelectListGroup
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
                  placeholder="Business Type"
                  name="businessType"
                  value={this.state.businessType}
                  onChange={this.onChange}
                  options={optionsRope}
                  error={errors.businessType}
                />
              </div>
            </div>
            <div className="row  mb-2 mx-auto py-2 bg-primary align-items-center text-white">
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
                $
                {isNaN(this.state.totalBanner)
                  ? "0.00"
                  : this.state.totalBanner *
                    3 *
                    (this.state.quantity == 0 ? 1 : this.state.quantity)}
                {console.log(
                  this.state.totalBanner + " " + this.state.quantity
                )}
              </strong>
            </div>
            <div className="row mt-4 mx-auto">
              <span className="ml-3 my-1 ">Turnaround</span>
              <div className="col-md-7  ml-auto">
                <SmallSelectListGroup
                  placeholder="Business Type"
                  name="businessType"
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
                  name="businessType"
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

QuoteV13.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(QuoteV13);
