import jutest from "test/browser_jutest";
import React from "react";
import { render } from "test/support/react_renderer";
import { TestRouter, currentPath, routes, signIn } from 'test/support/application';
import GuestLayout from "layouts/guest_layout";

jutest("GuestLayout", s => {
  function Layout({children, path}) {
    return (
      <TestRouter path={path}>
        <GuestLayout>{children}</GuestLayout>
      </TestRouter>
    );
  }

  s.describe("with signed out user", s => {
    s.test("renders children", t => {
      let layout = render(<Layout><div test-id='foobar'/></Layout>);
      t.assert(layout.queryByTestId('foobar'));
    });
  });

  s.describe("with signed in user", s => {
    s.setup(() => signIn());

    s.test("redirects to root page", t => {
      let layout = render(<Layout path='/test'><div test-id='foobar'/></Layout>);

      t.equal(currentPath(layout), routes.rootPath());
      t.refute(layout.queryByTestId('foobar'));
    });
  });
});
