import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
let theme = window.localStorage.getItem("Theme");

switch (theme) {
  case "Pale Pink":
    import("./PalePink.css");
    break;
  case "Peach":
    import("./Peach.css");
    break;
  case "light Green":
    import("./lightgreen.css");
    break;
  case "SkyBlue":
    import("./SkyBlue.css");
    break;
  case "Red":
    import("./Red.css");
    break;
  case "Grey":
    import("./Grey.css");
    break;
  default:
    import("./index.css");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
