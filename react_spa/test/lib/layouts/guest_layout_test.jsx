import jutest from "test/browser_jutest";
import React from "react";
import { render } from "test/support/react_renderer";
import { signIn } from "test/support/session";
import ApplicationEnv, { currentPath, routes } from "test/support/application_env";
import GuestLayout from "layouts/guest_layout";

function Layout(props) {
  return (
    <ApplicationEnv><GuestLayout initialPath="/foobar" {...props}/></ApplicationEnv>
  );
}

jutest("GuestLayout", s => {
  s.describe("with logged out user", s => {
    s.test("renders children", t => {
      let result = render(<Layout><div test-id='foobar'/></Layout>);

      t.assert(result.queryByTestId('foobar'));
    });
  });

  s.describe("with logged in user", s => {
    s.test("redirects to root page", t => {
      signIn();
      let result = render(<Layout/>);
      t.equal(currentPath(result), routes.rootPath());
    });
  });
});
