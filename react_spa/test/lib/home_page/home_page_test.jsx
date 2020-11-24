import jutest from "test/browser_jutest";
import React from "react";
import { render } from "test/support/react_renderer";
import { signIn } from "test/support/session";
import ApplicationEnv from "test/support/application_env";
import HomePage from "home_page";

jutest("HomePage", function(t) {
  t.test("renders welcome image", async function() {
    signIn();
    render(<ApplicationEnv><HomePage/></ApplicationEnv>);
  });
});
