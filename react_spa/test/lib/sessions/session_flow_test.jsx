import jutest from "test/browser_jutest";
import { fireEvent } from "test/support/react_renderer";
import { sendForm } from "test/support/form_helpers";
import expectations from "test/support/remote/expectations";
import { currentSession, currentPath, renderAppAt, routes, signIn, nextTick } from "test/support/application";

jutest("Session flow", s => {
  s.test("redirects unathorized users to login page", t => {
    let app = renderAppAt(routes.rootPath());

    t.assert(app.queryByTestId("login-form"));
    t.equal(currentPath(app), routes.loginPath());
  });

  s.test("renders logout link if user is signed in", async t => {
    signIn();
    let app = renderAppAt(routes.rootPath());

    expectations.sessions.expectLogout();
    fireEvent.click(app.getByTestId('logout-link'));
    await nextTick();

    t.assert(app.queryByTestId("login-form"));
    t.equal(currentSession(), null);
  });

  s.describe("form", s => {
    s.setup(() => {
      let app = renderAppAt(routes.loginPath());
      let loginForm = app.getByTestId('login-form');

      return { app, loginForm };
    });

    s.test("signs user in", async (t, { app, loginForm }) => {
      let params = { email: "foobar@test.com", password: '123' };
      expectations.sessions.expectLogin(undefined, params);

      await sendForm(loginForm, params);

      t.equal(currentPath(app), routes.rootPath());
      t.notEqual(currentSession(), null);
    });

    s.test("renders server errors", async (t, { app, loginForm }) => {
      expectations.sessions.expectLoginError(expectations.errors.flowError({message: "Invalid password"}));

      await sendForm(loginForm, { email: 'foo@bar.com', password: 'password' });

      t.equal(currentSession(), null);
      t.assert(app.queryByText('Invalid password'));
    });
  });
});
