import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";
import axios from "axios";
import Input from "../../ChildComponents/Input";
import Loading from "../util/Loading";
import {
  AddBlankData,
  AllDataDropDownPayload,
  DepartmentWiseItemList,
  DyanmicStatusResponse,
  PreventSpecialCharacter,
  autocompleteOnBlur,
  getAccessDataRate,
  getDoctorSuggestion,
  getPaymentModes,
  getTrimmedData,
  isChecked,
} from "../util/Commonservices";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchComponent from "./SearchComponent";
import ModernTable from "./ModernTable";

const SearchList = () => {
  const navigate = useNavigate();
  const [TestSuggestion, setTestSuggestion] = useState([]);
  const [CentreData, setCentreData] = useState([]);
  const [doctorAdmin, setDoctorAdmin] = useState([]);
  const [RateTypes, setRateTypes] = useState([]);
  const [DepartmentData, setDepartmentData] = useState([]);
  const [ResultTestData, setResultTestData] = useState([]);
  const [ResultData, setResultData] = useState([]);
  const [HiddenDropDownHelpMenu, setHiddenDropDownHelpMenu] = useState(false);
  const [indexMatch, setIndexMatch] = useState(0);
  const [buttonsData, setButtonsData] = useState([]);
  const [helpmenu, setHelpMenu] = useState([]);
  const [DlcCheckChecked, setDlcCheckChecked] = useState(false);
  const [dropFalse, setDropFalse] = useState(true);
  const [doctorSuggestion, setDoctorSuggestion] = useState([]);
  const [statusValue, setStatusValue] = useState("");
  const [modalpayload, setmodalPayload] = useState({});
  const [machine, setMachine] = useState([]);
  const [machineId, setMachineId] = useState([]);
  const [modal,setModal]=useState(false)
  const [screenshow,setScreenshow]=useState({search:true,tests:false,entry:false})
  const [Departments,setDepartments]=useState([
   
    {
        value: 280269612,
        label: "IMMUNOASSAY",
        
    },
    {
        value: 805,
        label: "HAEMATOLOGY",
        
    },
    {
        value: 394,
        label: "Radiology",
        
    },
    {
        value: 17,
        label: "MICROBIOLOGY",
        
    },
    {
        value: 34,
        label: "CULTURE SENSITIVITY",
        
    },
    {
        value: 35,
        label: "BIOCHEMISTRY",
        
    },
    {
       value: 32,
        label: "ENDOCRINOLOGY",
        
    },
    {
       value: 36,
        label: "PACKEGES",
       
    },
    {
        value: 31,
        label: "BODY FLUIDS",
     },
]);
  const [show, setShow] = useState({
    moadal: false,
    data: {},
  });
  const [approve, setshowApprove] = useState({
    msg: "",
    show: false,
  });
  const [PreviousTestResult, setPreviousTestResult] = useState([]);
  const [headerTestResult, setHeaderTestResult] = useState([]);
  const [show2, setShow2] = useState({
    moadal: false,
    data: {},
  });
  const [PrintReportLoading, setPrintReportLoading] = useState(false);
  const [showAdvanceFilter, setShowAdvanceFilter] = useState({
    show: false,
    data: "",
  });

  const [show3, setShow3] = useState({
    modal: false,
    data: {},
  });

  const [show4, setShow4] = useState({
    modal: false,
    data: "",
    index: -1,
  });

  const [show5, setShow5] = useState({
    modal: false,
    data: "",
  });

  const [mouseHover, setMouseHover] = useState({
    index: -1,
    data: [],
  });
  const [testHeaderHover, setTestHeaderHover] = useState({
    index: -1,
    data: [],
  });

  const [toggleDate, setToggleDate] = useState({
    FromDate: false,
    ToDate: false,
  });
  const [showRemark, setShowRemark] = useState(false);
  const [showPrickRemark, setShowPrickRemark] = useState(false);
  const [redata, SetReData] = useState([]);
  const [showdetails, setshowDetails] = useState(true);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [Identity, setIdentity] = useState([]);
  const [tableData,setTableData]=useState([])
  const [showAuditTrail, setShowAuditTrail] = useState({
    show: false,
    data: "",
    testname: "",
  });
  const [show6, setShow6] = useState({
    modal: false,
    data: "",
    index: -1,
  });

  const [show7, setShow7] = useState({
    modal: false,
    data: "",
    index: -1,
  });
  const [showFilter, setshowFilter] = useState(true);

  const [formData, setFormData] = useState({
    FromDate: new Date(),
    ToDate: new Date(),
    CentreID: "",
    ItemValue: "",
    RateTypeID: "",
    SelectTypes: "",
    RefundFilter: null,
    FromTime: "00:00:00",
    ToTime: "23:59:59",
    DoctorReferal: "",
    DepartmentID: "",
    DoctorName: "",
    TestName: "",
    SampleStatus: "3",
    DateTypeSearch: "Date",
    IsUrgent: "",
    MachineID: 0,
    IsTat: 0,
    Order: "DESC",
    Flag: "",
    moreFilter: 0,
    parameterId: "",
    valueCheck: "=",
    valueToSearch: "",
    valueRangeFrom: "",
    valueRangeTo: "",
  });
  // i18n start
  const [reason, setReason] = useState({
    HoldShow: false,
    Hdata: "",
    type: "",
  });
  const [isPreviousResultAvailable, setIsPreviousResultAvailable] =
    useState(false);
  const [showOldReportModal, setShowOldReportModal] = useState({
    show: false,
    data: "",
  });
  const [showPH, setShowPH] = useState(false);
  const [accessNavLink, setAccessNavLink] = useState([]);
  const { t } = useTranslation();

  const prop = () => {
    const uniqueTestIDs = new Set();
    redata.forEach((item) => {
      const testIDs = item.TestID.split(",").map((id) => id.trim());
      testIDs.forEach((id) => uniqueTestIDs.add(id));
    });
    return uniqueTestIDs.size;
  };

  const totalPatient = () => {
    const visitNos = redata.map((item) => item.VisitNo);
    const uniqueVisitNos = new Set(visitNos);
    return uniqueVisitNos.size;
  };
  // i18n end
  const BindMachineName = () => {
    axios
      .get("/api/v1/MachineGroup/BindMachineName")
      .then((res) => {
        let data = res?.data?.message;

        let val = data?.map((ele) => {
          return {
            value: ele?.MachineId,
            label: ele?.MachineName,
          };
        });

        val.unshift({ label: "All Machine", value: 0 });
        setMachineId(val);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Error Occur"
        );
      });
  };
  const getMachine = () => {
    axios
      .get("/api/v1/Investigations/BindMachineList")
      .then((res) => {
        let data = res.data.message;
        let Machine = data.map((ele) => {
          return {
            value: ele.MachineId,
            label: ele.MachineName,
          };
        });
        setMachine(Machine);
      })
      .catch((err) => console.log(err));
  };
//   useEffect(() => {
//     getMachine();
//     BindMachineName();
    
