import React from 'react';
import DatePicker from 'react-datepicker'; // Ensure you have installed react-datepicker

import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
import { SelectBox } from '../../ChildComponents/SelectBox';
import Input from '../../ChildComponents/Input';

const SearchComponent = ({ t, formData, errors, dateSelect, handleTime, handleSelectChange, TableData, Departments, setTableData }) => {
  const removeData = () => {
    setTableData([])
  }
  return (
    <div className="search-container">
      <div className="search-header" style={{ background: "#00c0ef", height: "28px" ,borderRadius:"3px" }}>
        <h3 style={{ fontSize: "14px", marginLeft: "10px" }}>{t("Search")}</h3>
      </div>
      <div className="search-body">
        <div className="search-row">
          <div className="search-col">
            <DatePicker
              name="FromDate"
              selected={new Date(formData?.FromDate)}
              onChange={date => dateSelect(date, 'FromDate')}

              maxDate={new Date(formData?.ToDate)}
              className="datepicker"
            />
            {errors?.FromDate && <span className="error">{errors?.FromDate}</span>}
          </div>
          <div className="search-col">
            <DatePicker
              name="ToDate"
              selected={new Date(formData?.ToDate)}
              onChange={date => dateSelect(date, 'ToDate')}

              maxDate={new Date()}
              minDate={new Date(formData?.FromDate)}
              className="datepicker"
            />
            {errors?.ToDate && <span className="error">{errors?.ToDate}</span>}
          </div>
          <div className="search-col">
            <SelectBox
              options={[
                { label: "All Business Unit", value: 0 },
                { label: "RRL Mumbai", value: 1 },
                { label: "RRL Surat", value: 2 },
              ]}
              selectedValue={formData?.IsTat}
              className="select-box"
              name="IsTat"
              onChange={handleSelectChange}
            />
          </div>
          <div className="search-col">
            <SelectBox

              options={Departments}
              selectedValue={formData?.DepartmentID}
              className="select-box"
              name="DepartmentID"
              onChange={handleSelectChange}
            />
          </div>
          <div className="search-col">
            <Input
              className="input-box"
              name="VialId"
              placeholder="Enter Barcode No"
              value={formData?.VialId}
              onChange={handleSelectChange}
            />
          </div>
          <div className="search-col search-buttons row">
            <div className="col-12 col-sm-6 mb-2">
              <button onClick={() => TableData()} className="btn btn-success w-100" >
                {t("Search")}
              </button>
            </div>
            <div className="col-12 col-sm-6">
              <button onClick={removeData} className="btn btn-danger w-100" >
                {t("Reset")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
