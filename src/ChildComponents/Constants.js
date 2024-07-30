export const SearchBy = [
  { label: "Select", value: "" },
  { label: "BarcodeNo", value: "BarcodeNo" },
  { label: "Mobile", value: "Mobile" },
  { label: "PatientCode", value: "PatientCode" },
  { label: "PatientName", value: "PatientName" },
  { label: "VisitNo", value: "VisitNo" },
];
export const ManageDeliveryDaysType = [
  { label: "Investigation", value: 1 },
  { label: "Department", value: 2 },
  { label: "Urgent", value: 3 },
];
export const RefundFilter = [
  { label: "All", value: 0 },
  { label: "Refunded", value: 1 },
];

export const stateIniti = {
  DOB: "",
  Age: "",
  AgeYear: "",
  AgeDays: "",
  AgeMonth: "",
  RateID: 2,
  TotalAgeInDays: "",
  Title: "Mr.",
  FirstName: "",
  LastName: "",
  MiddleName: "",
  CentreID: "",
  Mobile: "",
  PinCode: "",
  State: "",
  Country: "",
  Email: "",
  City: "",
  HouseNo: "",
  StreetName: "",
  Locality: "",
  Phone: "",
  Gender: "Male",
  isVIP: 0,
  IsMask: 0,
  PatientCode: "",
  PageName: "PatientRegistration",
  BarcodeNo: "",
  ProEmployee: "",
};

export const Identity = [
  { label: "Select Document", value: "" },
  { label: "Adhar card", value: "Adhar card" },
  { label: "Pan card", value: "Pan card" },
  { label: "PF Certification", value: "PF Certification" },
  { label: "ESI Certification", value: "ESI Certification" },
  { label: "MSME Certification", value: "MSME Certification" },
  { label: "Driving Licence", value: "Driving Licence" },
  {
    label: "Pollution Control Certificate",
    value: "Pollution Control Certificate",
  },
];

function getyear() {
  const year = new Date().getFullYear();
  const data = [];
  for (let i = 2010; i < year + 1; i++) {
    const value = i;
    const label = i;
    data.push({ value, label });
  }
  data.reverse();
  return data;
}

export const years = getyear();

export const LTDataIniti = {
  TypeOfTnx: "OPD-LAB",
  NetAmount: "",
  GrossAmount: "",
  Date: "",
  DiscountOnTotal: "",
  IsCredit: 0,
  PName: "",
  Age: "",
  Gender: "",
  VIP: "0",
  LedgerTransactionIDHash: "",
  DiscountReason: "",
  DiscountApprovedBy: "",
  Remarks: "",
  Guid: "",
  ReferRate: "1",
  CentreName: "",
  DiscountType: 1,
  DoctorID: "1",
  DoctorName: "Self",
  SecondReferDoctor: "",
  DoctorMobile: "",
  DoctorEmail: "",
  ReferLabId: "",
  ReferLabName: "",
  ReferLab: 0,
  OtherReferLab: "",
  CardNo: "",
  CentreID: "",
  RateTypeId: "",
  Adjustment: "",
  AdjustmentDate: "",
  isDocumentUploaded: 0,
  PatientIDProof: "",
  PatientIDProofNo: "",
  PatientSource: "",
  PatientType: "",
  VisitType: 1,
  HLMPatientType: "OPD",
  HLMOPDIPDNo: "",
  reVisit: 0,
  HLMUHID: "",
  Source: "",
  BedNo: "",
  isAllowPrint: 0,
  CollectionBoyId: "",
  ReportDeliveryMethodId: "",
  ReportDeliveryMethodDetail: "",
  MedicalHistoryCount: 0,
  UploadDocumentCount: 0,
  IsMedicalHistory: "",
  IsDocumentUploaded: "",
  RegistrationDate: new Date(),
  SrfId: "",
  IcmrId: "",
  IsConcern: "",
  HideAmount: "",
  DiscountId: "",
};

export const ReportType = [
  { label: "Lab Report", value: "Lab Report" },
  { label: "Bill", value: "Bill" },
  { label: "TRF", value: "TRF" },
  { label: "Department Slip", value: "Department Slip" },
];

export const DISCOUNT_TYPE = [
  { label: "EmployeeWise", value: 1 },
  { label: "Discount Type Wise", value: 2 },
];
export const Flag = [
  { label: "Normal", value: "Normal" },
  { label: "Abnormal", value: "Abnormal" },
];

export const Order = [
  { label: "DESC", value: "DESC" },
  { label: "ASC", value: "ASC" },
];

