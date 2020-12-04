import jutest from "test/browser_jutest";
import React from "react";
import { Route } from "react-router";
import { render } from "test/support/react_renderer";
import { TestRouter, currentPath } from "test/support/application/test_router";

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
        <TestRouter path={'/foo'}>
          <Route exact path="/foo"><div test-id='foo-page'/></Route>
        </TestRouter>
      );

      t.assert(router.queryByTestId('foo-page'));
    });
  });
  
  s.describe("currentPath()", s => {
    s.test("returns router's current path", t => {
      let router = render(<TestRouter path={'/bar'}></TestRouter>);
      t.equal(currentPath(router), '/bar');
    });
  });
});
