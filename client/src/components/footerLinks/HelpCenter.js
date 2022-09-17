// Public Home Page
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import logo from "../../img/LOGO.png";
import BannerLinks from '../banners/BannerLinks';
class HelpCenter extends Component {
  constructor() {
    super();
    this.state = {
      displayHelp: '',
    };
  }
  onDeleteClick(id) {}
  render() {
    const { displayHelp } = this.state;
    let showHelp;

    if (displayHelp === 'Artwork') {
      showHelp = (
        <div className=' row mt-2 col-12 m-0 p-0'>
          <div className='accordion col-12 p-0 m-0' id='accordionExample'>
            <div className='card'>
              <div className='card-header' id='headingOne'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseOne'
                    aria-expanded='true'
                    aria-controls='collapseOne'
                  >
                    What file types does banana banner accept?
                  </button>
                </h2>
              </div>

              <div
                id='collapseOne'
                className='collapse '
                aria-labelledby='headingOne'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  <strong>
                    We only accept these file formats: JPG and PDF (single page)
                  </strong>
                  <br></br>
                  <br />
                  <p>
                    Please make sure your artwork size is the same exact size of
                    your order. Also,do not include any bleed or crop marks.
                  </p>
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingTwo'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseTwo'
                    aria-expanded='false'
                    aria-controls='collapseTwo'
                  >
                    What file specifications does banana banner recommend for
                    fast processing?
                  </button>
                </h2>
              </div>
              <div
                id='collapseTwo'
                className='collapse'
                aria-labelledby='headingTwo'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  We accept JPG and single page PDF. We suggest 150 dpi
                  resolution at 100% of the final print size. Also do not
                  include any bleed or crop marks.
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingThree'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseThree'
                    aria-expanded='false'
                    aria-controls='collapseThree'
                  >
                    Should I remove Hidden Layers in my artwork?
                  </button>
                </h2>
              </div>
              <div
                id='collapseThree'
                className='collapse'
                aria-labelledby='headingThree'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  Yes. Just like transparencies, hidden layers in artwork can
                  have unpredictable results when printed. These results are not
                  always visible in previews. We highly suggest that you remove
                  any layers, objects, and effects that are not meant to appear
                  in the final graphic or you may flatten the artwork or submit
                  as a jpeg.
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingFour'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseFour'
                    aria-expanded='false'
                    aria-controls='collapseFour'
                  >
                    Should I scale down my artwork?
                  </button>
                </h2>
              </div>
              <div
                id='collapseFour'
                className='collapse'
                aria-labelledby='headingFour'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  <p>
                    It is not always necessary to scale your artwork down but
                    here are a few good things to know
                  </p>
                  <strong>Vector Art</strong>
                  <p>
                    Is your file be over 200"? If yes you will want to scale it
                    down to 50%. While Illustrator has a maximum artboard size
                    nearly 228". Acrobat and others will only read up to 200"
                    resulting in lost artwork. So while the artwork looks ok in
                    Illustrator, it will not print correctly.
                  </p>
                  <strong>Raster Art</strong>
                  <p>
                    Will your file be over 30,000 pixels along either axis? If
                    yes you will need to reduce the resolution of the file to
                    reduce the overall file size to 30,000 or less. This will
                    maintain the correct file size and aspect ratio. Don't be
                    worried about losing quality. A 30,000 pixel document at
                    150dpi is nearly 16' and would not be viewed close up
                    anyway.
                  </p>
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingFive'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseFive'
                    aria-expanded='false'
                    aria-controls='collapseFive'
                  >
                    Can I submit encrypted pdf?
                  </button>
                </h2>
              </div>
              <div
                id='collapseFive'
                className='collapse'
                aria-labelledby='headingFive'
                data-parent='#accordionExample'
              >
                <div className='card-body text-justify small'>
                  No. Encrypted PDF files may result in a misprint or your order
                  being placed on hold. Please make sure all PDFs submitted are
                  not encrypted, all fonts are outlined and all images are
                  embedded.
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingSix'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseSix'
                    aria-expanded='false'
                    aria-controls='collapseSix'
                  >
                    Do I need bleed or crop marks for my files?
                  </button>
                </h2>
              </div>
              <div
                id='collapseSix'
                className='collapse'
                aria-labelledby='headingSix'
                data-parent='#accordionExample'
              >
                <div className='card-body text-justify small'>
                  No bleed or crop marks. Make your artwork match the size
                  requested on the order. We are not responsible for crop marks
                  or registration printed.
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingSeven'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseSeven'
                    aria-expanded='false'
                    aria-controls='collapseSeven'
                  >
                    Should I include any fonts with my files?
                  </button>
                </h2>
              </div>
              <div
                id='collapseSeven'
                className='collapse'
                aria-labelledby='headingSeven'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  NO. Instead, please ensure that all fonts are outlined prior
                  to file upload. If you are using Photoshop, please provide
                  flattened file only.
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingEight'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseEight'
                    aria-expanded='false'
                    aria-controls='collapseEight'
                  >
                    My artwork file contains transparency, will it print ok?
                  </button>
                </h2>
              </div>
              <div
                id='collapseEight'
                className='collapse'
                aria-labelledby='headingEight'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  No, it is always best to flatten any file you send to Banana
                  Banner. Banana Banner considers flattening transparency part
                  of basic file setup and will not check for this issue.
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingNine'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseNine'
                    aria-expanded='false'
                    aria-controls='collapseNine'
                  >
                    What is the difference between raster and vector
                  </button>
                </h2>
              </div>
              <div
                id='collapseNine'
                className='collapse'
                aria-labelledby='headingNine'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  <p>
                    Raster-based artwork such as photos or flattened artwork
                    (from Adobe Photoshop) are made up of tiny squares (pixels),
                    and depending on your resolution and/or final output size
                    desired, the file could have a low quality end result. Any
                    raster elements you wish to use should have a high enough
                    resolution (DPI) before considering them for your large
                    format product.
                  </p>

                  <p>
                    Vector-based artwork such as illustrations or clip-art style
                    elements (from Adobe Illustrator) is made with mathematical
                    calculations, and can be scaled up to any size without
                    losing quality. Keep in mind that any effects used in Adobe
                    Illustrator are raster-based and have transparency: this
                    greatly adds to file size and you must have correct settings
                    in your "Document Raster Effects Settings" to ensure best
                    output for these effects. If you are doing a photo-quality
                    print on a 36" x 48" poster, and leave the raster effects
                    settings at default 72 DPI - you may see tiny squares in
                    your drop shadows, as opposed to a smooth shadow.
                  </p>
                </div>
              </div>
            </div>
            <div className='card mb-5'>
              <div className='card-header' id='headingTen'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseTen'
                    aria-expanded='false'
                    aria-controls='collapseTen'
                  >
                    What is overprint, and how can it ruin my file?
                  </button>
                </h2>
              </div>
              <div
                id='collapseTen'
                className='collapse'
                aria-labelledby='headingTen'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  Overprint is used to intentionally overlap inks for a number
                  of reasons. We suggest that you turn all overprint objects off
                  before submitting, for it may cause unexpected results.
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (displayHelp === 'Shipping') {
      showHelp = (
        <div className=' row mt-2 col-12 m-0 p-0'>
          <div className='accordion col-12 p-0 m-0' id='accordionExample'>
            <div className='card'>
              <div className='card-header' id='headingOne'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseOne'
                    aria-expanded='true'
                    aria-controls='collapseOne'
                  >
                    Do you offer same day service?
                  </button>
                </h2>
              </div>

              <div
                id='collapseOne'
                className='collapse '
                aria-labelledby='headingOne'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  <p>
                    Yes, we do. However, your order has to be placed before 12
                    noon PST to be qualified for same day service.
                  </p>
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingTwo'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseTwo'
                    aria-expanded='false'
                    aria-controls='collapseTwo'
                  >
                    Why dont you offer shipping on large rigid signs?
                  </button>
                </h2>
              </div>
              <div
                id='collapseTwo'
                className='collapse'
                aria-labelledby='headingTwo'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  At this moment, sizes over 3' 10"x3' 2" are only available for
                  Store Pickup. We currently are not able to ship sizes larger
                  than 3' 10"x3' 2".
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingThree'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseThree'
                    aria-expanded='false'
                    aria-controls='collapseThree'
                  >
                    Why is my shipment is taking longer than expected?
                  </button>
                </h2>
              </div>
              <div
                id='collapseThree'
                className='collapse'
                aria-labelledby='headingThree'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  <p>
                    Orders shipping via FedEx Ground may take 1-5 business days
                    in transit depending on your location. Weekends, holidays,
                    and observance days do not count as transit days.
                  </p>
                  <p>
                    Note: We are not liable for late shipments due to FedEx
                    exceptions, such as bad weather conditions. If you received
                    a late package and would like to be considered for a
                    shipping refund, please notify us. We will contact Fedex to
                    see if a reimbursement is possible, however, it is not
                    guaranteed.
                  </p>
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingFour'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseFour'
                    aria-expanded='false'
                    aria-controls='collapseFour'
                  >
                    Where is your store pickup location?
                  </button>
                </h2>
              </div>
              <div
                id='collapseFour'
                className='collapse'
                aria-labelledby='headingFour'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  <p>
                    Our store pickup location is at 98-101 Hila Pl, Pearl City,
                    HI 96782. Please bring a copy of your invoice when picking
                    up your order.
                  </p>
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingFive'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseFive'
                    aria-expanded='false'
                    aria-controls='collapseFive'
                  >
                    How will you ship my banners??
                  </button>
                </h2>
              </div>
              <div
                id='collapseFive'
                className='collapse'
                aria-labelledby='headingFive'
                data-parent='#accordionExample'
              >
                <div className='card-body text-justify small'>
                  <p>
                    All Banana Banner products will be shipped using FEDEX. Due
                    to some restrictions set forth by FEDEX, we have taken
                    measures to ensure competitive shipping rates.
                  </p>
                  <p>
                    All banners over 89" (7'5") on their shortest side will be
                    folded and shipped in a square box. All banners 89" (7'5")
                    and under on their shortest side will be rolled and shipped
                    in standard corrugated boxes.
                  </p>
                  <p>
                    All other Banana Banner orders will be boxed and shipped
                    according to their size. Other special shipping request,
                    please call us.
                  </p>
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingSix'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseSix'
                    aria-expanded='false'
                    aria-controls='collapseSix'
                  >
                    why is my shipping charge high??
                  </button>
                </h2>
              </div>
              <div
                id='collapseSix'
                className='collapse'
                aria-labelledby='headingSix'
                data-parent='#accordionExample'
              >
                <div className='card-body text-justify small'>
                  Due to the large physical size of products some orders may
                  have higher than expected shipping charges. Unfortunately
                  there is little of what we can do as we are bound by the
                  limitations set forth by our shipper, in this case FEDEX.
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (displayHelp === 'General') {
      showHelp = (
        <div className=' row mt-2 col-12 m-0 p-0'>
          <div className='accordion col-12 p-0 m-0' id='accordionExample'>
            <div className='card'>
              <div className='card-header' id='headingOne'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseOne'
                    aria-expanded='true'
                    aria-controls='collapseOne'
                  >
                    Do you color match?
                  </button>
                </h2>
              </div>

              <div
                id='collapseOne'
                className='collapse '
                aria-labelledby='headingOne'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  <p>We do not color match.</p>
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingTwo'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseTwo'
                    aria-expanded='false'
                    aria-controls='collapseTwo'
                  >
                    What size are your grommets?
                  </button>
                </h2>
              </div>
              <div
                id='collapseTwo'
                className='collapse'
                aria-labelledby='headingTwo'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  We use #2 grommets, which are approximately 3/8''. Grommets
                  are placed every 2' standard.
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingThree'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseThree'
                    aria-expanded='false'
                    aria-controls='collapseThree'
                  >
                    What is Turnaround service?
                  </button>
                </h2>
              </div>
              <div
                id='collapseThree'
                className='collapse'
                aria-labelledby='headingThree'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  <p>Turnaround time begins once your file is uploaded.</p>
                  <p>
                    If your file is placed on hold, the turnaround time will
                    begin once you select 'Run As Is' or once a re-uploaded file
                    is received.
                  </p>
                  <p>
                    If an email design proof is requested, the turnaround time
                    will begin once you approve the design proof.
                  </p>
                  <p>
                    All the times are based on normal business days, Monday
                    through Friday, excluding federal holidays. Please note this
                    does not include shipping time.
                  </p>
                  <strong>Shipping</strong>
                  <p>
                    If an order is uploaded on a business day BEFORE 12 noon
                    PST, then it will be shipped on the following business day.
                    (If there is a problem with the file, it won't be shipped
                    the next day.)
                  </p>
                  <strong>Store Pick-up:</strong>
                  <p>
                    If an order is uploaded on a business day BEFORE 12 noon
                    PST, then it will be available for pick-up on the following
                    business day after 3:30 p.m. PST. (If there is a problem
                    with the file, it won't be ready for pick-up the next day.)
                    You will receive an email notification if the order is ready
                    earlier.
                  </p>
                  <strong>Same Day Order:</strong>
                  <p>
                    1. Shipping Orders: If an order is uploaded on a business
                    day BEFORE 12 noon PST, then it will be shipped the same
                    day. (If there is a problem with the file, it won't be
                    shipped until the next day.)
                  </p>
                  <p>
                    2. Store Pick-up: If an order is uploaded on a business day
                    BEFORE 12 noon PST, then it will be available for pick-up on
                    the same day after 4:00 p.m. PST. (If there is a problem
                    with the file, it won't be ready for pick-up the same day.)
                    You will receive an email notification if the order is ready
                    earlier.
                  </p>
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingFour'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseFour'
                    aria-expanded='false'
                    aria-controls='collapseFour'
                  >
                    Why do you have a minimum charge per item?
                  </button>
                </h2>
              </div>
              <div
                id='collapseFour'
                className='collapse'
                aria-labelledby='headingFour'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  <p>
                    While we offer competitive pricing, we have to account for
                    production and labor costs for each job.
                  </p>
                  <p>Single-sided products - $25 min.</p>
                  <p>Double-sided products - $50 min.</p>
                  <p>Laminated products - $25 min. </p>
                  <p>Double-sided + laminated products- $50 min.</p>
                  <p>(FOR LARGE QUANTITY ORDERS PLEASE SUBMIT AN ESTIMATE.)</p>
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingFive'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseFive'
                    aria-expanded='false'
                    aria-controls='collapseFive'
                  >
                    Order Cancelation?
                  </button>
                </h2>
              </div>
              <div
                id='collapseFive'
                className='collapse'
                aria-labelledby='headingFive'
                data-parent='#accordionExample'
              >
                <div className='card-body text-justify small'>
                  An order can be canceled at any time prior to it entering into
                  production. To cancel please log in to our website to view
                  your order details and click cancel print job. If you do not
                  see a button for cancellation, the job has gone into
                  production and cannot be canceled.
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingSix'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseSix'
                    aria-expanded='false'
                    aria-controls='collapseSix'
                  >
                    Do you offer hemmed edges??
                  </button>
                </h2>
              </div>
              <div
                id='collapseSix'
                className='collapse'
                aria-labelledby='headingSix'
                data-parent='#accordionExample'
              >
                <div className='card-body text-justify small'>
                  Yes, we do traditional sewn hemmed edges.
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingSeven'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseSeven'
                    aria-expanded='false'
                    aria-controls='collapseSeven'
                  >
                    Is there any cleaning or maintenance required?
                  </button>
                </h2>
              </div>
              <div
                id='collapseSeven'
                className='collapse'
                aria-labelledby='headingSeven'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  The best method of cleaning your outdoor vinyl banner is to
                  lay it flat (if possible) on a clean area, table or floor. It
                  is recommended that you use a mild dishwashing liquid and warm
                  water to rinse. Do not use any harsh abrasive or petroleum
                  type cleaners. Clean and dry each side before storing. You
                  must ensure it is completely dry prior to roll up and storage.
                  Place your banner back in box and store it flat, not vertical.
                  If it is standing up vertically, it may wilt and warp causing
                  wrinkles over time
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingEight'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseEight'
                    aria-expanded='false'
                    aria-controls='collapseEight'
                  >
                    Why does it take so long to upload files?
                  </button>
                </h2>
              </div>
              <div
                id='collapseEight'
                className='collapse'
                aria-labelledby='headingEight'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  Your file size and your network connection are the two main
                  factors affecting upload speed. Another way to ensure your
                  file gets uploaded in a timely manner is flattening your
                  files.
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header' id='headingNine'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseNine'
                    aria-expanded='false'
                    aria-controls='collapseNine'
                  >
                    Do you Print using any spot or pantone colors?
                  </button>
                </h2>
              </div>
              <div
                id='collapseNine'
                className='collapse'
                aria-labelledby='headingNine'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  <p>
                    We only print 4 color process (CMYK). If you use Spot or
                    Pantone colors, please have them converted to process colors
                    prior to file upload.
                  </p>
                </div>
              </div>
            </div>
            <div className='card mb-5'>
              <div className='card-header' id='headingTen'>
                <h2 className='mb-0'>
                  <button
                    className='btn btn-link row acbtn text-left collapsed'
                    type='button'
                    data-toggle='collapse'
                    data-target='#collapseTen'
                    aria-expanded='false'
                    aria-controls='collapseTen'
                  >
                    Why is ink chipping off?
                  </button>
                </h2>
              </div>
              <div
                id='collapseTen'
                className='collapse'
                aria-labelledby='headingTen'
                data-parent='#accordionExample'
              >
                <div className='card-body small text-justify'>
                  The reason you might have chipping on some edges of your
                  product is most likely due to the heavy ink coverage that you
                  used in your artwork. Once your prints are cut down, there are
                  chances that if you used dark colors at the cut lines - there
                  will be some chipping that occurs after the cutting process.
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      showHelp = (
        <div
          className=' small text-center
    mx-auto'
        >
          Click to choose category...
        </div>
      );
    }
    return (
      <div className='HelpCenter'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3 pl-1 order-6 order-md-2'>
              <BannerLinks />
            </div>
            <div className=' col-md-9 order-2 order-md-6 mt-3'>
              <div className='col-12 m-auto navLink text-center row'>
                <h3 className='p-2 navLink pt-3 '>HELP CENTER</h3>
              </div>
              <div className='col-12 mt-3 mb-3 text-center'>
                <button
                  onClick={() => {
                    this.setState((prevState) => ({
                      displayHelp: 'Artwork',
                    }));
                  }}
                  className='btn btn-info btn py-1 mr-2'
                >
                  Artwork
                </button>
                <button
                  onClick={() => {
                    this.setState((prevState) => ({
                      displayHelp: 'Shipping',
                    }));
                  }}
                  className='btn btn-info btn py-1 mr-2'
                >
                  Shipping
                </button>
                <button
                  onClick={() => {
                    this.setState((prevState) => ({
                      displayHelp: 'General',
                    }));
                  }}
                  className='btn btn-info btn py-1 mr-2 '
                >
                  General
                </button>
              </div>

              <div className='mx-auto row'>{showHelp}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HelpCenter.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(HelpCenter);