export const TemplateName = [
  { label: "Template 1", value: "1" },
  { label: "Template 2", value: "2" },
  { label: "Template 3", value: "3" },
  { label: "Template 4", value: "4" },
  { label: "Template 5", value: "5" },
];
export const Sensitivity = [
  { label: "Intermediate", value: "Intermediate" },
  { label: "Resistant", value: "Resistant" },
  { label: "Highly Sensitive", value: "Highly Sensitive" },
  { label: "Moderately Sensitive", value: "Moderately Sensitive" },
  { label: "Midly Sensitive", value: "Midly Sensitive" },
  { label: "Sensitive", value: "Sensitive" },
];
export const ReportTypePreliminary = [
  { label: "Preliminary 1", value: "Preliminary 1" },
  { label: "Preliminary 2", value: "Preliminary 2" },
  { label: "Preliminary 3", value: "Preliminary 3" },
  { label: "Final Report", value: "Final Report" },
];
export const Theme = [
  { label: "Default", value: "Default" },
  { label: "Light Green", value: "light Green" },
  { label: "Peach", value: "Peach" },
  { label: "Pale Pink", value: "Pale Pink" },
  { label: "Red", value: "Red" },
  { label: "Sky Blue", value: "SkyBlue" },
  { label: "Grey", value: "Grey" },
];

export const ActiveTemplateID = [{ label: "Active", value: "1" }];

export const PageSize = [
  {
    value: "A0",
    label: "A0",
  },

  {
    value: "A1",
    label: "A1",
  },

  {
    value: "A2",
    label: "A2",
  },

  {
    value: "A3",
    label: "A3",
  },

  {
    value: "A4",
    label: "A4",
  },

  {
    value: "A5",
    label: "A5",
  },

  {
    value: "A6",
    label: "A6",
  },

  {
    value: "A7",
    label: "A7",
  },

  {
    value: "A8",
    label: "A8",
  },

  {
    value: "A9",
    label: "A9",
  },

  {
    value: "A10",
    label: "A10",
  },

  {
    value: "B0",
    label: "B0",
  },

  {
    value: "B1",
    label: "B1",
  },

  {
    value: "B2",
    label: "B2",
  },

  {
    value: "B3",
    label: "B3",
  },

  {
    value: "B4",
    label: "B4",
  },

  {
    value: "B5",
    label: "B5",
  },
  {
    value: "ArchA",
    label: "ArchA",
  },
  {
    value: "ArchB",
    label: "ArchB",
  },
  {
    value: "ArchC",
    label: "ArchC",
  },
  {
    value: "ArchD",
    label: "ArchD",
  },
  {
    value: "ArchE",
    label: "ArchE",
  },

  {
    value: "Flsa",
    label: "Flsa",
  },
  { value: "HalfLetter", label: "HalfLetter" },
  { value: "Ledger", label: "Ledger" },
  { value: "Legal", label: "Legal" },
  { value: "Letter", label: "Letter" },
  { value: "Letter11x17", label: "Letter11x17" },
  { value: "Note", label: "Note" },
];

export const PageOrientation = [
  {
    label: "Portrait",
    value: "Portrait",
  },
  {
    label: "Landscape",
    value: "Landscape",
  },
];

export const LableID = [
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "Patient NAME ",
    LabelID: "PatientName",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "Age/Gender",
    LabelID: "Age",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "Patient NAME ",
    LabelID: "PatientName",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "Mobile No.",
    LabelID: "Mobile",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "DeliveryMode",
    LabelID: "Bill",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "Reg. Date",
    LabelID: "Date",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "Patient Address.",
    LabelID: "Address",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "Panel Name ",
    LabelID: "Centre",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "PatientCode",
    LabelID: "PatientCode",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "Refered By ",
    LabelID: "ReferedBy",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "Lab No",
    LabelID: "VisitNo",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "Centre Cont No",
    LabelID: "CentreContactNo",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "",
    LabelID: "CentreAddress",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "CreatedBy",
    LabelID: "CreatedBy",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "Collector",
    LabelID: "Collector",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "ICMRID",
    LabelID: "ICMRID",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
  {
    Bold: 1,
    DetailXPosition: "75",
    FontFamily: "",
    FontSize: "10",
    Italic: 1,
    LabelDetail: "SRFID",
    LabelID: "SRFID",
    Left: "8",
    Print: 1,
    Top: "90",
    Underline: 0,
  },
];

export const FontFamily = [
  {
    label: "Arial",
    value: "Arial",
  },
  {
    label: "Times New Roman",
    value: "Times New Roman",
  },
  {
    label: "Calibri",
    value: "Calibri",
  },
  {
    label: "Verdana",
    value: "Verdana",
  },
];
export const TypeData = [
  // {
  //   label: "Select",
  //   value: "0",
  // },
  {
    label: "As On Date",
    value: "1",
  },
  {
    label: "From Date To Date ",
    value: "2",
  },
  {
    label: "Date Wise Trend (Closing Balance)",
    value: "3",
  },
];

