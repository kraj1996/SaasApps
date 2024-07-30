import React, { useState } from "react";
import Pagination from "./Pagination"; // Adjust import path if necessary
import './pagination.css'; // Import the CSS file

const PaginatedTable = ({ tableData, handleBackToSearch, handleResultData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(tableData.length / pageSize);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page on page size change
  };

  const paginatedData = tableData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="box mb-4">
      <div className="button-container">
        <Link onClick={handleBackToSearch}>Back to Search</Link>
      </div>
      <div className="box-body divResult boottable table-responsive" id="no-more-tables">
        <table className="modern-table" cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              <th>Vial ID</th>
              <th>Visit No</th>
              <th>Patient Name</th>
              <th>Age/Sex</th>
              <th>TestName</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((data, index) => (
              <tr key={index}>
                <td>
                  <div style={{ cursor: 'pointer' }} onClick={handleResultData}>
                    <span className="fa fa-eyedropper" title="Show Result Entry"></span>
                    {data?.VialID}
                  </div>
                </td>
                <td>{data?.VisitNo}</td>
                <td>{data?.PatientName}</td>
                <td>{data?.AgeSex}</td>
                <td>{data?.TestName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default PaginatedTable;
