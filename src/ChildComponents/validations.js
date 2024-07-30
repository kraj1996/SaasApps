import { connect } from "formik";
import moment from "moment";


export const ModalityMasterValidations = (formData)=>{
  let err=""
  if (formData?.DepartmentId == "") {
    err = { ...err, DepartmentId: "This Field is Required" };
  }
  if (formData?.ModalityName == "") {
    err = { ...err, ModalityName: "This Field is Required" };
  }

  return err
}
export const RoomTypeValidation = (payloadRoom)=>{
  let err=""
  if (payloadRoom?.RoomName == "") {
    err = { ...err, RoomName: "This Field is Required" };
  }
  if (payloadRoom?.RoomType == "") {
    err = { ...err, RoomType: "This Field is Required" };
  }

  return err
}
export const RoomMapValidation = (payloadMap)=>{
  let err=""
  if (payloadMap?.RoomId == "") {
    err = { ...err, RoomId: "This Field is Required" };
  }
  if (payloadMap?.GroupId == "") {
    err = { ...err, GroupId: "This Field is Required" };
  }

  return err
}
export const TimeSlotValidation = (payload)=>{
  let err=""
  if (payload?.ModalityId == "") {
    err = { ...err, ModalityId: "This Field is Required" };
  }
  if (payload?.ShiftId == "") {
    err = { ...err, ShiftId: "This Field is Required" };
  }
  if (payload?.CentreId == "") {
    err = { ...err, CentreId: "This Field is Required" };
  }
  if (payload?.DurationforPatient == "") {
    err = { ...err, DurationforPatient: "This Field is Required" };
  }

  return err
}
export const TokenGenerationMasterValidations = (formData)=>{
  let err=""
  if (formData?.DepartmentId == "") {
    err = { ...err, DepartmentId: "This Field is Required" };
  }
  if (formData?.ModalityId == "") {
    err = { ...err, ModalityId: "This Field is Required" };
  } if (formData?.GroupName == "") {
    err = { ...err, GroupName: "This Field is Required" };
  }
  if (formData?.Sequence == "") {
    err = { ...err, Sequence: "This Field is Required" };
  }

  return err
}
export const fieldValidations = (text, type) => {
  switch (type) {
    case "email":
      let regEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (text.value === "") {
        return "Email is required";
      } else if (!regEmail.test(text)) {
        return "invalid Email";
      }
  }
};
export const ReportEmailValidation = (formData) => {
  let err = "";
 
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmails = (emails) => {
    const emailArray = emails.split(',').map(email => email.trim());
    for (const email of emailArray) {
      if (!emailRegex.test(email)) {
        return false;
      }
    }
    return true;
  };

  if (!validateEmails(formData?.To)) {
    err = { ...err, To: "Please enter valid email addresses separated by commas" };
  }

  if (
    formData?.CC.trim().length > 0 &&
    !validateEmails(formData?.CC)
  ) {
    err = { ...err, CC: "Please enter valid email addresses separated by commas" };
  }

  if (
    formData?.BCC.trim().length > 0 &&
    !validateEmails(formData?.BCC)
  ) {
    err = { ...err, BCC: "Please enter valid email addresses separated by commas" };
  }
  return err;
};
export const CouponValidateSchema = (state, formData,LTData) => {

  let err = "";
  if (state?.Mobile == "" && LTData?.BTB!=1) {
    err = { ...err, Mobile: "This Field is Required" };
  }
  if (state?.Mobile != "" && state?.Mobile.length < 10) {
    err = { ...err, Mobiles: "Mobile must be at least 10 characters" };
  }

  if (state?.FirstName == "") {
    err = { ...err, FirstName: "This Field is Required" };
  }
  if (state?.FirstName != "" && state?.FirstName.trim().length < 3) {
    err = { ...err, FirstNames: "FirstName must be at least 3 characters" };
  }
  if (state?.DOB == "") {
    err = { ...err, DOB: "This Field is Required" };
  }
  if (formData?.DoctorName == "") {
    err = { ...err, DoctorName: "This Field is Required" };
  }
  if (formData?.DoctorName != "" && formData?.DoctorID == "") {
    err = { ...err, DoctorID: "This Field is Required" };
  }
  return err;
};
export const LocationUpdateSchema = (obj) => {
  let err = "";
  if (obj?.BusinessZoneID.trim() === "") {
    err = { ...err, BusinessZoneID: "This Field is Required" };
  }
  if (obj?.StateID.trim() === "") {
    err = { ...err, StateID: "This Field is Required" };
  }
  if (obj?.CityID.trim() === "") {
    err = { ...err, CityID: "This Field is Required" };
  }
  if (obj?.Locality.trim() === "") {
    err = { ...err, Locality: "This Field is Required" };
  }
  if (obj?.Locality.trim().length > 0) {
    if (obj?.Locality.trim().length < 3) {
      err = { ...err, Localitys: "Must Have 3 character" };
    }
  }
  if (obj?.Pincode == "") {
    err = { ...err, Pincode: "This Field is Required" };
  }
  if (obj?.Pincode != "") {
    if (obj?.Pincode.trim().length != 6) {
      err = { ...err, PincodeLength: "Invalid Pincode" };
    }
  }
  return err;
};
export const DirectIssueValidationScheme = (payload) => {
  let err = "";
  if (payload?.CurrentLocationID == "") {
    err = { ...err, CurrentLocationID: "This Field is Required" };
  }
  if (payload?.ZoneID == "" || payload?.ZoneID?.length == 0) {
    err = { ...err, ZoneID: "This Field is Required" };
  }

  if (payload?.StateID == "" || payload?.StateID?.length == 0) {
    err = { ...err, StateID: "This Field is Required" };
  }

  if (payload?.CentreID == "") {
    err = { ...err, CentreID: "This Field is Required" };
  }
  if (payload?.IssueToLocationID == "") {
    err = { ...err, IssueToLocationID: "This Field is Required" };
  }
  if (payload?.CategoryID == "") {
    err = { ...err, CategoryID: "This Field is Required" };
  }
  if (payload?.Item == "") {
    err = { ...err, Item: "This Field is Required" };
  }

  // if(payload?.CurrentLocationID==""){
  //   err = { ...err, CurrentLocationID: "This Field is Required" };

  // }
  // if(payload?.CurrentLocationID==""){
  //   err = { ...err, CurrentLocationID: "This Field is Required" };

  // }
  // if(payload?.CurrentLocationID==""){
  //   err = { ...err, CurrentLocationID: "This Field is Required" };

  // }
  // if(payload?.CurrentLocationID==""){
  //   err = { ...err, CurrentLocationID: "This Field is Required" };

  // }
  return err;
};
export const PhelbotomistValidationSchema = (formData) => {
  let err = "";
  if (formData?.Name.trim() === "") {
    err = { ...err, Name: "This Field is Required" };
  }

  if (formData?.Name.trim().length < 3) {
    err = { ...err, NameLength: "Name Must contain atleast 3 characters" };
  }
  if (moment(formData?.Age).format("DD-MMM-YYYY") === "") {
    err = { ...err, Age: "This Field is Required" };
  }
  if (formData?.Mobile === "") {
    err = { ...err, Mobileempty: "This Field is Required" };
  }
  if (formData?.Mobile.length !== 10) {
    err = { ...err, Mobileinvalid: "Please enter valid number" };
  }
  if (
    formData?.Qualification?.trim().length > 0 &&
    formData?.Qualification?.trim().length < 2
  ) {
    err = {
      ...err,
      QualificationLength: "Qualification Must contain atleast 2 characters",
    };
  }

  // if (formData?.DeviceID.trim() === "") {
  //   err = { ...err, DeviceID: "This Field is Required" };
  // }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (formData?.Email.trim() !== "" && !emailRegex.test(formData?.Email)) {
    err = { ...err, Emailvalid: "Enter a valid email address" };
  }

  if (formData?.Gender === "") {
    err = { ...err, Gender: "Select Gender" };
  }

  if (formData?.DocumentType === "") {
    err = { ...err, DocumentType: "Select Document Type" };
  }
  if (formData?.DocumentNo.trim() == "") {
    err = { ...err, DocumentNo: "This Field is Required" };
  }
  if (formData?.DocumentNo.trim().length <= 6) {
    err = {
      ...err,
      DocumentNolength: "Document Length Must be Greator than 6 length",
    };
  }
  if (formData?.DocumentType == "90") {
    if (formData?.DocumentNo.trim().length != 12) {
      err = { ...err, Aadharlength: "Aadhar Number Must Be of 12 length" };
    }
  }
  if (formData?.DocumentType == "56") {
    if (formData?.DocumentNo.trim().length != 10) {
      err = { ...err, PanLength: "Pan Number Must Be of 10 length" };
    }
  }

  if (formData?.UserName.trim() === "") {
    err = { ...err, UserName: "This Field is Required" };
  }
  if (formData?.Password.trim() === "") {
    err = { ...err, Password: "This Field is Required" };
  }

  const PassCheck =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  if (
    formData?.Password.trim().length > 0 &&
    !PassCheck.test(formData?.Password)
  ) {
    err = {
      ...err,
      Passwordl:
        "Password Must of 8 Character including One UpperCase, One Lowercase, One Number and One Special Character",
    };
  }

  if (formData?.UserName.trim().length <= 3) {
    err = { ...err, UserNameL: "Username Must be of 4 Character" };
  }
  if (formData?.PhelboSource.trim() === "") {
    err = { ...err, PhelboSource: "This Field is Required" };
  }

  if (formData?.StateId.length == 0) {
    err = { ...err, State: "Select atleast one State" };
  }
  if (formData?.CityId.length == 0) {
    err = { ...err, City: "Select atleast one City" };
  }
  if (formData?.LoginTime == "") {
    err = { ...err, LoginTime: "This Field is Required" };
  }
  if (formData?.LogoutTime == "") {
    err = { ...err, LogoutTime: "This Field is Required" };
  }
  if (formData?.P_Pincode.trim().length > 0) {
    if (formData?.P_Pincode?.trim().length != 6) {
      err = { ...err, PincodeLength: "Pincode Must be of 6 length" };
    }
  }
  if (formData?.PanNo.trim().length > 0) {
    if (formData?.PanNo?.trim().length != 10) {
      err = { ...err, PanLength: "Pan Number Must Be of 10 length" };
    }
  }
  if (formData?.P_Address.trim().length > 0) {
    if (formData?.P_Address?.trim().length < 3) {
      err = {
        ...err,
        P_Addresslength: "Address Must contain atleast 3 characters",
      };
    }
  }
  if (formData?.P_City.trim().length > 0) {
    if (formData?.P_City?.trim().length < 3) {
      err = {
        ...err,
        P_Citylength: "City Must contain atleast 3 characters",
      };
    }
  }
  if (formData?.Other_Contact.length > 0) {
    if (formData?.Other_Contact?.length != 10) {
      err = { ...err, OtherContact: "Phone Number Must Be of 10 length" };
    }
  }
  if (formData?.FatherName.trim().length > 0) {
    if (formData?.FatherName?.trim().length < 3) {
      err = {
        ...err,
        FatherNameLength: "Name Must contain atleast 3 characters",
      };
    }
  }
  if (formData?.MotherName.trim().length > 0) {
    if (formData?.MotherName?.trim().length < 3) {
      err = {
        ...err,
        MotherNameLength: "Name Must contain atleast 3 characters",
      };
    }
  }
  if (
    formData?.Vehicle_Num.trim().length > 0 &&
    formData?.Vehicle_Num.trim().length < 5
  ) {
    err = {
      ...err,
      Vehicle_NumLength: "Vehicle Number Must cantain atleast 5 characters",
    };
  }
  if (
    formData?.DrivingLicence.trim().length > 0 &&
    formData?.DrivingLicence.trim().length < 11
  ) {
    err = {
      ...err,
      DrivingLicence_NumLength:
        "Driving License Must contain atleast 10 characters",
    };
  }

  return err;
};

