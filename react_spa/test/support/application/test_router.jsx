import React, { useState, useMemo }  from "react";
import { fireEvent } from "test/support/react_renderer";
import { createMemoryHistory } from "history";
import { Router, useLocation } from "react-router";

export function TestRouter({children, path='/'}) {
  let [redirect, setRedirect] = useState(null);
  let history = useMemo(() => createMemoryHistory({initialEntries: [path]}), [path]);

  let oldReplace = history.replace;
  history.replace = function() {
    setRedirect({
      follow: () => {
        setRedirect(null);
        return oldReplace(...arguments);
      },
      location: arguments[0]
    });
  };

  return (
    <Router history={history}>
      <CurrentPathContainer/>
      <PendigRedirectContainer redirect={redirect}/>
      {children}
    </Router>
  ); 
}

function CurrentPathContainer() {
  let location = useLocation();
  return <div test-id="test-router-current-path" current-path={location.pathname}/>;
}

export function currentPath(router) {
  return router.getByTestId("test-router-current-path").getAttribute("current-path");
}

function PendigRedirectContainer({redirect}) {
  let path, follow;

  if (redirect) {
    path = redirect.location.pathname;
    follow = redirect.follow;
  } else {
    path = null;
    follow = () => { };
  }

  return <div test-id="test-router-pending-redirect" redirect-path={path} onClick={follow}/>;
}

export function pendingRedirect(router) {
  return router.getByTestId("test-router-pending-redirect").getAttribute("redirect-path");
}

export function followRedirect(router) {
  return fireEvent.click(router.getByTestId('test-router-pending-redirect'));
}