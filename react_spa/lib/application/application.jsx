import React from "react";
import RoutesSwitch from "application/routes_switch";
import { BrowserRouter } from "react-router-dom";

export default function Application() {
  return (
    <BrowserRouter>
      <RoutesSwitch/>
    </BrowserRouter>
  );
}