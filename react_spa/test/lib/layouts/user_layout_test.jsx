import jutest from "test/browser_jutest";
import React from "react";
import { render } from "test/support/react_renderer";
import { TestRouter, pendingRedirect, routes, signIn } from 'test/support/application';
import UserLayout, { sidebarSections } from "layouts/user_layout";

jutest("UserLayout", s => {
  function Layout({children, path, activeSidebarSection}) {
    return (
      <TestRouter path={path}>
        <UserLayout activeSidebarSection={activeSidebarSection}>{children}</UserLayout>
      </TestRouter>
    );
  }

  s.describe("with signed in user", s => {
    s.setup(() => signIn());

    s.test("renders children", t => {
      let layout = render(<Layout><div test-id='foobar'/></Layout>);
      t.assert(layout.queryByTestId('foobar'));
    });

    s.test("renders sidebar sections", t => {
      let layout = render(<Layout/>);
      let section = layout.queryByTestId(`sidebar-section-helloWorld`);

      t.assert(sidebarSections.helloWorld);
      t.assert(section);
      t.doesNotMatch(section.className, /is-active/);
    });

    s.test("marks current section as active ", t => {
      let layout = render(<Layout activeSidebarSection={sidebarSections.helloWorld}/>);
      let section = layout.queryByTestId(`sidebar-section-helloWorld`);

      t.match(section.className, /is-active/);
    });
  });

  s.describe("with logged out user", s => {
    s.test("redirects to login page", t => {
      let layout = render(<Layout><div test-id='foobar'/></Layout>);

      t.equal(pendingRedirect(layout), routes.loginPath());
      t.refute(layout.queryByTestId('foobar'));
    });
  });
});
