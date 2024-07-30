import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = ({ profileImage, handleProfileChange }) => {
  const username = window.localStorage.getItem("Username");
  const theme = window.localStorage.getItem("Theme");
  const location = useLocation();
  const [SidebarData, setSidebarData] = useState({});
  const [FilterData, setFilterData] = useState({});
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isAccess, setIsAccess] = useState({});
  const FetchData = () => {
    axios
      .get("/api/v1/Menu/MainMenuPageData")
      .then((res) => {
        setSidebarData(res?.data?.message);
        setFilterData(res?.data?.message);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Something Went Wrong"
        );
      });
  };
  const getRazorPayDetails = () => {
    axios
      .get("/api/v1/RazorPay/payment")
      .then((res) => {
        setIsAccess(res?.data);
      })
      .catch((err) =>
        toast.error(
          err?.data?.response?.message
            ? err?.data?.response?.message
            : "Error Occur"
        )
      );
  };
  useEffect(() => {
    getRazorPayDetails();
  }, []);

  const filterMenuData = (filter) => {
    let data = [];
    for (let i = 0; i < filter.length; i++) {
      data.push(filter[i]?.MenuID);
    }

    return data;
  };

  const handleFilter = (value) => {
    const val = SidebarData?.pageData.filter((ele) => {
      if (ele?.PageName.toLowerCase().includes(value.toLowerCase().trim())) {
        return ele;
      }
    });

    const menuData = SidebarData?.MenuData?.filter((ele) => {
      if (filterMenuData(val).includes(ele?.MenuID)) {
        return ele;
      }
    });
    if (value !== "") {
      return setFilterData({
        ...FilterData,
        pageData: val,
        MenuData: menuData,
      });
    } else {
      return setFilterData({
        ...FilterData,
        pageData: SidebarData?.pageData,
        MenuData: SidebarData?.MenuData,
      });
    }
  };

  useEffect(() => {
    if (SidebarData?.pageData && SidebarData?.MenuData) {
      document.getElementById("searchBox").value = "";
      handleFilter("");
    }
  }, [location?.pathname]);

  const handleChange = (e) => {
    const { value } = e.target;
    handleFilter(value);
  };

  const getIconComponent = (menuname) => {
    if (menuname.includes("Camp")) {
      return " fa fa-ambulance";
    }
    if (
      menuname.includes("Report") ||
      menuname.includes("Collection") ||
      menuname.includes("Combine")
    ) {
      return " fa fa-file-text-o";
    }
    if (menuname.includes("Membership")) {
      return "fa fa-id-card-o";
    }

    if (menuname.includes("Doc")) {
      return "fa fa-user-md";
    }
    if (menuname.includes("Token")) {
      return "fa fa-plus-circle";
    }
    switch (menuname) {
      case "Laboratory":
        return "fa fa-flask";
      case "Reports":
        return "fa fa-hospital-o";
      case "Administrator":
        return "fa fa-user";
      case "Master":
        return "fa fa-wrench";
      case "Invoicing":
        return "fa fa-inr";
      case "DocAccount":
        return;
      case "MembershipMaster":
        return "fa fa-id-card-o";
      default:
        return "fa fa-user-o";
    }
  };

  useEffect(() => {
    FetchData();
  }, []);
  const getColorFromTheme = (theme) => {
    switch (theme) {
      case "light Green":
        return "#20c320";
      case "Peach":
        return "orange";
      case "Pale Pink":
        return "pink";
      case "Red":
        return "red";
      case "SkyBlue":
        return "skyblue";
      case "Grey":
        return "grey";
      case "Default":
        return "#7b7bf7";
      default:
        return "#7b7bf7";
    }
  };
  return (
    <>
      
      <aside className="main-sidebar">
        <section className="sidebar" style={{ height: "auto",display:'none' }}>
          <div className="user-panel">
            <div className="pull-left image">
              <img
                data-toggle="tooltip"
                data-placement="top"
                title="Double click to change profile Image"
                src={
                  profileImage?.imgUrl && profileImage?.imgUrl !== ""
                    ? profileImage?.imgUrl
                    : "/img/user.png"
                }
                onDoubleClick={handleProfileChange}
                className="img-circle"
                alt="User Image"
                style={{ cursor: "pointer", aspectRatio: "1/1" }}
              />
            </div>
            <div className="pull-left info">
              <p style={{ cursor: "pointer" }}>
                <Link
                  to="/CreateEmployeeMaster"
                  state={{
                    button: "Update",
                    url1: "/api/v1/Employee/getEmployeeDetailsByID",
                    url2: "/api/v1/Employee/UpdateEmployee",
                      id: profileImage?.data?.EmployeeId,
                  }}
                >
                  <span style={{ color: "white" }}> {username}</span>
                </Link>
              </p>
              <a href="javascript:void(0);">
                <i className="fa fa-circle text-success"></i> Online
              </a>
            </div>
          </div>

          <div className="sidebar-form">
            <div className="input-group">
              <input
                type="text"
                id="searchBox"
                className="form-control"
                placeholder="Search..."
                onChange={handleChange}
              />
              <span className="input-group-btn">
                <button
                  type="submit"
                  name="search"
                  id="search-btn"
                  className="btn btn-flat"
                >
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </div>
          {!(
            isAccess?.amount > "0" &&
            isAccess?.SuperAdmin == 1 &&
            isAccess?.sidebarenable == 0
          ) ? (
            <ul className="sidebar-menu tree" data-widget="tree">
              {FilterData?.MenuData?.map((data, index) => (
                <li
                  className={`treeview ${
                    activeIndex === index ? "active" : ""
                  }`}
                  key={index}
                >
                  <a
                    href="javascript:void(0);"
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? -1 : index)
                    }
                  >
                    <i
                      style={{
                        marginRight: "4px",
                        fontSize: "15px",
                        color:
                          activeIndex === index
                            ? "white"
                            : getColorFromTheme(theme),
                      }}
                      className={getIconComponent(data?.MenuName)}
                    ></i>

                    <span className={activeIndex === index ? "active" : ""}>
                      {data?.MenuName}
                    </span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul
                    className="treeview-menu"
                    id="yourScrollableContainer"
                    style={{
                      display:
                        (document.getElementById("searchBox").value ||
                          activeIndex === index) &&
                        "block",
                      maxHeight: "400px",
                      overflowY: "auto",
                      scrollbarWidth: "thin",
                      scrollbarColor: "rgba(0, 0, 0, 0.2) transparent",
                    }}
                  >
                    {FilterData?.pageData?.map(
                      (ele, ind) =>
                        ele?.MenuID === data?.MenuID && (
                          <li key={ind}>
                            <NavLink
                              to={`${ele?.PageUrl}`}
                              state={
                                ele?.PageName === "EstimateSearch" && {
                                  data: "EstimateSearch",
                                }
                              }
                            >
                              <i className="fa fa-angle-right "></i>{" "}
                              {ele?.PageName}
                            </NavLink>
                          </li>
                        )
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </section>
      </aside>
    </>
  );
};

export default Sidebar;
