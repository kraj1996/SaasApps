import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Contextapi/userContext';
import CardComponent from './CardComponent';

const AppsList = () => {
    const { user, selectApp } = useUser();
  const accessibleApps = user.apps;
  const navigate = useNavigate();

  useEffect(() => {
    if (accessibleApps.length === 1) {
      const singleApp = accessibleApps[0];
      if (singleApp === 'Search') {
        selectApp('Search')
        navigate('/Search');
      } else if (singleApp === 'PatientSearch') {
        selectApp('Patient')
        navigate('/PatientSearch');
      }
    }
  }, [accessibleApps]);

  if (accessibleApps.length === 1) {
    return null; // Optionally render null or a loading spinner while redirecting
  }

  return (
    <div className='box' style={{ height: "auto", paddingBottom: "10px" }}>
      <div className="searchtitle" style={{ height: "35px" }}>
        <h6 style={{ fontSize: "17px", marginLeft: "10px" }}>Accessible Apps</h6>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "14px" }}>
        {accessibleApps.includes('Search') && (
          <CardComponent logo="Doctor" link='/Search' />
        )}
        {accessibleApps.includes('PatientSearch') && (
          <CardComponent logo="Document" link='/PatientSearch' />
        )}
      </div>
    </div>
  );
};

export default AppsList;
