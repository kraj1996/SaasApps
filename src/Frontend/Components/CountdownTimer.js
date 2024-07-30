import React, { useEffect, useState } from "react";

const timerWrapperStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'Roboto', sans-serif",
};

const inputContainerStyles = {
  display: "flex",
  alignItems: "center",
  borderRadius: "10px",

};

const inputStyles = (color) => ({
  width: "30px",
  color: "#fff",
  backgroundColor: color,
  outline: "none",
  border: "none",
  fontSize: "11px",
  fontWeight: "bold",
  textAlign: "center",
  borderRadius: "5px",
  margin: "0 1px",
});

const blinkingEffect = {
  animation: "blinking 1s infinite",
};

const CountdownTimer = ({ H, M, S }) => {
  const [hours, setHours] = useState(H);
  const [minutes, setMinutes] = useState(M);
  const [seconds, setSeconds] = useState(S);

  useEffect(() => {
    let interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1);
      } else if (minutes > 0) {
        setMinutes((minutes) => minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours((hours) => hours - 1);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);

    if (hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [seconds, minutes, hours]);

  const hoursColor = "#4CAF50"; // Green
  const minutesColor = "#FFC107"; // Amber
  const secondsColor = "#F44336"; // Red

  return (
    <div style={timerWrapperStyles}>
      <div style={inputContainerStyles}>
        <span style={{ fontSize: "11px", marginRight: "2px" }}>
          Your account will be locked in
        </span>
        <input
          style={inputStyles(hoursColor)}
          value={`${hours}H`}
          readOnly
        />
        <input
          style={inputStyles(minutesColor)}
          value={`${minutes}M`}
          readOnly
        />
        <input
          style={{
            ...inputStyles(secondsColor),
            ...(hours === 0 && minutes === 0 ? blinkingEffect : {}),
          }}
          value={`${seconds}S`}
          readOnly
        />
      </div>
      <style>
        {`
          @keyframes blinking {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default CountdownTimer;