export const DynamicReportType = [
  {
    label: "Text",
    value: "Text",
  },
  {
    label: "Data",
    value: "Data",
  },
  {
    label: "Barcode",
    value: "Barcode",
  },
  {
    label: "Image",
    value: "Image",
  },
  {
    label: "Line",
    value: "Line",
  },
  {
    label: "Box",
    value: "Box",
  },
  {
    label: "RoundBox",
    value: "RoundBox",
  },
  {
    label: "PrintDateTime",
    value: "PrintDateTime",
  },
  {
    label: "NoOfPages",
    value: "NoOfPages",
  },
  {
    label: "Provisional",
    value: "Provisional",
  },
  {
    label: "Qrcode",
    value: "Qrcode",
  },
];

export const TypePlaceHolder = [
  {
    label: "Header",
    value: "Header",
  },
  {
    label: "Page",
    value: "Page",
  },
  {
    label: "Footer",
    value: "Footer",
  },
];

export const DDLData = [
  {
    label: "",
    value: "",
  },
  {
    label: "PatientName",
    value: "PatientName",
  },
  {
    label: "Age",
    value: "Age",
  },
  {
    label: "Mobile",
    value: "Mobile",
  },
  {
    label: "Bill",
    value: "Bill",
  },
  {
    label: "Date",
    value: "Date",
  },
  {
    label: "Address",
    value: "Address",
  },
  {
    label: "Centre",
    value: "Centre",
  },
  {
    label: "PatientCode",
    value: "PatientCode",
  },
  {
    label: "ReferedBy",
    value: "ReferedBy",
  },
  {
    label: "VisitNo",
    value: "VisitNo",
  },
  {
    label: "CentreContactNo",
    value: "CentreContactNo",
  },
  {
    label: "CentreAddress",
    value: "CentreAddress",
  },
  {
    label: "CreatedBy",
    value: "CreatedBy",
  },
  {
    label: "Collector",
    value: "Collector",
  },
  {
    label: "Ph.",
    value: "Phone",
  },
  {
    label: "Mail",
    value: "Mail",
  },
  {
    label: "Web",
    value: "web",
  },
  {
    label: "company",
    value: "company",
  },
  {
    label: "Qrcode",
    value: "Qrcode",
  },
];

export const Active = [
  {
    label: "Active",
    value: "1",
  },
  {
    label: "Deactive",
    value: "0",
  },
];

export const Dynamic = {
  Data: "",
  DynamicReportType: "Text",
  Height: "",
  ImageData: "undefined",
  IsActive: "1",
  PositionLeft: "",
  PositionTop: "",
  Text: "",
  fontSize: 10,
  TypePlaceHolder: "Header",
  Width: "",
};

// investigations

export const DataType = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Package",
    value: "Package",
  },
  {
    label: "Profile",
    value: "Profile",
  },
  {
    label: "Test",
    value: "Test",
  },
];
export const InvType = [
  {
    label: "Investigation",
    value: "Investigation",
  },
  {
    label: "InvestigationObservation",
    value: "InvestigationObservation",
  },

  {
    label: "InvestigationRange",
    value: "InvestigationRange",
  },
  {
    label: "InvestigationInterpretation",
    value: "InvestigationInterpretation",
  },
  {
    label: "InvestigationComment",
    value: "InvestigationComment",
  },
  {
    label: "InvestigationProfile",
    value: "InvestigationProfile",
  },
  {
    label: "InvestigationPackage",
    value: "InvestigationPackage",
  },
];

export const ReportTypeNew = [
  {
    label: "Select",
    value: "",
  },
  {
    label: "Numeric",
    value: "1",
  },
  {
    label: "Memo",
    value: "2",
  },
  {
    label: "Ms-Word",
    value: "3",
  },
];
export const SampleOption = [
  {
    label: "Sample Not Required",
    value: "Sample Not Required",
  },
  {
    label: "Sample Required",
    value: "Sample Required",
  },
];

export const Specialization = [
  {
    label: "All",
    value: "All",
  },
];

export const CreateSpecialization = [
  {
    label: "Specialization",
    value: "",
  },
  {
    label: "Bio Chemist",
    value: "Bio Chemist",
  },
  {
    label: "Diabetes",
    value: "Diabetes",
  },
  {
    label: "Dietician",
    value: "Dietician",
  },
  {
    label: "Family Medicine",
    value: "Family Medicine",
  },
];

