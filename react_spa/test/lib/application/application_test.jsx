import jutest from "test/browser_jutest";
import React from "react";
import { render } from "test/support/react_renderer";
import Application from "test/support/application";

jutest("Application", function(t) {
  t.describe("routing", function(t) {
    t.test("renders home page by default", function(t) {
      let app = render(<Application/>);
      t.assert(app.queryByTestId('home-page'));
    });

    t.test("renders not found page", function(t) {
      let app = render(<Application initialPath={'/not_found_at_all'}/>);

      t.refute(app.queryByTestId('home-page'));
      t.assert(app.queryByTestId('not-found-page'));
    });
  });
});
