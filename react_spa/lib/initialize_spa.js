import React from 'react';
import Application from "application";
import { render } from 'react-dom';

document.addEventListener("DOMContentLoaded", function() {
  render(<Application/>, document.getElementById("react-root"));
});
