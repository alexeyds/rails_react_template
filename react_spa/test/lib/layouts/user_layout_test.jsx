import jutest from "test/browser_jutest";
import React from "react";
import { expectations } from "remote_expectations";
import { render, fireEvent } from "test/support/react_renderer";
import { signIn, currentSession } from "test/support/session";
import ApplicationEnv, { currentPath, routes } from "test/support/application_env";
import UserLayout from "layouts/user_layout";

function Layout(props) {
  return (
    <ApplicationEnv><UserLayout {...props}/></ApplicationEnv>
  );
}

jutest("UserLayout", s => {
  s.describe("with logged in user", s => {
    s.test("renders children", t => {    
      signIn();
      let result = render(<Layout><div test-id='foobar'/></Layout>);

      t.assert(result.queryByTestId('foobar'));
    });

    s.test("renders logout button", async t => {
      signIn();
      let result = render(<Layout/>);
      expectations.sessions.expectLogout();
      fireEvent.click(result.getByTestId('logout-link'));
      await global.nextTick();

      t.equal(currentSession(), null);
      t.equal(currentPath(result), routes.loginPath());
    });
  });

  s.describe("with logged out user", s => {
    s.test("redirects to login page", t => {
      let result = render(<Layout/>);
      t.equal(currentPath(result), routes.loginPath());
    });
  });
});
