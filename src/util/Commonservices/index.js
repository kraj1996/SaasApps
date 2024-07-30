import axios from "axios";
import { toast } from "react-toastify";
import { StatusCheck } from "../../ChildComponents/Constants";


export const GetRateTypeByGlobalCentre = (state) => {
  axios
    .get("/api/v1/Accounts/GetRateTypeByGlobalCentre")
    .then((res) => {
      let data = res.data.message;
      let responce = data.map((ele) => {
        return {
          value: ele.RateTypeID,
          label: ele.RateTypeName,
        };
      });
      state(responce);
    })
    .catch((err) => console.log(err));
};
export const bindDepartment = (state) => {
  axios
    .get("/api/v1/ModalityMaster/BindDepartment")
    .then((res) => {
      let data = res.data.message;
      let responce = data.map((ele) => {
        return {
          value: ele.DepartmentId,
          label: ele.Department,
        };
      });
      state(responce);
    })
    .catch((err) =>
      toast.error(err?.res?.data ? err?.res?.data : "Something Went Wrong")
    );
};
export const bindFloor = (state) => {
  axios
    .get("/api/v1/ModalityMaster/BindFloor")
    .then((res) => {
      let data = res.data.message;
      let responce = data.map((ele) => {
        return {
          value: ele.NAME,
          label: ele.NAME,
        };
      });
      state(responce);
    })
    .catch((err) =>
      toast.error(err?.res?.data ? err?.res?.data : "Something Went Wrong")
    );
};
export const BindRoomList = (state) => {
  axios
    .get("/api/v1/ModalityMaster/BindRoomList")
    .then((res) => {
      let data = res.data.message;
      let responce = data.map((ele) => {
        return {
          value: ele.Id,
          label: ele.RoomName,
        };
      });
      state(responce);
    })
    .catch((err) =>
      toast.error(err?.res?.data ? err?.res?.data : "Something Went Wrong")
    );
};
export const BindGroupToken = (state) => {
  axios
    .get("/api/v1/ModalityMaster/BindGroupToken")
    .then((res) => {
      let data = res.data.message;
      let responce = data.map((ele) => {
        return {
          value: ele.GroupID,
          label: ele.GroupName,
        };
      });
      state(responce);
    })
    .catch((err) =>
      console.log(err?.res?.data ? err?.res?.data : "Something Went Wrong")
    );
};
export const getDepartment = (state, api) => {
  axios
    .get(`/api/v1/Department/${api ? api : "getDepartmentData"}`)
    .then((res) => {
      let data = res.data.message;
      let Department = data.map((ele) => {
        return {
          value: ele.DepartmentID,
          label: ele.Department,
        };
      });
      state(Department);
    })
    .catch((err) => console.log(err));
};

export const getAccessCentres = (state) => {
  axios
    .get("/api/v1/Centre/getAccessCentres")
    .then((res) => {
      let data = res.data.message;
      console.log(data);
      let CentreDataValue = data.map((ele) => {
        return {
          value: ele.CentreID,
          label: ele.Centre,
        };
      });
      state(CentreDataValue);
    })
    .catch((err) => {
      if (err.response.status === 401) {
        // window.localStorage.clear();
        // window.location.href = "/login";
      }
    });
};

export const getAccessRateType = (state) => {
  axios
    .get("/api/v1/RateType/getAccessRateType")
    .then((res) => {
      let data = res.data.message;
      let CentreDataValue = data.map((ele) => {
        return {
          value: ele.RateTypeID,
          label: ele.Rate,
        };
      });
      state(CentreDataValue);
    })
    .catch((err) => console.log(err));
};

export const getDoctorSuggestion = (formData, state, setFormData) => {
  if (formData.DoctorName.length >= 1) {
    axios
      .post("/api/v1/DoctorReferal/getDoctorData", {
        DoctorName: formData.DoctorName,
      })
      .then((res) => {
        if (res?.data?.message?.length > 0) {
          state(res?.data?.message);
        } else {
          setTimeout(() => {
            setFormData({ ...formData, DoctorName: "" });
          }, 100);
        }
      })
      .catch((err) => console.log(err));
  } else {
    state([]);
    setFormData({ ...formData, DoctorReferal: "" });
  }
};