export const SmsEmail = (formData) => {
  let err = "";
  if (
    formData?.SmsToPatient.length > 0 &&
    formData?.SmsToPatient.length < 10
  ) {
    err = {
      ...err,
      SmsToPatient: "Must contain atleast 10 digits",
    };
  }

  if (
    formData?.SmsToDoctor.length > 0 &&
    formData?.SmsToDoctor.length < 10
  ) {
    err = {
      ...err,
      SmsToDoctor: "Must contain atleast 10 digits",
    };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (
    formData?.EmailToPatient.trim().length > 0 &&
    !emailRegex.test(formData?.EmailToPatient)
  ) {
    err = { ...err, EmailToPatient: "Please enter a valid email address" };
  }

  if (
    formData?.EmailToDoctor.trim().length > 0 &&
    !emailRegex.test(formData?.EmailToDoctor)
  ) {
    err = { ...err, EmailToDoctor: "Please enter a valid email address" };
  }
  if (formData?.SmsToClient.length > 0 && formData?.SmsToClient.length < 10) {
    err = {
      ...err,
      SmsToClient: "Must contain atleast 10 digits",
    };
  }

  if (
    formData?.EmailToClient.trim().length > 0 &&
    !emailRegex.test(formData?.EmailToClient)
  ) {
    err = { ...err, EmailToClient: "Please enter a valid email address" };
  }
  return err;
};
export const CouponMasterSchema = (formData) => {
  let err = "";
  if (formData?.FromDate == "") {
    err = { ...err, FromDate: "This Field is Required" };
  }
  if (formData?.ToDate == "") {
    err = { ...err, ToDate: "This Field is Required" };
  }
  if (formData?.centresId.length == 0) {
    err = { ...err, Centre: "Select atleast one centre" };
  }
  if (typeof formData?.CouponCode == "string") {
    if (formData?.CouponCode.trim() == "") {
      err = { ...err, CouponCode: "This Field is Required" };
    }
  }
  if (formData?.CoupanName.trim() == "") {
    err = { ...err, CouponName: "This Field is Required" };
  }
  if (
    formData?.CoupanName.trim().length > 0 &&
    formData?.CoupanName.trim().length < 3
  ) {
    err = {
      ...err,
      CouponNameLength: "Name should contain atleast 3 characters",
    };
  }
  if (formData?.CouponId == "") {
    err = { ...err, CouponId: "This Field is Required" };
  }
  if (formData?.multiple == "multiple") {
    if (formData?.CouponCount == "") {
      err = { ...err, CouponCount: "This Field is Required" };
    }
  }
  if (formData?.multiple == "multiple") {
    if (formData?.CouponCount == 0 || formData?.CouponCount == "0") {
      err = { ...err, CouponCountzer: "Coupon count must be greater than 0" };
    }
  }
  if (typeof formData?.DiscShareType == "number") {
    console.log(formData?.DiscShareType);
    if (
      formData?.DiscShareType != 0 &&
      formData?.DiscShareType != 1 &&
      formData?.DiscShareType != 2
    ) {
      err = { ...err, DiscShareType: "This Field is Required" };
    }
  }
  if (typeof formData?.DiscShareType == "string") {
    if (formData?.DiscShareType == "") {
      err = { ...err, DiscShareType: "This Field is Required" };
    }
  }
  return err;
};

export const Otpschema = (formData) => {
  let err = "";

  if (formData?.mobile === "") {
    err = { ...err, Mobileempty: "This Field is Required" };
  }
  if (formData?.mobile.length !== 10) {
    err = { ...err, Mobileinvalid: "Please enter valid number" };
  }
  return err;
};
export const EquipBreakdownSchema=(formData)=>{
  let err="";
  if(formData?.CentreName=="")
  {
    err={...err,CentreName:"This Field is Required"}
  }
  if(formData?.EquipName=="")
  {
    err={...err,EquipName:"This Field is Required"}
  }
  if(formData?.email.trim()=="")
  {
    err={...err,Emailempty:"This Field is Required"}
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (formData?.email.trim() !== "" && !emailRegex.test(formData?.email)) {
    err = { ...err, Emailvalid: "Enter a valid email address" };
  }
  return err;
}

export const PhelboAuthenticationSchema = (formData) => {
  let err = "";
  if (formData?.Name.trim() === "") {
    err = { ...err, Name: "This Field is Required" };
  }
  if (formData?.Name.trim() != "") {
    if (formData?.Name.trim().length < 3) {
      err = { ...err, NameLength: "Should contain atleast 3 characters" };
    }
  }
  if (formData?.Gender.trim() === "") {
    err = { ...err, Gender: "Select Gender" };
  }

  if (formData?.P_Address.trim() === "") {
    err = { ...err, P_Address: "This Field is Required" };
  }

  if (formData?.DocumentNo.trim() === "") {
    err = { ...err, DocumentNo: "This Field is Required" };
  }
  if (formData?.StateId?.length == 0) {
    err = { ...err, State: "Select atleast one State" };
  }
  if (formData?.CityId?.length == 0) {
    err = { ...err, City: "Select atleast one City" };
  }
  {
    if (formData?.otp.length == 0) {
      err = { ...err, otp: "Enter Otp" };
    }
  }
  if (formData?.mobile === "") {
    err = { ...err, Mobileempty: "This Field is Required" };
  }
  if (formData?.mobile?.length !== 10) {
    err = { ...err, Mobileinvalid: "Please enter valid number" };
  }
  if (formData?.P_Pincode == "") {
    err = { ...err, Pincode: "This FIeld is Required" };
  }
  if (formData?.P_Pincode?.length != 6) {
    err = { ...err, PincodeInvalid: "Please enter valid pincode" };
  }

  if (formData?.P_City.trim() != "") {
    if (formData?.P_City.length < 3) {
      err = { ...err, CityLength: "Should contain atleast 3 characters" };
    }
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData?.Email.length != 0) {
    if (!emailRegex.test(formData?.Email)) {
      err = { ...err, Emailvalid: "Enter a valid email address" };
    }
  }

  return err;
};

export const validation = (formData) => {
  let err = "";
  if (formData?.Department.trim() === "") {
    err = { ...err, Department: "This Field is Required" };
  } else if (formData?.Department.length < 2) {
    err = { ...err, Department: "Must be 2 Character long" };
  }

  if (formData?.DepartmentCode.trim() === "") {
    err = { ...err, DepartmentCode: "This Field is Required" };
  } else if (formData?.DepartmentCode.length < 2) {
    err = { ...err, DepartmentCode: "Must be 2 Character long" };
  }

  return err;
};
export const validationForAgeWise = (formData) => {
  let err = "";
  if (formData?.DiscountType.trim() === "") {
    err = { ...err, DiscountType: "This Field is Required" };
  }
  // if (formData?.FromAge > formData?.ToAge ) {
  //   err = { ...err,FromAgeCheck : "FromAge is greater" };
  // }
  // if (formData?.FromAge < formData?.ToAge) {
  //   err = { ...err, ToAgeCheck: "ToAge is greater" };
  // }
  if (["", "0"].includes(formData?.DiscountPer)) {
    err = { ...err, DiscountPer: "This Field is Required" };
  } else if (formData?.DiscountPer > 100) {
    err = { ...err, DiscountPer: "Enter Valid Discount" };
  }

  if (formData?.FromAge === "") {
    err = { ...err, FromAge: "This Field is Required" };
  } else if (formData?.FromAge > 110) {
    err = { ...err, FromAge: "Enter Valid Age" };
  }

  if (
    moment(formData?.FromDate).format("DD-MM-YYYY") >
    moment(formData?.ToDate).format("DD-MM-YYYY")
  ) {
    err = { ...err, ToDateCheck: "Invalid Date" };
  }

  if (formData?.ToAge === "") {
    err = { ...err, ToAge: "This Field is Required" };
  } else if (formData?.ToAge > 110) {
    err = { ...err, ToAge: "Enter Valid Age" };
  } else if (formData?.ToAge == 0) {
    err = { ...err, ToAge: " Should not be 0" };
  } else if (formData?.ToAge < formData?.FromAge) {
    err = { ...err, ToAge: " Must be equal or greater than FromAge" };
  }

  if (formData?.Gender === "") {
    err = { ...err, Gender: "Gender is Required" };
  }

  if (formData?.DiscountShareType === "") {
    err = { ...err, DiscountShareType: "DiscountShareType is Required" };
  }

  return err;
};

export const validationForIDMAster = (formData) => {
  let err = "";
  if (formData?.TypeName === "") {
    err = { ...err, TypeName: "This Field is Required" };
  }
  if (formData?.InitialChar?.trim() === "") {
    err = { ...err, InitialChar: "This Field is Required" };
  }
  if (formData?.FinancialYearStart?.trim() === "") {
    err = { ...err, FinancialYearStart: "This Field is Required" };
  }

  if (formData?.TypeLength === "") {
    err = { ...err, TypeLength: "This Field is Required" };
  }
  return err;
};

export const RouteMasterValidationSchema = (formData) => {
  let err = "";
  if (formData?.BusinessZoneId.trim() === "") {
    err = { ...err, BusinessZoneId: "This Field is Required" };
  }
  if (formData?.StateId.trim() === "") {
    err = { ...err, StateId: "This Field is Required" };
  }
  if (formData?.CityId.trim() === "") {
    err = { ...err, CityId: "This Field is Required" };
  }
  if (!formData?.Route || formData?.Route.trim() === "") {
    err = { ...err, Route: "This Field is Required" };
  }
  if (formData?.Route.trim().length < 2) {
    err = { ...err, Routes: "Must Have 2 length" };
  }
  return err;
};
export const CompanyKeyValidationSchema = (payload) => {
  let err = "";
  if (payload?.CompanyID === "") {
    err = { ...err, CompanyID: "This Field is Required" };
  }
  if (payload?.KeyID.trim() === "") {
    err = { ...err, KeyID: "This Field is Required" };
  }
  if (payload?.SecretKey.trim() === "") {
    err = { ...err, SecretKey: "This Field is Required" };
  }
 
  return err;
};
export const OnlinePaymentValidationSchema = (payload) => {
  let err = "";
  if (payload?.RateTypeId === "") {
    err = { ...err, RateTypeId: "This Field is Required" };
  }
  if (payload?.Amount === "") {
    err = { ...err, Amount: "This Field is Required" };
  }

 
  return err;
};
export const MicroBioMasterSchema = (formData) => {
  let err = "";

  if (formData?.Name.trim() === "") {
    err = { ...err, Name: "This Field is Required" };
  }
  if (formData?.Code.trim() === "") {
    err = { ...err, Code: "This Field is Required" };
  }
 
  return err;
};
export const CampRequestSchema = (formData) => {
  let err = "";
  if (formData?.CampName=== "") {
    err = { ...err, CampName: "This Field is Required" };
  }
  if (formData?.center=== "") {
    err = { ...err, Campcenter: "This Field is Required" };
  }
  if (formData?.campType === "") {
    err = { ...err, Camptype: "This Field is Required" };
  }
  
  return err;
};

export const LocationMasterValidationSchema = (formData) => {
  let err = "";
  if (formData?.BusinessZoneID.trim() === "") {
    err = { ...err, BusinessZoneID: "This Field is Required" };
  }
  if (formData?.StateID.trim() === "") {
    err = { ...err, StateID: "This Field is Required" };
  }
  if (formData?.CityID.trim() === "") {
    err = { ...err, CityID: "This Field is Required" };
  }

  return err;
};
export const PhelebotomistMappingValdationSchema = (formData) => {
  let err = "";
  if (formData?.BusinessZoneId.trim() === "") {
    err = { ...err, BusinessZoneId: "This Field is Required" };
  }
  if (formData?.StateId.trim() === "") {
    err = { ...err, StateId: "This Field is Required" };
  }
  if (formData?.CityId.trim() === "") {
    err = { ...err, CityId: "This Field is Required" };
  }
  return err;
};
export const PhlebotomistMappingValdationSchema = (formData) => {
  const errors = {};

  if (!formData.BusinessZoneId || formData.BusinessZoneId.trim() === "") {
    errors.BusinessZoneId = "This Field is Required";
  }
  if (!formData.StateId || formData.StateId.trim() === "") {
    errors.StateId = "This Field is Required";
  }
  if (!formData.CityId || formData.CityId.trim() === "") {
    errors.CityId = "This Field is Required";
  }

  return errors;
};

export const NewPatientModalValidationSchema = (formData) => {
  let err = "";

  if (!formData.PName || formData.PName.trim() === "") {
    err = { ...err, PName: "This Field is Required" };
  }
  if (formData?.PName.trim().length < 3) {
    err = { ...err, PNames: "Must Have 3 length" };
  }
  if (!formData.DOB || formData.DOB === "") {
    err = { ...err, DOB: "This Field is Required" };
  }

  if (!formData.StateID || formData.StateID.trim() === "") {
    err = { ...err, StateID: "This Field is Required" };
  }
  if (!formData.Pincode || formData.Pincode.trim() === "") {
    err = { ...err, Pincode: "This Field is Required" };
  }

  if (!formData.CityID || formData.CityID.trim() === "") {
    err = { ...err, CityID: "This Field is Required" };
  }
  if (!formData.CountryID || formData.CountryID.trim() === "") {
    err = { ...err, CountryID: "This Field is Required" };
  }
  if (!formData.Gender || formData.Gender.trim() === "") {
    err = { ...err, Gender: "This Field is Required" };
  }
  if (!formData.LocalityID || formData.LocalityID.trim() === "") {
    err = { ...err, LocalityID: "This Field is Required" };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (formData?.Email.trim().length > 0 && !emailRegex.test(formData?.Email)) {
    err = { ...err, Emailvalid: "Please enter a valid email address" };
  }
  if (
    formData?.HouseNo.trim().length > 0 &&
    formData?.HouseNo.trim().length < 2
  ) {
    err = { ...err, HouseNo: "Must Have 2 length" };
  }

  if (
    formData?.Landmark.trim().length > 0 &&
    formData?.Landmark.trim().length < 3
  ) {
    err = { ...err, Landmark: "Must Have 3 length" };
  }
  return err;
};
export const HandleHCBooking = (appointData, datas, discountamount, coupon) => {
  // console.log(datas);
  let err = "";
  if (!appointData.Alternatemobileno) {
    err = { ...err, Alternatemobilenos: "This Field is Required" };
  }

  if (!appointData.SourceofCollection) {
    err = { ...err, SourceofCollection: "This Field is Required" };
  }
  if (!appointData.Paymentmode) {
    err = { ...err, Paymentmode: "This Field is Required" };
  }
  if (appointData?.Alternatemobileno.length !== 10) {
    err = { ...err, Alternatemobilenum: "Please enter valid number" };
  }
  if (datas?.House_No.trim().length > 0 && datas?.House_No.trim().length < 2) {
    err = { ...err, House_No: "Must Have 2 length" };
  }
  if (!datas.House_No || datas.House_No.trim() === "") {
    err = { ...err, House_Nos: "This Field is Required" };
  }
  if (!datas.DoctorName || datas.DoctorName.trim() === "") {
    err = { ...err, DoctorName: "Please Pick Any Doctor" };
  }

  if (!coupon && (discountamount != "" || discountamount != 0)) {
    if (datas?.DisReason == "") {
      err = { ...err, DisReason: "Enter Discount Reason" };
    }
    if (datas?.DoctorID == "") {
      err = { ...err, DoctorID: "Select Discount Given By" };
    }
  }

  // if (datas?.RefDoctor.trim().length < 3) {
  //   err = { ...err, RefDoctors: "Must Have 3 length" };
  // }
  return err;
};
export const HandleHCEditBooking = (appointData, coupon) => {
  let err = "";
  if (!appointData.AlternateMobileNo) {
    err = { ...err, Alternatemobilenos: "This Field is Required" };
  }
  if (appointData?.AlternateMobileNo.length !== 10) {
    err = { ...err, Alternatemobilenum: "Please enter valid number" };
  }
  if (appointData?.PaymentMode == "") {
    err = { ...err, Paymentmode: "Select Payment Mode" };
  }
  if (appointData?.RefDoctor == "") {
    err = { ...err, RefDoc: "Select Refer Doctor" };
  }
  if (appointData?.SourceofCollection == "") {
    err = { ...err, Source: "Select Source of Collection" };
  }
  if (
    !coupon &&
    (appointData?.DisAmt != "" || appointData?.DiscountPercentage != "")
  ) {
    if (appointData?.DisReason == "") {
      err = { ...err, DisReason: "Enter Discount Reason" };
    }
    if (appointData?.DoctorId == "") {
      err = { ...err, DoctorId: "Select Discount Given By" };
    }
  }

  return err;
};
export const PreventSpecialCharacterandNumber = (value) => {
  const reg = /[^a-zA-Z ]/g;
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const AllowCharactersNumbersAndSpecialChars = (value) => {
  const reg = /[^a-zA-Z0-9\-\/ ]|(\s{2,})|(\/{2,})|(-{2,})/g;
  return !reg.test(value);
};
export const CouponCheck = (value) => {
  const reg = /^(?!.*,{2,}|^,)[a-zA-Z0-9\-\/, ]*$/;
  return reg.test(value);
};
export const AppointmentModalValidationSchema = (searchData) => {
  let err = "";
  if (!searchData.StateID) {
    err = { ...err, StateID: "This Field is Required" };
  }
  if (!searchData.CityID) {
    err = { ...err, CityID: "This Field is Required" };
  }

  if (!searchData.LocalityID) {
    err = { ...err, LocalityID: "This Field is Required" };
  }

  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // if (
  //   searchData?.Email.trim().length > 0 &&
  //   !emailRegex.test(searchData?.Email)
  // ) {
  //   err = { ...err, Emailvalid: "Please enter a valid email address" };
  // }

  // if (
  //   searchData?.Landmark.trim().length > 0 &&
  //   searchData?.Landmark.trim().length < 3
  // ) {
  //   err = { ...err, Landmark: "Must Have 3 length" };
  // }
  // if (
  //   searchData?.Address.trim().length > 0 &&
  //   searchData?.Address.trim().length < 3
  // ) {
  //   err = { ...err, Address: "Must Have 3 length" };
  // }
  return err;
  // if (!searchData.DropLocationId) {
  //   err = { ...err, DropLocationId: "Pick any DropLocation" };
  // }

  return err;
};
// export const PatientRegisterSchema = (formdata) => {
//   let err = {};
//   if (formdata?.Mobile === "") {
//     err = { ...err, Mobile: "This Field Required" };
//   }

//   return err;
// };
export const AppointmentModalValidationSchema2 = (searchData) => {
  let err = "";

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (
    searchData?.Email.trim().length > 0 &&
    !emailRegex.test(searchData?.Email)
  ) {
    err = { ...err, Emailvalid: "Please enter a valid email address" };
  }

  if (
    searchData?.Landmark.trim().length > 0 &&
    searchData?.Landmark.trim().length < 3
  ) {
    err = { ...err, Landmark: "Must Have 3 length" };
  }
  if (
    searchData?.Address.trim().length > 0 &&
    searchData?.Address.trim().length < 3
  ) {
    err = { ...err, Address: "Must Have 3 length" };
  }
  return err;
  // if (!searchData.DropLocationId) {
  //   err = { ...err, DropLocationId: "Pick any DropLocation" };
  // }

  return err;
};
export const validationForDesignations = (formData) => {
  let err = "";
  if (formData?.Name.trim() === "") {
    err = { ...err, Name: "This Field is Required" };
  }
  if (formData?.SequenceNo === "") {
    err = { ...err, SequenceNo: "This Field is Required" };
  }
  return err;
};

export const validationForSampleType = (formData) => {
  let err = "";
  if (formData?.SampleName.trim() === "") {
    err = { ...err, SampleName: "This Field is Required" };
  }
  if (formData?.Container === "") {
    err = { ...err, Container: "This Field is Required" };
  }
  return err;
};

export const validationForMachineMaster = (payload) => {
  let err = "";
  if (payload?.MachineID.trim() === "") {
    err = { ...err, MachineID: "This Field is Required" };
  }
  if (payload?.MachineName === "") {
    err = { ...err, MachineName: "This Field is Required" };
  } 
 
  if (payload?.CentreID === "") {
    err = { ...err, CentreID: "Centre ID is Required" };
  }

  if (payload?.GlobalMachineID === "") {
    err = { ...err, GlobalMachineID: "Global Machine ID is Required" };
}
  if (payload?.ITDKEY === "") {
    err = { ...err, ITDKEY: "This Field is Required" };
  }

  return err;
};

export const UpdatePatientValidation = (formData) => {
  let err = "";
  if (formData?.StateId === "") {
    err = { ...err, StateId: "This Field is Required" };
  }
  if (formData?.Gender === "") {
    err = { ...err, Gender: "This Field is Required" };
  }
  if (formData?.CityId === "") {
    err = { ...err, CityId: "This Field is Required" };
  }
  if (formData?.LocalityId === "") {
    err = { ...err, LocalityId: "This Field is Required" };
  }
  if (formData?.Pincode === "") {
    err = { ...err, Pincode: "This Field is Required" };
  }
  if (formData?.AgeYear === "") {
    err = { ...err, AgeYear: "This Field is Required" };
  }
  if (
    formData?.FirstName.trim() != "" &&
    formData?.FirstName.trim().length < 3
  ) {
    err = { ...err, FirstNameLength: "This Field is Required (min 3 letters)" };
  }
  if (formData?.FirstName.trim() === "") {
    err = { ...err, FirstNameNumber: "This Field is Required" };
  }
  if (
    formData?.LandMark.trim() !== "" &&
    formData?.LandMark.trim().length < 3
  ) {
    err = { ...err, LandMark: "Min 3 letter Required" };
  }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (formData?.Email.trim() != "") {
    if (!emailPattern.test(formData?.Email)) {
      err = { ...err, Email: "Should be a valid email" };
    }
  }
  return err;
};

export const fileUpload = (formData) => {
  let err = "";
  if (!formData) {
    err = { ...err, name: "This Field is Required" };
    console.log(err);
  }
  return err;
};

export const loginDetailSearchValidation = (formData) => {
  let err = "";
  if (formData?.StateId.trim() === "") {
    err = { ...err, StateId: "This Field is Required" };
  }
  if (formData?.CityId === "") {
    err = { ...err, CityId: "This Field is Required" };
  }
  return err;
};

export const PhelboSaveHolidayValidationSchema = (formData) => {
  let err = "";
  if (formData?.StateId === "") {
    err = { ...err, StateId: "This Field is Required" };
  }
  if (formData?.CityId === "") {
    err = { ...err, CityId: "This Field is Required" };
  }
  if (formData?.Phlebotomist.trim() === "") {
    err = { ...err, Phlebotomist: "This Field is Required" };
  }
  if (formData?.FromDate === "") {
    err = { ...err, FromDate: "This Field is Required" };
  }
  if (formData?.ToDate === "") {
    err = { ...err, ToDate: "This Field is Required" };
  }
  return err;
};

export const PhelboSearchHolidayValidationSchema = (formData) => {
  let err = "";

  if (formData?.fromDate === "") {
    err = { ...err, fromDate: "This Field is Required" };
  }
  if (formData?.toDate === "") {
    err = { ...err, toDate: "This Field is Required" };
  }
  return err;
};

export const searchTempPhelboValidationSchema = (formData) => {
  let err = "";
  // if (formData?.StateId === "") {
  //   err = { ...err, StateId: "This Field is Required" };
  // }
  // if (formData?.CityId === "") {
  //   err = { ...err, CityId: "This Field is Required" };
  // }
  return err;
};

export const SupplierValidation = (formData, secData) => {
  let err = "";
  const websiteRegex =
    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (formData?.SupplierName.trim() === "") {
    err = { ...err, SupplierName: "This Field is Required" };
  } else if (formData?.SupplierName.trim().length < 3) {
    err = { ...err, SupplierName: "Min 3 Characters Required" };
  } else if (!/^\D*$/.test(formData?.SupplierName)) {
    err = { ...err, SupplierName: "Should not contains number" };
  }
  if (formData?.SupplierType === "") {
    err = { ...err, SupplierType: "This Field is Required" };
  }
  if (formData?.SupplierCategory.trim() === "") {
    err = { ...err, SupplierCategory: "This Field is Required" };
  }
  if (formData?.OrganizationType.trim() === "") {
    err = { ...err, OrganizationType: "This Field is Required" };
  }
  if (formData?.PinCode) {
    if (formData?.PinCode.length != 6) {
      err = { ...err, PinCode: "This Field is Required (6 Digits)" };
    }
  }
  if (formData?.EmailId) {
    if (!emailPattern.test(formData?.EmailId)) {
      err = { ...err, EmailId: "Should be a valid email" };
    }
  }
  if (formData?.Website) {
    if (!websiteRegex.test(formData?.Website)) {
      err = { ...err, Website: "Should be a valid website" };
    }
  }
  if (formData?.PrimaryContactPerson === "") {
    err = { ...err, PrimaryContactPerson: "This feild is Required" };
  } else if (formData?.PrimaryContactPerson.trim().length <= 2) {
    err = { ...err, PrimaryContactPerson: "Min 3 Characters Required" };
  }
  if (formData?.PrimaryContactPersonMobileNo) {
    if (formData?.PrimaryContactPersonMobileNo.length != 10) {
      err = {
        ...err,
        PrimaryContactPersonMobileNo: "Should be a valid Number",
      };
    }
  }
  if (formData?.PrimaryContactPersonEmailId) {
    if (!emailPattern.test(formData?.PrimaryContactPersonEmailId)) {
      err = { ...err, PrimaryContactPersonEmailId: "Should be a valid email" };
    }
  }
  if (
    formData?.SecondaryContactPerson &&
    formData?.SecondaryContactPerson.trim().length <= 2
  ) {
    err = { ...err, SecondaryContactPerson: "Min 3 Characters Required" };
  } else if (!/^\D*$/.test(formData?.SecondaryContactPerson)) {
    err = { ...err, SecondaryContactPerson: "Should not contains number" };
  }
  if (formData?.SecondaryContactPersonMobileNo) {
    if (formData?.SecondaryContactPersonMobileNo.length != 10) {
      err = {
        ...err,
        SecondaryContactPersonMobileNo: "Should be a valid Number",
      };
    }
  }
  if (formData?.SecondaryContactPersonEmailId) {
    if (!emailPattern.test(formData?.SecondaryContactPersonEmailId)) {
      err = {
        ...err,
        SecondaryContactPersonEmailId: "Should be a valid email",
      };
    }
  }
  if (secData && secData.length <= 0) {
    err = {
      ...err,
      gstDetail: "Please Provide Gst Details",
    };
  }
  if (
    formData?.IsLoginRequired === 1 &&
    (!formData.LoginUserName ||
      !formData.LoginPassword ||
      !formData.CfLoginPassword)
  ) {
    err = { ...err, IsLoginRequired: "Login Crediential Required" };
  }
  if (formData?.LoginPassword && formData?.LoginPassword.trim().length < 3) {
    err = { ...err, LoginPassword: "Min 3 Characters Required" };
  }
  if (formData?.LoginUserName && formData?.LoginUserName.trim().length < 3) {
    err = { ...err, LoginUserName: "Min 3 Characters Required" };
  }
  if (
    formData?.LoginPassword &&
    formData?.CfLoginPassword &&
    formData?.CfLoginPassword != formData?.LoginPassword
  ) {
    err = { ...err, CfLoginPassword: "Does Not Match with Password" };
  }
  if (
    formData?.IsLoginRequired == 1 &&
    formData?.LoginPassword &&
    formData?.CfLoginPassword === ""
  ) {
    err = { ...err, CfLoginPasswordre: "Please retype the password" };
  }
  if (formData?.CINNo != "" && formData?.CINNo.trim().length < 10) {
    err = { ...err, CINNo: "Valid TAN Required" };
  }
  if (
    formData?.PFRegistartionNo != "" &&
    formData?.PFRegistartionNo.trim().length < 22
  ) {
    err = { ...err, PFRegistartionNo: "Valid PF No. Required" };
  }
  if (formData?.PANCardNo != "" && formData?.PANCardNo.trim().length < 10) {
    err = { ...err, PANCardNo: "Valid PAN Required" };
  }
  if (formData?.PANCardNo != "" && formData?.NameonPANCard.trim() == "") {
    err = { ...err, PANCardName: "This feild is Required" };
  }
  if (formData?.PANCardNo != "" && formData?.NameonPANCard.trim().length < 3) {
    err = { ...err, NameonPANCard: "Min 3 Characters Required" };
  }
  if (
    formData?.ESIRegistrationNo != "" &&
    formData?.ESIRegistrationNo.trim().length < 10
  ) {
    err = { ...err, ESIRegistrationNo: "Valid ESI no. Required" };
  }
  if (
    formData?.ISOCertificationNo != "" &&
    formData?.ISOCertificationNo.trim().length < 13
  ) {
    err = { ...err, ISOCertificationNo: "Valid ISO no. Required" };
  }
  if (
    formData?.MSMERegistrationNo != "" &&
    formData?.MSMERegistrationNo.trim().length < 12
  ) {
    err = { ...err, MSMERegistrationNo: "Valid MSME no. Required" };
  }
  if (formData?.ISOCertificationNo != "" && formData?.ISOValidUpto == "") {
    err = { ...err, ISOValidUpto: "This feild is Required" };
  }
  if (
    formData?.PollutioncontrolBoardCertificationNo != "" &&
    formData?.PollutionValidUpto == ""
  ) {
    err = { ...err, PollutionValidUpto: "This feild is Required" };
  }
  if (
    formData?.MSMERegistrationNo != "" &&
    formData?.MSMERegistrationValidDate == ""
  ) {
    err = { ...err, MSMERegistrationValidDate: "This feild is Required" };
  }
  if (
    formData?.IsMSMERegistration == 1 &&
    formData?.MSMERegistrationNo.trim() == ""
  ) {
    err = { ...err, IsMSMERegistration: "This feild is Required" };
  }
  return err;
};

export const StoreMasterValidationSchema = (payload) => {
  let err = "";
  if (payload?.CentreId === "") {
    err = { ...err, CentreId: "This Field is Required" };
  }
  if (payload?.Location === "") {
    err = { ...err, Location: "This Field is Required" };
  }
  if (payload?.ContactPerson === "") {
    err = { ...err, ContactPerson: "This Field is Required" };
  }
  if (payload?.ContactPerson != "" && payload?.ContactPerson.length <= 3) {
    err = { ...err, ContactPersons: "Name should be more then 3 Characters" };
  }
  if (payload?.ContactPersonNo === "") {
    err = { ...err, ContactPersonNo: "This Field is Required" };
  }

  if (payload?.ContactPersonNo != "" && payload?.ContactPersonNo.length < 10) {
    err = {
      ...err,
      ContactPersonNos: "Mobile No. Must be of 10 Digit",
    };
  }
  if (payload?.Address === "") {
    err = { ...err, Address: "This Field is Required" };
  }
  // if (payload?.AutoReceive === "") {
  //   err = { ...err, AutoReceive: "This Field is Required" };
  // }
  if (payload?.ContactPersonEmail.trim() === "") {
    err = { ...err, ContactPersonEmail: "This Field is Required" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(payload?.ContactPersonEmail)) {
    err = { ...err, Emailvalid: "Enter a valid email address" };
  }
  return err;
};

export const StoreMasterValidationUpdateSchema = (payload) => {
  let err = "";
  if (payload?.CentreId === "") {
    err = { ...err, CentreId: "This Field is Required" };
  }

  if (payload?.Location === "") {
    err = { ...err, Location: "This Field is Required" };
  }
  if (payload?.ContactPerson === "") {
    err = { ...err, ContactPerson: "This Field is Required" };
  }
  if (payload?.ContactPerson.length > 0 && payload?.ContactPerson.length < 3) {
    err = { ...err, ContactPersons: "Name Must be of 3 Characters" };
  }
  if (payload?.ContactPersonNo === "") {
    err = { ...err, ContactPersonNo: "This Field is Required" };
  }
  if (
    payload?.ContactPersonNo.length > 0 &&
    payload?.ContactPersonNo.length < 10
  ) {
    err = {
      ...err,
      ContactPersonNos: "Mobile No. Must be of 10 Digit",
    };
  }
  if (payload?.Address === "") {
    err = { ...err, Address: "This Field is Required" };
  }
  // if (payload?.AutoReceive === "") {
  //   err = { ...err, AutoReceive: "This Field is Required" };
  // }
  if (payload?.ContactPersonEmail.trim() === "") {
    err = { ...err, ContactPersonEmail: "This Field is Required" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(payload?.ContactPersonEmail)) {
    err = { ...err, Emailvalid: "Enter a valid email address" };
  }
  return err;
};

export const Map1ValidationSchema = (payload) => {
  let err = "";
  if (payload?.CategoryTypeId?.length === 0) {
    err = { ...err, CategoryTypeId: "This Field is Required" };
  }
  if (payload?.SubCategoryTypeId?.length === 0) {
    err = { ...err, SubCategoryTypeId: "This Field is Required" };
  }
  if (payload?.SubCategoryId?.length === 0) {
    err = { ...err, SubCategoryId: "This Field is Required" };
  }
  if (payload?.Machine?.length === 0) {
    err = { ...err, Machine: "This Field is Required" };
  }
  if (payload?.Items?.length === 0) {
    err = { ...err, Items: "This Field is Required" };
  }
  return err;
};

export const Map2ValidationSchema = (payload) => {
  let err = "";
  // if (payload?.RateID === "") {
  //   err = { ...err, RateID: "This Field is Required" };
  // }
  if (payload?.BusinessZoneID.length == 0) {
    err = { ...err, BusinessZoneID: "This Field is Required" };
  }
  if (payload?.StateID.length == 0) {
    err = { ...err, StateID: "This Field is Required" };
  }
  if (payload?.CityID.length == 0) {
    err = { ...err, CityID: "This Field is Required" };
  }
  if (payload?.CentreID?.length == 0) {
    err = { ...err, CentreID: "This Field is Required" };
  }
  if (payload?.ToLocationId.length == 0) {
    err = { ...err, ToLocationId: "This Field is Required" };
  }
  return err;
};

export const MapLocationWithItemValidation = (payload) => {
  let err = "";
  if (payload?.BusinessZoneID === "") {
    err = { ...err, BusinessZoneID: "This Field is Required" };
  }
  if (payload?.LocationId === "") {
    err = { ...err, LocationId: "This Field is Required" };
  }
  if (payload?.CategoryId === "") {
    err = { ...err, CategoryId: "This Field is Required" };
  }
  if (payload?.Items === "") {
    err = { ...err, Items: "This Field is Required" };
  }

  return err;
};

export const TransferQuotationRateValidation = (
  payload,
  updateAddressDisable
) => {
  console.log(payload, updateAddressDisable);
  let err = "";
  if (payload?.FromLocationId === "") {
    err = { ...err, FromLocationId: "This Field is Required" };
  }
  if (payload?.Machine === "") {
    err = { ...err, Machine: "This Field is Required" };
  }
  if (payload?.Supplier === "") {
    err = { ...err, Supplier: "This Field is Required" };
  }
  if (payload?.ToLocationId === "") {
    err = { ...err, ToLocationId: "This Field is Required" };
  }

  if (updateAddressDisable == true) {
    if (payload?.ChangeSupplier === "") {
      err = { ...err, ChangeSupplier: "This Field is Required" };
    }
    if (payload?.State === "") {
      err = { ...err, State: "This Field is Required" };
    }
    if (payload?.ToLocationId === "") {
      err = { ...err, ToLocationId: "This Field is Required" };
    }
    if (payload?.GSTNo === "") {
      err = { ...err, GSTNo: "This Field is Required" };
    }
    if (payload?.Address === "") {
      err = { ...err, Address: "This Field is Required" };
    }
  }
  return err;
};

export const DirectRecieveMappingValidation = (payload) => {
  let err = "";
  if (payload?.formData?.LocationID?.length == 0) {
    err = { ...err, LocationID: "This Field is Required" };
  }
  if (payload?.ToData?.LocationID?.length == 0) {
    err = { ...err, LocationID: "This Field is Required" };
  }
  return err;
};

export const DirectPurchaseOrderValidation = (payload) => {
  let err = "" ;
  if (payload?.SupplierName == 0) {
    err = { ...err, SupplierName: "This Field is Required" };
  }
  if (payload?.DCentre == 0) {
    err = { ...err, DCentre: "This Field is Required" };
  }
  if (payload?.DLocation == 0) {
    err = { ...err, DLocation: "This Field is Required" };
  }
  if (payload?.ItemName == "") {
    err = { ...err, ItemName: "This Field is Required" };
  }
  return err;
};

export const StoreItemMasterPageValidation = (payload, type, error) => {
  let err = error ?? "";

  if (payload?.TypeName === "") {
    err = { ...err, TypeName: "This Field is Required" };
  }
  if (payload?.TypeName != "" && payload?.TypeName.length < 3) {
    err = { ...err, TypeNamelength: "Min 3 letters required" };
  }

  if (type === "HsnCode" || type === "All") {
    if (payload?.HsnCode === "") {
      err = { ...err, HsnCode: "This Field is Required" };
    } else if (payload?.HsnCode != "" && payload?.HsnCode.length < 8) {
      err = { ...err, HsnCodelength: "Min 8 letters required" };
    }
  }

  if (
    payload?.CategoryTypeId === "" &&
    (type === "CategoryTypeId" || type === "All")
  ) {
    err = { ...err, CategoryTypeId: "This Field is Required" };
  }

  if (
    payload?.SubCategoryTypeId === "" &&
    (type === "SubCategoryTypeId" || type === "All")
  ) {
    err = { ...err, SubCategoryTypeId: "This Field is Required" };
  }
  if (
    payload?.SubCategoryId === "" &&
    (type === "SubCategoryId" || type === "All")
  ) {
    err = { ...err, SubCategoryId: "This Field is Required" };
  }

  if (payload?.GSTNTax === "" && (type === "GSTNTax" || type === "All")) {
    err = { ...err, GSTNTax: "This Field is Required" };
  }
  if (
    payload?.BarcodeGenrationOption === "" &&
    (type === "BarcodeGenrationOption" || type === "All")
  ) {
    err = { ...err, BarcodeGenrationOption: "This Field is Required" };
  }
  return err;
};
export const LedgerStatusAsOnDateValidation = (payload, type, error) => {
  let err = error ?? "";

  if (payload?.RateTypeId === "") {
    err = { ...err, RateTypeId: "This Field is Required" };
  }

  return err;
};
export const SupplierQuotationPageValidation = (payload, type, error) => {
  let err = error ?? "";

  if (payload?.ChangeSupplier === "") {
    err = { ...err, ChangeSupplier: "This Field is Required" };
  }

  return err;
};

export const ConsumeStoreItemValidation = (payload, type, error) => {
  let err = error ?? "";

  if (payload?.LocationId === "" && (type === "LocationId" || type === "All")) {
    err = { ...err, LocationId: "This Field is Required" };
  }

  return err;
};
export const StoreManufactureValidation = (ManufactureData, type, error) => {
  let err = error ?? "";

  if (
    ManufactureData?.ManufactureId === "" &&
    (type === "ManufactureId" || type === "All")
  ) {
    err = { ...err, ManufactureId: "This Field is Required" };
  }
  if (
    ManufactureData?.MachinId === "" &&
    (type === "MachinId" || type === "All")
  ) {
    err = { ...err, MachinId: "This Field is Required" };
  }
  if (
    ManufactureData?.MajorUnitId === "" &&
    (type === "MajorUnitId" || type === "All")
  ) {
    err = { ...err, MajorUnitId: "This Field is Required" };
  }
  if (
    ManufactureData?.MinorUnitId === "" &&
    (type === "MinorUnitId" || type === "All")
  ) {
    err = { ...err, MinorUnitId: "This Field is Required" };
  }

  return err;
};

export const MaterialDeliveryLocationUpdateValidation=(payload)=>{
  let err="";
  if (payload?.CurrentLocation == 0) {
    err = { ...err, CurrentLocation: "This Field is Required" }
  }
  return err;
};

export const SalesManagerMasterValidation = (payload, type, error) => {
  let err = error ?? "";

  if (payload?.ProName === "") {
    err = { ...err, ProName: "This Field is Required" };
  }
  if (payload?.ProName != "" && payload?.ProName.length <= 2) {
    err = { ...err, ProNamelength: "Min 3 letters required" };
  }
  if (payload?.DesignationName === "") {
    err = { ...err, DesignationName: "This Field is Required" };
  }

  return err;
};
export const AdvancePaymentValidationSchema = (formData) => {
  let err = "";
  if (formData?.Type == "") {
    err = { ...err, Type: "This Field is Required" };
  }
  if (formData?.RateTypeID == "") {
    err = { ...err, RateTypeID: "This Field is Required" };
  }

 
  return err;
};