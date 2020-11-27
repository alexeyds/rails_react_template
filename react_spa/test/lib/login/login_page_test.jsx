import jutest from "test/browser_jutest";
import React from "react";
import { expectations } from "api_expectations/sessions";
import { sessionStore } from "current_session/session_store";
import { fillForm, submitForm } from "test/support/form_helpers";
import { signIn } from "test/support/session";
import { render } from "test/support/react_renderer";
import ApplicationEnv, { currentPath, routes } from "test/support/application_env";
import LoginPage from "login/login_page";

function Page(props) {
  return <ApplicationEnv initialPath={routes.loginPath()}><LoginPage {...props}/></ApplicationEnv>;
}

jutest("LoginPage", s => {
  s.describe("login form", s => {
    s.test("is not rendered if user is logged out", t => {
      signIn();
      let page = render(<Page/>);
      t.refute(page.queryByTestId("login-form"));
    });

    s.test("logs user in", async t => {
      let page = render(<Page/>);
      let params = { email: "foobar@test.com", password: '123' };
      expectations.expectLogin({body: params});

      fillForm(page, params);
      submitForm(page);
      await global.nextTick();

      t.equal(currentPath(page), routes.rootPath());
      t.notEqual(sessionStore.getState(), null);
    });
  });
});