import axios from "axios";
import * as Yup from "yup";

export const LoginSchema = Yup.object({
  username: Yup.string().min(3).max(25).required("Please Enter Your Username"),
  password: Yup.string().min(6).required("Please Enter Your Password"),
});
export const PortalLoginSchema = Yup.object({
  UserName: Yup.string().min(3).max(25).required("Please Enter Patient Name"),
  Password: Yup.string()
    .min(6)
    .max(10)
    .required("Please Enter  Your Mobile Number"),
});

export const DoctorSchema = Yup.object({
  Name: Yup.string().min(3).max(25).required("Please Enter Your Name"),
  Mobile: Yup.string()
    .typeError("That doesn't look like a phone number")
    .required("Phone number is required!")
    .min(10)
    .max(10),
  // DoctorCode: Yup.string().min(3).required("Please Enter Your DoctorCode"),
});

export const ChangePasswordSchema = Yup.object({
  OldPassword: Yup.string()
    .required("Please Enter your old Password")
    .min(6)
    .trim("The contact name cannot include leading and trailing spaces"),
  NewPassword: Yup.string()
    .trim("The contact name cannot include leading and trailing spaces")
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  ConfirmPassword: Yup.string()
    .trim("The contact name cannot include leading and trailing spaces")
    .required()
    .oneOf([Yup.ref("NewPassword"), null], "Passwords must match"),
});

export const DocotorReferal = Yup.object({
  // DoctorCode: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  // Phone: Yup.number(),
  // Title: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  Name: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  // Locality: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  // Zone: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  // Degree: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  // Specialization: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  //  ClinicName: Yup.string()
  //    .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  // Email: Yup.string()
  //   .email()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces")
  //   .matches(
  //     /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
  //     "Please Enter a Valid Email"
  //   ),
  Mobile: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .matches(/^[5-9]\d{9}$/, "Phone number is not valid")
    .required("This Field is Required"),
});

export const EmployeeMasterSchema = Yup.object({
  
  Name: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  Mobile: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
  Email: Yup.string()
    .email()
    .trim("The contact name cannot include leading and trailing spaces")
    .matches(
      /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Please Enter a Valid Email"
    ),
  Department: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  Centre: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  AccessRight: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  ApprovalRight: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  CentreID: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  DesignationID: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  Username: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  isPassword: Yup.boolean(),
  Password: Yup.string().when("isPassword", (isPassword, schema) => {
    if (isPassword[0]) {
      return schema
        .required("Please Enter your password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        );
    }
    return schema;
  }),
});

export const InvestigationsMasterSchema = Yup.object().shape({
  TestCode: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  TestName: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  // ShortName: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  // PrintName: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  SampleContainer: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  FromAge: Yup.number().required("This Field is Required"),
  // PrintSequence: Yup.number().required("This Field is Required"),
  ToAge: Yup.number()
    .required("This Field is Required")
    .test(
      "from-to-age",
      "To age must be greater than or equal to FromAge",
      function (value) {
        const { FromAge } = this.parent;
        return value >= FromAge;
      }
    )
    .test("not-zero", "Age must not be zero", function (value) {
      return value !== 0;
    }),

  ReportType: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  Gender: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),

  DepartmentID: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),

  // SampleQty: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  // SampleRemarks: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  SampleTypeId: Yup.string().test(
    "isRequired",
    "This Field is Required",
    function (value) {
      const sampleOption = this.parent.SampleOption;
      if (sampleOption === "Sample Required") {
        return !!value;
      }
      return true;
    }
  ),
  // SampleTypeId: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  BaseRate: Yup.number().required("This Field is Required"),
  MaxRate: Yup.number()
    .required("This Field is Required")
    .test(
      "MaxRate",
      "MaxRate must be greater than or equal to BaseRate",
      function (value) {
        const { BaseRate } = this.parent;
        return value >= BaseRate;
      }
    ),

  MethodName: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
});

