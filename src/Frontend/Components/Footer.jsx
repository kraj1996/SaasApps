import React from "react";

const Footer = () => {
  return (
    
       <>
        <div className="pull-right hidden-xs">
          <b style={{fontSize:"10px"}}>Version</b> <span style={{fontSize:"10px"}}>{process.env.REACT_APP_Version}</span>
        </div>
        <strong  style={{fontSize:"10px" ,marginLeft:"3px"}}>
          Copyright © {(new Date()).getFullYear()} <a href="https://www.itdoseinfo.com/" target="blank"><b style={{fontSize:"10px"}}>ITDOSE INFOSYSTEM PVT. LTD</b></a>.
        </strong>
         <span style={{fontSize:"12px"}}> All rights reserved.</span>
        </>
     
  );
};

export default Footer;