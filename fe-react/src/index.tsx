import React from "react";
import ReactDOM from "react-dom";
import Application from "./application";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
      <Application />
    </BrowserRouter>,
  document.getElementById("root")
);