export const Degree = [
  {
    value: "",
    label: "Degree",
  },
  {
    value: "B.SC MBBS",
    label: "B.SC MBBS",
  },

  {
    value: "(BDS) Gold Medalist",
    label: "(BDS) Gold Medalist",
  },
];

export const ActiveDoctor = [
  {
    label: "Active",
    value: "1",
  },
  {
    label: "In-Active",
    value: "0",
  },
];

export const Zone = [
  {
    value: "Zone",
    label: "Zone",
  },
  {
    value: "Zone2234",
    label: "Zone2234",
  },
  {
    value: "Zone3",
    label: "Zone3",
  },
];

export const Locality = [
  {
    value: "",
    label: "Locality",
  },
  {
    value: "Sector 1",
    label: "Sector 1",
  },
  {
    value: "Sector 2",
    label: "Sector 2",
  },
];

export const All_Zero = [
  {
    label: "All/Zero Rate",
    value: "1",
  },
  {
    label: "Zero Rate Only",
    value: "2",
  },
];

export const ChangeRateDDL = [
  {
    label: "ChangeRateDDL",
    value: "0",
  },
  {
    label: "-",
    value: "1",
  },
  {
    label: "+",
    value: "2",
  },
];

export const RoundOff = [
  {
    label: -1,
    value: -1,
  },
  {
    label: 0,
    value: 0,
  },
  {
    label: 1,
    value: 1,
  },
  {
    label: 2,
    value: 2,
  },
  {
    label: 3,
    value: 3,
  },
  {
    label: 4,
    value: 4,
  },
];

export const PaymentMode = [
  {
    label: "Cash",
    value: "Cash",
  },
  {
    label: "Credit",
    value: "Credit",
  },
];

export const LoginAllowed = [
  {
    label: "Yes",
    value: "1",
  },
  {
    label: "No",
    value: "0",
  },
];

export const InestigationRange = {
  InvestigationID: "",
  LabObservationID: "",
  Gender: "",
  FromAge: "",
  ToAge: "",
  MinReading: "",
  MaxReading: "",
  DisplayReading: "",
  DefaultReading: "",
  MinCritical: "",
  MaxCritical: "",
  ReadingFormat: "",
  Interpretation: "",
  MacID: "",
  MethodName: "",
  ShowMethod: "",
  CentreID: "",
  AbnormalValue: "",
  RangeType: "",
  AutoApprovedMin: "",
  AutoApprovedMax: "",
  AMRMin: "",
  AMRMax: "",
  ReflexMin: 0,
  ReflexMax: 0,
  RoundOff: 0,
  DlcCheck: "",
  isActive: 1,
};

export const ImportExport = [
  {
    label: "RateList",
    value: "RateList",
  },
  {
    label: "DoctorReferal",
    value: "DoctorReferal",
  },
];

export const Status = [
  {
    label: "Pending",
    value: "0",
  },
  {
    label: "Approval",
    value: "1",
  },
];

export const Showonly = [
  {
    label: "Synced Data",
    value: "1",
  },
  {
    label: "Pending Data",
    value: "0",
  },
];

export const SelectAccredition = [
  {
    value: "0",
    label: "--Select Accredition--",
  },
  {
    value: "3",
    label: "CAP",
  },
  {
    value: "1",
    label: "NA",
  },
  {
    value: "2",
    label: "NABL",
  },
  {
    value: "4",
    label: "NABL+CAP",
  },
  {
    value: "5",
    label: "Not in Scope",
  },
];

export const SampleSource = [
  {
    label: "Left Arm",
    value: "Left Arm",
  },
  {
    label: "Right Arm",
    value: "Right Arm",
  },
];

export const PdfData = [
  {
    LabelID: "PatientName",
    LabelDetail: "Sahil Kumar",
  },
  {
    LabelID: "Age",
    LabelDetail: "22Years / Male",
  },
  {
    LabelID: "Mobile",
    LabelDetail: "7290908802",
  },
  {
    LabelID: "Bill",
    LabelDetail: "LAb.002",
  },
  {
    LabelID: "Date",
    LabelDetail: "23/02/2023",
  },
  {
    LabelID: "Address",
    LabelDetail: "Delhi",
  },
  {
    LabelID: "Centre",
    LabelDetail: "HCG",
  },
  {
    LabelID: "PatientCode",
    LabelDetail: "22222",
  },
  {
    LabelID: "ReferedBy",
    LabelDetail: "Ankit Sir",
  },
  {
    LabelID: "VisitNo",
    LabelDetail: "23LAb",
  },
  {
    LabelID: "CentreContactNo",
    LabelDetail: "1234567890",
  },
  {
    LabelID: "CentreAddress",
    LabelDetail: "0987654edf ",
  },
  {
    LabelID: "CreatedBy",
    LabelDetail: "Brijesh Sir",
  },
  {
    LabelID: "Collector",
    LabelDetail: "Self",
  },
];

