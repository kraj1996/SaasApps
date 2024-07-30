import React, { useEffect, useState } from "react"
import Input from "../../ChildComponents/Input";
import Loading from "../util/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import UploadModal from "../util/UploadModal";
import CameraModal from "./CameraModal";
import { useNavigate } from "react-router-dom";
import { number } from "../../util/Commonservices/number";
import "../../index.css"
import SeeFormImage from "./SeeFormImage";
import SignaturePage from "../Components/SignaturePage";

const PatientSearch = () => {
    const navigate = useNavigate()
    const [payload, setPayload] = useState({
        barcodeno: ""
    })
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(!show);
    const handleClose2 = () => setShow2(!show2);
    const [loading, setLoading] = useState(false);
    const [tabledata, setTableData] = useState([])
    const [showsign,setshowsign]=useState(false)


    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/login")
    }


    const handleSearch = () => {
        if (payload.barcodeno != "") {
            setTableData(patientdata)
        } else
            toast.error("Please enter the Visit ID or Barcode No.")
    }



    const handleReset = () => {
        setTableData([])
        setPayload({
            barcodeno: ""
        })
    }
    const patientdata =
        [
            {
                "SNo": "1",
                "VisitID": "LAB/96/0405",
                "Barcode": "Bar/02/05",
                "PatientName": "Raj Kamal",
                "Age": 27,
                "Gender": "Male",
                "TestName": "Blood Test",
                "Date": "2024-07-01",
                "Remarks": "Normal Test",
                "PatientGuid": "12",
            },
            {
                "SNo": "2",
                "VisitID": "LAB/96/0805",
                "Barcode": "Bar/03/06",
                "PatientName": "Vipin",
                "Age": 27,
                "Gender": "Male",
                "TestName": "Blood Test",
                "Date": "2024-07-01",
                "Remarks": "Normal Test",
                "PatientGuid": "",
            },
            {
                "SNo": "3",
                "VisitID": "LAB/96/0477",
                "Barcode": "Bar/04/07",
                "PatientName": "Raj Singh",
                "Age": 27,
                "Gender": "Male",
                "TestName": "Blood Test",
                "Date": "2024-07-01",
                "Remarks": "Normal Test",
                "PatientGuid": "",
            },
        ]

    const handleChange1 = (event) => {
        setPayload({ ...payload, [event.target.name]: event.target.value });
    };

    const handleCheckUpdate = (payload, name, value) => {
        const updatedData = { ...payload, [name]: value };
        axios
            .post("/api/v1/CompanyMaster/UpdateCompanywiseCheckbox", updatedData)
            .then((res) => {
                // GetComanyWiseModule("");
                toast.success(res.data.message);
            })
            .catch((err) => {
                toast.error(
                    err?.response?.data?.message
                        ? err?.response?.data?.message
                        : "Something Went Wrong"
                );
            });

    }

    const handleCheckbox = (e) => {
        const { checked } = e.target;
        const data = tabledata?.map((ele) => {
            return {
                ...ele,
                IsChecked: checked ? 1 : 0,
            };
        });
        setTableData(data);
    };

    const handleCheckBox = (e, index) => {
        const { name, checked } = e.target;
        const datas = [...tabledata];
        datas[index][name] = checked ? 1 : 0;
        setTableData(datas);
    };
    const [Identity, setIdentity] = useState([]);
    const getRequiredAttachment = () => {
        axios
            .post("/api/v1/Global/GetGlobalData", {
                Type: "RequiredAttachment",
            })
            .then((res) => {
                let data = res.data.message;
                let RequiredAttachment = data.map((ele) => {
                    return {
                        value: ele.FieldDisplay,
                        label: ele.FieldDisplay,
                    };
                });
                return setIdentity(RequiredAttachment);
            })
            .catch((err) => console.log(err));
    };
    const handleSubmit = () => {
        toast.error("Witing for Submit Api.")
    }
    const [PatientGuid, SetPatientGuid] = useState("");
    const [documentId, setDocumentID] = useState("");

    useEffect(() => {
        getRequiredAttachment()
    }, [])
    useEffect(() => {
        const DocumentId = guidNumber();
        setDocumentID(DocumentId);
        const patientId = guidNumber();
        SetPatientGuid(patientId);
    }, []);
    const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    const guidNumber = () => {
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

    const [UploadDoumentType, setUploadDoumentType] = useState([""]);
    const getDocumentType = (data) => {
        setUploadDoumentType(data);
    };
    const [showPatientImage, setShowPatientImage] = useState({
        show: false,
        data: "",
        index: -1,
        loading: false,
    });
    const Fetch = async (guidNumber, pageName) => {
        const response = await axios.post("/api/v1/CommonController/GetDocument", {
            Page: pageName,
            Guid: guidNumber,
        });
        return response?.data?.message;
    };
    const getS3url = async (id) => {
        const response = await axios.post("/api/v1/CommonController/GetFileUrl", {
            Key: id,
        });
        return response?.data?.message;
    };
    const handlePreviewImage = async (guidNumber) => {
        const response = await Fetch(guidNumber, "patientImage");
        if (response.length > 0) {
            const imgURL = await getS3url(response[0]?.awsKey);
            setShowPatientImage({
                show: true,
                data: imgURL,
                index: -1,
                loading: false,
            });
        } else {
            toast.error("No Patient Image Found");
            setShowPatientImage({
                show: false,
                data: "",
                index: -1,
                loading: false,
            });
        }
    };
    const handlePatientImage = async (guid, index) => {
        console.log(guid);
        if (!guid) {
            toast.error("No Image found");
        } else {
            setShowPatientImage({
                show: false,
                data: "",
                index: index,
                loading: true,
            });
            await handlePreviewImage(guid);
        }
    }; 
    const handleclosesign=()=>{
        setshowsign(true)
    }
    console.log(show2);
    return (
        <>
            {
                show && (
                    <UploadModal
                        options={Identity}
                        show={show}
                        handleClose={handleClose}
                        documentId={PatientGuid}
                        pageName="Patient Registration"
                        getDocumentType={getDocumentType}
                    />
                )
            }
            {showPatientImage.show && (
                <SeeFormImage
                    show={showPatientImage.show}
                    data={showPatientImage?.data}
                    pageName={"Patient Image"}
                    handleShow={() =>
                        setShowPatientImage({
                            show: false,
                            data: "",
                            index: -1,
                            loading: false,
                        })
                    }
                />
            )}
            {
                show2 && (
                    <CameraModal
                        show={show2}
                        handleClose={handleClose2}
                    />
                )
            }
            <div className="box-body">
                <div className="contain" style={{ background: "white" }}>
                    <div className="searchtitle" style={{ background: "#00c0ef", height: "35px", display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <h6 style={{ fontSize: "18px", marginLeft: "10px" }}>Search Details</h6>
                        </div>
                        
                    </div>
                </div>
                <div
                    id="inputContainer"
                    style={{
                        border: "1px solid black",
                        borderRadius: "15px",
                        marginTop: "6px",
                        marginBottom: "6px",
                        padding: "2px 10px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                >
                    <input
                        style={{ width: "92%", border: "none", outline: "none" }}
                        type="number"
                        placeholder="Please Enter The VisitID/BarcodeNo."
                        name="barcodeno"
                        onInput={(e) => number(e, 20)}
                        value={payload.barcodeno}
                        onChange={handleChange1}
                        onFocus={() => document.getElementById("inputContainer").classList.add("focused")}
                        onBlur={() => document.getElementById("inputContainer").classList.remove("focused")}
                    />

                    <button
                        title="Click to Search Barcode."
                        style={{ border: "none", background: "none", padding: "0px", marginLeft: "50px" }}
                        onClick={() => {
                            setShow2(true);
                        }}
                    >
                        <i className="fa fa-barcode" style={{ fontSize: "20px", marginTop: "4px", marginLeft: "4px", marginRight: "10px" }}></i>
                    </button>
                    
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", gap: "1px", marginTop: "7px" }} className="row">
                    <button
                        type="search"
                        className="btn btn-flat btn-info"
                        style={{
                            borderRadius: "20px",
                            borderColor: "#00c0ef",
                            border: "none",
                            flex: 1,
                        }}
                        onClick={handleSearch}
                    >
                        {"Search"}
                    </button>
                    <button
                        type="reset"
                        className="btn btn-flat btn-danger"
                        style={{
                            borderRadius: "20px",
                            borderColor: "#00c0ef",
                            border: "none",
                            flex: 1,
                        }}
                        onClick={handleReset}
                    >
                        {"Reset"}
                    </button>
                </div>



                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {tabledata.length > 0 && (
                            <div className="box" style={{ marginTop: "10px" }}>
                                <div className="box-header with-border" style={{ background: "#00c0ef", height: "35px", }}>
                                    <h3 className="box-title" style={{ marginLeft: "6px", fontSize: "13px" }}>Patient Details</h3>
                                </div>
                                {/* <div className="box-body"> */}
                                <div className="" style={{ paddingBottom: "5px" }}>
                                    <div
                                        className="box-body table-responsive"
                                        id="no-more-tables"
                                    >
                                        <table
                                            className="table table-bordered table-hover table-striped divResult custom-modern-table"
                                            cellPadding="{0}"
                                            cellSpacing="{0}"
                                            style={{ background: "#00c0ef" }}
                                        >
                                            <thead className="cf">
                                                <tr>
                                                    <th className="sno-column">S.No.</th>
                                                    <th>Visit ID</th>
                                                    <th>Barcode No.</th>
                                                    <th>Patient Name</th>
                                                    <th>Age/Gender</th>
                                                    <th>Test Name</th>
                                                    <th>Registration Date</th>
                                                    {/* <th>Remarks</th> */}
                                                    {/* <th>Select</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tabledata?.map((ele, index) => (
                                                    <tr key={index}>
                                                        <td className="sno-column">{ele?.SNo}</td>
                                                        <td data-title="Visit ID" style={{ padding: "0px" }}>{
                                                            <div style={{ marginTop: "0px" }}>
                                                                <span >{ele?.VisitID}</span>{ele?.PatientGuid != "" && <span
                                                                    style={{ marginLeft: "13px", fontSize: "17px", cursor: 'pointer', color: "#00c0ef", background: "none", border: "none" }}
                                                                    className="fa fa-eye custom-pointer"
                                                                    title="View Patient Image"
                                                                    onClick={() =>
                                                                        handlePatientImage(ele?.PatientGuid, index)
                                                                    }
                                                                ></span>}&nbsp;
                                                                <button className="fa fa-clipboard custom-pointer"
                                                                    title="Add File or Photos"
                                                                    onClick={() => {
                                                                        setShow(true);
                                                                    }} style={{ marginLeft: "5px", fontSize: "15px", cursor: 'pointer', color: "#00c0ef", background: "none", border: "none" }}
                                                                ></button>&nbsp;
                                                            </div>
                                                        }&nbsp;</td>
                                                        <td data-title="Barcode No.">{ele?.Barcode}&nbsp;</td>
                                                        <td data-title="Patient Name">{ele?.PatientName}&nbsp;</td>
                                                        <td data-title="Age/Gender">{ele?.Age}/{ele?.Gender} &nbsp;</td>
                                                        <td data-title="Test Name">{ele?.TestName}&nbsp;</td>
                                                        <td data-title="Registration Date">{ele?.Date}&nbsp;</td>
                                                        {/* <td data-title="Remarks">{ele?.Remarks}&nbsp;</td> */}
                                                        {/* <td data-title="Select">{
                                                        <label className="switch">
                                                            <input
                                                                type="checkbox"
                                                                name="IsChecked"
                                                                checked={ele?.IsChecked}
                                                                onChange={(e) => handleCheckBox(e, index)}
                                                            />
                                                            <span className="slider"></span>
                                                        </label>
                                                    }&nbsp;</td> */}
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>

                                    <div style={{ margin: "8px" }}>
                                        <button
                                            type="submit"
                                            className="btn btn-block btn-info rajbutton"
                                            style={{ borderRadius: "20px", marginTop: "6px", marginBottom: "10px", borderColor: "#00c0ef" }}
                                            onClick={handleSubmit}
                                            onFocus={(e) => e.target.style.borderColor = '#00c0ef'}
                                            onBlur={(e) => e.target.style.borderColor = '#00c0ef'}
                                        >
                                            {"Submit"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}</div>
        </>
    )
}
export default PatientSearch;


function CheckBox({ value, name, data, handleCheckUpdate }) {
    const [isChecked, setIsChecked] = useState(!!value);

    const handleChange = (e) => {
        const checked = e.target.checked;
        setIsChecked(checked);
        handleCheckUpdate(data, name, checked ? 1 : 0);
    };


    return (
        <label className="switch">
            <input type="checkbox" checked={isChecked} onChange={handleChange} />
            <span className="slider"></span>
        </label>
    );
}