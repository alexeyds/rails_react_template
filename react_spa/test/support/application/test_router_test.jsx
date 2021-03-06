import jutest from "test/browser_jutest";
import React from "react";
import { Route, Redirect } from "react-router";
import { render } from "support/react_renderer";
import TestRouter, { navigation } from "support/application/test_router";

jutest("TestRouter", s => {
  s.describe("basic usage", s => {
    s.test("renders react-router routes", t => {
      let router = render(
        <TestRouter>
          <Route path="*"><div test-id='my-page'/></Route>
        </TestRouter>
      );

      t.assert(router.queryByTestId('my-page'));
    });

    s.test("uses / as an initial path", t => {
      let router = render(
        <TestRouter>
          <Route exact path="/"><div test-id='home-page'/></Route>
        </TestRouter>
      );

      t.assert(router.queryByTestId('home-page'));
    });

    s.test("initial path can be overwritten", t => {
      let router = render(
        <TestRouter path='/foo'>
          <Route exact path="/foo"><div test-id='foo-page'/></Route>
        </TestRouter>
      );

      t.assert(router.queryByTestId('foo-page'));
    });

    s.test("prevents redirects", t => {
      let router = render(<TestRouter path='/foo'><Redirect to='/bar'/></TestRouter>);

      t.equal(navigation.currentPath(router), '/foo');
    });
  });
  
  s.describe("currentPath()", s => {
    s.test("returns router's current path", t => {
      let router = render(<TestRouter path={'/bar'}></TestRouter>);
      t.equal(navigation.currentPath(router), '/bar');
    });
  });

  s.describe("pendingRedirect()", s => {
    s.test("returns null if there is no redirect", t => {
      let router = render(<TestRouter/>);
      t.equal(navigation.pendingRedirect(router), null);
    });

    s.test("returns pending redirect", t => {
      let router = render(<TestRouter path='/foo'><Redirect to='/bar'/></TestRouter>);
      t.equal(navigation.pendingRedirect(router), '/bar');
    });
  });

  s.describe("followRedirect()", s => {
    s.test("does nothing there is no pending redirect", () => {
      let router = render(<TestRouter/>);
      navigation.followRedirect(router);
    });

    s.test("follows redirect", t => {
      let router = render(<TestRouter path='/foo'><Redirect to='/bar'/></TestRouter>);
      navigation.followRedirect(router);

      t.equal(navigation.currentPath(router), '/bar');
      t.equal(navigation.pendingRedirect(router), null);
    });
  });
});