export const InputFields = [
  {
    label: "Input Type",
    value: "",
  },
  {
    label: "TextBox",
    value: "TextBox",
  },
  {
    label: "CheckBox",
    value: "CheckBox",
  },
  {
    label: "DropDown",
    value: "DropDown",
  },
];

export const PayBy = [
  {
    label: "Patient",
    value: 0,
  },
  {
    label: "Corporate",
    value: 1,
  },
];

export const StatusCheck = {
  10: "Save",
  5: "Approve",
  11: "Hold",
  6: "Approve",
};
export const CampStatus = [
  { label: "All", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "DeActive", value: "DeActive" },
];
export const DateTypeSearch = [
  { label: "Registration Date", value: "Date" },
  { label: "Sample Collected Date", value: "SampleCollectionDate" },
  { label: "Department Receive Date", value: "DepartmentReceiveDate" },
];
export const DateTypeSearchInvoice = [
  { label: "Receive Date", value: "ivac.receiveDate" },
  { label: "Entry Date", value: "ivac.dtentry" },
  { label: "Approval Type", value: "ivac.ApprovedOnDate" },
];

export const IsRef = [
  { label: "BOTH", value: "Both" },
  { label: "Y", value: "Y" },
  { label: "N", value: "N" },
];

export const DoctorSpl = [
  { label: "MBBS", value: "MBBS" },
  { label: "SKIN", value: "SKIN" },
  { label: "Tester", value: "Tester" },
];

export const Temptype = [
  {
    label: "microScopic",
    value: "microScopic",
  },
];

export const SampleStatusSearch = [
  {
    label: "Sample Not Collected",
    value: 1,
    status: true,
  },
  {
    label: "Collected",
    value: 2,
    status: true,
  },
  {
    label: "Received",
    value: 3,
    status: true,
  },
  {
    label: "Rejected",
    value: 4,
    status: true,
  },
];

export const MicroBioMaster = [
  { label: "Organism", value: "2" },
  { label: "Antibiotic", value: "4" },
];

export const SampleStatus = [
  // { label: " Serach", value: ""},
  { label: "Not Collected", value: "1", status: true },
  { label: "Collected", value: "2", status: true },
  { label: "Receive", value: "3", status: true },
  { label: "Rejected", value: "4", status: true },
  { label: "Result Done", value: "10", status: true },
  { label: "Approved", value: "5", status: true },
  { label: "Hold", value: "11", status: true },
  { label: "Re-Run", value: "14", status: true },
  { label: "Mac Data", value: "13", status: true },
  { label: "Dispatched", value: "15", status: true },
  { label: "Printed", value: "6", status: true },
  { label: "All", value: "", status: true },
];

export const workSheetSampleStatus = [
  { label: "All", value: "", status: true },
  { label: "Receive", value: "3", status: true },
  { label: "Rejected", value: " 4", status: true },
  { label: "Approved", value: "5", status: true },
];
export const GraceTime = [
  {
    label: "select GraceTime in Days",
    value: "",
  },
  {
    label: 1,
    value: 1,
  },
  {
    label: 2,
    value: 2,
  },
  {
    label: 3,
    value: 3,
  },
  {
    label: 4,
    value: 4,
  },
  {
    label: 5,
    value: 5,
  },
  {
    label: 6,
    value: 6,
  },
  {
    label: 7,
    value: 7,
  },
];

export const OldJson = {
  Observation: [],
  Investigation: [
    {
      InvestigationID: "",
      ConcentForm: "29",
      PrintName: "Thayrocare",
      DataType: "Test",
      TestName: "Thayrocare",
      DepartmentID: "35",
      TestCode: "TC",
      ReportType: "1",
      isActive: "1",
      FromAge: "0",
      ToAge: "99999",
      MethodName: "Thayrocare",
      SampleType: "286",
      SampleOption: "Sample Not Required",
      SampleQty: "10",
      SampleRemarks: "RECHECK",
      BaseRate: "0",
      MaxRate: "2000",
      MicroReportType: "",
      Gender: "Both",
      BillingCategory: "5",
      AutoConsume: "",
      SampleContainer: "",
      LogisticTemp: "Room Temp",
      IsMultipleDoctor: "",
      PrintCumulative: "",
      Reporting: 1,
      PrintSampleName: "",
      Booking: 1,
      showPatientReport: 1,
      ShowAnalysisReport: "",
      OnlineReport: 1,
      AutoSave: 1,
      PrintSeparate: 1,
      Urgent: "",
      IsOrganism: "",
      IsCultureReport: "",
      IsMic: "",
      IsOutSource: "",
      SampleDefined: "",
      SampleTypeID: 286,
      RequiredAttachment: "",
      isMandatory: 1,
    },
  ],
};

