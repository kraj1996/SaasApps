import { useState, useEffect } from 'react';
import axios from 'axios';

const UseCurrentLocation = () => {
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
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    axios.get(url)
      .then((response) => {
        const result = response.data.display_name;
        setAddress(result);
      })
      .catch((error) => {
        setError('Failed to fetch address.');
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, address, error, getLocation };
};

export default UseCurrentLocation;