export const getBase64 = (file) => {
  return new Promise((resolve) => {
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

export const getCollectionBoy = (state) => {
  axios
    .get("/api/v1/FieldBoyMaster/BindFieldBoy")
    .then((res) => {
      let data = res.data.message;
      let collection = data.map((ele) => {
        return {
          value: ele.FieldBoyID,
          label: ele.Name,
        };
      });
      state(collection);
    })
    .catch((err) => console.log(err));
};

export const isChecked = (name, state, value, id) => {
  if (id) {
    const data = state?.map((ele) => {
      if (ele?.TestID === id) {
        return ele[name] === value ? true : false;
      } else {
        return ele;
      }
    });
    return data;
  } else {
    const data = state?.map((ele) => {
      return ele[name] === value ? true : false;
    });
    return data;
  }
};

export const selectedValueCheck = (selectedState, state) => {
  const data = selectedState.find((ele) => ele.value == state);
  return data === undefined ? { label: "", value: "" } : data;
};

export const getVisitType = (state) => {
  axios
    .get("/api/v1/Centre/visitTypeList")
    .then((res) => {
      let data = res.data.message;
      let Visit = data.map((ele) => {
        return {
          value: ele.FieldID,
          label: ele.FieldDisplay,
        };
      });
      state(Visit);
    })
    .catch((err) => console.log(err));
};

export const getDesignationData = (state, all) => {
  axios
    .get("/api/v1/Designation/getDesignation")
    .then((res) => {
      let data = res.data.message;
      let Visit = data.map((ele) => {
        return {
          value: ele.DesignationID,
          label: ele.DesignationName,
        };
      });
      !all && Visit.unshift({ label: "All", value: "" });
      state(Visit);
    })
    .catch((err) => console.log(err));
};

export const getTrimmedData = (obj) => {
  if (obj && typeof obj === "object") {
    Object.keys(obj).map((key) => {
      if (typeof obj[key] === "object") {
        getTrimmedData(obj[key]);
      } else if (typeof obj[key] === "string") {
        obj[key] = obj[key].trim();
      }
    });
  }
  return obj;
};

export const GetAccessRightMaster = (state) => {
  axios
    .get("/api/v1/Employee/GetAccessRightMaster")
    .then((res) => {
      let data = res.data.message;
      let CentreDataValue = data.map((ele) => {
        return {
          value: ele.AccessbyId,
          label: ele.accessby,
        };
      });
      state(CentreDataValue);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GetAccessRightApproval = (state) => {
  axios
    .post("/api/v1/Employee/getApprovalRightMaster")
    .then((res) => {
      let data = res.data.message;

      let CentreDataValue = data.map((ele) => {
        return {
          value: ele.EmployeeID,
          label: ele.NAME,
        };
      });
      state(CentreDataValue);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getBillingCategory = (state) => {
  axios
    .get("/api/v1/RateList/getBillingCategory")
    .then((res) => {
      let data = res.data.message;
      let val = data.map((ele) => {
        return {
          value: ele?.BillingCategoryID,
          label: ele?.BillingCategory,
        };
      });
      state(val);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getRateCenters = (state) => {
  axios
    .get("/api/v1/centre/getRateList")
    .then((res) => {
      let data = res.data.message;

      let CentreDataValue = data.map((ele) => {
        return {
          value: ele.CentreID,
          label: ele.Centre,
        };
      });
      state(CentreDataValue);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getRateItemList = (state, payload) => {
  axios
    .post("/api/v1/RateList/getItemList", {
      DepartmentID: payload?.DepartmentID,
      BillingCategory: payload?.BillingCategory,
    })
    .then((res) => {
      let data = res.data.message;
      let val = data.map((ele) => {
        return {
          value: ele?.InvestigationID,
          label: ele?.TestName,
        };
      });
      state(val);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const BindFieldType = (state) => {
  axios
    .get("/api/v1/Global/BindFieldType")
    .then((res) => {
      const data = res.data?.message;
      const val = data.map((ele) => {
        return {
          label: ele?.FieldType,
          value: ele?.FieldType,
        };
      });
      state(val);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getBindDiscApproval = (state) => {
  axios
    .get("/api/v1/DiscApproval/BindDiscApproval")
    .then((res) => {
      const data = res.data?.message;
      let val = data.map((ele) => {
        return {
          label: ele?.Name,
          value: ele?.EmployeeID,
        };
      });
      val.unshift({ label: "", value: "" });
      state(val);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getBindDiscReason = (state) => {
  axios
    .get("/api/v1/DiscountReason/BindDiscReason")
    .then((res) => {
      const data = res.data?.message;
      let val = data.map((ele) => {
        return {
          label: ele?.FieldDisplay,
          value: ele?.FieldDisplay,
        };
      });
      val.unshift({ label: "", value: "" });
      state(val);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getBindReportDeliveryMethod = (state) => {
  axios
    .post("/api/v1/Global/getGlobalData", {
      type: "ReportDeliveryMethod",
    })
    .then((res) => {
      const data = res.data?.message;
      const val = data.map((ele) => {
        return {
          label: ele?.FieldDisplay,
          value: ele?.FieldDisplay,
        };
      });
      state(val);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSampleType = (state, id) => {
  axios
    .post("/api/v1/SampleType/getSampleTypeInVestigationWise", {
      InvestigationID: id,
    })
    .then((res) => {
      const data = res.data.message;
      console.log(data);
      let maindata = data.map((ele) => {
        return {
          value: ele?.id,
          label: ele?.SampleName,
        };
      });
      state(maindata);
    })
    .catch((err) => {
      toast.error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : "Error Occured"
      );
    });
};

var th = ["", "Thousand", "Million", "Billion", "Trillion"];
var dg = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];
var tn = [
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
var tw = [
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

export const toWords = (s) => {
  s = s.toString();
  s = s.replace(/[\, ]/g, "");
  if (s != parseFloat(s)) return "not a number";
  var x = s.indexOf(".");
  if (x == -1) x = s.length;
  if (x > 15) return "too big";
  var n = s.split("");
  var str = "";
  var sk = 0;
  for (var i = 0; i < x; i++) {
    if ((x - i) % 3 == 2) {
      if (n[i] == "1") {
        str += tn[Number(n[i + 1])] + " ";
        i++;
        sk = 1;
      } else if (n[i] != 0) {
        str += tw[n[i] - 2] + " ";
        sk = 1;
      }
    } else if (n[i] != 0) {
      // 0235
      str += dg[n[i]] + " ";
      if ((x - i) % 3 == 0) str += "Hundred ";
      sk = 1;
    }
    if ((x - i) % 3 == 1) {
      if (sk) str += th[(x - i - 1) / 3] + " ";
      sk = 0;
    }
  }

  if (x != s.length) {
    var y = s.length;
    str += "point ";
    for (var i = x + 1; i < y; i++) str += dg[n[i]] + " ";
  }
  return str.replace(/\s+/g, " ") + "Only";
};

export const GetMedicalHistoryData = (
  MedicalId,
  setState,
  state,
  ID,
  handleUploadCount
) => {
  axios
    .post("api/v1/patientRegistration/GetMedicalHistoryData", {
      PatientGuid: MedicalId,
      LedgerTransactionID: ID ? ID : 1,
    })
    .then((res) => {
      const data = res?.data?.message;
      if (data.length > 0) {
        const val = data.map((ele) => {
          return {
            MedicalHistory: ele?.MedicalHistory,
            LedgerTransactionID: ele?.LedgerTransactionID,
            PatientMedicalHistoryIDs: ele?.PatientMedicalHistoryID,
            date: ele?.dtEntry,
          };
        });
        handleUploadCount(
          "MedicalHistoryCount",
          data.length,
          "IsMedicalHistory"
        );

        setState({
          ...state,
          PatientGuid: MedicalId,
          patientmedicalhistoryiesVM: val,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getEmployeeCenter = (state) => {
  axios
    .get("/api/v1/Employee/GetAllCentres")
    .then((res) => {
      const data = res?.data?.message;
      const val = data.map((ele) => {
        return {
          value: ele?.CentreID,
          label: ele?.Centre,
        };
      });
      state(val);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAccessDataRate = (state, centerID) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/v1/Centre/getRateTypeWithCentre", {
        CentreID: centerID,
      })
      .then((res) => {
        const data = res?.data?.message;
        const val = data.map((ele) => {
          return {
            value: ele?.RateTypeID,
            label: ele?.RateTypeName,
            BarcodeLogic: ele?.BarcodeLogic,
          };
        });
        centerID === "" && val.unshift({ label: "All", value: "" });
        state(val);
        resolve(val);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const PreventNumber = (value) => {
  const reg = /^([^0-9$%]*)$/;
  if (reg.test(value)) {
    return PreventSpecialCharacter(value);
    // return true;
  } else {
    return false;
  }
};

export const PreventSpecialCharacter = (value) => {
  const reg = /[^a-zA-Z ]/g;
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const DepartmentWiseItemList = (id, name, state, autocomplete) => {
  axios
    .post("/api/v1/CommonController/DepartmentWiseItemList", {
      DepartmentID: id,
      TestName: name,
    })
    .then((res) => {
      const data = res?.data?.message;
      const val = data.map((ele) => {
        return {
          label: ele?.TestName,
          value: ele?.TestName,
        };
      });
      state(autocomplete ? val : data);
    })
    .catch((err) => {
      toast.error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : "Error Occured"
      );
    });
};

export const isCheckedNew = (name, state, value, id, secondName) => {
  const data = state?.map((ele) => {
    if (ele[secondName] === id) {
      return ele[name] === value ? true : false;
    } else {
      return ele;
    }
  });
  return data;
};

export const getPaymentModes = (name, state) => {
  axios
    .post("/api/v1/Global/getGlobalData", { Type: name })
    .then((res) => {
      let data = res.data.message;
      let value = data.map((ele) => {
        return {
          value: [
            "specialization",
            "PatientType",
            "Source",
            "BankName",
          ].includes(name)
            ? ele.FieldDisplay
            : ele.FieldID,
          label: ele.FieldDisplay,
        };
      });
      state(value);
    })
    .catch((err) => {
      toast.error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : "Something Went Wrong"
      );
    });
};

const S4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

export const guidNumber = () => {
  const guidNumber =
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4();

  return guidNumber;
};

export const autocompleteOnBlur = (state) => {
  setTimeout(() => {
    state([]);
  }, 500);
};

export const checkDuplicateBarcode = (barcodeNumber, LedgerTransactionID) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/v1/PatientRegistration/checkBarcodeNo", {
        BarcodeNo: barcodeNumber,
        LedgerTransactionID: LedgerTransactionID,
      })
      .then((res) => {
        resolve(res?.data?.message);
      })
      .catch((err) => {
        resolve(err?.response?.data?.message);
      });
  });
};

export const DyanmicStatusResponse = (state) => {
  let status = -1;
  for (let i = 0; i < state?.length; i++) {
    if (state[i].isChecked === true) {
      status = state[i].Status;
      break;
    }
  }

  return StatusCheck[status];
};

export const UploadJSON = async (name, data, ID) => {
  const response = await axios.post("/api/v1/CommonController/UploadJson", {
    Page: name,
    jsonData: data,
    Id: ID,
  });
  return response.data;
};

export const IsMaskingCheck = (IsMasking) => {
  if (IsMasking === 1 && window.localStorage.getItem("UnMasking") == 0 ) {
    return true;
  } else return false;
};
export const customStyles = {
  control: (base, state) => ({
    ...base,
    height: 15,
    minHeight: 26,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    borderColor: state.isFocused ? "#ced4da" : "#ced4da",
    boxShadow: "none",
    whiteSpace: "normal",
    borderRadius: 0,
    // fontWeight: " normal"
  }),
  placeholder: (defaultStyles, state) => {
    return {
      ...defaultStyles,
      color: "none",
      position: "absolute",
      top: state.hasValue || state.selectProps.inputValue ? -8 : "",
      backgroundColor:
        state.hasValue || state.selectProps.inputValue
          ? "white"
          : "transparent",
      transition: "top 0.1s, font-size 0.1s",
      fontSize:
        state.hasValue || state.selectProps.inputValue ? "13px" : "12px",
      lineHeight: "18px",
      width: "80%",
      fontWeight:
        state.hasValue || state.selectProps.isFocused ? " 600" : "500",
    };
  },
  menu: (styles) => ({
    ...styles,
    width: "100%",
    fontSize: 11,
    padding: 0,
  }),
  menuList: (styles) => ({
    ...styles,
    width: "100%",
    fontSize: 11,
    padding: 0,
  }),
  option: (styles, { _, isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? "#2175c1" : "transparent",
    color: isFocused ? "white" : "black",
    "&:hover": {
      backgroundColor: isFocused ? "#2175c1" : "transparent",
      color: isFocused ? "white" : "black",
      fontWeight: "600",
    },
    singleValue: (provided, state) => ({
      ...provided,
      fontSize: "11px",
      fontWeight: "600",
    }),
  }),

  container: (provided, _) => ({
    ...provided,
    // marginTop: 50
  }),
  valueContainer: (provided, _) => ({
    ...provided,
    overflow: "visible",
    fontSize: "11px",
    fontWeight: "600",
  }),
};


export const switchOffAlert=()=>{
  axios.get("/api/v1/CompanyMaster/switchOffAlert").then((res)=>{
    document.getElementById("switchoffalert").textContent = res?.data.message;

  })
}


export const getQuickLinks = (setState) => {
  axios
    .get("/api/v1/Menu/getQuickLinks")
    .then((res) => {
      const datas = res?.data?.message?.map((ele)=>ele?.Url?.toLowerCase())
      setState(datas)
    })
    .catch((err) => {
      toast.error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : "Something Went Wrong"
      );
    });
};
