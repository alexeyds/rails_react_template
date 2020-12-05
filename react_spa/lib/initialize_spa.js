import React from 'react';
import Application from "application";
import { BrowserRouter } from "react-router-dom";
import { render } from 'react-dom';

document.addEventListener("DOMContentLoaded", function() {
  render(<BrowserRouter><Application/></BrowserRouter>, document.getElementById("react-root"));
});
