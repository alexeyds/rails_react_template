import React from "react";
import Application from "application";
import { render } from "test/support/react_renderer";
import { TestRouter } from "test/support/application/test_router";

export function renderAppAt(path) {
  return render(<TestRouter path={path}><Application path={path}/></TestRouter>);
}