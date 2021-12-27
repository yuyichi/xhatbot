/* eslint-env browser */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { isDev } from '@util/common';
if (module && module.hot) {
  module.hot.accept();
}


ReactDOM.render( < App / > , document.getElementById("app"));
