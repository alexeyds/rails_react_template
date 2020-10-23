import test from "test/browser_tape";
import React from "react";
import { render } from "test/support/react_renderer";
import { redirect } from "test/support/test_router";
import Application from "test/support/application";

test("Application", function(t) {
  t.test("routing", function(t) {
    t.test("renders home page by default", function(t) {
      let app = render(<Application/>);
      t.true(app.queryByTestId('home-page'));
    });

    t.test("renders not found page", function(t) {
      let app = render(<Application/>);
      redirect(app, '/not_found_at_all');

      t.false(app.queryByTestId('home-page'));
      t.true(app.queryByTestId('not-found-page'));
    });
  });
});