export const ProfileInvestigationsMasterSchema = Yup.object().shape({
  TestCode: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  TestName: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  // ShortName: Yup.string()
  //   .required("This Field is Required")
    // .trim("The contact name cannot include leading and trailing spaces"),
  // PrintName: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  SampleContainer: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  FromAge: Yup.number().required("This Field is Required"),
  ToAge: Yup.number()
    .required("This Field is Required")
    .test(
      "from-to-age",
      "To age must be greater than or equal to FromAge",
      function (value) {
        const { FromAge } = this.parent;
        return value >= FromAge;
      }
    ),
  ReportType: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  Gender: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),

  DepartmentID: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),

  // SampleQty: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  // SampleRemarks: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  // SampleTypeId: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  SampleTypeId: Yup.string().test(
    "isRequired",
    "This Field is Required",
    function (value) {
      const sampleOption = this.parent.SampleOption;
      if (sampleOption === "Sample Required") {
        return !!value;
      }
      return true;
    }
  ),

  BaseRate: Yup.number().required("BaseRate is required"),
  MaxRate: Yup.number()
    .required("This Field is Required")
    .test(
      "MaxRate",
      "MaxRate must be greater than or equal to BaseRate",
      function (value) {
        const { BaseRate } = this.parent;
        return value >= BaseRate;
      }
    ),
});
export const PackageInvestigationsMasterSchema = Yup.object().shape({
  TestCode: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  TestName: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  // ShortName: Yup.string()
  //   .required("This Field is Required")
  //   .trim("The contact name cannot include leading and trailing spaces"),
  FromAge: Yup.number().required("This Field is Required"),
  // PrintSequence: Yup.number().required("This Field is Required"),
  ToAge: Yup.number()
    .required("This Field is Required")
    .test(
      "from-to-age",
      "To age must be greater than or equal to FromAge",
      function (value) {
        const { FromAge } = this.parent;
        return value >= FromAge;
      }
    )
    .test("not-zero", "Age must not be zero", function (value) {
      return value !== 0;
    }),

  Gender: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  DepartmentID: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  BaseRate: Yup.number().required("This Field is Required"),
  MaxRate: Yup.number()
    .required("This Field is Required")
    .test(
      "MaxRate",
      "MaxRate must be greater than or equal to BaseRate",
      function (value) {
        const { BaseRate } = this.parent;
        return value >= BaseRate;
      }
    ),
});
export const CenterMasterValidationSchema = Yup.object({
  CentreCode: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  Centre: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  PANNo: Yup.string().min(10),
  BankAccountNo: Yup.string().min(10),
  IFSCCode: Yup.string().min(11),
  DemandDraft: Yup.string().min(6),
  Email: Yup.string()
    .email()
    .trim("The contact name cannot include leading and trailing spaces")
    .matches(
      /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Please Enter a Valid Email"
    ),
  Type: Yup.string().required("This Field is Required"),
  Phone: Yup.string().min(10).max(12).trim(),
  Url: Yup.string()
    .trim("Url cannot include leading and trailing spaces")
    .matches(/^[A-Za-z0-9._%-]+\.[A-Za-z]{2,6}$/, "Please Enter a Valid Url"),
});

export const RateMasterValidationSchema = Yup.object({
  CentreCode: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),

  Centre: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  Type: Yup.string().required("This Field is Required"),
  AgainstInvoice: Yup.string().required("This Field is Required"),
  Email: Yup.string()
    .email()
    .trim("The contact name cannot include leading and trailing spaces")
    .matches(
      /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Please Enter a Valid Email"
    ),
  InvoiceEmail: Yup.string()
    .email()
    .trim("The contact name cannot include leading and trailing spaces")
    .matches(
      /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Please Enter a Valid Email"
    ),
  Phone: Yup.string().min(10).max(12).trim(),
  Url: Yup.string()
    .trim("Url cannot include leading and trailing spaces")
    .matches(/^[A-Za-z0-9._%-]+\.[A-Za-z]{2,6}$/, "Please Enter a Valid Url"),
  IntimationLimit: Yup.string()
    .test(
      'is-less-than-or-equal',
      'Intimation limit must be less than or equal to credit limit',
      function (intimationLimit) {
        const creditLimit = this.resolve(Yup.ref('CreditLimit'));
        return !creditLimit || !intimationLimit || parseFloat(intimationLimit) <= parseFloat(creditLimit);
      }
    ),

});

