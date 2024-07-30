import React, { useState } from "react";
import Pagination from "./Pagination"; // Adjust the import path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';


const ModernTable = ({ t, redata, setScreenshow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(redata.length / pageSize);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page on page size change
  };

  const paginatedData = redata.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
    <div className="box" >
      <div className="box-header with-border" style={{ background: "#00c0ef", height: "27px", }}>
        <h3 className="box-title" style={{ marginLeft: "6px", font: "13px" }}>Search Details</h3>
      </div>
        <div
          className=" table-responsive"
          id="no-more-tables"
          style={{padding:"10px"}}
        >
        <table className="custom-modern-table">
          <thead className="cf"  style={{background: "#00c0ef"}}>
            <tr>
              <th className="sno-column">{t("S.No")}</th>
              <th>{t("Centre")}</th>
              <th>{t("Pending Test")}</th>
              <th>{t("Pending Approve Test")}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((data, index) => (
              <tr key={index}>
                <td data-title="SNo" className="sno-column">
                  <div>{(currentPage - 1) * pageSize + index + 1}</div>
                </td>
                <td data-title={t("Centre")}>{data?.centre}&nbsp;</td>
                <td data-title={t("Pending Test")}>
                  <div className="test-icon-wrapper">
                    <span className="test-count">{data?.PendingTest}</span>
                  </div>
                </td>
                <td data-title={t("Pending Approve Test")}>
                  <div className="test-icon-wrapper" onClick={() => setScreenshow({ tests: true, search: false, entry: false })}>
                    {data?.ApprovedTest > 0 ? (
                      <>
                        <FontAwesomeIcon icon={faEye} className="test-icon" />
                        <span className="test-count">{data?.ApprovedTest}</span>
                      </>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </>
  );
};

export default ModernTable;
