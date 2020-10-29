import test from "test/browser_tape";
import React from "react";
import { render } from "test/support/react_renderer";
import ApplicationEnv from "test/support/application_env";
import HomePage from "home_page";

test("HomePage", function(t) {
  t.test("welcome image", function(t) {
    t.test("renders image", function(t) {
      let page = render(<ApplicationEnv><HomePage/></ApplicationEnv>);

      t.notEqual(page.getByTestId('welcome-image'), null);
    });
  });
});
