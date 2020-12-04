import jutest from "test/browser_jutest";
import React from "react";
import { render } from "test/support/react_renderer";
import { TestRouter, currentPath, routes, signIn } from 'test/support/application';
import UserLayout from "layouts/user_layout";

jutest("UserLayout", s => {
  function Layout({children, path}) {
    return (
      <TestRouter path={path}>
        <UserLayout>{children}</UserLayout>
      </TestRouter>
    );
  }

  s.describe("with signed in user", s => {
    s.setup(() => signIn());

    s.test("renders children", t => {
      let result = render(<Layout><div test-id='foobar'/></Layout>);
      t.assert(result.queryByTestId('foobar'));
    });
  });

  s.describe("with logged out user", s => {
    s.test("redirects to login page", t => {
      let layout = render(<Layout><div test-id='foobar'/></Layout>);

      t.equal(currentPath(layout), routes.loginPath());
      t.refute(layout.queryByTestId('foobar'));
    });
  });
});
