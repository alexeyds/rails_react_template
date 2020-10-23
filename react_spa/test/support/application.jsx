import React from "react";
import RoutesSwitch from "application/routes_switch";
import ApplicationEnv from "test/support/application_env";

export default function Application(props) {
  return (
    <ApplicationEnv {...props}>
      <RoutesSwitch/>
    </ApplicationEnv>
  );
}