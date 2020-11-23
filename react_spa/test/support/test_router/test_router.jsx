import React, { useState } from "react";
import { fireEvent } from "test/support/react_renderer";
import { MemoryRouter, useLocation, Redirect } from "react-router";

export default function TestRouter({children, initialPath='/'}) {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <CurrentPathContainer/>
      <RedirectionContainer/>
      {children}
    </MemoryRouter>
  ); 
}

function CurrentPathContainer() {
  let location = useLocation();
  return <div test-id="test-router-current-path" current-path={location.pathname}/>;
}

export function currentPath(router) {
  return router.getByTestId("test-router-current-path").getAttribute("current-path");
}

function RedirectionContainer() {
  let [redirectTo, setRedirectTo] = useState(null);
  let redirect = redirectTo ? <Redirect to={redirectTo}/> : null;

  return (
    <React.Fragment>
      <input test-id="test-router-redirect-trigger" onChange={(e) => setRedirectTo(e.target.value)}/>
      {redirect}
    </React.Fragment>
  );
}

export function redirect(router, path) {
  return fireEvent.change(
    router.getByTestId("test-router-redirect-trigger"),
    { target: { value: path } }
  );
}

export { default as routes } from "application/routes";