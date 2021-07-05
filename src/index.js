import React from "react";
import reactDom from "react-dom";
import Calculator from "./main/Calculator";

import "./index.css";

reactDom.render(
  <>
    <h1>Calculator</h1>
    <Calculator />
  </>
  , document.getElementById("root")
);
