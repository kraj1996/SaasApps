import React, { useState } from 'react';
import axios from 'axios';

const LocationComponent = () => {
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
          });
          fetchAddress(latitude, longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const fetchAddress = (latitude, longitude) => {
    // const apiKey = '63a4f3d3876c43668bd7996aeb5bae90';
    // const url = https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey};
    const url ='https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}'

    axios.get(url)
      .then((response) => {
        const result = response.data.display_name;
        setAddress(result);
      })
      .catch((error) => {
        setError('Failed to fetch address.');
      });
  };

  return (
    <div>
      <h1>Get Current Location</h1>
      <button onClick={getLocation}>Get Location</button>
      {error && <p>Error: {error}</p>}
      {location.latitude && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Accuracy: {location.accuracy} meters</p>
          {location.altitude !== null && <p>Altitude: {location.altitude} meters</p>}
          {location.altitudeAccuracy !== null && <p>Altitude Accuracy: {location.altitudeAccuracy} meters</p>}
          {location.heading !== null && <p>Heading: {location.heading} degrees</p>}
          {location.speed !== null && <p>Speed: {location.speed} meters/second</p>}
          {address && <p>Address: {address}</p>}
        </div>
      )}
    </div>
  );
};

export default LocationComponent;