export const NewJSON = {
  Observation: [],
  Investigation: [
    {
      InvestigationID: 3387,
      DataType: "Test",
      TestName: "Thayrocare",
      TestCode: "TC",
      isActive: 1,
      FromAge: 0,
      ToAge: 99999,
      MethodName: "Thayrocare",
      SampleQty: "10",
      SampleRemarks: "RECHECK",
      BaseRate: 0,
      MaxRate: 2000,
      SampleOption: "Sample Not Required",
      ReportType: "1",
      MicroReportType: "",
      Gender: "Both",
      BillingCategory: "5",
      AutoConsume: "",
      SampleContainer: "",
      LogisticTemp: "Room Temp",
      IsMultipleDoctor: 0,
      PrintCumulative: 0,
      Reporting: 1,
      PrintSampleName: 0,
      Booking: 1,
      showPatientReport: 1,
      ShowAnalysisReport: 0,
      OnlineReport: 1,
      AutoSave: 1,
      PrintSeparate: 1,
      Urgent: 0,
      IsOrganism: 0,
      IsCultureReport: 0,
      IsMic: 0,
      IsOutSource: 0,
      SampleDefined: 0,
      SampleTypeID: 286,
      RequiredAttachment: "",
      DepartmentID: 35,
      isMandatory: 1,
      PrintName: "Thayrocare",
      SampleType: "286",
      isPrefixRequired: null,
    },
  ],
};

export const DiscountWiseDataConstant = [
  {
    Id: 59,
    DiscountType: "Test",
    DiscountPer: 12,
    DiscountId: "DIS009",
  },
  {
    Id: 61,
    DiscountType: "Disc10001",
    DiscountPer: 10,
    DiscountId: "DIS0015",
  },
  {
    Id: 70,
    DiscountType: "Raj Kamal",
    DiscountPer: 21,
    DiscountId: "DIS001009",
  },
  {
    Id: 76,
    DiscountType: "Raj Kamal1",
    DiscountPer: 12,
    DiscountId: "DIS0010015",
  },
  {
    Id: 78,
    DiscountType: "old patient1",
    DiscountPer: 12,
    DiscountId: "DIS0010017",
  },
  {
    Id: 81,
    DiscountType: "q",
    DiscountPer: 99,
    DiscountId: "DIS0010020",
  },
  {
    Id: 84,
    DiscountType: "SENIOR CITI",
    DiscountPer: 10,
    DiscountId: "DIS0010023",
  },
  {
    Id: 85,
    DiscountType: "old patient7",
    DiscountPer: 12,
    DiscountId: "DIS0010024",
  },
  {
    Id: 91,
    DiscountType: "543",
    DiscountPer: 43,
    DiscountId: "DIS0010030",
  },
  {
    Id: 107,
    DiscountType: "Senior Cit",
    DiscountPer: 50,
    DiscountId: "DIS0010046",
  },
  {
    Id: 110,
    DiscountType: "1231",
    DiscountPer: 1,
    DiscountId: "DIS0010049",
  },
  {
    Id: 111,
    DiscountType: "122",
    DiscountPer: 3,
    DiscountId: "DIS0010050",
  },
  {
    Id: 113,
    DiscountType: "old1232",
    DiscountPer: 2,
    DiscountId: "DIS0010052",
  },
  {
    Id: 118,
    DiscountType: "Critical Conditions",
    DiscountPer: 0,
    DiscountId: "DIS0010057",
  },
  {
    Id: 119,
    DiscountType: "dm",
    DiscountPer: 1,
    DiscountId: "DIS0010058",
  },
  {
    Id: 120,
    DiscountType: "dsj",
    DiscountPer: 10,
    DiscountId: "DIS0010059",
  },
  {
    Id: 121,
    DiscountType: "retwre",
    DiscountPer: 5,
    DiscountId: "DIS0010060",
  },
  {
    Id: 126,
    DiscountType: "ra",
    DiscountPer: 12,
    DiscountId: "DIS0010076",
  },
  {
    Id: 127,
    DiscountType: "Needy",
    DiscountPer: 12,
    DiscountId: "DIS0010077",
  },
  {
    Id: 128,
    DiscountType: "serious case",
    DiscountPer: 20,
    DiscountId: "DIS0010078",
  },
];

export const BillingCategory = [
  {
    label: "Family Package",
    value: 1,
  },
  {
    label: "OutSource",
    value: 2,
  },
  {
    label: "Package",
    value: 3,
  },
  {
    label: "Platinum",
    value: 4,
  },
  {
    label: "Routine",
    value: 5,
  },
  {
    label: "Special",
    value: 6,
  },
];

