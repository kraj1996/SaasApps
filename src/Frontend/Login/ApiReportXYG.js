import React, { useEffect } from "react";
import { useNavigate ,useParams} from "react-router-dom";
import axios from "axios";
const ApiReportXYG = () => {
  const navigate = useNavigate();
  const {id} = useParams()
  const getURL = () => {
    axios
      .get(`/api/v1/QRController/GetLabReportFromQr/${id}`)
      .then((res) => {
        window.open(res?.data?.Url, "_blank");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getURL();
  }, []);
  return <></>;
};



export default ApiReportXYG;
