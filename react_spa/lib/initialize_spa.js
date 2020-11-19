import React from 'react';
import Application from "application";
import { render } from 'react-dom';
import "styles/application.scss";

document.addEventListener("DOMContentLoaded", function() {
  render(<Application/>, document.getElementById("react-root"));
});
