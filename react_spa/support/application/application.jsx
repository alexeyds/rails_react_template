import React from "react";
import Application from "application";
import { render } from "support/react_renderer";
import { signIn } from "support/session";
import TestRouter from "support/application/test_router";

export function renderAppAt(path, { asUser=null }={}) {
  if (asUser) signIn(asUser);
  return render(<TestRouter path={path}><Application path={path}/></TestRouter>);
}

export async function asyncRenderAppAt(...args) {
  let app = renderAppAt(...args);
  await global.nextTick();
  return app;
}
