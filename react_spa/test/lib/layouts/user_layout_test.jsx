import jutest from "test/browser_jutest";
import React from "react";
import { render, userEvent } from "support/react_renderer";
import { expectations } from "support/api";
import { signIn, currentSession } from "support/session";
import TestRouter, { navigation, routes } from 'support/application/test_router';
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
    s.test("renders children", t => {
      signIn();
      let layout = render(<Layout><div test-id='foobar'/></Layout>);
      t.assert(layout.queryByTestId('foobar'));
    });
  });

  s.describe("with logged out user", s => {
    s.test("redirects to login page", t => {
      let layout = render(<Layout><div test-id='foobar'/></Layout>);

      t.equal(navigation.pendingRedirect(layout), routes.loginPath());
      t.refute(layout.queryByTestId('foobar'));
    });
  });

  s.describe("logout link", s => {
    s.setup(() => {
      signIn();
      let layout = render(<Layout/>);
      return { layout };
    });

    s.test("logs user out", async (t, { layout }) => {
      expectations.sessions.destroy();
      userEvent.click(layout.getByTestId("logout-link"));
      await global.nextTick();

      t.refute(currentSession());
      t.equal(navigation.pendingRedirect(layout), routes.loginPath());
    });

    s.test("handles error responses", async (t, { layout }) => {
      expectations.sessions.destroy.flowError();
      userEvent.click(layout.getByTestId("logout-link"));
      await global.nextTick();

      t.assert(currentSession());
    });
  });
});
