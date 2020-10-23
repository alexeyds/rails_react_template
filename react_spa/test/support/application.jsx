import React from "react";
import RoutesSwitch from "application/routes_switch";
import TestRouter from "test/support/test_router";

export default function Application({initialPath}) {
  return <TestRouter initialPath={initialPath}><RoutesSwitch/></TestRouter>;
}