export const SelectType = [
  // {
  //   label: "Select",
  //   value: "Select",
  // },
  {
    label: "PrePaid",
    value: "PrePaid",
  },
  {
    label: "PostPaid",
    value: "PostPaid",
  },
];

export const RADIOADVANCEINPUT = [
  {
    value: "1",
    label: "Deposit",
  },
  {
    value: "2",
    label: "Credit Note",
  },
  {
    value: "3",
    label: "Debit Note",
  },
];

export const NoofRecord = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "30", value: "30" },
  { label: "40", value: "40" },
  { label: "50", value: "50" },
  { label: "60", value: "60" },
  { label: "70", value: "70" },
  { label: "80", value: "80" },
  { label: "90", value: "90" },
  { label: "100", value: "100" },
];
export const RoundUpTo = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
];
export const NoOfPricks = [
  { label: "Select", value: "" },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "10", value: 10 },
];
export const HCNewPatientForm = {
  Title: "Mr.",
  PName: "",
  HouseNo: "",
  StreetName: "",
  LocalityID: "",
  CityID: "",
  Pincode: "",
  StateID: "",
  MediaStreamAudioDestinationNode: "",
  CountryID: "",
  Phone: "",
  Mobile: "",
  Email: "",
  DOB: "",
  Age: "",
  AgeYear: "",
  AgeMonth: "",
  AgeDays: "",
  TotalAgeInDays: "",
  Gender: "Male",
  // CentreID: "1",
  IPAddress: "",
  PatientIDInterface: "",
  Patient_ID_create: "1",
  IsOnlineFilterData: "0",
  IsVIP: "0",
  IsMaskPatientGroupId: "0",
  IsMobileVerified: "0",
  IsEmailVerified: "0",
  isActive: "1",
  Landmark: "",
};

export const HCPaymentMode = [
  {
    label: "Cash",
    value: "Cash",
  },
  {
    label: "Credit Card",
    value: "Credit Card",
  },
  {
    label: "Debit Card",
    value: "Debit Card",
  },
  {
    label: "Online Payment",
    value: "Online Payment",
  },
  {
    label: "Mobile Wallet",
    value: "Mobile Wallet",
  },
  {
    label: "Credit",
    value: "Credit",
  },
];

