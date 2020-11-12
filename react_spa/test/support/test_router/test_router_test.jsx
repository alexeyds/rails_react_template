import jutest from "test/browser_jutest";
import React from "react";
import { Route } from "react-router";
import { render } from "test/support/react_renderer";
import TestRouter, { currentPath, redirect } from "test/support/test_router";

jutest("TestRouter", function(t) {
  t.describe("basic usage", function(t) {
    t.test("renders react-router routes", function(t) {
      let router = render(
        <TestRouter>
          <Route path="*"><div test-id='my-page'/></Route>
        </TestRouter>
      );

      t.assert(router.queryByTestId('my-page'));
    });

    t.test("uses / as an initial path", function(t) {
      let router = render(
        <TestRouter>
          <Route exact path="/"><div test-id='home-page'/></Route>
        </TestRouter>
      );

      t.assert(router.queryByTestId('home-page'));
    });

    t.test("initial path can be overwritten", function(t) {
      let router = render(
        <TestRouter initialPath={'/foo'}>
          <Route exact path="/foo"><div test-id='foo-page'/></Route>
        </TestRouter>
      );

      t.assert(router.queryByTestId('foo-page'));
    });
  });
  
  t.describe("currentPath()", function(t) {
    t.test("returns router's current path", function(t) {
      let router = render(<TestRouter initialPath={'/bar'}></TestRouter>);
      t.equal(currentPath(router), '/bar');
    });
  });

  t.describe("redirect", function(t) {
    t.test("redirects to a new path", function(t) {
      let router = render(
        <TestRouter>
          <Route exact path="/foo"><div test-id='foo-page'/></Route>
        </TestRouter>
      );

      redirect(router, '/foo');

      t.assert(router.queryByTestId('foo-page'));
      t.equal(currentPath(router), '/foo');
    });
  });
});
