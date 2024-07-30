import React from 'react';
import { Link } from 'react-router-dom';
import Doctor from "../../images/Science.gif"
import Document from "../../images/documentation.gif"
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Contextapi/userContext';


const CardComponent = ({logo,link}) => {
    const navigate=useNavigate()
    const { user, selectApp } = useUser();
    const getLogo=(logo)=>{
        if(logo=='Doctor')
        {
            return Doctor
        } else if(logo=='Document'){
            return Document
        }
    }
    const handleNavigate=()=>{
        
        if(logo=='Doctor')
            { selectApp('Search')
               navigate('/Search')
            } else if(logo=='Document'){
                selectApp('PatientSearch')
                navigate('/PatientSearch')
            } 
    }
  return (
    <>
    <div className="card" style={{marginTop:"17px",cursor:'pointer'}} onClick={handleNavigate} >
      <div className="card-content">
        <img src={getLogo(logo)} style={{width:"70px",height:"70px" ,marginLeft:"5px"}}/>
    </div>
   </div>
   </>
  );
};

export default CardComponent;



