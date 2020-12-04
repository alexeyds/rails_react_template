import React from "react";
import RoutesSwitch from "application/routes_switch";
import { render } from "test/support/react_renderer";
import { TestRouter } from "test/support/application/test_router";

export function Application({path}) {
  return (
    <TestRouter path={path}>
      <RoutesSwitch/>
    </TestRouter>
  );
}

export function renderAppAt(path) {
  return render(<Application path={path}/>);
}