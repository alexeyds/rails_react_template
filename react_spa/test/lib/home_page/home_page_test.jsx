import test from "test/browser_tape";
import React from "react";
import { render } from "test/support/react_renderer";
import HomePage from "home_page";

test("HomePage", function(t) {
  t.test("welcome image", function(t) {
    t.test("renders image", function(t) {
      let page = render(<HomePage/>);
      let image = page.getByTestId('welcome-image');

      t.notEqual(image, null);
    });
  });
});