//   }, []);

  const handleIndexNew = (e, name) => {
    switch (name) {
      case "DoctorName":
        switch (e.which) {
          case 38:
            if (indexMatch !== 0) {
              setIndexMatch(indexMatch - 1);
            } else {
              setIndexMatch(doctorSuggestion.length - 1);
            }
            break;
          case 40:
            if (doctorSuggestion.length - 1 === indexMatch) {
              setIndexMatch(0);
            } else {
              setIndexMatch(indexMatch + 1);
            }
            break;
          case 13:
            handleListSearchNew(doctorSuggestion[indexMatch], name);
            setIndexMatch(0);
            break;
          default:
            break;
        }
        break;
      case "TestName":
        switch (e.which) {
          case 38:
            if (indexMatch !== 0) {
              setIndexMatch(indexMatch - 1);
            } else {
              setIndexMatch(TestSuggestion.length - 1);
            }
            break;
          case 40:
            if (TestSuggestion.length - 1 === indexMatch) {
              setIndexMatch(0);
            } else {
              setIndexMatch(indexMatch + 1);
            }
            break;
          case 13:
            handleListSearchNew(TestSuggestion[indexMatch], name);
            setIndexMatch(0);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (formData?.TestName.length > 2) {
      DepartmentWiseItemList(
        formData.DepartmentID,
        formData?.TestName,
        setTestSuggestion
      );
    }
  }, [formData?.TestName]);

  const handleListSearchNew = (data, name) => {
    switch (name) {
      case "DoctorName":
        setFormData({
          ...formData,
          [name]: data.Name,
          DoctorReferal: data.Name ? data.DoctorReferalID : "",
        });
        setIndexMatch(0);
        setDoctorSuggestion([]);
        setDropFalse(false);
        break;

      case "TestName":
        setFormData({
          ...formData,
          [name]: data.TestName,
        });
        setIndexMatch(0);
        setTestSuggestion([]);
        break;
      default:
        break;
    }
  };

//   useEffect(() => {
//     getDoctorSuggestion(formData, setDoctorSuggestion, setFormData);
//     if (formData?.DoctorName === "") {
//       setDropFalse(true);
//     }
//   }, [formData?.DoctorName]);

  const validation = () => {
    let error = "";
    if (
      formData?.SelectTypes.trim() !== "" &&
      formData?.ItemValue.trim() === ""
    ) {
      error = { ...error, ItemValue: t("Please Choose Value") };
    }
    if (formData.SelectTypes === "Mobile") {
      if (formData?.SelectTypes !== "" && formData?.ItemValue === "") {
        error = { ...error, ItemValue: t("This Field is Required") };
      } else if (formData.ItemValue.length !== 10) {
        error = { ...error, ItemValue: t("Invalid Mobile Number") };
      }
    }

    // if (moment(formData.FromDate).isAfter(moment(new Date()))) {
    //   error = { ...error, FromDate: t("Date is Invalid") };
    // }

    // if (moment(formData.ToDate).isAfter(moment(new Date()))) {
    //   error = { ...error, ToDate: t("Date is Invalid") };
    // } else if (
    //   moment(formData.ToDate).format("DD/MMM/YYYY") <
    //   moment(formData.FromDate).format("DD/MMM/YYYY")
    // ) {

    //   error = {
    //     ...error,
    //     ToDate: t("Date Must be Greater Then Or Equal to From Date"),
    //   };
    // }
    if (formData.FromDate === moment(new Date()).format("DD/MMM/YYYY")) {
      if (formData.FromTime > moment(new Date()).format("hh:mm:ss ")) {
        error = { ...error, FromTime: t("Time is Invalid") };
      }
    }
    if (formData.ToDate === moment(new Date()).format("DD/MMM/YYYY")) {
      if (formData.ToTime < formData.FromTime) {
        error = { ...error, ToTime: t("Time Must be Less than From Time") };
      }
    }

    return error;
  };
  console.log(screenshow)

  const myRefs = useRef([]);

  const handleKeyUp = (e, targetElem, index) => {
    if (e.key === "Enter" && targetElem) {
      targetElem.focus();
    }
  };

  const handleToggle = (name) => {
    setToggleDate({ ...toggleDate, [name]: !toggleDate[name] });
  };

  const dateSelect = (date, name) => {
    console.log(date)
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSelectChange = (event) => {
    const { name, value, checked, type } = event?.target;
    if (name == "CentreID") {
      setFormData({ ...formData, [name]: value, RateTypeID: "" });
      setRateTypes([]);
      if (value == "") {
        fetchRateTypes(CentreData.map((ele) => ele.value));
      } else {
        fetchRateTypes([value]);
      }
    } else if (name == "IsUrgent") {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

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
        let allValues = CentreDataValue.map((ele) => ele.value);
        setCentreData(CentreDataValue);

        fetchRateTypes(allValues);
      })
      .catch((err) => console.log(err));
  };

  // const getAccessRateType = () => {
  //   axios
  //     .get("/api/v1/RateType/getAccessRateType")
  //     .then((res) => {
  //       let data = res.data.message;
  //       let CentreDataValue = data.map((ele) => {
  //         return {
  //           value: ele.RateTypeID,
  //           label: ele.Rate,
  //         };
  //       });
  //       setRateData(CentreDataValue);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleSave = (data, modal) => {
    if (modal === "Edit") {
      if (Number(data?.MinValue) >= Number(data?.MaxValue)) {
        toast.error(t("Please Enter Correct Min and Max Value"));
      } else {
        let val = ResultData.map((ele) => {
          if (ele.labObservationID == data?.labObservationID) {
            return {
              ...ele,
              DisplayReading: data?.DisplayReading,
              MinValue: data?.MinValue,
              MaxValue: data?.MaxValue,
              ReadingFormat: data?.ReadingFormat,
              SaveRangeStatus: 1,
            };
          } else {
            return ele;
          }
        });
        setResultData(val);
        setShow({ moadal: false, data: {} });
      }
    }

    if (modal === "AddComment") {
      if (data?.pageName === "Single") {
        let val = ResultData.map((ele) => {
          if (ele.labObservationID == data?.labObservationID) {
            return {
              ...ele,
              COMMENT: data?.COMMENT,
              SaveRangeStatus: 1,
            };
          } else {
            return ele;
          }
        });
        setResultData(val);
        setShow2({ moadal: false, data: {} });
      } else {
        let val = ResultTestData.map((ele) => {
          if (ele.TestID == data?.TestID) {
            return {
              ...ele,
              COMMENT: data?.COMMENT,
              SaveRangeStatus: 1,
              labObservationID: -1,
            };
          } else {
            return ele;
          }
        });
        setResultTestData(val);
        setShow2({ moadal: false, data: {} });
      }
    }

    if (modal === "TemplateMaster") {
      let val = ResultData.map((ele) => {
        if (ele.labObservationID == data?.labObservationID) {
          return {
            ...ele,
            COMMENT: data?.COMMENT,
            CommentID: data?.CommentID,
          };
        } else {
          return ele;
        }
      });
      setResultData(val);
      setShow3({ moadal: false, data: {} });
    }
  };

  const getDepartment = () => {
    axios
      .get("/api/v1/Department/getDepartment")
      .then((res) => {
        let data = res.data.message;
        let DeptDataValue = data.map((ele) => {
          return {
            value: ele.DepartmentID,
            label: ele.Department,
          };
        });

        setDepartmentData(DeptDataValue);
      })
      .catch((err) => console.log(err));
  };

  const TableData = (status) => {
    const generatedError = validation();
    if (generatedError === "") {
      const rateTypes = RateTypes.map((item) => {
        return item?.value;
      });
      setLoading(true);
       //apiCall will happen here
       setTimeout(() => {
        setLoading(false)
       }, 500);
       const apiresponse=[
        {
          "centre": "BAJAJ_FINSERV NOIDA",
          "centreID": 344535,
          "TestCentreID": 360523,
          "PendingTest": 3.0,
          "ApprovedTest": 1.0
        },
        {
          "centre": "Be Healthcare Centre",
          "centreID": 362760,
          "TestCentreID": 360523,
          "PendingTest": 0.0,
          "ApprovedTest": 3.0
        },
        {
          "centre": "BEATO NOIDA",
          "centreID": 347257,
          "TestCentreID": 360523,
          "PendingTest": 0.0,
          "ApprovedTest": 1.0
        },
        {
          "centre": "Connect Noida",
          "centreID": 311723,
          "TestCentreID": 360523,
          "PendingTest": 2.0,
          "ApprovedTest": 1.0
        },
        {
          "centre": "EKA CARE NOIDA",
          "centreID": 333958,
          "TestCentreID": 360523,
          "PendingTest": 11.0,
          "ApprovedTest": 8.0
        },
        {
          "centre": "Eva Hospital (Surat)",
          "centreID": 365721,
          "TestCentreID": 360523,
          "PendingTest": 1.0,
          "ApprovedTest": 0.0
        },
        {
          "centre": "Happy Health Clinical Laboratory",
          "centreID": 363011,
          "TestCentreID": 360523,
          "PendingTest": 1.0,
          "ApprovedTest": 1.0
        },{
            "centre": "BAJAJ_FINSERV NOIDA",
            "centreID": 344535,
            "TestCentreID": 360523,
            "PendingTest": 3.0,
            "ApprovedTest": 1.0
          },
          {
            "centre": "Be Healthcare Centre",
            "centreID": 362760,
            "TestCentreID": 360523,
            "PendingTest": 0.0,
            "ApprovedTest": 3.0
          },
          {
            "centre": "BEATO NOIDA",
            "centreID": 347257,
            "TestCentreID": 360523,
            "PendingTest": 0.0,
            "ApprovedTest": 1.0
          },
          {
            "centre": "Connect Noida",
            "centreID": 311723,
            "TestCentreID": 360523,
            "PendingTest": 2.0,
            "ApprovedTest": 1.0
          },
          {
            "centre": "EKA CARE NOIDA",
            "centreID": 333958,
            "TestCentreID": 360523,
            "PendingTest": 11.0,
            "ApprovedTest": 8.0
          },
          {
            "centre": "Eva Hospital (Surat)",
            "centreID": 365721,
            "TestCentreID": 360523,
            "PendingTest": 1.0,
            "ApprovedTest": 0.0
          },
          {
            "centre": "Happy Health Clinical Laboratory",
            "centreID": 363011,
            "TestCentreID": 360523,
            "PendingTest": 1.0,
            "ApprovedTest": 1.0
          }
      ]
      
        SetReData(apiresponse);
      setErrors(generatedError);
    } else {
      setErrors(generatedError);
    }
  };

  const getIsDocumentUpload = (documentId, pageName) => {
    return axios
      .post("/api/v1/CommonController/GetDocument", {
        Page: pageName,
        Guid: documentId,
      })
      .then((res) => {
        return res?.data?.message.length > 0 ? true : false;
      })
      .catch((err) => {
        console.log(err?.data?.message);
      });
  };

  const setArrangeMentOfData = (data, subData) => {
    let mainData = [];
    subData.map((ele, index) => {
      data.map((eleInner, indexInner) => {
        if (ele?.TestID === eleInner?.TestID) {
          eleInner.Printwithhead = eleInner.Printwithhead
            ? eleInner.Printwithhead
            : 0;
          mainData = [...mainData, eleInner];
        }
      });
    });
    setResultData(mainData);
  };

  const GetResultEntry = (payload, index, loading) => {
    loading && loading(true);
    axios
      .post("/api/v1/RE/GetResultEntryData", {
        ...payload,
        MacID: payload?.MacID != "" ? payload?.MacID : machine[0]?.value,
      })
      .then((res) => {
        const data = res?.data?.message;
        if (data.length > 0) {
          const val = data.map((ele) => {
            return {
              ...ele,
              isChecked: true,
              RerunIscheck: false,
              SaveRangeStatus: 0,
              currentIndex: index,
              Mobile: payload?.Mobile,
              MinValue: ele?.MinValue == null ? "0" : ele?.MinValue,
              MaxValue: ele?.MaxValue == null ? "0" : ele?.MaxValue,
              //  MinValue: "",
              // MaxValue:"",

              PEmail: payload?.PEmail,
              MachineId:
                payload?.MacID != "" ? payload?.MacID : machine[0]?.value,
            };
          });

          const dataTestHeader = res?.data?.TestHeader;
          let isPreviousResult = false;
          const valTestHeader = dataTestHeader?.map((ele) => {
            if (ele?.OldValueDate && ele?.OldValueDate !== "") {
              isPreviousResult = true;
            }
            return {
              ...ele,
              isChecked: true,
              outSource: 1,
              isDocumentUpload: 0,
              TestCenterId: val[0]?.TestCentreID,
              Mobile: payload?.Mobile,
              PEmail: payload?.PEmail,
              MachineId:
                payload?.MacID != "" ? payload?.MacID : machine[0]?.value,
              labObservationID: ele?.InvestigationID,
              Printwithhead: ele?.Printwithhead ? ele?.Printwithhead : 0,
              // ApprovedBy:""
            };
          });
          setIsPreviousResultAvailable(isPreviousResult);
          setArrangeMentOfData(val, valTestHeader);
          setResultTestData(valTestHeader);
          loading && loading(false);
        } else {
          toast.error(t("No Data Found"));
          loading && loading(false);
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : t("No Record Found")
        );
        loading && loading(false);
      });
  };

  const handleDoctorName = (e) => {
    const { name, value } = e.target;
    const data = ResultTestData?.map((ele) => {
      return {
        ...ele,
        [name]: value,
      };
    });

    setResultTestData(data);
  };

  const ApplyFormula = (testid) => {
    if (ResultData.length) {
      for (let i = 0; i < ResultData.length; i++) {
        var Formula = "";
        Formula = ResultData[i].Formula;
        if (Formula != "" && ResultData[i].TestID === testid) {
          for (var j = 0; j < ResultData.length; j++) {
            try {
              var aa = Number(ResultData[j].Value);
              if (aa == "") {
                aa = "0";
              }
              if (ResultData[i].ReportType == "1") {
                Formula = Formula.replace(
                  ResultData[j].labObservationID + "&",
                  aa
                );
              }
            } catch (e) {}
          }

          try {
            var vv = Math.round(eval(Formula) * 100) / 100;
            if (vv == "0" || isNaN(vv)) {
              ResultData[i].Value = "0";
            } else {
              ResultData[i].Value = vv;
            }
          } catch (e) {
            ResultData[i].Value = "";
          }
          var ans = ResultData[i].Value;
          if (
            (parseFloat(ResultData[i]["MaxValue"]) != 0 &&
              parseFloat(ResultData[i]["MinValue"]) != 0) ||
            parseFloat(ResultData[i]["MaxValue"]) > 0 ||
            parseFloat(ResultData[i]["MinValue"]) > 0 ||
            parseFloat(ResultData[i]["MaxValue"]) < 0 ||
            parseFloat(ResultData[i]["MinValue"] < 0)
          ) {
            if (
              parseFloat(ResultData[i].Value) >
              parseFloat(ResultData[i]["MaxValue"])
            ) {
              ResultData[i]["Flag"] = "High";
            }
            if (
              parseFloat(ResultData[i].Value) <
              parseFloat(ResultData[i]["MinValue"])
            ) {
              ResultData[i]["Flag"] = "Low";
            }

            if (
              parseFloat(ResultData[i].Value) >=
                parseFloat(ResultData[i]["MinValue"]) &&
              parseFloat(ResultData[i].Value) <=
                parseFloat(ResultData[i]["MaxValue"])
            ) {
              ResultData[i]["Flag"] = "Normal";
            }
          }
          if (ResultData[i].Value === "") {
            ResultData[i]["Flag"] = "";
          }

          if (isNaN(ans) || ans == "Infinity") {
            ResultData[i].Value = "";
          }
        }
      }
    }
  };
  function isValidDecimal(value) {
    if (
      (value.match(/</g) || []).length + (value.match(/>/g) || []).length >
      1
    ) {
      return false;
    }
    const afterSign =
      value.includes("<") || value.includes(">")
        ? value.split(/[<>]/)[1]
        : value;

    const decimalRegex = /^\d*\.?\d*$/;
    return decimalRegex.test(afterSign);
  }

  const handleCheckbox = (e, index, testid) => {
    const data = [...ResultData];
    const dataTestHeader = [...ResultTestData];
    const { value, checked, type, name } = e.target;
    if (index >= 0) {
      if (name === "Value") {
        if (isValidDecimal(value, data[index]["RoundOff"])) {
          data[index][name] = value;
        } else {
          data[index][name] = value;
          data[index]["Flag"] = "Normal";
        }
      }

      if (type === "checkbox") {
        data[index][name] = checked;
      }
      if (name === "isOmit" || name === "IsCriticalCheck") {
        data[index][name] = checked ? 1 : 0;
      }
      if (name === "Value" && type === "text") {
        let modifiedValue = value;
        if (value.includes("<")) {
          modifiedValue = parseFloat(value?.split("<")[1]) - 0.1;
        } else if (value.includes(">")) {
          modifiedValue = parseFloat(value?.split(">")[1]) + 0.1;
        } else {
          modifiedValue = value;
        }

        if (
          (parseFloat(data[index]["MaxValue"]) != 0 &&
            parseFloat(data[index]["MinValue"]) != 0) ||
          parseFloat(data[index]["MaxValue"]) > 0 ||
          parseFloat(data[index]["MinValue"]) > 0 ||
          parseFloat(data[index]["MaxValue"]) < 0 ||
          parseFloat(data[index]["MinValue"]) < 0
        ) {
          if (parseFloat(modifiedValue) > parseFloat(data[index]["MaxValue"])) {
            data[index]["Flag"] = "High";
          }
          if (parseFloat(modifiedValue) < parseFloat(data[index]["MinValue"])) {
            data[index]["Flag"] = "Low";
          }

          if (
            parseFloat(modifiedValue) >= parseFloat(data[index]["MinValue"]) &&
            parseFloat(modifiedValue) <= parseFloat(data[index]["MaxValue"])
          ) {
            data[index]["Flag"] = "Normal";
          }
        }

        if (value === "") {
          data[index]["Flag"] = "";
        }
      }

      setResultData(data);
    } else {
      const val = data.map((ele) => {
        if (testid === ele?.TestID) {
          return {
            ...ele,
            [name]: checked,
          };
        } else {
          return ele;
        }
      });

      const valTestHeader = dataTestHeader?.map((ele) => {
        if (testid === ele?.TestID) {
          return {
            ...ele,
            isChecked: checked,
          };
        } else {
          return ele;
        }
      });
      setResultTestData(valTestHeader);
      setResultData(val);
    }
    ApplyFormula(testid);
  };

  const getHelpMenuData = (e, labObservationId) => {
    if (e?.which !== 13) {
      setHiddenDropDownHelpMenu(true);
      axios
        .post("/api/v1/RE/getHelpMenuInvestigationWise", {
          InvestigationID: labObservationId,
        })
        .then((res) => {
          setHelpMenu(res.data?.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleIndex = (e, index) => {
    const { name } = e.target;
    switch (name) {
      case "Value":
        switch (e.which) {
          case 38:
            if (indexMatch !== 0) {
              setIndexMatch(indexMatch - 1);
            } else {
              setIndexMatch(helpmenu.length - 1);
            }
            break;
          case 40:
            if (helpmenu.length - 1 === indexMatch) {
              setIndexMatch(0);
            } else {
              setIndexMatch(indexMatch + 1);
            }
            break;
          case 13:
            if (HiddenDropDownHelpMenu) {
              handleListSearch(helpmenu[indexMatch], name, index);
              setIndexMatch(0);
            }
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }
  };

  const handleListSearch = (data, name, index) => {
    const val = [...ResultData];
    val[index][name] = data?.label;
    setResultData(val);
    setHelpMenu([]);
    setHiddenDropDownHelpMenu(false);
  };

  const fetchApi = (field, payload, headerData) => {
    setLoading(true);
    // console.log(payload);
    const ModifiedHeaderData = headerData?.map((ele) => {
      return {
        ...ele,
        IsHold: ele?.IsHold ?? 0,
      };
    });
    if (field == "Approved") {
      const details = {
        data: payload,
        ResultStatus: field,
        IsCritical: 0,
        HeaderInfo: ModifiedHeaderData,
      };
      setmodalPayload({ ...details, IsCritical: 1 });
      axios
        .post("/api/v1/RE/SaveResultEntry", details)
        .then((res) => {
          setLoading(false);
          if (res?.data?.CriticalValue == "1") {
            setshowApprove({ ...approve, show: true, msg: res?.data?.message });
          } else {
            handleReport("Yes", headerData);
            setResultData([]);
            toast.success(res?.data?.message);
            setDlcCheckChecked(false);
          }
        })
        .catch((err) => {
          if (err.response.status === 504) {
            toast.error(t("Something Went Wrong"));
          }
          if (err.response.status === 401) {
            toast.error(err.response.data.message);
          }
          if (err.response.status === 400) {
            toast.error(err.response.data.message);
          }
          setLoading(false);
          // setResultData([]);
        });
    } else {
      axios
        .post("/api/v1/RE/SaveResultEntry", {
          data: payload,
          ResultStatus: field,
          HeaderInfo: ModifiedHeaderData,
        })
        .then((res) => {
          setLoading(false);
          toast.success(res.data.message);
          // setResultData([]);
          setDlcCheckChecked(false);
          const testidhash = ResultTestData.map((obj) => obj.TestID);
          (field === "Hold" || field === "Unhold") &&
            GetResultEntry({
              TestID: testidhash,
              LedgerTransactionID: "",
              DepartmentID: "",
              symbol: "",
              Mobile: payload[0]?.Mobile,
              VisitNo: payload[0]?.VisitNo,
              PEmail: payload[0]?.PEmail,
              MacID: "",
            });
        })
        .catch((err) => {
          if (err.response.status === 504) {
            toast.error(t("Something Went Wrong"));
          }
          if (err.response.status === 401) {
            toast.error(err.response.data.message);
          }
          setLoading(false);
          setResultData([]);
        });
    }
  };

  // const handleStatusFilter = (status) => {
  //   const data = ResultTestData.filter(
  //     (ele) => ele?.Status === status && ele?.isChecked === true
  //   );
  //   return data;
  // };

  const validateData = (field, payload, message, headerData) => {
    if (payload?.length > 0) {
      if (["Save", "Hold", "Unhold", "Not Approved"].includes(field)) {
        fetchApi(field, payload, headerData);
      } else {
        let showMessage = t("All Required fields are mandatory");
        let flag = 1;
        let DlcSum = 0;
        let dlc = false;
        for (var i = 0; i < payload.length > 0; i++) {
          if (payload[i].dlcCheck == "1" && DlcCheckChecked) {
            dlc = true;
            DlcSum =
              parseFloat(DlcSum) +
              parseFloat(payload[i].Value === "" ? 0 : payload[i].Value);
          }
          if (payload[i].ReportType === "1") {
            if (payload[i].isMandatory === 1 && payload[i].Value == "") {
              flag = 0;
            }
            if (payload[i].AMRMin > 0 || payload[i].AMRMax > 0) {
              if (
                payload[i].Value > payload[i].AMRMax ||
                payload[i].Value < payload[i].AMRMin
              ) {
                toast.error(
                  payload[i].TestName +
                    " value is greater or less than" +
                    payload[i].AMRMin +
                    " or " +
                    payload[i].AMRMax
                );
                return;
              }
            }
          }
          if (["2", "3"].includes(payload[i].ReportType)) {
            if (
              payload[i].isMandatory === 1 &&
              (payload[i].COMMENT == "" || payload[i].COMMENT == null)
            ) {
              flag = 0;
            }
          }
        }

        for (let i = 0; i < headerData.length; i++) {
          if (headerData[i]["ApprovedBy"] == "0") {
            flag = 0;
            showMessage = t("Kindly Select Doctor");
            break;
          }
        }

        if (flag == 1) {
          if (DlcCheckChecked && dlc) {
            if (DlcSum !== 100) {
              toast.error(t("Dlc Count Should be equal to 100"));
            } else {
              fetchApi(field, payload, headerData);
            }
          } else {
            fetchApi(field, payload, headerData);
          }
        } else {
          toast.error(showMessage);
        }
      }
    } else {
      toast.error(message);
    }
  };

  const handleResultSubmit = (field, headData) => {
    const errorToast = `This Test is ${DyanmicStatusResponse(ResultTestData)}`;
    if (field === "Approved") {
      const data = ResultData.filter(
        (ele) =>
          [3, 10, 14, 13].includes(ele?.Status) && ele?.isChecked === true
      );
      const val = ResultTestData.filter(
        (ele) =>
          [3, 10, 14, 13].includes(ele?.Status) && ele?.isChecked === true
      );
      validateData(field, data, errorToast, val);
    } else if (field === "Save") {
      const data = ResultData.filter(
        (ele) =>
          [3, 10, 14, 13].includes(ele?.Status) && ele?.isChecked === true
      );
      const val = ResultTestData.filter(
        (ele) =>
          [3, 10, 14, 13].includes(ele?.Status) && ele?.isChecked === true
      );
      validateData(field, data, errorToast, val);
    } else if (field === "Not Approved") {
      const data = ResultData.filter((ele) => ele.TestID === headData.TestID);
      const val = ResultTestData.filter(
        (ele) => ele?.TestID === headData.TestID
      );
      validateData(field, data, "This test is Not Approved", val);
    } else if (field === "Hold") {
      const payload = ResultData.filter(
        (ele) => ele.Status !== 5 && ele.isChecked === true
      );
      const val = ResultTestData.filter(
        (ele) => ele.Status !== 5 && ele.isChecked === true
      );
      validateData(field, payload, errorToast, val);
    } else if (field === "Unhold") {
      const data = ResultData.filter((ele) => ele.TestID === headData.TestID);
      const val = ResultTestData.filter(
        (ele) => ele?.TestID === headData.TestID
      );
      const UnholdData = val?.map((ele) => {
        return {
          ...ele,
          IsHold: 0,
        };
      });

      validateData(field, data, t("This Test is not Hold"), UnholdData);
    } else {
      const payload = ResultData.filter((ele) => ele.isChecked === true);
      validateData(field, payload);
      // } else {
      //   if (field === "Not Approved") {
      //     const payload = ResultData.filter((ele) => ele.isChecked === true);
      //     fetchApi(field, payload);
      //   } else {
      //     toast.error(
      //       `This already approved ${ResultTestData[statusMatchIndex]["PackageName"]}, Please Uncheck to continue or unhold to continue`
      //     );
      //   }
      // }
    }
  };

  const DeltaResponse = (data) => {
    axios
      .post("/api/v1/RE/DeltaCheck", {
        TestID: data?.TestID,
        LabObservation_ID: data?.labObservationID,
      })
      .then((res) => {
        const data = res.data.message;
        if (data.length > 0) {
          setPreviousTestResult(data);
        } else {
          setPreviousTestResult([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const TestHeaderResponce = (data) => {
    axios
      .post("/api/v1/RE/TestWiseDeltaValue", {
        TestID: data?.TestID,
        LabObservation_ID: data?.labObservationID,
      })
      .then((res) => {
        const data = res.data.message;
        if (data.length > 0) {
          setHeaderTestResult(data);
        } else {
          setHeaderTestResult([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AuditTrailResponce = async (data) => {
    await axios
      .post("/api/v1/RE/TestWiseDeltaValue", {
        TestID: data?.TestID,
        LabObservation_ID: data?.labObservationID,
      })
      .then((res) => {
        const resData = res.data.message;
        if (resData.length > 0) {
          setShowAuditTrail({
            show: true,
            data: resData,
            testname: data?.PackageName,
          });
        } else {
          setShowAuditTrail({ show: false, data: "", testname: "" });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setShowAuditTrail({ show: false, data: "", testname: "" });
      });
  };

  const handleAuditTrailModal = () => {
    setShowAuditTrail({ show: false, data: "", testname: "" });
  };

  // const handleReport = () => {
  //   let test_id = "";
  //   for (let i = 0; i < ResultTestData.length; i++) {
  //     test_id =
  //       test_id === ""
  //         ? `${ResultTestData[i].TestID}`
  //         : `${test_id},${ResultTestData[i].TestID}`;
  //   }

  //   console.log(ResultTestData);
  //   axios
  //     .post("/api/v1/LabReport/getlabreport", {
  //       test_id: test_id,
  //       ledgerTransactionID: ResultTestData[0]?.LedgerTransactionID,
  //     })
  //     .then((res) => {
  //       let response = res?.data?.message;
  //       const data = JSON.parse(
  //         response?.ReportSetting[0]?.ReportConfiguration
  //       );

  //       const val = [...response?.ReportSetting];
  //       val[0]["ReportConfiguration"] = data;
  //       response = { ...response, ReportSetting: val };
  //       navigate("/getLabReport", {
  //         state: {
  //           data: response,
  //         },
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const handleApproveReport = (Url, headerData) => {
    axios
      .post("/api/v1/RE/SendReport", {
        LedgerTransactionNo: headerData[0]?.LedgerTransactionNo,
        PatientName: headerData[0]?.PatientName,
        MobileNo: headerData[0]?.Mobile,
        LedgerTransactionID: headerData[0]?.LedgerTransactionID,
        PEmail: headerData[0]?.PEmail,
        URL: Url,
      })
      .then((res) => console.log(res?.data?.message))
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Something Went Wrong"
        );
      });
  };
  const handleReport = (key, headerData) => {
    const data = ResultTestData.filter((ele) => ele?.isChecked === true);
    let TestIDHash = data.map((ele) => {
      return ele?.TestIDHash;
    });

    setPrintReportLoading(true);
    axios
      .post(`/reports/v1/commonReports/GetLabReport`, {
        TestIDHash: TestIDHash,
        PrintColour: "0",
      })
      .then((res) => {
        if (key == "Yes") {
          handleApproveReport(res?.data?.Url, headerData);
          setPrintReportLoading(false);
        } else {
          window.open(res?.data?.Url, "_blank");
          setPrintReportLoading(false);
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : err?.data?.message
        );
        setPrintReportLoading(false);
      });
  };

  const getButtondata = () => {
    axios
      .get("api/v1/RE/EmployeeAccessDetails")
      .then((res) => {
        setButtonsData(res.data.message);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : t("Something Went Wrong")
        );
      });
  };

  const handleInnerChecked = (e, newIndex, index) => {
    const { name, checked } = e.target;
    const val = [...redata];
    val[index]["TestDetail"][newIndex][name] = checked;
    SetReData(val);
  };
  const getGradientClass = () => {
    let condition = localStorage.getItem("Theme");
    switch (condition) {
      case "Default":
        return "gradient-lightblue";
      case "light Green":
        return "gradient-lightgreen";
      case "Peach":
        return "gradient-peach";
      case "Pale Pink":
        return "gradient-pink";
      case "Red":
        return "gradient-red";
      case "SkyBlue":
        return "gradient-skyblue";
      case "Grey":
        return "gradient-grey";
      default:
        return "";
    }
  };

  const handleTime = (time, secondName) => {
    let TimeStamp = "";
    TimeStamp = time?.Hour + ":" + time?.Minute + ":" + time?.second;

    setFormData({ ...formData, [secondName]: TimeStamp });
  };
  useEffect(() => {
    //apiCall
    setTableData([
        {
          Gender: "Male",
          RangeType: "Normal",
          VialID: "HQ047866",
          VisitNo: "9086358",
          PatientName: "Mr Shubh",
          AgeSex: "27 Y 0 M 0 D /Male",
          TestName: "Complete Blood Count (CBC)",
          TestID: "60557653",
          AGE_in_Days: 9862.0,
          OpdIPd: null
        },
        {
          Gender: "Male",
          RangeType: "Normal",
          VialID: "HQ048231",
          VisitNo: "9086406",
          PatientName: "Mr Bhavesh Shah",
          AgeSex: "27 Y 11 M 2 D /Male",
          TestName: "Platelet Count",
          TestID: "60563208",
          AGE_in_Days: 10198.0,
          OpdIPd: null
        },
        {
          Gender: "Female",
          RangeType: "Normal",
          VialID: "HQ048976",
          VisitNo: "9083395",
          PatientName: "Ms Antara Srivastava",
          AgeSex: "32 Y 0 M 0 D /Female",
          TestName: "HbA1C (Glycosylated Haemoglobin)",
          TestID: "60573827",
          AGE_in_Days: 11688.0,
          OpdIPd: null
        },
        {
          Gender: "Female",
          RangeType: "Normal",
          VialID: "HQ048976",
          VisitNo: "9083395",
          PatientName: "Ms Antara Srivastava",
          AgeSex: "32 Y 0 M 0 D /Female",
          TestName: "Complete Blood Count (CBC)",
          TestID: "60573838",
          AGE_in_Days: 11688.0,
          OpdIPd: null
        },
        {
          Gender: "Male",
          RangeType: "Normal",
          VialID: "HQ050012",
          VisitNo: "9097177",
          PatientName: "Mr ZUBER",
          AgeSex: "31 Y 0 M 0 D /Male",
          TestName: "Complete Blood Count (CBC)",
          TestID: "60589309",
          AGE_in_Days: 11323.0,
        OpdIPd: null
        },
        {
            Gender: "Male",
            RangeType: "Normal",
            VialID: "HQ047866",
            VisitNo: "9086358",
            PatientName: "Mr Shubh",
            AgeSex: "27 Y 0 M 0 D /Male",
            TestName: "Complete Blood Count (CBC)",
            TestID: "60557653",
            AGE_in_Days: 9862.0,
            OpdIPd: null
          },
          {
            Gender: "Male",
            RangeType: "Normal",
            VialID: "HQ048231",
            VisitNo: "9086406",
            PatientName: "Mr Bhavesh Shah",
            AgeSex: "27 Y 11 M 2 D /Male",
            TestName: "Platelet Count",
            TestID: "60563208",
            AGE_in_Days: 10198.0,
            OpdIPd: null
          },
          {
            Gender: "Female",
            RangeType: "Normal",
            VialID: "HQ048976",
            VisitNo: "9083395",
            PatientName: "Ms Antara Srivastava",
            AgeSex: "32 Y 0 M 0 D /Female",
            TestName: "HbA1C (Glycosylated Haemoglobin)",
            TestID: "60573827",
            AGE_in_Days: 11688.0,
            OpdIPd: null
          },
          {
            Gender: "Female",
            RangeType: "Normal",
            VialID: "HQ048976",
            VisitNo: "9083395",
            PatientName: "Ms Antara Srivastava",
            AgeSex: "32 Y 0 M 0 D /Female",
            TestName: "Complete Blood Count (CBC)",
            TestID: "60573838",
            AGE_in_Days: 11688.0,
            OpdIPd: null
          },
          {
            Gender: "Male",
            RangeType: "Normal",
            VialID: "HQ050012",
            VisitNo: "9097177",
            PatientName: "Mr ZUBER",
            AgeSex: "31 Y 0 M 0 D /Male",
            TestName: "Complete Blood Count (CBC)",
            TestID: "60589309",
            AGE_in_Days: 11323.0,
          OpdIPd: null
          },
          {
            Gender: "Male",
            RangeType: "Normal",
            VialID: "HQ047866",
            VisitNo: "9086358",
            PatientName: "Mr Shubh",
            AgeSex: "27 Y 0 M 0 D /Male",
            TestName: "Complete Blood Count (CBC)",
            TestID: "60557653",
            AGE_in_Days: 9862.0,
            OpdIPd: null
          },
          {
            Gender: "Male",
            RangeType: "Normal",
            VialID: "HQ048231",
            VisitNo: "9086406",
            PatientName: "Mr Bhavesh Shah",
            AgeSex: "27 Y 11 M 2 D /Male",
            TestName: "Platelet Count",
            TestID: "60563208",
            AGE_in_Days: 10198.0,
            OpdIPd: null
          },
          {
            Gender: "Female",
            RangeType: "Normal",
            VialID: "HQ048976",
            VisitNo: "9083395",
            PatientName: "Ms Antara Srivastava",
            AgeSex: "32 Y 0 M 0 D /Female",
            TestName: "HbA1C (Glycosylated Haemoglobin)",
            TestID: "60573827",
            AGE_in_Days: 11688.0,
            OpdIPd: null
          },
          {
            Gender: "Female",
            RangeType: "Normal",
            VialID: "HQ048976",
            VisitNo: "9083395",
            PatientName: "Ms Antara Srivastava",
            AgeSex: "32 Y 0 M 0 D /Female",
            TestName: "Complete Blood Count (CBC)",
            TestID: "60573838",
            AGE_in_Days: 11688.0,
            OpdIPd: null
          },
          {
            Gender: "Male",
            RangeType: "Normal",
            VialID: "HQ050012",
            VisitNo: "9097177",
            PatientName: "Mr ZUBER",
            AgeSex: "31 Y 0 M 0 D /Male",
            TestName: "Complete Blood Count (CBC)",
            TestID: "60589309",
            AGE_in_Days: 11323.0,
          OpdIPd: null
          },
          {
            Gender: "Male",
            RangeType: "Normal",
            VialID: "HQ047866",
            VisitNo: "9086358",
            PatientName: "Mr Shubh",
            AgeSex: "27 Y 0 M 0 D /Male",
            TestName: "Complete Blood Count (CBC)",
            TestID: "60557653",
            AGE_in_Days: 9862.0,
            OpdIPd: null
          },
          {
            Gender: "Male",
            RangeType: "Normal",
            VialID: "HQ048231",
            VisitNo: "9086406",
            PatientName: "Mr Bhavesh Shah",
            AgeSex: "27 Y 11 M 2 D /Male",
            TestName: "Platelet Count",
            TestID: "60563208",
            AGE_in_Days: 10198.0,
            OpdIPd: null
          },
          {
            Gender: "Female",
            RangeType: "Normal",
            VialID: "HQ048976",
            VisitNo: "9083395",
            PatientName: "Ms Antara Srivastava",
            AgeSex: "32 Y 0 M 0 D /Female",
            TestName: "HbA1C (Glycosylated Haemoglobin)",
            TestID: "60573827",
            AGE_in_Days: 11688.0,
            OpdIPd: null
          },
          {
            Gender: "Female",
            RangeType: "Normal",
            VialID: "HQ048976",
            VisitNo: "9083395",
            PatientName: "Ms Antara Srivastava",
            AgeSex: "32 Y 0 M 0 D /Female",
            TestName: "Complete Blood Count (CBC)",
            TestID: "60573838",
            AGE_in_Days: 11688.0,
            OpdIPd: null
          },
          {
            Gender: "Male",
            RangeType: "Normal",
            VialID: "HQ050012",
            VisitNo: "9097177",
            PatientName: "Mr ZUBER",
            AgeSex: "31 Y 0 M 0 D /Male",
            TestName: "Complete Blood Count (CBC)",
            TestID: "60589309",
            AGE_in_Days: 11323.0,
          OpdIPd: null
          },
          {
            Gender: "Male",
            RangeType: "Normal",
            VialID: "HQ047866",
            VisitNo: "9086358",
            PatientName: "Mr Shubh",
            AgeSex: "27 Y 0 M 0 D /Male",
            TestName: "Complete Blood Count (CBC)",
            TestID: "60557653",
            AGE_in_Days: 9862.0,
            OpdIPd: null
          },
          {
            Gender: "Male",
            RangeType: "Normal",
            VialID: "HQ048231",
            VisitNo: "9086406",
            PatientName: "Mr Bhavesh Shah",
            AgeSex: "27 Y 11 M 2 D /Male",
            TestName: "Platelet Count",
            TestID: "60563208",
            AGE_in_Days: 10198.0,
            OpdIPd: null
          },
          {
            Gender: "Female",
            RangeType: "Normal",
            VialID: "HQ048976",
            VisitNo: "9083395",
            PatientName: "Ms Antara Srivastava",
            AgeSex: "32 Y 0 M 0 D /Female",
            TestName: "HbA1C (Glycosylated Haemoglobin)",
            TestID: "60573827",
            AGE_in_Days: 11688.0,
            OpdIPd: null
          },
          {
            Gender: "Female",
            RangeType: "Normal",
            VialID: "HQ048976",
            VisitNo: "9083395",
            PatientName: "Ms Antara Srivastava",
            AgeSex: "32 Y 0 M 0 D /Female",
            TestName: "Complete Blood Count (CBC)",
            TestID: "60573838",
            AGE_in_Days: 11688.0,
            OpdIPd: null
          },
          {
            Gender: "Male",
            RangeType: "Normal",
            VialID: "HQ050012",
            VisitNo: "9097177",
            PatientName: "Mr ZUBER",
            AgeSex: "31 Y 0 M 0 D /Male",
            TestName: "Complete Blood Count (CBC)",
            TestID: "60589309",
            AGE_in_Days: 11323.0,
          OpdIPd: null
          },
        
      ]
      )
  }, []);
  const BindApprovalDoctor = () => {
    axios
      .get("/api/v1/CommonController/BindApprovalDoctor")
      .then((res) => {
        // console.log(res)
        let data = res.data.message;
        let doctorData = data.map((ele) => {
          return {
            value: ele?.employeeid,
            label: ele?.name,
          };
        });
        setDoctorAdmin(doctorData);
      })
      .catch((err) => console.log(err));
  };

  const handleSelectChange1 = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    value != -1 && TableData(value);
  };

  const handleApifromModal = () => {
    setshowApprove({ ...approve, show: false });
    axios
      .post("/api/v1/RE/SaveResultEntry", modalpayload)
      .then((res) => {
        setLoading(false);

        handleReport("Yes", modalpayload?.HeaderInfo);
        setResultData([]);
        toast.success(res?.data?.message);
        setDlcCheckChecked(false);
      })
      .catch((err) => {
        if (err.response.status === 504) {
          toast.error(t("Something Went Wrong"));
        }
        toast.error(err.response.data.message);
        setLoading(false);
        // setResultData([]);
      });
  };

//   useEffect(() => {
//     getAccessCentres();
//     getDepartment();
//     BindApprovalDoctor();
//     getPaymentModes("Identity", setIdentity);
//     getButtondata();
//   }, []);

  const handleDeltaCheckReport = (parameterData) => {
    const payloadData = parameterData.reduce(
      (acc, current) => {
        if (!acc.Patientcode) {
          acc.Patientcode = current?.PatientCode;
        }

        acc.testid.push(current.TestID);

        return acc;
      },
      {
        Patientcode: "",
        testid: [],
      }
    );

    axios
      .post("/reports/v1/commonReports/DeltaCheckData", payloadData)
      .then((res) => {
        window.open(res?.data?.Url, "_blank");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchRateTypes = async (id) => {
    try {
      const res = await axios.post("/api/v1/Centre/GetRateType", {
        CentreId: id,
      });
      const list = res?.data?.message.map((item) => ({
        label: item?.RateTypeName,
        value: item?.RateTypeID,
      }));
      setRateTypes(list);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowRemark = () => {
    setShowRemark(false);
  };
  const handleShowPrickRemarks = () => {
    setShowPrickRemark(false);
  };

  const handleUploadCount = (name, value, secondName) => {
    let data = [...redata];
    if (name === "UploadDocumentCount") {
      data[show6?.index][name] = value;
      data[show6?.index][secondName] = value === 0 ? 0 : 1;
      SetReData(data);
    } else {
      data[show4?.index][name] = value;
      data[show4?.index][secondName] = value === 0 ? 0 : 1;
      SetReData(data);
    }
  };

  const handleNotApproveRemark = (e, data) => {
    const { name, value } = e.target;
    const TestHeader = [...ResultTestData];
    const index = ResultTestData.indexOf(data);
    TestHeader[index][name] = value;
    if (name == "HoldReason") TestHeader[index]["IsHold"] = 1;
    setResultTestData(TestHeader);
  };

  const printHeader = (isPrint, guid) => {
    let newResultTestData = [...ResultTestData].map((ele) => {
      return {
        ...ele,
        Printwithhead: ele?.TestIDHash === guid ? isPrint : ele?.Printwithhead,
      };
    });
    setResultTestData(newResultTestData);
    let newResultData = [...ResultData].map((ele) => {
      return {
        ...ele,
        Printwithhead: ele?.TestIDHash === guid ? isPrint : ele?.Printwithhead,
      };
    });
    setResultData(newResultData);
  };
  const handleResultData=()=>{
    setResultData([
        {
            "CanSaveAmendment": 1,
            "TestCentreID": 5167,
            "TestIDHash": "747ed034-ff99-4c47-8dbd-d40cea4461cc",
            "Gender": "Male",
            "PackageName": "Alkaline phosphatase (ALP)",
            "TestName": "Alkaline phosphatase (ALP)",
            "TestID": 52039,
            "Value": "",
            "OldValue": "",
            "isMandatory": 0,
            "DataType": "Test",
            "ID": "",
            "DepartmentID": 35,
            "PName": "Mr. VISHNU",
            "SINNo": "BARS/5167/002552",
            "Age": "23 Y 0 M 0 D",
            "PatientCode": "PAT/5167/001615",
            "ReportType": "1",
            "Status": 3,
            "Header": 0,
            "LedgerTransactionNo": "LAB/5167/003553",
            "DisplayReading": null,
            "ReadingFormat": null,
            "MethodName": "",
            "MinValue": "0",
            "IsChecked": 1,
            "AMRMin": 0,
            "AMRMax": 0,
            "MaxValue": "0",
            "COMMENT": null,
            "CommentID": null,
            "InvestigationID": 124,
            "labObservationID": 124,
            "Flag": "",
            "LedgerTransactionID": 7676,
            "isPackage": "0",
            "ItemId": 124,
            "Formula": "",
            "PatientID": 4352,
            "dlcCheck": 0,
            "Centre": "HARISHs",
            "RateType": "Itodse1",
            "ReferDoctor": "Dr. Self",
            "IsLabOutSource": "False",
            "RegDate": "2024-05-14T13:26:48.000Z",
            "SampleDate": "2024-05-14T13:30:55.000Z",
            "SampleReceiveDate": "2024-06-13T10:53:58.000Z",
            "ResultEnteredDate": "0000-00-00 00:00:00",
            "ApprovedDate": "0000-00-00 00:00:00",
            "LabOutsrcID": 0,
            "Printwithhead": 0,
            "IsHelpMenu": 0,
            "MacReading": null,
            "Reading1": null,
            "Reading2": null,
            "machinename": null,
            "ColorStatus": "#FFFFFF",
            "IsVip": 0,
            "IsMask": 0,
            "isOmit": 0,
            "IsCriticalCheck": 0,
            "isChecked": true,
            "RerunIscheck": false,
            "SaveRangeStatus": 0,
            "currentIndex": 0,
            "Mobile": "9599534346",
            "PEmail": "",
            "MachineId": 62
        },
        {
            "CanSaveAmendment": 1,
            "TestCentreID": 5167,
            "TestIDHash": "52e24404-e64d-4279-b86a-881641abcdbd",
            "Gender": "Male",
            "PackageName": "LUTEINIZING HORMONE, LH",
            "TestName": "LUTEINIZING HORMONE, LH",
            "TestID": 52040,
            "Value": "",
            "OldValue": "10",
            "isMandatory": 0,
            "DataType": "Test",
            "ID": "",
            "DepartmentID": 35,
            "PName": "Mr. VISHNU",
            "SINNo": "BARS/5167/002552",
            "Age": "23 Y 0 M 0 D",
            "PatientCode": "PAT/5167/001615",
            "ReportType": "1",
            "Status": 3,
            "Header": 0,
            "LedgerTransactionNo": "LAB/5167/003553",
            "DisplayReading": null,
            "ReadingFormat": null,
            "MethodName": "",
            "MinValue": "0",
            "IsChecked": 1,
            "AMRMin": 0,
            "AMRMax": 0,
            "MaxValue": "0",
            "COMMENT": null,
            "CommentID": null,
            "InvestigationID": 1316,
            "labObservationID": 1316,
            "Flag": "",
            "LedgerTransactionID": 7676,
            "isPackage": "0",
            "ItemId": 1316,
            "Formula": "",
            "PatientID": 4352,
            "dlcCheck": 0,
            "Centre": "HARISHs",
            "RateType": "Itodse1",
            "ReferDoctor": "Dr. Self",
            "IsLabOutSource": "False",
            "RegDate": "2024-05-14T13:26:48.000Z",
            "SampleDate": "2024-05-14T13:30:55.000Z",
            "SampleReceiveDate": "2024-06-13T10:53:58.000Z",
            "ResultEnteredDate": "0000-00-00 00:00:00",
            "ApprovedDate": "0000-00-00 00:00:00",
            "LabOutsrcID": 0,
            "Printwithhead": 0,
            "IsHelpMenu": 0,
            "MacReading": null,
            "Reading1": null,
            "Reading2": null,
            "machinename": null,
            "ColorStatus": "#FFFFFF",
            "IsVip": 0,
            "IsMask": 0,
            "isOmit": 0,
            "IsCriticalCheck": 0,
            "isChecked": true,
            "RerunIscheck": false,
            "SaveRangeStatus": 0,
            "currentIndex": 0,
            "Mobile": "9599534346",
            "PEmail": "",
            "MachineId": 62
        },
        {
            "CanSaveAmendment": 1,
            "TestCentreID": 5167,
            "TestIDHash": "6a04e55f-3b0b-46b5-a0ec-9125522bff6a",
            "Gender": "Male",
            "PackageName": "Prolactin",
            "TestName": "Prolactin",
            "TestID": 52042,
            "Value": "",
            "OldValue": "10",
            "isMandatory": 0,
            "DataType": "Test",
            "ID": "",
            "DepartmentID": 35,
            "PName": "Mr. VISHNU",
            "SINNo": "BARS/5167/002552",
            "Age": "23 Y 0 M 0 D",
            "PatientCode": "PAT/5167/001615",
            "ReportType": "1",
            "Status": 3,
            "Header": 0,
            "LedgerTransactionNo": "LAB/5167/003553",
            "DisplayReading": "10-100",
            "ReadingFormat": "ul/ml",
            "MethodName": "",
            "MinValue": "10",
            "IsChecked": 1,
            "AMRMin": 2,
            "AMRMax": 150,
            "MaxValue": "100",
            "COMMENT": null,
            "CommentID": null,
            "InvestigationID": 1979,
            "labObservationID": 1979,
            "Flag": "",
            "LedgerTransactionID": 7676,
            "isPackage": "0",
            "ItemId": 1979,
            "Formula": "",
            "PatientID": 4352,
            "dlcCheck": 0,
            "Centre": "HARISHs",
            "RateType": "Itodse1",
            "ReferDoctor": "Dr. Self",
            "IsLabOutSource": "False",
            "RegDate": "2024-05-14T13:26:48.000Z",
            "SampleDate": "2024-05-14T13:30:55.000Z",
            "SampleReceiveDate": "2024-06-13T10:53:58.000Z",
            "ResultEnteredDate": "0000-00-00 00:00:00",
            "ApprovedDate": "0000-00-00 00:00:00",
            "LabOutsrcID": 0,
            "Printwithhead": 0,
            "IsHelpMenu": 0,
            "MacReading": null,
            "Reading1": null,
            "Reading2": null,
            "machinename": null,
            "ColorStatus": "#FFFFFF",
            "IsVip": 0,
            "IsMask": 0,
            "isOmit": 0,
            "IsCriticalCheck": 0,
            "isChecked": true,
            "RerunIscheck": false,
            "SaveRangeStatus": 0,
            "currentIndex": 0,
            "Mobile": "9599534346",
            "PEmail": "",
            "MachineId": 62
        },
        {
            "CanSaveAmendment": 1,
            "TestCentreID": 5167,
            "TestIDHash": "b399e75b-51b6-4b0f-9aca-6ed7dad2cf4a",
            "Gender": "Male",
            "PackageName": "KIDNEY FUNCTION TEST (KFT / RFT)",
            "TestName": "Kidney function test profile",
            "TestID": 52043,
            "Value": "HEAD",
            "OldValue": "HEAD",
            "isMandatory": 0,
            "DataType": "Profile",
            "ID": "",
            "DepartmentID": 35,
            "PName": "Mr. VISHNU",
            "SINNo": "BARS/5167/002552",
            "Age": "23 Y 0 M 0 D",
            "PatientCode": "PAT/5167/001615",
            "ReportType": "1",
            "Status": 3,
            "Header": 1,
            "LedgerTransactionNo": "LAB/5167/003553",
            "DisplayReading": null,
            "ReadingFormat": null,
            "MethodName": "",
            "MinValue": "0",
            "IsChecked": 1,
            "AMRMin": 0,
            "AMRMax": 0,
            "MaxValue": "0",
            "COMMENT": null,
            "CommentID": null,
            "InvestigationID": 1285,
            "labObservationID": 3244,
            "Flag": "",
            "LedgerTransactionID": 7676,
            "isPackage": "1",
            "ItemId": 1285,
            "Formula": "",
            "PatientID": 4352,
            "dlcCheck": 0,
            "Centre": "HARISHs",
            "RateType": "Itodse1",
            "ReferDoctor": "Dr. Self",
            "IsLabOutSource": "False",
            "RegDate": "2024-05-14T13:26:48.000Z",
            "SampleDate": "2024-05-14T13:30:55.000Z",
            "SampleReceiveDate": "2024-06-13T10:53:58.000Z",
            "ResultEnteredDate": "0000-00-00 00:00:00",
            "ApprovedDate": "0000-00-00 00:00:00",
            "LabOutsrcID": 0,
            "Printwithhead": 0,
            "IsHelpMenu": 0,
            "MacReading": null,
            "Reading1": null,
            "Reading2": null,
            "machinename": null,
            "ColorStatus": "#FFFFFF",
            "IsVip": 0,
            "IsMask": 0,
            "isOmit": 0,
            "IsCriticalCheck": 0,
            "isChecked": true,
            "RerunIscheck": false,
            "SaveRangeStatus": 0,
            "currentIndex": 0,
            "Mobile": "9599534346",
            "PEmail": "",
            "MachineId": 62
        },
        {
            "CanSaveAmendment": 1,
            "TestCentreID": 5167,
            "TestIDHash": "b399e75b-51b6-4b0f-9aca-6ed7dad2cf4a",
            "Gender": "Male",
            "PackageName": "KIDNEY FUNCTION TEST (KFT / RFT)",
            "TestName": "Urea",
            "TestID": 52043,
            "Value": "",
            "OldValue": "10",
            "isMandatory": 0,
            "DataType": "Profile",
            "ID": "",
            "DepartmentID": 35,
            "PName": "Mr. VISHNU",
            "SINNo": "BARS/5167/002552",
            "Age": "23 Y 0 M 0 D",
            "PatientCode": "PAT/5167/001615",
            "ReportType": "1",
            "Status": 3,
            "Header": 0,
            "LedgerTransactionNo": "LAB/5167/003553",
            "DisplayReading": null,
            "ReadingFormat": null,
            "MethodName": "",
            "MinValue": "0",
            "IsChecked": 1,
            "AMRMin": 0,
            "AMRMax": 0,
            "MaxValue": "0",
            "COMMENT": null,
            "CommentID": null,
            "InvestigationID": 1285,
            "labObservationID": 2953,
            "Flag": "",
            "LedgerTransactionID": 7676,
            "isPackage": "1",
            "ItemId": 1285,
            "Formula": "",
            "PatientID": 4352,
            "dlcCheck": 0,
            "Centre": "HARISHs",
            "RateType": "Itodse1",
            "ReferDoctor": "Dr. Self",
            "IsLabOutSource": "False",
            "RegDate": "2024-05-14T13:26:48.000Z",
            "SampleDate": "2024-05-14T13:30:55.000Z",
            "SampleReceiveDate": "2024-06-13T10:53:58.000Z",
            "ResultEnteredDate": "0000-00-00 00:00:00",
            "ApprovedDate": "0000-00-00 00:00:00",
            "LabOutsrcID": 0,
            "Printwithhead": 0,
            "IsHelpMenu": 0,
            "MacReading": null,
            "Reading1": null,
            "Reading2": null,
            "machinename": null,
            "ColorStatus": "#FFFFFF",
            "IsVip": 0,
            "IsMask": 0,
            "isOmit": 0,
            "IsCriticalCheck": 0,
            "isChecked": true,
            "RerunIscheck": false,
            "SaveRangeStatus": 0,
            "currentIndex": 0,
            "Mobile": "9599534346",
            "PEmail": "",
            "MachineId": 62
        },
        {
            "CanSaveAmendment": 1,
            "TestCentreID": 5167,
            "TestIDHash": "b399e75b-51b6-4b0f-9aca-6ed7dad2cf4a",
            "Gender": "Male",
            "PackageName": "KIDNEY FUNCTION TEST (KFT / RFT)",
            "TestName": "Creatinine",
            "TestID": 52043,
            "Value": "",
            "OldValue": "10",
            "isMandatory": 0,
            "DataType": "Profile",
            "ID": "",
            "DepartmentID": 35,
            "PName": "Mr. VISHNU",
            "SINNo": "BARS/5167/002552",
            "Age": "23 Y 0 M 0 D",
            "PatientCode": "PAT/5167/001615",
            "ReportType": "1",
            "Status": 3,
            "Header": 0,
            "LedgerTransactionNo": "LAB/5167/003553",
            "DisplayReading": null,
            "ReadingFormat": null,
            "MethodName": "",
            "MinValue": "0",
            "IsChecked": 1,
            "AMRMin": 0,
            "AMRMax": 0,
            "MaxValue": "0",
            "COMMENT": null,
            "CommentID": null,
            "InvestigationID": 1285,
            "labObservationID": 582,
            "Flag": "",
            "LedgerTransactionID": 7676,
            "isPackage": "1",
            "ItemId": 1285,
            "Formula": "",
            "PatientID": 4352,
            "dlcCheck": 0,
            "Centre": "HARISHs",
            "RateType": "Itodse1",
            "ReferDoctor": "Dr. Self",
            "IsLabOutSource": "False",
            "RegDate": "2024-05-14T13:26:48.000Z",
            "SampleDate": "2024-05-14T13:30:55.000Z",
            "SampleReceiveDate": "2024-06-13T10:53:58.000Z",
            "ResultEnteredDate": "0000-00-00 00:00:00",
            "ApprovedDate": "0000-00-00 00:00:00",
            "LabOutsrcID": 0,
            "Printwithhead": 0,
            "IsHelpMenu": 0,
            "MacReading": null,
            "Reading1": null,
            "Reading2": null,
            "machinename": null,
            "ColorStatus": "#FFFFFF",
            "IsVip": 0,
            "IsMask": 0,
            "isOmit": 0,
            "IsCriticalCheck": 0,
            "isChecked": true,
            "RerunIscheck": false,
            "SaveRangeStatus": 0,
            "currentIndex": 0,
            "Mobile": "9599534346",
            "PEmail": "",
            "MachineId": 62
        },
        {
            "CanSaveAmendment": 1,
            "TestCentreID": 5167,
            "TestIDHash": "b399e75b-51b6-4b0f-9aca-6ed7dad2cf4a",
            "Gender": "Male",
            "PackageName": "KIDNEY FUNCTION TEST (KFT / RFT)",
            "TestName": "Uric acid",
            "TestID": 52043,
            "Value": "",
            "OldValue": "10",
            "isMandatory": 0,
            "DataType": "Profile",
            "ID": "",
            "DepartmentID": 35,
            "PName": "Mr. VISHNU",
            "SINNo": "BARS/5167/002552",
            "Age": "23 Y 0 M 0 D",
            "PatientCode": "PAT/5167/001615",
            "ReportType": "1",
            "Status": 3,
            "Header": 0,
            "LedgerTransactionNo": "LAB/5167/003553",
            "DisplayReading": null,
            "ReadingFormat": null,
            "MethodName": "",
            "MinValue": "0",
            "IsChecked": 1,
            "AMRMin": 0,
            "AMRMax": 0,
            "MaxValue": "0",
            "COMMENT": null,
            "CommentID": null,
            "InvestigationID": 1285,
            "labObservationID": 2966,
            "Flag": "",
            "LedgerTransactionID": 7676,
            "isPackage": "1",
            "ItemId": 1285,
            "Formula": "",
            "PatientID": 4352,
            "dlcCheck": 0,
            "Centre": "HARISHs",
            "RateType": "Itodse1",
            "ReferDoctor": "Dr. Self",
            "IsLabOutSource": "False",
            "RegDate": "2024-05-14T13:26:48.000Z",
            "SampleDate": "2024-05-14T13:30:55.000Z",
            "SampleReceiveDate": "2024-06-13T10:53:58.000Z",
            "ResultEnteredDate": "0000-00-00 00:00:00",
            "ApprovedDate": "0000-00-00 00:00:00",
            "LabOutsrcID": 0,
            "Printwithhead": 0,
            "IsHelpMenu": 0,
            "MacReading": null,
            "Reading1": null,
            "Reading2": null,
            "machinename": null,
            "ColorStatus": "#FFFFFF",
            "IsVip": 0,
            "IsMask": 0,
            "isOmit": 0,
            "IsCriticalCheck": 0,
            "isChecked": true,
            "RerunIscheck": false,
            "SaveRangeStatus": 0,
            "currentIndex": 0,
            "Mobile": "9599534346",
            "PEmail": "",
            "MachineId": 62
        },
        {
            "CanSaveAmendment": 1,
            "TestCentreID": 5167,
            "TestIDHash": "b399e75b-51b6-4b0f-9aca-6ed7dad2cf4a",
            "Gender": "Male",
            "PackageName": "KIDNEY FUNCTION TEST (KFT / RFT)",
            "TestName": "Sodium (Na)",
            "TestID": 52043,
            "Value": "",
            "OldValue": "10",
            "isMandatory": 0,
            "DataType": "Profile",
            "ID": "",
            "DepartmentID": 35,
            "PName": "Mr. VISHNU",
            "SINNo": "BARS/5167/002552",
            "Age": "23 Y 0 M 0 D",
            "PatientCode": "PAT/5167/001615",
            "ReportType": "1",
            "Status": 3,
            "Header": 0,
            "LedgerTransactionNo": "LAB/5167/003553",
            "DisplayReading": null,
            "ReadingFormat": null,
            "MethodName": "",
            "MinValue": "0",
            "IsChecked": 1,
            "AMRMin": 0,
            "AMRMax": 0,
            "MaxValue": "0",
            "COMMENT": null,
            "CommentID": null,
            "InvestigationID": 1285,
            "labObservationID": 2093,
            "Flag": "",
            "LedgerTransactionID": 7676,
            "isPackage": "1",
            "ItemId": 1285,
            "Formula": "",
            "PatientID": 4352,
            "dlcCheck": 0,
            "Centre": "HARISHs",
            "RateType": "Itodse1",
            "ReferDoctor": "Dr. Self",
            "IsLabOutSource": "False",
            "RegDate": "2024-05-14T13:26:48.000Z",
            "SampleDate": "2024-05-14T13:30:55.000Z",
            "SampleReceiveDate": "2024-06-13T10:53:58.000Z",
            "ResultEnteredDate": "0000-00-00 00:00:00",
            "ApprovedDate": "0000-00-00 00:00:00",
            "LabOutsrcID": 0,
            "Printwithhead": 0,
            "IsHelpMenu": 0,
            "MacReading": null,
            "Reading1": null,
            "Reading2": null,
            "machinename": null,
            "ColorStatus": "#FFFFFF",
            "IsVip": 0,
            "IsMask": 0,
            "isOmit": 0,
            "IsCriticalCheck": 0,
            "isChecked": true,
            "RerunIscheck": false,
            "SaveRangeStatus": 0,
            "currentIndex": 0,
            "Mobile": "9599534346",
            "PEmail": "",
            "MachineId": 62
        },
        {
            "CanSaveAmendment": 1,
            "TestCentreID": 5167,
            "TestIDHash": "b399e75b-51b6-4b0f-9aca-6ed7dad2cf4a",
            "Gender": "Male",
            "PackageName": "KIDNEY FUNCTION TEST (KFT / RFT)",
            "TestName": "Potassium (K)",
            "TestID": 52043,
            "Value": "",
            "OldValue": "0.2",
            "isMandatory": 0,
            "DataType": "Profile",
            "ID": "",
            "DepartmentID": 35,
            "PName": "Mr. VISHNU",
            "SINNo": "BARS/5167/002552",
            "Age": "23 Y 0 M 0 D",
            "PatientCode": "PAT/5167/001615",
            "ReportType": "1",
            "Status": 3,
            "Header": 0,
            "LedgerTransactionNo": "LAB/5167/003553",
            "DisplayReading": null,
            "ReadingFormat": null,
            "MethodName": "",
            "MinValue": "0",
            "IsChecked": 1,
            "AMRMin": 0,
            "AMRMax": 0,
            "MaxValue": "0",
            "COMMENT": null,
            "CommentID": null,
            "InvestigationID": 1285,
            "labObservationID": 1972,
            "Flag": "",
            "LedgerTransactionID": 7676,
            "isPackage": "1",
            "ItemId": 1285,
            "Formula": "(2953&+582&)/100",
            "PatientID": 4352,
            "dlcCheck": 0,
            "Centre": "HARISHs",
            "RateType": "Itodse1",
            "ReferDoctor": "Dr. Self",
            "IsLabOutSource": "False",
            "RegDate": "2024-05-14T13:26:48.000Z",
            "SampleDate": "2024-05-14T13:30:55.000Z",
            "SampleReceiveDate": "2024-06-13T10:53:58.000Z",
            "ResultEnteredDate": "0000-00-00 00:00:00",
            "ApprovedDate": "0000-00-00 00:00:00",
            "LabOutsrcID": 0,
            "Printwithhead": 0,
            "IsHelpMenu": 0,
            "MacReading": null,
            "Reading1": null,
            "Reading2": null,
            "machinename": null,
            "ColorStatus": "#FFFFFF",
            "IsVip": 0,
            "IsMask": 0,
            "isOmit": 0,
            "IsCriticalCheck": 0,
            "isChecked": true,
            "RerunIscheck": false,
            "SaveRangeStatus": 0,
            "currentIndex": 0,
            "Mobile": "9599534346",
            "PEmail": "",
            "MachineId": 62
        },
        {
            "CanSaveAmendment": 1,
            "TestCentreID": 5167,
            "TestIDHash": "b399e75b-51b6-4b0f-9aca-6ed7dad2cf4a",
            "Gender": "Male",
            "PackageName": "KIDNEY FUNCTION TEST (KFT / RFT)",
            "TestName": "Chloride (Cl)",
            "TestID": 52043,
            "Value": "",
            "OldValue": "10",
            "isMandatory": 0,
            "DataType": "Profile",
            "ID": "",
            "DepartmentID": 35,
            "PName": "Mr. VISHNU",
            "SINNo": "BARS/5167/002552",
            "Age": "23 Y 0 M 0 D",
            "PatientCode": "PAT/5167/001615",
            "ReportType": "1",
            "Status": 3,
            "Header": 0,
            "LedgerTransactionNo": "LAB/5167/003553",
            "DisplayReading": null,
            "ReadingFormat": null,
            "MethodName": "",
            "MinValue": "0",
            "IsChecked": 1,
            "AMRMin": 0,
            "AMRMax": 0,
            "MaxValue": "0",
            "COMMENT": null,
            "CommentID": null,
            "InvestigationID": 1285,
            "labObservationID": 476,
            "Flag": "",
            "LedgerTransactionID": 7676,
            "isPackage": "1",
            "ItemId": 1285,
            "Formula": "",
            "PatientID": 4352,
            "dlcCheck": 0,
            "Centre": "HARISHs",
            "RateType": "Itodse1",
            "ReferDoctor": "Dr. Self",
            "IsLabOutSource": "False",
            "RegDate": "2024-05-14T13:26:48.000Z",
            "SampleDate": "2024-05-14T13:30:55.000Z",
            "SampleReceiveDate": "2024-06-13T10:53:58.000Z",
            "ResultEnteredDate": "0000-00-00 00:00:00",
            "ApprovedDate": "0000-00-00 00:00:00",
            "LabOutsrcID": 0,
            "Printwithhead": 0,
            "IsHelpMenu": 0,
            "MacReading": null,
            "Reading1": null,
            "Reading2": null,
            "machinename": null,
            "ColorStatus": "#FFFFFF",
            "IsVip": 0,
            "IsMask": 0,
            "isOmit": 0,
            "IsCriticalCheck": 0,
            "isChecked": true,
            "RerunIscheck": false,
            "SaveRangeStatus": 0,
            "currentIndex": 0,
            "Mobile": "9599534346",
            "PEmail": "",
            "MachineId": 62
        },
        {
            "CanSaveAmendment": 1,
            "TestCentreID": 5167,
            "TestIDHash": "b399e75b-51b6-4b0f-9aca-6ed7dad2cf4a",
            "Gender": "Male",
            "PackageName": "KIDNEY FUNCTION TEST (KFT / RFT)",
            "TestName": "Calcium total",
            "TestID": 52043,
            "Value": "",
            "OldValue": "10",
            "isMandatory": 0,
            "DataType": "Profile",
            "ID": "",
            "DepartmentID": 35,
            "PName": "Mr. VISHNU",
            "SINNo": "BARS/5167/002552",
            "Age": "23 Y 0 M 0 D",
            "PatientCode": "PAT/5167/001615",
            "ReportType": "1",
            "Status": 3,
            "Header": 0,
            "LedgerTransactionNo": "LAB/5167/003553",
            "DisplayReading": null,
            "ReadingFormat": null,
            "MethodName": "",
            "MinValue": "0",
            "IsChecked": 1,
            "AMRMin": 0,
            "AMRMax": 0,
            "MaxValue": "0",
            "COMMENT": null,
            "CommentID": null,
            "InvestigationID": 1285,
            "labObservationID": 347,
            "Flag": "",
            "LedgerTransactionID": 7676,
            "isPackage": "1",
            "ItemId": 1285,
            "Formula": "",
            "PatientID": 4352,
            "dlcCheck": 0,
            "Centre": "HARISHs",
            "RateType": "Itodse1",
            "ReferDoctor": "Dr. Self",
            "IsLabOutSource": "False",
            "RegDate": "2024-05-14T13:26:48.000Z",
            "SampleDate": "2024-05-14T13:30:55.000Z",
            "SampleReceiveDate": "2024-06-13T10:53:58.000Z",
            "ResultEnteredDate": "0000-00-00 00:00:00",
            "ApprovedDate": "0000-00-00 00:00:00",
            "LabOutsrcID": 0,
            "Printwithhead": 0,
            "IsHelpMenu": 0,
            "MacReading": null,
            "Reading1": null,
            "Reading2": null,
            "machinename": null,
            "ColorStatus": "#FFFFFF",
            "IsVip": 0,
            "IsMask": 0,
            "isOmit": 0,
            "IsCriticalCheck": 0,
            "isChecked": true,
            "RerunIscheck": false,
            "SaveRangeStatus": 0,
            "currentIndex": 0,
            "Mobile": "9599534346",
            "PEmail": "",
            "MachineId": 62
        }
    ])
    setResultTestData([
        {
            "PatientCode": "PAT/5167/001615",
            "datatype": "Test",
            "ApprovedBy": "0",
            "TestIDHash": "747ed034-ff99-4c47-8dbd-d40cea4461cc",
            "SINNO": "BARS/5167/002552",
            "InvestigationID": 124,
            "PackageName": "Alkaline phosphatase (ALP)",
            "Status": 3,
            "TestID": 52039,
            "LedgerTransactionID": 7676,
            "LedgerTransactionNo": "LAB/5167/003553",
            "Centre": "HARISHs",
            "RateType": "Itodse1",
            "ReferDoctor": "Dr. Self",
            "PatientName": "Mr. VISHNU",
            "DATE": "14-May-24 06:56PM",
            "HLMOPDIPDNo": "",
            "COMMENT": null,
            "IsDLCCheck": 0,
            "Printwithhead": 0,
            "Remarks": "",
            "SampleRemarks": "Serum",
            "IsChecked": 1,
            "OldValueDate": null,
            "isChecked": true,
            "outSource": 1,
            "isDocumentUpload": 0,
            "TestCenterId": 5167,
            "Mobile": "9599534346",
            "PEmail": "",
            "MachineId": 62,
            "labObservationID": 124
        },
        {
            "PatientCode": "PAT/5167/001615",
            "datatype": "Test",
            "ApprovedBy": "0",
            "TestIDHash": "52e24404-e64d-4279-b86a-881641abcdbd",
            "SINNO": "BARS/5167/002552",
            "InvestigationID": 1316,
            "PackageName": "LUTEINIZING HORMONE, LH",
            "Status": 3,
            "TestID": 52040,
            "LedgerTransactionID": 7676,
            "LedgerTransactionNo": "LAB/5167/003553",
            "Centre": "HARISHs",
            "RateType": "Itodse1",
            "ReferDoctor": "Dr. Self",
            "PatientName": "Mr. VISHNU",
            "DATE": "14-May-24 06:56PM",
            "HLMOPDIPDNo": "",
            "COMMENT": null,
            "IsDLCCheck": 0,
            "Printwithhead": 0,
            "Remarks": "",
            "SampleRemarks": "Serum",
            "IsChecked": 1,
            "OldValueDate": "14-May-24 11:58 AM",
            "isChecked": true,
            "outSource": 1,
            "isDocumentUpload": 0,
            "TestCenterId": 5167,
            "Mobile": "9599534346",
            "PEmail": "",
            "MachineId": 62,
            "labObservationID": 1316
        },
        {
            "PatientCode": "PAT/5167/001615",
            "datatype": "Test",
            "ApprovedBy": "0",
            "TestIDHash": "6a04e55f-3b0b-46b5-a0ec-9125522bff6a",
            "SINNO": "BARS/5167/002552",
            "InvestigationID": 1979,
            "PackageName": "Prolactin",
            "Status": 3,
            "TestID": 52042,
            "LedgerTransactionID": 7676,
            "LedgerTransactionNo": "LAB/5167/003553",
            "Centre": "HARISHs",
            "RateType": "Itodse1",
            "ReferDoctor": "Dr. Self",
            "PatientName": "Mr. VISHNU",
            "DATE": "14-May-24 06:56PM",
            "HLMOPDIPDNo": "",
            "COMMENT": null,
            "IsDLCCheck": 0,
            "Printwithhead": 0,
            "Remarks": "",
            "SampleRemarks": "Overnight fasting preferred.",
            "IsChecked": 1,
            "OldValueDate": "14-May-24 11:58 AM",
            "isChecked": true,
            "outSource": 1,
            "isDocumentUpload": 0,
            "TestCenterId": 5167,
            "Mobile": "9599534346",
            "PEmail": "",
            "MachineId": 62,
            "labObservationID": 1979
        },
        {
            "PatientCode": "PAT/5167/001615",
            "datatype": "Profile",
            "ApprovedBy": "0",
            "TestIDHash": "b399e75b-51b6-4b0f-9aca-6ed7dad2cf4a",
            "SINNO": "BARS/5167/002552",
            "InvestigationID": 1285,
            "PackageName": "KIDNEY FUNCTION TEST (KFT / RFT)",
            "Status": 3,
            "TestID": 52043,
            "LedgerTransactionID": 7676,
            "LedgerTransactionNo": "LAB/5167/003553",
            "Centre": "HARISHs",
            "RateType": "Itodse1",
            "ReferDoctor": "Dr. Self",
            "PatientName": "Mr. VISHNU",
            "DATE": "14-May-24 06:56PM",
            "HLMOPDIPDNo": "",
            "COMMENT": null,
            "IsDLCCheck": 0,
            "Printwithhead": 0,
            "Remarks": "",
            "SampleRemarks": "Serum",
            "IsChecked": 1,
            "OldValueDate": "14-May-24 11:58 AM",
            "isChecked": true,
            "outSource": 1,
            "isDocumentUpload": 0,
            "TestCenterId": 5167,
            "Mobile": "9599534346",
            "PEmail": "",
            "MachineId": 62,
            "labObservationID": 1285
        }
    ])

   setScreenshow({search:false,tests:false,entry:true})

  }
  const handleBackToSearch=()=>{
    setScreenshow({search:true,tests:false,entry:false})
  }

  return (
    <>
    {ResultData.length === 0 ? (
        <div className="box">
         {screenshow.tests && (
        // <ViewTestsModal
        //   show={modal}
        //   visitID={'5'}
        //   onHandleShow={() => setModal(false)}
        //   ResultData={ResultData}
        //   setResultData={setResultData}
        //   setResultTestData={setResultTestData}
        // />
        <div className="box mb-4">
           
           <div className="button-container">
        <Link onClick={handleBackToSearch}>Back to Search</Link>
      </div>
      <div className="box-body divResult custom-table-responsive" id="no-more-tables">
    <table className="custom-modern-table">
      <thead>
        <tr>
          <th>Barcode No.</th>
          <th>Visit No</th>
          <th>Patient Name</th>
          <th>Age/Sex</th>
          <th>Test Name</th>
        </tr>
      </thead>
      <tbody>
        {tableData?.map((data, index) => (
          <tr key={index}>
            <td data-title="Barcode No.">
              <div style={{ cursor: 'pointer' }} onClick={handleResultData}>
                <FontAwesomeIcon icon={faFileAlt} className="custom-result-entry-icon" title="Show Result Entry" />
                {data?.VialID}
              </div>
            </td>
            <td data-title="Visit No">{data?.VisitNo}</td>
            <td data-title="Patient Name">{data?.PatientName}</td>
            <td data-title="Age/Sex">{data?.AgeSex}</td>
            <td data-title="Test Name">{data?.TestName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
          </div>
      )}
         {screenshow.search && ( <>
         <div>
           <SearchComponent t={t} formData= {formData}errors={errors} handleTime={handleTime} handleSelectChange={handleSelectChange} TableData={TableData} Departments={Departments} dateSelect={dateSelect} setTableData={SetReData}/>
          </div>
          {loading ? (
  <Loading />
) : (
  redata.length > 0 ? (
    <div className="box-body divResult boottable table-responsive" id="no-more-tables">
        <ModernTable t={t} redata={redata} setScreenshow={setScreenshow} />
      </div>
   
  ) : (
    <div className="no-data-message">
     
    </div>
  )
)}
</> )}
        </div>
      ) : (
        //  result
        <div className="container-fluid" style={{ padding: "10px" }}>
          <div className={`info-container ${getGradientClass()}`}>
    <div className="info-row">
      <div className="info-item">
        <span className="info-label">BarCode No:</span>
        <span className="info-value">HQ048976</span>
      </div>
      <div className="info-item">
        <span className="info-label">OPD/IPD No:</span>
        <span className="info-value">HQ048976</span>
      </div>
      <div className="info-item">
        <span className="info-label">Patient Name:</span>
        <span className="info-value">Ms Antara Srivastava</span>
      </div>
      <div className="info-item">
        <span className="info-label">Age/Sex:</span>
        <span className="info-value">32 Y 0 M 0 D /Female</span>
      </div>
    </div>
  </div>

          {/* {showdetails && (
            <div className={`custom-box-body ${getGradientClass()}`}>
              <div className="custom-row">
                <div className="custom-col custom-col-visit">
                  <span className="fa fa-folder custom-text">
                    &nbsp; {ResultData[0]?.LedgerTransactionNo}
                  </span>
                </div>
                <div className="custom-col custom-col-visit">
                  <span className="fa fa-user-md custom-text">
                    &nbsp; {ResultData[0]?.PName}
                  </span>
                </div>
                <div className="custom-col custom-col-visit">
                  <span className="fa fa-book custom-text">
                    &nbsp; {ResultData[0]?.PatientCode}
                  </span>
                </div>
                <div className="custom-col custom-col-visit">
                  <span className="fa fa-calendar-check-o custom-text">
                    &nbsp; {ResultData[0]?.Age}
                  </span>
                </div>
                <div className="custom-col custom-col-visit">
                  <span className="fa fa-book custom-text">
                    &nbsp; {ResultData[0]?.Gender}
                  </span>
                </div>
                <div className="custom-col custom-col-visit">
                  <span className="fa fa-h-square custom-text">
                    &nbsp; {ResultData[0]?.Centre}
                  </span>
                </div>
                <div className="custom-col custom-col-visit">
                  <span className="fa fa-user-md custom-text">
                    &nbsp; {ResultData[0]?.ReferDoctor}
                  </span>
                </div>
                <div
                  className="custom-col custom-col-visit"
                  style={{ width: "300px" }}
                >
                  <span
                    className="fa fa-calendar-check-o"
                    style={{ width: "150px" }}
                  >
                    &nbsp; {dateConfig(ResultData[0]?.RegDate)}
                  </span>
                </div>
                <div className="custom-col custom-col-visit">
                  <span className="fa fa-plus-square">
                    &nbsp; {ResultData[0]?.RateType}
                  </span>
                </div>

                <div className="custom-col custom-end">
                  <span
                    className="fa fa-comment custom-icon-large"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Remarks"
                    onClick={() => setShowRemark(true)}
                    style={{ marginRight: "10px" }}
                  ></span>
                  <span
                    className="fa fa-comments custom-icon-large"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Prickremarks"
                    onClick={() => setShowPrickRemark(true)}
                  ></span>
                </div>
              </div>
              <div className="row" style={{ margin: 0, padding: 0 }}>
                <div className="d-flex my" style={{ margin: 0, padding: 0 }}>
                  {ResultTestData?.map((data, index) => (
                    <div
                      key={index}
                      className={`round font-weight-bold mx-2 my-2 px-3 py-2 Status-${data.Status}`}
                    >
                      {data?.PackageName}
                    </div>
                  ))}
                  <div className="custom-col custom-end">
                    <span
                      className="fa fa-angle-double-up"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Hide Details"
                      onClick={() => {
                        setshowDetails(false);
                      }}
                      style={{
                        color: "red",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!showdetails && (
            <div className="custom-row">
              <div className="custom-col custom-end">
                <span
                  className="fa fa-angle-double-up"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Show Details"
                  onClick={() => {
                    setshowDetails(true);
                  }}
                  style={{
                    color: "red",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                ></span>
              </div>
            </div>
          )} */}
          
            <div
              className=" box-body divResult boottable table-responsive"
              id="no-more-tables"
            >
              <table
                className="custom-modern-table"
                cellPadding="{0}"
                cellSpacing="{0}"
              >
                <thead class="cf">
                  <tr>
                    <th>{t("#")}</th>
                    <th>{t("TestName")}</th>
                    
                    <th style={{width:"150px"}}>{t("Value")}</th>
                    
                    <th>{t("Flag")}</th>
                    <th>{t("Mac Reading")}</th>
                    <th>{t("MachineName")}</th>
                    <th>{t("Min Value")}</th>
                    <th>{t("Max Value")}</th>
                    <th>{t("Display Reading")}</th>
                  </tr>
                </thead>
                <tbody>
                {Departments?.map((department, deptIndex) => (
  <React.Fragment key={deptIndex}>
    <tr>
      <td colSpan="10" style={{ backgroundColor: "lightblue", fontWeight: "bold" }}>
        {department.label}
      </td>
    </tr>
    {ResultTestData?.map((Hdata, Hindex) => (
      <React.Fragment key={Hindex}>
        <tr key={Hindex} style={{ backgroundColor: "lightgrey" }}>
          <td data-title={t("#")}>
            <Input
              type="checkbox"
              onChange={(e) =>
                handleCheckbox(e, -1, Hdata.TestID)
              }
              checked={
                ResultData?.length > 0
                  ? isChecked(
                      "isChecked",
                      ResultData,
                      true,
                      Hdata.TestID
                    ).includes(false)
                    ? false
                    : true
                  : false
              }
              disabled={Hdata?.Status === 5 ? true : false}
              name="isChecked"
            />
          </td>
          <td data-title={t("TestName")}>
            <span className="invName">{Hdata?.PackageName}&nbsp;</span>
          </td>
        </tr>
        {ResultData?.map((datanew, index) => (
          <React.Fragment key={index}>
            {Hdata.TestID === datanew.TestID && (
              <tr key={index}>
                <td data-title={t("#")}>
                  <Input
                    type="checkbox"
                    checked={datanew?.isChecked}
                    onChange={(e) => handleCheckbox(e, index)}
                    name="isChecked"
                    disabled={true}
                  />
                </td>
                <td data-title={t("TestName")}>
                  <span
                    style={{ cursor: "pointer" }}
                    data-toggle="tooltip"
                    data-placement="top"
                    title={
                      datanew?.isMandatory === 1
                        ? "Required Field"
                        : datanew?.dlcCheck === 1
                        ? "DLC Parameter"
                        : datanew?.Formula != ""
                        ? "Calculated Field"
                        : ""
                    }
                    className={`${
                      datanew?.isMandatory === 1 && "required "
                    } ${
                      datanew?.dlcCheck === 1 && "bg-yellow-new "
                    }`}
                  >
                    <span
                      className={`${
                        datanew?.Formula != "" && "Formula"
                      } `}
                    >
                      {datanew?.TestName}
                    </span>
                  </span>
                </td>
                {datanew?.Header === 0 ? (
                  <>
                    {["2", "3"].includes(datanew?.ReportType) ? (
                      <td
                        style={{
                          fontSize: "15px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setShow3({
                            modal: true,
                            data: datanew,
                          })
                        }
                        data-title={t("Action")}
                      >
                        +
                      </td>
                    ) : datanew?.dlcCheck === 1 ? (
                      datanew?.IsHelpMenu === 0 ? (
                        <td data-title={t("Value")}>
                          <input
                            type="text"
                            className={`form-control input-sm ${
                              (datanew?.MaxValue != "0" ||
                                datanew?.MinValue != "0") &&
                              parseFloat(datanew?.Value) >
                                parseFloat(datanew?.MaxValue)
                                ? "high"
                                : parseFloat(datanew?.Value) <
                                  parseFloat(datanew?.MinValue)
                                ? "low"
                                : ""
                            } `}
                            name="Value"
                            autoComplete="off"
                            disabled={
                              datanew?.CanSaveAmendment
                                ? false
                                : datanew?.MacReading
                                ? true
                                : false
                            }
                            value={datanew?.Value}
                            onChange={(e) =>
                              handleCheckbox(
                                e,
                                index,
                                datanew?.TestID,
                                datanew?.MinValue,
                                datanew?.MaxValue
                              )
                            }
                            onKeyUp={(e) =>
                              handleKeyUp(
                                e,

                                myRefs.current[
                                  index === ResultData.length - 1
                                    ? 0
                                    : index + 1
                                ],
                                index
                              )
                            }
                            ref={(el) =>
                              (myRefs.current[index] = el)
                            }
                          />
                        </td>
                      ) : (
                        <td data-title={t("Value")}>
                          <input
                            type="text"
                            className={`form-control input-sm ${
                              (datanew?.MaxValue != "0" ||
                                datanew?.MinValue != "0") &&
                              parseFloat(datanew?.Value) >
                                parseFloat(datanew?.MaxValue)
                                ? "high"
                                : parseFloat(datanew?.Value) <
                                  parseFloat(datanew?.MinValue)
                                ? "low"
                                : ""
                            }`}
                            name="Value"
                            value={datanew?.Value}
                            disabled={
                              datanew?.CanSaveAmendment
                                ? false
                                : datanew?.MacReading
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              handleCheckbox(
                                e,
                                index,
                                datanew?.TestID,
                                datanew?.MinValue,
                                datanew?.MaxValue
                              )
                            }
                            onKeyUp={(e) =>
                              handleKeyUp(
                                e,
                                myRefs.current[
                                  index === ResultData.length - 1
                                    ? 0
                                    : index + 1
                                ],
                                index
                              )
                            }
                            autoComplete="off"
                            ref={(el) =>
                              (myRefs.current[index] = el)
                            }
                          />
                        </td>
                      )
                    ) : datanew?.IsHelpMenu === 0 ? (
                      <td data-title={t("Value")}>
                        <input
                          type="text"
                          className={`form-control input-sm ${
                            (datanew?.MaxValue != "0" ||
                              datanew?.MinValue != "0") &&
                            parseFloat(datanew?.Value) >
                              parseFloat(datanew?.MaxValue)
                              ? "high"
                              : parseFloat(datanew?.Value) <
                                parseFloat(datanew?.MinValue)
                              ? "low"
                              : ""
                          }`}
                          name="Value"
                          disabled={
                            datanew?.CanSaveAmendment
                              ? false
                              : datanew?.MacReading
                              ? true
                              : false
                          }
                          value={datanew?.Value}
                          onChange={(e) =>
                            handleCheckbox(
                              e,
                              index,
                              datanew?.TestID,
                              datanew?.MinValue,
                              datanew?.MaxValue
                            )
                          }
                          onKeyUp={(e) =>
                            handleKeyUp(
                              e,
                              myRefs.current[
                                index === ResultData.length - 1
                                  ? 0
                                  : index + 1
                              ],
                              index
                            )
                          }
                          autoComplete="off"
                          ref={(el) =>
                            (myRefs.current[index] = el)
                          }
                        />
                      </td>
                    ) : (
                      <td data-title={t("Value")}>
                        <div style={{ position: "relative" }}>
                          <input
                            type="text"
                            className={`form-control input-sm ${
                              (datanew?.MaxValue != "0" ||
                                datanew?.MinValue != "0") &&
                              parseFloat(datanew?.Value) >
                                parseFloat(datanew?.MaxValue)
                                ? "high"
                                : parseFloat(datanew?.Value) <
                                  parseFloat(datanew?.MinValue)
                                ? "low"
                                : ""
                            }`}
                            name="Value"
                            autoComplete="off"
                            disabled={
                              datanew?.CanSaveAmendment
                                ? false
                                : datanew?.MacReading
                                ? true
                                : false
                            }
                            value={datanew?.Value}
                            onChange={(e) =>
                              handleCheckbox(
                                e,
                                index,
                                datanew?.TestID,
                                datanew?.MinValue,
                                datanew?.MaxValue
                              )
                            }
                            onKeyDown={(e) => {
                              getHelpMenuData(
                                e,
                                datanew?.labObservationID
                              );
                              handleIndex(e, index);
                            }}
                            onKeyUp={(e) =>
                              handleKeyUp(
                                e,
                                myRefs.current[
                                  index === ResultData.length - 1
                                    ? 0
                                    : index + 1
                                ],
                                index
                              )
                            }
                            ref={(el) =>
                              (myRefs.current[index] = el)
                            }
                            onBlur={() =>
                              setTimeout(() => {
                                setHiddenDropDownHelpMenu(false);
                              }, [1000])
                            }
                          />
                          {helpmenu.length > 0 &&
                            helpmenu[0]?.Value ==
                              datanew?.labObservationID &&
                            HiddenDropDownHelpMenu && (
                              <ul
                                className="suggestion-data"
                                style={{
                                  width: "100%",
                                  right: "0px",
                                  border: "1px solid #dddfeb",
                                }}
                              >
                                {helpmenu.map(
                                  (data, helpmenuindex) => (
                                    <li
                                      onClick={() =>
                                        handleListSearch(
                                          data,
                                          "Value",
                                          index
                                        )
                                      }
                                      key={helpmenuindex}
                                      className={`${
                                        helpmenuindex ===
                                          indexMatch &&
                                        "matchIndex"
                                      }`}
                                    >
                                      {data?.label}
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                        </div>
                      </td>
                    )}
                    <td className="w-50p" data-title={t("Flag")}>
                      <select value={datanew?.Flag} disabled>
                        <option hidden></option>
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                        <option value="Low">Low</option>
                      </select>
                    </td>
                    <td data-title={t("Mac Reading")} className={`Status-${datanew?.Status}`}>
                      {datanew?.MacReading}&nbsp;
                    </td>
                    <td data-title={t("MachineName")}>
                      {datanew?.machinename}&nbsp;
                    </td>
                    <td data-title={t("MinValue")}>
                      {datanew?.Reading1}&nbsp;
                    </td>
                    <td data-title={t("MaxValue")}>
                      {datanew?.Reading2}&nbsp;
                    </td>
                    <td data-title="DisplayReading">
                      {datanew?.DisplayReading}&nbsp;
                    </td>
                  </>
                ) : (
                  <td colSpan="10" data-title="">
                    &nbsp;
                  </td>
                )}
              </tr>
            )}
          </React.Fragment>
        ))}
      </React.Fragment>
    ))}
  </React.Fragment>
))}

                  
                </tbody>
              </table>

              <div className="row mt-3" style={{ textWrap: "avoid" }}>
                {loading ? (
                  <div className="mx-3">
                    <Loading />
                  </div>
                ) : (
                  <div className="col-sm-12 col-xs-12">
                    
                    <button
                        className="btn btn-primary mx-2 my-1 my btn-sm"
                        onClick={() => handleResultSubmit("Save")}
                      >
                        {/* {t("Save")} */}
                        save
                      </button>
                   <select
                      className="my-1 mx-2 p-1 my input-sm"
                      id="ApprovedBy"
                      name="ApprovedBy"
                      onChange={handleDoctorName}
                    >
                      <option hidden>--{t("Select")}--</option>
                      {doctorAdmin.map((ele, index) => (
                        <option key={index} value={ele?.value}>
                          {ele?.label}
                        </option>
                      ))}
                    </select>
                    <button
                        className="btn btn-success mx-2 my-1 my btn-sm"
                        onClick={() => handleResultSubmit("Save")}
                      >
                        {/* {t("Save")} */}
                        Approve
                      </button>
                    <button
                      className="btn btn-primary mx-2 my-1 my btn-sm"
                      type="button"
                      id="btnMainList"
                      onClick={() => {
                        setResultData([]);
                        setResultTestData([]);
                        setScreenshow({search:false,tests:true,entry:false})
                      }}
                    >
                      {t("Main List")}
                    </button>
                    {/* 
                    <button
                      className="btn btn-success mx-2 my-1"
                      type="button"
                      id="btnMainList"
                      onClick={() => handleResultSubmit("Approved")}
                    >
                      Approved
                    </button>

                    <button
                      className="btn btn-success mx-2 my-1"
                      type="button"
                      id="btnMainList"
                      onClick={() => handleResultSubmit("Hold")}
                    >
                      Hold
                    </button>

                    <button
                      className="btn btn-success mx-2 my-1 "
                      type="button"
                      id="btnMainList"
                      onClick={() => handleResultSubmit("UnHold")}
                    >
                      Unhold
                    </button> */}

                    {/* <button
                      className="btn btn-success mx-2 my-1"
                      type="button"
                      id="btnMainList"
                      onClick={() => handleResultSubmit("Forward")}
                    >
                      Forward
                    </button>

                    <button
                      className="btn btn-success mx-2 my-1"
                      type="button"
                      id="btnMainList"
                    >
                      Preview
                    </button>
                    <button
                      className="btn btn-success mx-2 my-1"
                      type="button"
                      id="btnMainList"
                    >
                      Deltacheck
                    </button> */}
                    {/* <a className="btn btn-sm w-100 btn-outline-info" id="btnInnerUpload">
                  <span
                    title="Click Here To Upload the Document."
                    className="fas fa-paperclip"
                  >
                    (0)
                  </span>
                </a>
                <a
                  className="btn btn-sm w-100 btn-outline-info"
                  id="btnInnerHistory"
                />
                <a href="javacsript:void">See Medical History</a>
                (0)
                <a
                  className="btn btn-sm w-100 btn-outline-info btnControl"
                  id="btnRerun"
                  href="javascript:void(0)(0);"
                  style={{ display: "none" }}
                >
                  Rerun Test
                </a> */}
                  </div>
                )}
              </div>
            </div>
          
          {/* </div> */}
        </div>
      )}
    </>
  );
};

export default SearchList;
