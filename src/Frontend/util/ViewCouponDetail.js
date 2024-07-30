import React from "react";
import { useSSR, useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import ViewTest from "../CouponMaster/ViewTest";
import { useEffect } from "react";
import axios from "axios";
const ViewCouponDetail = ({couponDetails,showCoupon, handleCloseCoupon }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState({
    ViewTest: false,
  });
 
  

  console.log(couponDetails)
  return (
    <>
      {show?.ViewTest && <ViewTest show={show} setShow={setShow} id={couponDetails[0]?.CoupanId} />}

      <Modal show={showCoupon} id="ModalSizeHC" onHide={handleCloseCoupon}>
        <div
          className="box-success"
          style={{
            backgroundColor: "transparent",
          }}
        >
          <Modal.Header className="modal-header">
            <Modal.Title className="modal-title">
              {t("Coupon Detail")}
            </Modal.Title>
            <button type="button" className="close" onClick={handleCloseCoupon}>
              ×
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className="box-body">
              <div
                className="box-body divResult table-responsive boottable"
                id="no-more-tables"
              >
                <div className="row">
                  <table
                    className="table table-bordered table-hover table-striped table-responsive tbRecord"
                    cellPadding="{0}"
                    cellSpacing="{0}"
                  >
                    <thead className="cf text-center" style={{ zIndex: 99 }}>
                      <tr>
                        <th className="text-center">{t("SNo")}</th>
                        <th className="text-center">{t("Coupon Name")}</th>
                        <th className="text-center">{t("Coupon Type")}</th>
                        <th className="text-center">{t("Valid From")}</th>
                        <th className="text-center">{t("Valid To")}</th>
                        <th className="text-center">{t("Minimum Limit")}</th>
                        <th className="text-center">{t("Issue For")}</th>
                        <th className="text-center">{t("Applicable")}</th>
                        {couponDetails[0]?.Type=='Test Wise'&&<th className="text-center">{t("View Test")}</th>}
                        <th className="text-center">{t("Disc. Amt.")}</th>
                        <th className="text-center">{t("Disc.Perc.")}</th>
                        <th className="text-center">
                          {t("Multiple Patient Coupon")}
                        </th>
                        <th className="text-center">{t("One Time Coupon")}</th>
                      </tr>
                    </thead>

                    <tbody>
                      {couponDetails.map((ele, index) => (
                        <tr key={index} style={{ color: "black" }}>
                          <td data-title="SNo" className="text-center">
                            {index+1}&nbsp;
                          </td>
                          <td data-title="Coupon Name" className="text-center">
                            {ele.CoupanName}&nbsp;
                          </td>
                          <td data-title="Coupon Type" className="text-center">
                            {ele.CoupanType}&nbsp;
                          </td>
                          <td data-title="Valid From" className="text-center">
                            {ele.Validfrom}&nbsp;
                          </td>
                          <td data-title="Valid To" className="text-center">
                            {ele.Validto}&nbsp;
                          </td>
                          <td data-title="Min.Limit" className="text-center">
                            {ele.MinBookingAmount}&nbsp;
                          </td>
                          <td data-title="Issue For" className="text-center">
                            {ele.IssueType}&nbsp;
                          </td>
                          <td data-title="Applicable" className="text-center">
                            {ele.Type}&nbsp;
                          </td>
                          {couponDetails[0]?.Type=='Test Wise' &&<td data-title="View Test" className="text-center">
                            <a
                              className="fa fa-search coloricon"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setShow({ ...show, ViewTest: true });
                              }}
                            ></a>
                            &nbsp;
                          </td>}
                          <td data-title="Disc. Amt." className="text-center">
                            {ele.discountamount}&nbsp;
                          </td>

                          <td data-title="Disc.Perc." className="text-center">
                            {ele.discountpercentage}&nbsp;
                          </td>
                          <td
                            data-title="Multiple Patient Coupon"
                            className="text-center"
                          >
                            {ele.MultiplePatientCoupon}&nbsp;
                          </td>
                          <td
                            data-title="One Time Coupon"
                            className="text-center"
                          >
                            {ele.OneTimePatientCoupon}&nbsp;
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="box-footer">
              <div className="col-sm-2">
                <button
                  type="button"
                  className="btn btn-danger  btn-sm"
                  onClick={() => {
                    handleCloseCoupon();
                  }}
                >
                  {t("Close")}
                </button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default ViewCouponDetail;