export const RateMasterValidationSchemacash= Yup.object({
  CentreCode: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),

  Centre: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  Type: Yup.string().required("This Field is Required"),
  
  Email: Yup.string()
    .email()
    .trim("The contact name cannot include leading and trailing spaces")
    .matches(
      /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Please Enter a Valid Email"
    ),
  InvoiceEmail: Yup.string()
    .email()
    .trim("The contact name cannot include leading and trailing spaces")
    .matches(
      /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Please Enter a Valid Email"
    ),
  Phone: Yup.string().min(10).max(12).trim(),
  Url: Yup.string()
    .trim("Url cannot include leading and trailing spaces")
    .matches(/^[A-Za-z0-9._%-]+\.[A-Za-z]{2,6}$/, "Please Enter a Valid Url"),

});

export const OutSourceLabMasterValidationSchema = Yup.object({
  LabName: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  ContactPersonName: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces"),
  MobileNo: Yup.string().min(10).required("This Field is Required"),
    EmailID: Yup.string().email(),
});

const conditionalRequired = (message) => Yup.string().test(
  "isRequired",
  message,
  function (value) {
    if (this.parent.PNDT) {
      return value;
    }
    return true;
  }
);
const conditionalRequiredMobile = (message) => Yup.string().test(
  "isRequired",
  message,
  function (value) {
    if (this.parent.BTB != 1) {
      return value; 
    }
    return true;
  }
);
export const PatientRegisterSchema = Yup.object({
  Mobile: conditionalRequiredMobile("This Field is Required").min(10, "Minimum 10 characters"),
  FirstName: Yup.string()
    .required("This Field is Required")
    .min(1)
    .max(25)
    .trim(),
  DOB: Yup.date()
    .required("This Field is Required")
    .max(new Date(), "inValid Date"),
  DoctorID: Yup.string().required("This Field is Required"),
  DoctorName: Yup.string().required("This Field is Required"),
  Email: Yup.string().email(),
  Husband: conditionalRequired("This Field is Required"),
  NoOfChildren: conditionalRequired("This Field is Required"),
  NoOfSon: conditionalRequired("This Field is Required"),
  NoOfDaughter: conditionalRequired("This Field is Required"),
  Pregnancy: conditionalRequired("This Field is Required"),
  AgeOfSon: conditionalRequired("This Field is Required"),
  AgeOfDaughter: conditionalRequired("This Field is Required"),
  PNDTDoctor: conditionalRequired("This Field is Required"),
});

export const ForgetPasswordSchema = Yup.object({
  UserName: Yup.string()
    .required("This Field is Required")
    .min(3)
    .max(20)
    .trim(),
  Mobile: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .required("This Field is Required"),
});

export const EnterOTP = Yup.object({
  OTP: Yup.string()
    .required("Please Enter Your OTP")
    .min(3)
    .max(20)
    .trim("The contact name cannot include leading and trailing spaces"),
  Password: Yup.string()
    .trim("The contact name cannot include leading and trailing spaces")
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  ConfirmPassword: Yup.string()
    .trim("The contact name cannot include leading and trailing spaces")
    .required("Password must be same")
    .test("passwords-match", "Passwords do not match", function (value) {
      return this.parent.Password === value;
    }),
});

export const FieldMasterValidation = Yup.object({
  Name: Yup.string()
    .required("Please Enter Your Name")
    .min(3)
    .max(20)
    .trim("The contact name cannot include leading and trailing spaces"),
  Age: Yup.string()
    .required("Please Enter Your Name")
    .min(1)
    .max(3)
    .trim("The contact name cannot include leading and trailing spaces"),
  Mobile: Yup.string()
    .typeError("That doesn't look like a phone number")
    .required("Phone number is required!")
    .min(10)
    .max(10)
    .trim("The contact name cannot include leading and trailing spaces"),
});

// department(Create) page validation
export const validation = (formData) => {
  let err = "";
  if (formData?.Department.trim() === "") {
    err = { ...err, Department: "This Field is Required" };
  }
  if (
    formData?.Department.trim().length < 2
  ) {
    err = { ...err, Departments: "Must have 2 Character" };
  }

  if (formData?.DepartmentCode.trim() === "") {
    err = { ...err, DepartmentCode: "This Field is Required" };
  }
  if (
    formData?.DepartmentCode.trim().length < 2
  ) {
    err = { ...err, DepartmentCodes: "Must have 2 Character" };
  }

  return err;
};

