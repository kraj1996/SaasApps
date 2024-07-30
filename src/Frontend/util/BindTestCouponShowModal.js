import React from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";

const BindTestCouponShowModal = ({
  couponData,
  showCoupon,
  handleCloseBindTestCouponShowModal,
  handleSelectTestData,
  tableData,
  setTableData
}) => {
  const { t } = useTranslation();
 
  const checkInv=(id)=>{
    if(tableData.length>0)
    {
      for(let i of tableData)
        {
          if(i.InvestigationID==id)
          {
           return true 
           break; 
          }
        }
    }
    return false
  }
  const RemoveSelecttest=(id)=>{

    const updatedTableData=tableData.filter((item)=>{
      return item.InvestigationID!=id
    })
    setTableData(updatedTableData)
  }
  return (
    <>
      <Modal
        show={showCoupon}
        size="md"
        onHide={handleCloseBindTestCouponShowModal}
      >
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
            <button
              type="button"
              className="close"
              onClick={handleCloseBindTestCouponShowModal}
            >
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
                        <th className="text-center">{t("Select")}</th>
                        <th className="text-center">{t("TestId")}</th>
                        <th className="text-center">{t("TestName")}</th>
                        {/* <th className="text-center">{t("Rate")}</th> */}
                        <th className="text-center">{t("Discount %")}</th>
                      </tr>
                    </thead>

                    <tbody>
                      {couponData.map((ele, index) => (
                        <tr key={index} style={{ color: "black" }}>
                          <td data-title="Select" className="text-center">
                            
                            {
                            !checkInv(ele?.TestId) ?  <button
                                 type="button"
                                 className="btn btn-info btn-sm"
                                 onClick={() => {
                                   handleSelectTestData(ele);
                                 }}
                               >
                                 {t("Select")}
                               </button>:<button
                                 type="button"
                                 className="btn btn-info btn-sm"
                                 onClick={() => {
                                   RemoveSelecttest(ele?.TestId);
                                 }}
                               >
                                 {t("Remove")}
                               </button>
                            } 
                          </td>
                          <td data-title="TestId" className="text-center">
                            {ele.TestId}&nbsp;
                          </td>
                          <td data-title="TestName" className="text-center">
                            {ele.TestName}&nbsp;
                          </td>
                          {/* <td data-title="Rate" className="text-center">
                            {ele.Rate}&nbsp;
                          </td> */}
                          <td data-title="Discount %" className="text-center">
                            {ele.DiscountPercentage}&nbsp;
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
                    handleCloseBindTestCouponShowModal();
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

export default BindTestCouponShowModal;
