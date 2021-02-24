import jutest from "test/browser_jutest";
import { sendForm } from "support/named_form_helpers";
import { expectations } from "support/api";
import { currentSession } from "support/session";
import { renderAppAt, routes, navigation } from "support/application";

jutest("LoginPage", s => {
  s.setup(() => {
    let app = renderAppAt(routes.loginPath());
    return { app };
  });

  s.test("signs user in", async (t, { app }) => {
    let params = { email: 'foo@bar.com', password: '12345' };
    expectations.sessions.create({ body: params });

    await sendForm(app, 'session', params);
    await global.nextTick();

    t.equal(navigation.pendingRedirect(app), routes.rootPath());
    t.assert(currentSession());
  });

  s.test("handles server errors", async (t, { app }) => {
    expectations.sessions.create.validationError();
    await sendForm(app, 'session', {});

    t.refute(navigation.pendingRedirect(app));
    t.refute(currentSession());
  });
});