export const HistoValidation = (payload) => {
  let err = "";
  if (payload?.Template_Name.trim() === "") {
    err = { ...err, Template_Name: "This Field is Required" };
  } else if (payload?.Template_Name.length < 2) {
    err = { ...err, Template_Name: "Must be 2 Character long" };
  }

  return err;
};

// end

export const checkEmploypeeWiseDiscount = (data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/v1//PatientRegistration/IsValidDiscountAmount", {
        TotalAmount: data?.GrossAmount,
        EmployeeID: id,
        CentreId: data?.CentreID,
        DiscountAmount: data?.DiscountOnTotal,
      })
      .then((res) => {
        resolve(false);
      })
      .catch((err) => {
        reject(err?.response?.data?.message);
      });
  });
};

// export const CompanyMasterValidation = (payload) => {
//   let err = "";
//   let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
//   if (payload?.CompanyCode === "") {
//     err = { ...err, CompanyCode: "This Field is Required" };
//   } else if (payload?.CompanyCode.length < 2) {
//     err = { ...err, CompanyCode: "Must be 2 Character long" };
//   }

//   if (payload?.CompanyName === "") {
//     err = { ...err, CompanyName: "This Field is Required" };
//   } else if (payload?.CompanyName.length < 2) {
//     err = { ...err, CompanyName: "Must be 2 Character long" };
//   }

//   if (payload?.Email === "") {
//     err = { ...err, Email: "This Field is Required" };
//   } else if (!regex.test(payload?.Email)) {
//     err = { ...err, Email: "Please Enter Valid Email" };
//   }

//   const data = CompanyMasterMobile(payload?.Mobile);

//   if (data) {
//     err = { ...err, Mobile1: data };
//   }

//   return err;
// };

const CompanyMasterMobile = (mobile) => {
  debugger;
  let Mobile = [];
  for (let i = 0; i < mobile.length; i++) {
    if (mobile[i] === "") {
      Mobile[i] = "please Enter Mobile Number";
    } else if (mobile[i].length < 10) {
      Mobile[i] = "please Enter Valid Mobile Number";
    }
  }

  return Mobile.length > 0 && Mobile;
};

export const CompanyMasterValidation = Yup.object({
  CompanyCode: Yup.string()
    .required("Please Enter Company Code")
    .min(3)
    .trim("The contact name cannot include leading and trailing spaces"),
  CompanyName: Yup.string()
    .trim("The contact name cannot include leading and trailing spaces")
    .required("Please Enter Company Name"),
  Email: Yup.string()
    .email()
    .required("Please Enter a Your Email")
    .trim("The contact name cannot include leading and trailing spaces")
    .matches(
      /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Please Enter a Valid Email"
    ),
  Mobile1: Yup.string()
    .min(10)
    .trim("The contact name cannot include leading and trailing spaces")
    .required("Please Enter Mobile1"),
  Mobile2: Yup.string()
    .min(10)
    .trim("The contact name cannot include leading and trailing spaces"),
});

export const InvestigationRequiredMasterValidationF = Yup.object({
  FieldName: Yup.string()
    .required("Please Enter Company Code")
    .trim("The contact name cannot include leading and trailing spaces"),
  InputType: Yup.string()
    .required("Please Enter Company Code")
    .trim("The contact name cannot include leading and trailing spaces"),
});

export const PageMasterValidation = (payload) => {
  let errors = "";
  if (payload?.MenuID === "") {
    errors = { ...errors, MenuID: "This Field is Required" };
  }
  if (payload?.PageName?.trim() === "") {
    errors = { ...errors, PageName: "This Field is Required" };
  } else if (payload?.PageName.length < 2) {
    errors = { ...errors, PageName: "Must be 2 Character long" };
  }
  if (payload?.Url?.trim() === "") {
    errors = { ...errors, Url: "This Field is Required" };
  } else if (payload?.Url.length < 2) {
    errors = { ...errors, Url: "Must be 2 Character long" };
  }
  if (toString(payload?.Priority).trim() === "") {
    errors = { ...errors, Priority: "This Field is Required" };
  }

  return errors;
};

export const MenuMasterValidation = (payload) => {
  let errors = "";

  if (payload?.MenuName?.trim() === "") {
    errors = { ...errors, MenuName: "This Field is Required" };
  } else if (payload?.MenuName.length < 2) {
    errors = { ...errors, MenuName: "Must be 2 Character long" };
  }

  if (payload?.Priority.trim() === "") {
    errors = { ...errors, Priority: "This Field is Required" };
  }

  return errors;
};

