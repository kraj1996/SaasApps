import React from "react";

const PatientSearchTable = () => {

    const tabledata  =
        [
            {
                "S.No.": 1,
                "PatientName": "John Doe",
                "Age": 45,
                "Gender": "Male",
                "TestName": "Blood Test",
                "Date": "2024-07-01",
                "Remarks": "Normal"
            },
            {
                "S.No.": 2,
                "PatientName": "Jane Smith",
                "Age": 37,
                "Gender": "Female",
                "TestName": "X-Ray",
                "Date": "2024-07-02",
                "Remarks": "Fracture"
            },
            {
                "S.No.": 3,
                "PatientName": "Michael Johnson",
                "Age": 29,
                "Gender": "Male",
                "TestName": "MRI",
                "Date": "2024-07-03",
                "Remarks": "Normal"
            },
            {
                "S.No.": 4,
                "PatientName": "Emily Davis",
                "Age": 50,
                "Gender": "Female",
                "TestName": "CT Scan",
                "Date": "2024-07-04",
                "Remarks": "Tumor detected"
            },
            {
                "S.No.": 5,
                "PatientName": "David Brown",
                "Age": 61,
                "Gender": "Male",
                "TestName": "Ultrasound",
                "Date": "2024-07-05",
                "Remarks": "Kidney stone"
            },
            {
                "S.No.": 6,
                "PatientName": "Sarah Wilson",
                "Age": 34,
                "Gender": "Female",
                "TestName": "Blood Test",
                "Date": "2024-07-06",
                "Remarks": "Anemia"
            }]
    
    return (
        <>
            <div className="box">
                <div className="box-header with-border" style={{ background: "#6bd9fa", height: "50px", }}>
                    <h3 className="box-title" style={{ marginLeft: "6px", font: "13px" }}>Patient Details</h3>
                </div>
                {/* <div className="box-body"> */}
                <div className="box-body">
                    <div
                        className="row divResult table-responsive mt-4"
                        id="no-more-tables"
                        style={{}}
                    >
                        <table
                            className="table table-bordered table-hover table-striped tbRecord"
                            cellPadding="{0}"
                            cellSpacing="{0}"
                        >
                            <thead className="cf">
                                <tr>
                                    <th>S.No.</th>
                                    <th>Patient Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Test Name</th>
                                    <th>Date</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tabledata?.map((ele, index) => (
                                    <tr key={index}>
                                        <td data-title="S.No.">{index + 1}&nbsp;</td>
                                        <td data-title="Patient Name">{ele?.PatientName}&nbsp;</td>
                                        <td data-title="Age">{ele?.Age} &nbsp;</td>
                                        <td data-title="Gender">{ele?.Gender}&nbsp;</td>
                                        <td data-title="Test Name">{ele?.TestName}&nbsp;</td>
                                        <td data-title="Date">{ele?.Date}&nbsp;</td>
                                        <td data-title="Remarks">{ele?.Remarks}&nbsp;</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                    <div>

                    </div>
                    <div>
                        <button
                            type="submit"
                            className="btn btn-custom-01 btn-block btn-flat btn-info"
                            style={{ borderRadius: "20px", marginTop: "10px" }}
                        >
                            {"Submit"}
                        </button>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}
export default PatientSearchTable;