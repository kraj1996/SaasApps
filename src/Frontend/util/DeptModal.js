import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Input from "../../ChildComponents/Input";
import { SelectBox } from "../../ChildComponents/SelectBox";
import { toast } from "react-toastify";
import { isChecked } from "./Commonservices";

import { useTranslation } from "react-i18next";
const DeptModal = ({ show, handleClose, DiscountData,url,title }) => {
    console.log(DiscountData)
  const [Dropdown, setDropdown] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [InvestigationData, setInvestigationData] = useState([]);

const { t } = useTranslation();
 
const getAccessCentres = () => {
    axios
      .get("/api/v1/Centre/getAccessCentres")
      .then((res) => {
        let data = res.data.message;
        let CentreDataValue = data.map((ele) => {
          return {
            value: ele.CentreID,
            label: ele.Centre,
          };
        });
        
     setDropdown(CentreDataValue);
      })
      .catch((err) => {
        console.log(err)
        
      });
  };

  const filterData = () => {
    let data = [];
    for (let i = 0; i < tableData?.length; i++) {
      data.push(tableData[i]["InvestigationId"]);
    }

    return data;
  };

  const getDiscountMasterItemData = () => {
    if(title!='membership')
      { 
        axios
        .post("/api/v1/AgeWiseDiscount/getDiscountMasterCentreData", {
          DiscountId: DiscountData?.DiscountId,
        })
        .then((res) => {
          setTableData(res.data.message);
        })
        .catch((err) => console.log(err));
      }
      else {
        axios
        .post("/api/v1/MembershipCardMaster/getMemberShipMasterCentreData", {
          MembershipNo:DiscountData?.CardNo,
              MembershipID:DiscountData?.CardID
        })
        .then((res) => {
          if(res?.data.message=='No record found')
            {
              setTableData([]);
            }
          else {
            setTableData(res.data.message)
          }
          
        })
        .catch((err) => console.log(err));
      }
    
  };

  const Fetch = (id) => {
    axios
      .post("/api/v1/AgeWiseDiscount/AgeWiseDiscountGetInvestigationData", {
        DepartmentID: id,
      })
      .then((res) => {
        let data = res.data.message;
        const val = data.filter((ele) => {
          if (!filterData().includes(ele?.InvestigationID)) {
            return {
              ele,
            };
          }
        });

        const newVal = val.map((ele) => {
          return {
            ...ele,
            DiscountId: DiscountData?.DiscountId,
            DiscountPer: DiscountData?.DiscountPer,
            isActive: "0",
          };
        });
        setInvestigationData(newVal);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  console.log(InvestigationData);

  const handleSelectChange = (event) => {
    Fetch(event.target.value);
  };

  const handleCheckbox = (e, index, data) => {
    const { name, checked } = e.target;
    checkDuplicate(data?.InvestigationID, data?.DiscountId)
      .then((res) => {
        if (res === "Duplicate Investigation") {
          toast.error(res);
        } else {
          if (index >= 0) {
            const data = [...Dropdown];
            data[index][name] = checked ? "1" : "0";
            return setDropdown(data);
          } else {
            const val = Dropdown.map((ele) => {
              return {
                ...ele,
                [name]: checked ? "1" : "0",
              };
            });
            return setDropdown(val);
          }
        }
      })
      .catch((err) => console.log(err));
  };
  

  const disableData = (DiscountID, InvestigationId,id) => {
   
      if(title=='membership')
        {
          axios
          .post("/api/v1/MembershipCardMaster/RemoveMemberShipCentre", {
            CentreID:id,
    MembershipNo:DiscountData?.CardNo,
    MembershipID:DiscountData?.CardID,
          })
          .then((res) => {
            if (res?.data?.message === "Remove successfully") {
              toast.success(res?.data?.message);
              getDiscountMasterItemData();
            }
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            console.log(err);
          });
        }
        else {
          axios
        .post("/api/v1/AgeWiseDiscount/RemoveInvestigationDiscountMaster", {
          DiscountID,
          InvestigationId,
        })
        .then((res) => {
          if (res?.data?.message === "Remove successfully") {
            toast.success(res?.data?.message);
            getDiscountMasterItemData();
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log(err);
        });
        }
      
   
  };

  const checkDuplicate = (InvestigationId, DiscountId) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/AgeWiseDiscount/DuplicateInvestigationDiscountMaster", {
          InvestigationID: InvestigationId,
          DiscountId: DiscountId,
        })
        .then((res) => {
          if (res.data.message) {
            resolve(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  useEffect(() => {
   getAccessCentres();
  }, []);

  const Api = () => {
    if(title=='membership')
      { const data = Dropdown.filter((ele) => ele?.isActive === "1");
        const payload = data.map((ele) => {
          return {
              CentreID: ele.value,
              MembershipNo:DiscountData?.CardNo,
              MembershipID:DiscountData?.CardID,
              isActive:1
};
        });
        axios.post('/api/v1/MembershipCardMaster/AddMemberShipMasterCentre',payload).then((res)=>{
          toast.success(res.data.message)
          getDiscountMasterItemData()
        }).catch((err)=>{
          toast.error(err.response.data.message);
        })
      }
      else {
        const data = Dropdown.filter((ele) => ele?.isActive === "1");
        console.log(data)
        if (data.length > 0) {
          const payload = data.map((ele) => {
            return {
                CentreID: ele.value,
                isActive: ele.isActive,
                DiscountID:DiscountData?.DiscountId
    
            };
          });
          axios
            .post("/api/v1/AgeWiseDiscount/AddDiscountMasterCentre", payload)
            .then((res) => {
              if (res.data.message) {
                toast.success(res.data.message);
                const val = Dropdown.map((ele) => {
                  return {
                    ...ele,
                    isActive: 0,
                  };
                });
                getDiscountMasterItemData();
              }
            })
            .catch((err) => {
              toast.error(err.response.data.message);
    
              if (err?.response?.status === 504) {
                toast.error("Something went wrong");
              }
            });
        } else {
          toast.error("Please Select One Test");
        }
      }
    
  };

  useEffect(() => {
    getDiscountMasterItemData()
  }, []);

  

  return (
    <Modal show={show} size="lg">
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title">{t("Centre Share")}</Modal.Title>
        <button
          type="button"
          className="close"
          onClick={() => {
            handleClose();
            
          }}
        >
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box-body">
          
          {Dropdown.length > 0 && (
            <div
              className={`box-body divResult table-responsive ${
                InvestigationData.length > 8 && "boottable"
              }`}
              style={{height:"280px"}}
            >
              <table
                className="table table-bordered table-hover table-striped tbRecord"
                cellPadding="{0}"
                cellSpacing="{0}"
              >
                <thead className="cf" style={{
                    position: "sticky",
                    top: -2,
                  }}>
                  <tr>
                    <th>{t("S.No")}</th>
                    <th>{t("Name")}</th>
                    <th>
                      <Input
                        type="checkbox"
                        onChange={handleCheckbox}
                        checked={
                          Dropdown?.length > 0
                            ? isChecked(
                                "isActive",
                                Dropdown,
                                "1"
                              ).includes(false)
                              ? false
                              : true
                            : false
                        }
                        name="isActive"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Dropdown?.map((ele, index) => (
                    <tr key={index}>
                      <td data-title={t("S.No")}>{index + 1} &nbsp;</td>
                      <td data-title={t("Name")}>{ele?.label} &nbsp;</td>
                      <td>
                        <Input
                          type="checkbox"
                          name="isActive"
                          checked={ele?.isActive === "1" ? true : false}
                          onChange={(e) => handleCheckbox(e, index, ele)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-sm-1">
            {Dropdown.length > 0 && (
              <button
                type="button"
                className="btn btn-block  btn-warning btn-sm"
                onClick={Api}
              >
                {t("Add")}
              </button>
            )}
          </div>
        </div>

        {tableData.length > 0 && (
          <div className="box">
            <div
              className={`box-body divResult table-responsive ${
                tableData.length > 8 && "boottable"
              }`}
              id="no-more-tables"
            >
              <table
                className="table table-bordered table-hover table-responsive table-striped tbRecord"
                cellPadding="{0}"
                cellSpacing="{0}"
              >
                <thead className="cf" style={{
                    position: "sticky",
                    top: -2,
                  }}>
                  <tr>
                    <th>{t("S.No")}</th>
                    <th>{t("Centre Name")}</th>
                    <th>{t("Action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData?.map((ele, index) => (
                    <tr key={index}>
                      <td data-title={t("S.No")}>{index + 1}&nbsp;</td>
                    
                      <td data-title={t("Centre Name")}>{ele?.centre}&nbsp;</td>
                      <td data-title={t("Action")}>
                        <button
                          className="btn btn-danger btn-sm"
                          name="disableData"
                          onClick={() =>
                            disableData(ele?.DiscountID, ele?.InvestigationId,ele?.Centreid)
                          }
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="box-footer">
          <div className="row">
            <div className="col-sm-1">
              <button
                className="btn btn-block btn-danger btn-sm"
                onClick={handleClose}
              >
                {t("Close")}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeptModal;