export const InvestigationRequiredMastervalidation = (payload) => {
  let errors = "";
  if (payload?.InputType === "") {
    errors = { ...errors, InputType: "This Field is Required" };
  }
  return errors;
};
export const InvestigationCommentMasterValidation = (payload) => {
  let errors = "";
  if (payload?.InvestigationID === "") {
    errors = { ...errors, InvestigationID: "This Field is Required" };
  }
  return errors;
};

export const CopyMappedItemFromLocationValidation = Yup.object().shape({
  FromLocation: Yup.string().required("This Field is Required"),
  LocationId: Yup.string().required("This Field is Required"),
});

export const ItemAverageConsumptionValidation = Yup.object().shape({
  LocationId: Yup.array().required("This Field is Required"),
  Month: Yup.array().required("This Field is Required"),
  BufferPercentage: Yup.string().required("This Field is Required"),
});

export const StroUnitMasterModalValidation = Yup.object({
  UnitName: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces")
    .min(3, "Name must be at least 3 characters"),
});
export const StroManufactureMasterModalValidation = Yup.object({
  Name: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces")
    .min(3, "Name must be at least 3 characters"),
  Email: Yup.string()
    .email()
    .trim("The contact name cannot include leading and trailing spaces")
    .matches(
      /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Please Enter a Valid Email"
    ),
  Mobile: Yup.string().min(10, "Please Enter Max 10 digit"),
  Phone: Yup.string().min(20, "Please Enter Max 20 digit"),
});
export const StoreCategoryTypeModallValidation = Yup.object({
  CategoryTypeID: Yup.string().required("This Field is Required"),
  SubCategoryTypeName: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces")
    .min(3, "Name must be at least 3 characters"),
});

export const StoreItemTypeModallValidation = Yup.object({
  SubCategoryTypeID: Yup.string().required("This Field is Required"),
  Name: Yup.string()
    .required("This Field is Required")
    .trim("The contact name cannot include leading and trailing spaces")
    .min(3, "Name must be at least 3 characters"),
});

export const InvestigationCommentValidation = Yup.object().shape({
  InvestigationID: Yup.array().required("This Field is Required"),
});

export const MappingLocationWithItemValidation = (payload, type, error) => {
  let err = error ?? "";

  if (
    payload?.BusinessZoneID === "" &&
    (type === "BusinessZoneID" || type === "All")
  ) {
    err = { ...err, BusinessZoneID: "This Field is Required" };
  }

  if (payload?.LocationId === "" && (type === "LocationId" || type === "All")) {
    err = { ...err, LocationId: "This Field is Required" };
  }

  if (payload?.CategoryId === "" && (type === "CategoryId" || type === "All")) {
    err = { ...err, CategoryId: "This Field is Required" };
  }
  if (payload?.Items === "" && (type === "Items" || type === "All")) {
    err = { ...err, Items: "This Field is Required" };
  }

  return err;
};

export const MobileWalletCollectionReportValidation = Yup.object().shape({
  CentreID: Yup.array().required("This Field is Required"),
  PaymentModeID: Yup.array().required("This Field is Required"),
});

export const ManageHolidayValidation = Yup.object({
  CentreID: Yup.string().required("This Field is Required"),
  Holiday: Yup.string().required("This Field is Required"),
});
export const SubPageMasterValidation = (payload) => {
  let errors = "";
  if (payload?.MenuID === "") {
    errors = { ...errors, MenuID: "This Field is Required" };
  }
  if (payload?.PageId === "") {
    errors = { ...errors, PageId: "This Field is Required" };
  }
  if (payload?.SubPageName === "") {
    errors = { ...errors, SubPageName: "This Field is Required" };
  } else if (payload?.SubPageName.length < 2) {
    errors = { ...errors, SubPageName: "Must be 2 Character long" };
  }

  if (payload?.Url === "") {
    errors = { ...errors, Url: "This Field is Required" };
  } else if (payload?.Url.length < 2) {
    errors = { ...errors, Url: "Must be 2 Character long" };
  }

  if (toString(payload?.Priority).trim() === "") {
    errors = { ...errors, Priority: "This Field is Required" };
  }

  return errors;
};