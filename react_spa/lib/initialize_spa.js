import React from 'react';
import HomePage from "home_page";
import { render } from 'react-dom';

document.addEventListener("DOMContentLoaded", function() {
  render(<HomePage/>, document.getElementById("react-root"));
});
