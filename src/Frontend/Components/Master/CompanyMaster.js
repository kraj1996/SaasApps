import React, { useState } from "react";
import Input from "../../../ChildComponents/Input";
import { SelectBox } from "../../../ChildComponents/SelectBox";
import { Link } from "react-router-dom";


const CompanyMaster = () => {
  const [showScreen, setShowScreen] = useState(true);
  const [formData, setFormData] = useState({
    CompanyName:'',
    CompanyCode:'',
    IsActive: true,
    GSTApplicable: true,
    GSTNo: '',
    PanNo: '',
    PathScanURL: '',
    PathScanUserCount: '',
    DocApprovalURL: '',
    DocApprovalCount: '',
    BankName: '',
    BeneficiaryName: '',
    BankAccountNo: '',
    IFSCCode: '',
    UserName: '',
    Password: '',
    EmailID: '',
    MobileNo: ''
  });
  const [searchFormdata,setsearchformdata]=useState({
    CompanyName:'',
    CompanyCode:''
  })

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setsearchformdata({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    // Validation and submit logic here
    console.log('Form submitted', formData);
  };

  const handleReset = () => {
    setFormData({
      CompanyName: '',
      CompanyCode: '',
      IsActive: true,
      GSTApplicable: true,
      GSTNo: '',
      PanNo: '',
      PathScanURL: '',
      PathScanUserCount: '',
      DocApprovalURL: '',
      DocApprovalCount: '',
      BankName: '',
      BeneficiaryName: '',
      BankAccountNo: '',
      IFSCCode: '',
      UserName: '',
      Password: '',
      EmailID: '',
      MobileNo: ''
    });
    setErrors({});
  };
  const handleCheckBox = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked ? 1 : 0 });
  };

  return (
    <>
      {showScreen ? (
        <div>
          <div className="search-container">
            <div className="box-header with-border">
              <h3 className="box-title">Company Master</h3>
              <Link
                className="list_item"
                onClick={() => setShowScreen(false)}
              >
                Back to List
              </Link>
              <div>
              </div>
            </div>
            <div className="search-body" style={{marginTop:"5px"}}>
              <div className="search-row">
                <div className="search-col">
                  <Input
                    className="input-box"
                    name="CompanyName"
                    placeholder="Enter Company Name"
                    value={formData?.CompanyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-col">
                  <Input
                    className="input-box"
                    name="CompanyCode"
                    placeholder="Enter Company Code"
                    value={formData?.CompanyCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-col">
                  <div style={{display:"flex",alignItems: "center" }}>
                    <span style={{marginLeft:"3px" ,marginRight:"5px" ,fontSize:"10px"}}>GSTApplicable</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        name="GSTApplicable"
                        checked={formData?.GSTApplicable}
                        onChange={handleCheckBox}
                      />
                      <span className="slider"></span>
                    </label>
                    {formData?.GSTApplicable==1 && <div className="search-col" style={{marginLeft:"10px"}}>
                  <Input
                    className="input-box"
                    name="GSTNo"
                    placeholder="Enter GST Number"
                    value={formData?.GSTNo}
                    onChange={handleInputChange}
                  />
                </div>}
                  </div>
                </div>
              
                <div className="search-col">
                  <Input
                    className="input-box"
                    name="PanNo"
                    placeholder="Enter PAN Number"
                    value={formData?.PanNo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-col">
                  <Input
                    className="input-box"
                    name="PathScanURL"
                    placeholder="Enter Path Scan URL"
                    value={formData?.PathScanURL}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-col">
                  <Input
                    className="input-box"
                    name="PathScanUserCount"
                    placeholder="Enter Path Scan User Count"
                    value={formData?.PathScanUserCount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-col">
                  <Input
                    className="input-box"
                    name="DocApprovalURL"
                    placeholder="Enter Doctor Approval URL"
                    value={formData?.DocApprovalURL}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-col">
                  <Input
                    className="input-box"
                    name="DocApprovalCount"
                    placeholder="Enter Doctor Approval Count"
                    value={formData?.DocApprovalCount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-col">
                  <Input
                    className="input-box"
                    name="BankName"
                    placeholder="Enter Bank Name"
                    value={formData?.BankName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-col">
                  <Input
                    className="input-box"
                    name="BeneficiaryName"
                    placeholder="Enter Beneficiary Name"
                    value={formData?.BeneficiaryName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-col">
                  <Input
                    className="input-box"
                    name="BankAccountNo"
                    placeholder="Enter Bank Account No"
                    value={formData?.BankAccountNo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-col">
                  <Input
                    className="input-box"
                    name="IFSCCode"
                    placeholder="Enter IFSC Code"
                    value={formData?.IFSCCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-col">
                  <Input
                    className="input-box"
                    name="UserName"
                    placeholder="Enter User Name"
                    value={formData?.UserName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-col">
                  <Input
                    className="input-box"
                    name="Password"
                    placeholder="Enter Password"
                    value={formData?.Password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-col">
                  <Input
                    className="input-box"
                    name="EmailID"
                    placeholder="Enter Email ID"
                    value={formData?.EmailID}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-col">
                  <Input
                    className="input-box"
                    name="MobileNo"
                    placeholder="Enter Mobile Number"
                    value={formData?.MobileNo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-col">
                  <div style={{display:"flex",alignItems: "center" }}>
                    <span style={{marginLeft:"3px" ,marginRight:"5px" ,fontSize:"12px"}}>Active</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        name="IsActive"
                        checked={formData?.IsActive}
                        onChange={handleCheckBox}
                      />
                      <span className="slider"></span>
                    </label>

                  </div>
                </div>

                <div className="search-col search-buttons row">
                  <div className="col-12 col-sm-6 mb-2">
                    <button onClick={() => handleSubmit} className="btn btn-success w-100" style={{ borderRadius: "20px" }}>
                      Save
                    </button>
                  </div>
                  <div className="col-12 col-sm-6">
                    <button className="btn btn-danger w-100" style={{ borderRadius: "20px" }}>
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (

        <div className="search-container">
          <div className="box-header with-border">
            <h3 className="box-title">CompanyList</h3>
            <Link
              className="list_item"
              onClick={() => setShowScreen(true)}
            >
              Create
            </Link>
          </div>
          <div className="search-body"  style={{marginTop:"5px"}}>
            <div className="search-row">
              <div className="search-col">
                <Input
                  className="input-box"
                  name="CompanyCode"
                  placeholder="Enter Company Code"
                  value={searchFormdata?.CompanyCode}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="search-col">
                <Input
                  className="input-box"
                  name="CompanyName"
                  placeholder="Enter Company Name"
                  value={searchFormdata?.CompanyName}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="search-col search-buttons row">
                <div className="col-12 col-sm-6 mb-2">
                  <button onClick={() => handleSubmit} className="btn btn-success w-100" style={{ borderRadius: "20px" }}>
                    Search
                  </button>
                </div>
                <div className="col-12 col-sm-6">
                  <button className="btn btn-danger w-100" style={{ borderRadius: "20px" }}>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyMaster;