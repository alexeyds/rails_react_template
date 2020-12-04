import React  from "react";
import { MemoryRouter, useLocation } from "react-router";

export function TestRouter({children, path='/'}) {
  return (
    <MemoryRouter initialEntries={[path]}>
      <CurrentPathContainer/>
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
