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
import { optionsProof } from "./options";
import { optionBlank } from "./options";

import Popup from "reactjs-popup";
class QuoteV18 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBanner: "0",
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
      numSlides: "1",
      addOn: "0",
      grommet: "No Grommet",
      hem: "All Sides",
      pockets: "No Pole Pockets",
      windSlit: "No Windslit",
      webbing: "No Webbing, No D-rings ",
      corners: "No Reinforced Corners",
      rope: "No Rope Sewn",
      open: false,
      quantity: "1",
      price: "8.00",
      priceWship: "",
      turnaround: "",
      proof: "",
      displayMoreOptions: "",
      deliveryDate: "",
      shipping: "",
      jobOrder: "",
      errors: {},
    };
    this.radioSelected = this.radioSelected.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {}
  radioSelected(e) {
    const shipment = e.target.value;
    this.setState({ shipping: shipment });

    if (shipment === "Pickup") {
      this.setState({ deliveryDate: "" });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    // console.log(this.state);

    const payData = {
      widthFt: this.state.widthFt,
      widhtIn: this.state.widthIn,
      widthTot: this.state.widthTot,
      heightFt: this.state.heightFt,
      heightIn: this.state.heightIn,
      heightTot: this.state.heightTot,
      totalBanner: this.state.totalBanner,
    };
    if (payData.totalBanner < 1) {
      this.setState({ open: true });
    }
    console.log(this.state.open);
  }

  closeModal() {
    this.setState({ open: false });
  }

  totHeight(hfeet, hinch) {
    if (isNaN(hfeet)) {
      hfeet = 0;
    }
    if (isNaN(hinch)) {
      hinch = 0;
    }
    this.setState({ heightTot: hfeet + hinch }, () => {
      this.totalBan(this.state.widthTot, this.state.heightTot);
    });
  }

  totWidth(wfeet, winch) {
    if (isNaN(wfeet)) {
      wfeet = 0;
    }
    if (isNaN(winch)) {
      winch = 0;
    }

    this.setState({ widthTot: wfeet + winch }, () => {
      this.totalBan(this.state.widthTot, this.state.heightTot);
    });
  }

  // Total Banner computation
  totalBan(wtot, htot) {
    if (isNaN(wtot)) {
      wtot = 0;
    }
    if (isNaN(htot)) {
      htot = 0;
    }

    if (
      isNaN(this.state.quantity) ||
      this.state.quantity === "" ||
      this.state.quantity === 0
    ) {
      this.setState({ quantity: "1" });
    }
    const totalSize = Math.round(((htot * wtot) / 144) * 100) / 100;

    this.setState({ totalBanner: parseFloat(totalSize) }, () => {
      this.totByPrice(parseFloat(this.state.quantity));
    });
  }

  //Finishing select
  selectChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;

    this.setState({ [name]: e.target.value });

    this.setState({ name: e.target.value }, () => {
      this.totByPrice(parseFloat(this.state.quantity));
    });
  };

  //input change
  onChange = (e) => {
    // Disable alphabetic
    const re = /^[0-9\b]+$/;
    if (isNaN(e.target.value)) {
      return;
    }
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    }

    const press = parseFloat(e.target.value);
    const name = e.target.name;

    if (name === "widthFt") {
      this.setState({ widthFeet: press * 12 }, () => {
        this.totWidth(this.state.widthFeet, parseFloat(this.state.widthInch));
      });
    } else if (name === "widthIn") {
      this.setState({ widthInch: press }, () => {
        this.totWidth(this.state.widthFeet, parseFloat(this.state.widthInch));
      });
    } else if (name === "heightFt") {
      this.setState({ heightFeet: press * 12 }, () => {
        this.totHeight(
          this.state.heightFeet,
          parseFloat(this.state.heightInch)
        );
      });
    } else if (name === "heightIn") {
      this.setState({ heightInch: press }, () => {
        this.totHeight(
          this.state.heightFeet,
          parseFloat(this.state.heightInch)
        );
      });
    } else if (name === "quantity") {
      this.setState({ quantity: e.target.value }, () => {
        this.totByPrice(parseFloat(this.state.quantity));
      });
    }
  };

  // addOnCompute(totprice) {
  //   let pocks = 0;
  //   let winds = 0;
  //   let corners1 = 0;
  //   let corners2 = 0;
  //   let pricing = 0;
  //   if (this.state.corners != "No Reinforced Corners") {
  //     if (this.state.corners != "Reinforce All Corners") {
  //       console.log("add $20 to price");
  //       corners1 = 20;
  //     } else {
  //       corners2 = 40;
  //       console.log("add $40 to price");
  //     }
  //   }
  //   if (this.state.pockets != "No Pole Pockets") {
  //     console.log(totprice + " add 10% to totprice " + totprice * 0.1);
  //     pocks = totprice * 0.1;
  //   }
  //   if (this.state.windSlit != "No Windslit") {
  //     console.log(" add 5% to price");
  //     winds = totprice * 0.05;
  //   }

  //   this.setState({ addOn: pocks + winds + corners1 + corners2 }, () => {
  //     pricing = parseFloat(totprice) + parseFloat(this.state.addOn);
  //     console.log(pricing);
  //     pricing = pricing.toFixed(2);
  //     this.setState(
  //       {
  //         price: pricing,
  //       },
  //       () => {
  //         console.log(this.state.price);
  //       }
  //     );
  //   });
  //   console.log("3");
  // }

  totByPrice(quant) {
    const { user } = this.props.auth;
    const wholeBanner = parseFloat(this.state.totalBanner);
    const slides = parseFloat(this.state.numSlides);
    const finish = parseFloat(this.state.addOn);
    const width = parseFloat(this.state.widthTot) / 12;
    const height = parseFloat(this.state.heightTot) / 12;
    let corner1 = 0;
    let multi = 0;
    let pole = 1;
    let slit = 1;
    let rope = 0;
    if (user.position === "premiere") {
      multi = 1.5;
    } else {
      multi = 1.5;
    }

    if (isNaN(quant) || quant === "") {
      quant = 1;
    }

    if (
      this.state.corners === "Reinforce Top Only" ||
      this.state.corners === "Reinforce Bottom Only"
    ) {
      corner1 = 20;
    }

    if (this.state.corners === "Reinforce All Corners") {
      corner1 = 40;
    }

    if (this.state.pockets != "No Pole Pockets") {
      pole = 1.1;
    }
    if (this.state.windSlit != "No Windslit") {
      slit = 1.05;
    }

    if (
      this.state.rope === "3/16 - Top Only" ||
      this.state.rope === "3/16 - Bottom Only"
    ) {
      rope = (wholeBanner * multi) / width + width * multi;
    }
    if (this.state.rope === "3/16 - Top and Bottom") {
      rope =
        (wholeBanner * multi) / width +
        width * multi +
        (wholeBanner / height + height);
    }

    if (
      this.state.rope === "5/16 - Top Only" ||
      this.state.rope === "5/16 - Bottom Only"
    ) {
      rope =
        ((wholeBanner * multi) / width +
          ((wholeBanner * multi) / wholeBanner) * width) *
        2;
    }

    if (this.state.rope === "5/16 - Top And Bottom") {
      rope =
        ((wholeBanner * multi) / width +
          ((wholeBanner * multi) / wholeBanner) * width) *
          2 +
        (wholeBanner / height + height) * 2;
    }

    const totPrice =
      (corner1 + wholeBanner * multi * slides * quant + rope) * pole * slit;

    this.setState(
      {
        price: totPrice,
      },
      () => {
        if (this.state.price <= 7) {
          this.setState({ price: 7.0 });
        } else {
          this.setState({
            price: this.state.price.toFixed(2),
          });
        }
      }
    );
  }
  render() {
    const { errors, displayMoreOptions } = this.state;
    if (errors.isApproved) {
      errors.email = errors.isApproved;
    }

    let moreInputs;
    if (displayMoreOptions) {
      moreInputs = (
        <div>
          <div className="row text-center mt-4">
            <div className="col-4 my-2 pl-3 pr-0 font-weight-bold ">Hem:</div>
            <div className="col-8 m-auto pr-4">
              <SmallSelectListGroup
                className="small"
                placeholder="hem"
                name="hem"
                value={this.state.hem}
                onChange={this.selectChange}
                options={this.state.totalBanner <= 0 ? optionBlank : optionsHem}
                error={errors.hem}
              />
              {/* 
              <SmallSelectListGroup
                className="small"
                placeholder="hem"
                name="hem"
                value={this.state.grommet}
                onChange={this.onChange}
                options={optionsGrommet}
                error={errors.grommet}
              /> */}
            </div>
          </div>
          <div className="row text-center mt-0">
            <div className="col-4 my-2 pl-3 pr-0 font-weight-bold ">
              Windslit:
            </div>
            <div className="col-8 m-auto pr-4">
              <SmallSelectListGroup
                className="small"
                name="windSlit"
                value={this.state.windSlit}
                onChange={this.selectChange}
                options={
                  this.state.totalBanner <= 0 ? optionBlank : optionsWindslit
                }
                error={errors.windSlit}
              />
            </div>
          </div>

          <div className="row text-center mt-0">
            <div className="col-4 my-2 pl-3 pr-0 font-weight-bold ">
              Webbing:
            </div>
            <div className="col-8 m-auto pr-4">
              <SmallSelectListGroup
                className="small"
                name="webbing"
                value={this.state.webbing}
                onChange={this.selectChange}
                options={
                  this.state.totalBanner <= 0 ? optionBlank : optionsWebbing
                }
                error={errors.webbing}
              />
            </div>
          </div>

          <div className="row text-center mt-0">
            <div className="col-4 my-2 pl-3 pr-0 font-weight-bold ">
              Corners:
            </div>
            <div className="col-8 m-auto pr-4">
              <SmallSelectListGroup
                className="small"
                name="corners"
                value={this.state.corners}
                onChange={this.selectChange}
                options={
                  this.state.totalBanner <= 0 ? optionBlank : optionsCorners
                }
                error={errors.corners}
              />
            </div>
          </div>

          <div className="row text-center mt-0">
            <div className="col-4 my-2 pl-3 pr-0 font-weight-bold ">Rope:</div>
            <div className="col-8 m-auto pr-4">
              <SmallSelectListGroup
                className="small"
                name="rope"
                value={this.state.rope}
                onChange={this.selectChange}
                options={
                  this.state.totalBanner <= 0 ? optionBlank : optionsRope
                }
                error={errors.rope}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="small">
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
          className="navLink"
        >
          <div className="modal1 header navLink text-center">
            <button className="close" onClick={this.closeModal}>
              &times;
            </button>
            <h5 className="text-center px-3 text-danger mt-3">
              You did not reach the Minimum Banner Size
            </h5>
            <p className="text-center px-3 mt-2">
              please complete the Width and Height Fields. Thank you
            </p>
            <button
              className="button px-3 py-0 btn-sm mb-2 btn btn-dark"
              onClick={() => {
                this.setState({ open: false });
              }}
            >
              Ok
            </button>
          </div>
        </Popup>
        <div className="row">
          <div className="col-md-12 p-0">
            <div className="p-0 mx-0 mb-3">
              <h5 className="py-2 pl-3 bg-warning">Quote</h5>

              <form onSubmit={this.onSubmit} className="">
                <div className="row text-center mt-1">
                  <div className="col-3 m-auto pl-4 font-weight-bold">
                    Width:
                  </div>
                  <div className="col-4 pr-2 pl-3  ">
                    <SmallTextFieldGroup
                      className="small "
                      placeholder={"0 ft"}
                      name="widthFt"
                      value={this.state.widthFt}
                      onChange={this.onChange}
                      error={errors.widthFt}
                    />
                  </div>
                  <div className="col-4 pl-0 pr-4 ">
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
                <div className="row text-center mt-1">
                  <div className="col-3 m-auto pl-4 font-weight-bold">
                    Height:
                  </div>
                  <div className="col-4 pr-2 pl-3  ">
                    <SmallTextFieldGroup
                      className="small "
                      placeholder={"0 ft"}
                      name="heightFt"
                      value={this.state.heightFt}
                      onChange={this.onChange}
                      error={errors.heightFt}
                    />
                  </div>
                  <div className="col-4 pl-0 pr-4 ">
                    <SmallTextFieldGroup
                      className="small"
                      placeholder={"0 in"}
                      name="heightIn"
                      value={this.state.heightIn}
                      onChange={this.onChange}
                      error={errors.heightIn}
                    />
                  </div>
                </div>
                <div className="row text-center my-2">
                  <div className="col-4 m-auto "></div>
                  <div className="col-7 mx-auto pr-4 text-right">
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
                <div className="row text-center my-2">
                  <div className="col-4 m-auto pl-4 font-weight-bold ">
                    Materials:
                  </div>
                  <div className="col-8 m-auto pr-4">
                    18oz. Blockout Vinyl Banner
                  </div>
                </div>

                <div className="row text-center mt-3">
                  <div className="col-4 my-2 pl-3 pr-0 font-weight-bold ">
                    # of Slides:
                  </div>
                  <div className="col-8 m-auto  pr-4">
                    <SmallSelectListGroup
                      placeholder="1"
                      name="numSlides"
                      value={this.state.numSlides}
                      onChange={this.selectChange}
                      options={optionsSlides}
                      error={errors.numSlides}
                    />
                  </div>
                </div>
                <div className="row quant pt-2 pl-2">
                  <strong>Finishing</strong>
                </div>
                <div className="row text-center border border-warning mx-auto mt-0"></div>

                <div className="row text-center mt-3">
                  <div className="col-4 mt-2 pl-3 pr-0 font-weight-bold ">
                    Pole Pocket:
                  </div>
                  <div className="col-8 m-auto pr-4">
                    <SmallSelectListGroup
                      className="small text-warning"
                      placeholder="No Pole Pockets"
                      name="pockets"
                      value={this.state.pockets}
                      onChange={this.selectChange}
                      options={
                        this.state.totalBanner <= 0 ? optionBlank : optionsPole
                      }
                      error={errors.pockets}
                    />
                  </div>
                </div>

                <div className="row text-center ">
                  <div className="col-4 my-2 pl-3 pr-0 font-weight-bold ">
                    Grommet:
                  </div>
                  <div className="col-8 m-auto pr-4">
                    <SmallSelectListGroup
                      className="small"
                      placeholder="grommet"
                      name="grommet"
                      value={this.state.grommets}
                      onChange={this.selectChange}
                      options={
                        this.state.totalBanner <= 0
                          ? optionBlank
                          : optionsGrommet
                      }
                      error={errors.grommet}
                    />
                  </div>
                </div>
                <div className="row text-center ">
                  <div className="col-12">
                    <button
                      type="button"
                      onClick={() => {
                        this.setState((prevState) => ({
                          displayMoreOptions: !prevState.displayMoreOptions,
                        }));
                      }}
                      className={"btn btn-sm btn-info mt-2"}
                    >
                      More Options
                    </button>
                  </div>
                </div>
                {moreInputs}
                <div className="row text-centert py-2 my-3 quant brown ">
                  <div className="col-sm-4 my-2 p-0 mx-auto ml- text-white text-center ">
                    QUANTITY:
                  </div>
                  <div className="col-sm-3 my-auto mx-auto p-0 text-right">
                    <SmallTextFieldGroup
                      placeholder="1"
                      name="quantity"
                      type="number"
                      value={this.state.quantity}
                      onChange={this.onChange}
                      error={errors.quantity}
                      className="text-right"
                    />
                  </div>
                  <div className="col-sm-4 my-2 mx-auto text-right pl-0 ">
                    <strong className=" text-white text-right ">
                      {/* {console.log(this.state.price + "ere")} */}${" "}
                      {isNaN(this.state.price) ||
                      this.state.price == null ||
                      this.state.price === 0
                        ? "0.00"
                        : this.state.price <= 7 && this.state.price > 0
                        ? "8.00"
                        : this.state.price}
                    </strong>
                  </div>
                </div>
                <div className="row text-center quant   ">
                  <div className="col-4 my-2 mx-auto pl-2 font-weight-bold ">
                    Turnaround:
                  </div>
                  <div className="col-8 m-auto mx-auto">
                    <SmallSelectListGroup
                      placeholder="Business Type"
                      name="turnaround"
                      value={this.state.turnaround}
                      onChange={this.selectChange}
                      options={optionsTurnaround}
                      error={errors.turnaround}
                    />
                  </div>
                </div>
                <div className="row text-center quant ">
                  <div className="col-4 p-0 font-weight-bold ">
                    Design Proof:
                  </div>
                  <div className="col-8 mx-auto pt-1 pr-3">
                    <SmallSelectListGroup
                      placeholder="Business Type"
                      name="proof"
                      value={this.state.proof}
                      onChange={this.selectChange}
                      options={optionsProof}
                      error={errors.proof}
                    />
                  </div>
                </div>
                <div className="row text-center divid mx-auto mt-2 py-1"></div>
                <div className="row quant pt-2 pl-2 pb-1 border-bottom mb-2 border-warning">
                  <strong>Shipping Options</strong>
                </div>
                <div className="row quant pt-2 border-warning">
                  <div className="col-md-10 p-0 ml-2">
                    <input
                      type="radio"
                      name="pickup"
                      value="Pickup"
                      onChange={this.radioSelected}
                      className="text-left my-auto mr-1"
                    />
                    <label className=" my-auto" htmlFor="pickup">
                      Store Pickup
                    </label>
                  </div>
                </div>
                <div className="row quant pt-2 pb-1 border-warning">
                  <div className="row quant pt-2 pl-2 pb-1 border-bottom mb-2 border-warning">
                    <strong>Shipping </strong>
                  </div>
                  <div className="col-sm-5 p-0 mb-2 ml-2 ">
                    <input
                      type="radio"
                      name="pickup"
                      value="Default"
                      onChange={this.radioSelected}
                      className="text-left my-auto mr-1"
                    />
                    <label className="my-auto mx-0 p-0" htmlFor="pickup">
                      Default Ship
                    </label>
                  </div>
                  <div className="col-sm-6 p-0 ml-2">
                    <input
                      type="radio"
                      name="pickup"
                      value="Blind"
                      onChange={this.radioSelected}
                      className="text-left my-auto mr-1"
                    />
                    <label className=" my-auto" htmlFor="pickup">
                      Blind Drop Ship
                    </label>
                  </div>
                </div>
                <div className="row text-center ">
                  <div className="col-12">
                    {this.state.shipping === ""
                      ? ""
                      : "Estimated Delivery Date:" + this.state.deliveryDate}
                  </div>
                </div>
                <div className="row text-centert bg-primary py-2 my-3 quant ">
                  <div className="col-sm-3 my-2 text-white text-center ">
                    TOTAL
                  </div>
                  <div className="col-sm-7 my-2 mx-auto text-center">
                    <strong className="ml-auto text-center text-white pr-2">
                      {/* {console.log(this.state.priceWship + "wow")} */}$
                      {isNaN(this.state.priceWship) ||
                      this.state.priceWship == null ||
                      this.state.priceWship === 0
                        ? "0.00"
                        : this.state.priceWship <= 24 &&
                          this.state.priceWship > 0
                        ? "25.00"
                        : this.state.priceWship}
                    </strong>
                  </div>
                </div>
                <div className="row text-center mt-4">
                  <div className="col-xs-3 m-auto mr-0 pr-0 font-weight-bold">
                    Job Name:
                  </div>
                  <div className="col-xs-5 col-7 ml-0 text-left pl-0 pr-4 ">
                    <SmallTextFieldGroup
                      className="small "
                      placeholder={"This is Required"}
                      name="widthFt"
                      value={this.state.jobOrder}
                      onChange={this.onChange}
                      error={errors.widthFt}
                    />
                  </div>
                </div>
                <div className="col-12 mt-3 text-center">
                  <input
                    type="submit"
                    value="Add To Cart"
                    className="btn SignU btn-sm text-white btn-block col-6 p-1 text-center my-4 mx-auto "
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

QuoteV18.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(QuoteV18);
