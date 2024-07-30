import React, { useEffect, useState } from "react";
import Input from "../../ChildComponents/Input";
import { Modal } from "react-bootstrap";
import {
  SelectBox,
  SelectBoxWithCheckbox,
} from "../../ChildComponents/SelectBox";
import axios from "axios";
import { number } from "./Commonservices/number";

function RSadvanceFilter({
  show,
  handleShow,
  handleAdvSearch,
  data,
  handleFilterChange,
}) {
  const [TestSuggestion, setTestSuggestion] = useState([]);
  const getInvestigationList = () => {
    axios
      .get("/api/v1/Investigations/BindInvestigationList")
      .then((res) => {
        let data = res.data.message;

        let MapTest = data.map((ele) => {
          return {
            value: ele.InvestigationID,
            label: ele.TestName,
          };
        });

        setTestSuggestion(MapTest);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getInvestigationList();
  }, []);

  const handleSelectMultiChange = (select, name) => {
    const val = select?.map((ele) => ele?.value);
    let e = { target: { name: name, value: val } };
    return handleFilterChange(e);
  };
  return (
    <Modal show={show} size="md" id="ModalSizeAFRE">
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title">Advance Filter</Modal.Title>
        <button type="button" className="close" onClick={handleShow}>
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="row">&nbsp;</div>
        <div className="row">
          <label className="col-sm-4">Parameter Name</label>
          <div className="col-sm-8">
            <SelectBoxWithCheckbox
              options={TestSuggestion}
              value={data?.parameterId}
              name="parameterId"
              onChange={handleSelectMultiChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <SelectBox
              options={[
                { label: "Select", value: "" },
                { label: ">", value: ">" },
                { label: "<", value: "<" },
                { label: "=", value: "=" },
              ]}
              name={"valueCheck"}
              selectedValue={data?.valueCheck}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-sm-4">
            <Input
              className="select-input-box form-control input-sm"
              placeholder={"Enter Value to Search"}
              name={"valueToSearch"}
              value={data?.valueToSearch}
              onChange={handleFilterChange}
              onInput={(e) => number(e, 2)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <Input
              className="select-input-box form-control input-sm"
              placeholder={"Value Range From"}
              name={"valueRangeFrom"}
              value={data?.valueRangeFrom}
              onChange={handleFilterChange}
              onInput={(e) => number(e, 2)}
            />
          </div>
          <div className="col-sm-4">
            <Input
              className="select-input-box form-control input-sm"
              placeholder={"Value Range To"}
              name={"valueRangeTo"}
              value={data?.valueRangeTo}
              onChange={handleFilterChange}
              onInput={(e) => number(e, 4)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-block btn-success btn-sm"
              onClick={handleAdvSearch}
            >
              Search
            </button>
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-block btn-danger btn-sm"
              onClick={handleShow}
            >
              Close
            </button>
          </div>
        </div>
        <div className="row">&nbsp;</div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default RSadvanceFilter;