export const Phelboweekoff = [
  { label: "Sunday", value: "Sunday" },
  { label: "Monday", value: "Monday" },
  { label: "Tuseday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
];

export const PhelboSearchTypes = [
  {
    label: "Mobile",
    value: "Mobile",
  },
  { label: "Phelebo Code", value: "hpm.PhlebotomistID" },
  { label: "Name", value: "Name" },
  { label: "Email", value: "Email" },
  {
    label: "PanNo.",
    value: "PanNo.",
  },
];

export const Phelborecordoptions = [
  {
    label: 5,
    value: Number(5),
  },
  { label: 10, value: Number(10) },
  { label: 20, value: 20 },
  { label: 50, value: 50 },
  { label: 100, value: 100 },
];

export const PhelboSources = [
  {
    label: "Lab",
    value: "Lab",
  },
  { label: "Franchise", value: "Franchise" },
];

export const PhelbosearchDefault = {
  SearchType: "",
  SearchValue: "",
  NoOfRecord: 5,
  SearchGender: "",
  IsDeactivatePP: "1",
  SearchState: "",
  SearchCity: "",
};

export const TimeSlots = [
  {
    label: "1-Slot",
    value: "1",
  },
  { label: "2-Slot", value: "2" },
  {
    label: "3-Slot",
    value: "3",
  },
  {
    label: "6-Slot",
    value: "6",
  },
];
export const AvgTimes = [
  { label: "15 min", value: "15" },
  {
    label: "30 min",
    value: "30",
  },
  { label: "60 min", value: "60" },
  {
    label: "120 min",
    value: "120",
  },
];

// Store Module

export const BarcodeOptions = [
  {
    label: "Select ",
    value: "",
  },
  {
    label: "Stock Wise",
    value: "1",
  },
  {
    label: "Item Wise",
    value: "2",
  },
];
export const BarcodeGenrationOptions = [
  {
    label: "Select ",
    value: "",
  },
  {
    label: "System Generated",
    value: "2",
  },
  {
    label: "Self",
    value: "1",
  },
];

export const NoOfRecord = [
  {
    label: 5,
    value: Number(5),
  },
  {
    label: 10,
    value: Number(10),
  },
  {
    label: 20,
    value: Number(20),
  },
  {
    label: 50,
    value: Number(50),
  },
];

export const SuppierDataStatus = [
  {
    label: "Select",
    value: "0",
  },
  {
    label: "Created",
    value: "1",
  },
  {
    label: "Checked",
    value: "2",
  },
  {
    label: "Approved",
    value: "3",
  },
];

export const CategoryName = [
  {
    label: "Select Category",
    value: "",
  },
  {
    label: "Category Type",
    value: "sm.CategoryTypeID",
  },
  {
    label: "SubCategory Type",
    value: "sm.SubCategoryTypeID",
  },
  {
    label: "Item Group",
    value: "sm.ItemGroupId",
  },
  {
    label: "Manufacture",
    value: "sm.ManufactureID",
  },
  {
    label: "Machine",
    value: "sm.MachineId",
  },
];
export const SearchType = [
  {
    label: "Select",
    value: "",
  },
  {
    label: "Item Name",
    value: "sm.typename",
  },
  {
    label: "Hsn Code",
    value: "sm.HSNCode",
  },
  {
    label: "Apollo Item Code",
    value: "sm.ApolloItemCode",
  },
];
export const AppType = [
  {
    label: "Select",
    value: "",
  },
  {
    label: "Maked",
    value: "0",
  },
  {
    label: "Checked",
    value: "1",
  },
  {
    label: "Approved",
    value: "2",
  },
];

export const StartItemSearchDefault = {
  Category: "",
  CategoryType: "",
  SearchType: "",
  SearchValue: "",
  AppType: "",
  NoOfRecord: 5,
  FirstTime: 0,
};
export const SupplierQuotationSearch = {
  QutationRefno: "",
  fromdate: new Date(),
  todate: new Date(),
  Status: "",
  NoofRecord: 5,
  vendorid: "",
  itemid: "",
  location: "",

  // QutationRefno: "12",
  // fromdate: "07-Dec-2023 00:00:00",
  // todate: "09-Dec-2023 23:59:59",
  // Status: "",
  // NoofRecord: 20,
  // vendorid: "0",
  // itemid: "0",
  // location: "0",
};
export const MonthOptions = [
  {
    label: "Jan",
    value: "1",
  },
  {
    label: "Feb",
    value: "2",
  },
  {
    label: "March",
    value: "3",
  },
  {
    label: "April",
    value: "4",
  },
  {
    label: "May",
    value: "5",
  },
  {
    label: "June",
    value: "6",
  },
  {
    label: "July",
    value: "7",
  },
  {
    label: "Aug",
    value: "8",
  },
  {
    label: "Sep",
    value: "9",
  },
  {
    label: "Oct",
    value: "10",
  },
  {
    label: "Nov",
    value: "11",
  },
  {
    label: "Dec",
    value: "12",
  },
];

export const IndentTypeList = [
  // {
  //   label:"Select Indent Type",
  //   value:""
  // },
  {
    label: "SI",
    value: "0",
  },
  {
    label: "PI",
    value: "1",
  },
  {
    label: "DirectIssue",
    value: "2",
  },
  {
    label: "DirectStockTransfer",
    value: "3",
  },
];
export const IndentTypeListLocation = [
  {
    label: "SI",
    value: "1",
  },
  {
    label: "DirectIssue",
    value: "3",
  },
];
export const ActionTypeList = [
  {
    label: "ActionType",
    value: "",
  },
  {
    label: "Prepared",
    value: "Maker",
  },
  {
    label: "Validate",
    value: "Checker",
  },
  {
    label: "Approved",
    value: "Approval",
  },
];

export const CategoryStore = [
  // {
  //   label: "Select",
  //   value: "Select",
  // },
  {
    label: "Capex",
    value: "2",
  },
  {
    label: "Opex",
    value: "1",
  },
];

export const IsActive = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Active",
    value: 1,
  },
  {
    label: "InActive",
    value: 0,
  },
];

export const AgainstInvoice = [
  {
    label: "Select Invoice Type",
    value: "",
  },
  {
    label: "Against Invoice",
    value: 1,
  },
  {
    label: "Against Advance",
    value: 2,
  },
];

export const BillingCycle = [
  {
    label: "Weekly",
    value: "Weekly",
  },
  {
    label: "15 Days",
    value: "15 Days",
  },
  {
    label: "Monthly",
    value: "Monthly",
  },
];

export const SearchByCulture = [
  { label: "Select", value: "" },
  { label: "BarcodeNo", value: "pli.BarcodeNo" },
  { label: "Mobile", value: "pm.mobile" },
  { label: "PatientCode", value: "lt.PatientCode" },
  { label: "PatientName", value: "lt.PName" },
  { label: "VisitNo", value: "pli.LedgertransactionNo" },
];
// end
