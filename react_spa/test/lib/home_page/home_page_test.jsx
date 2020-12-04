import jutest from "test/browser_jutest";
import { signIn, renderAppAt, routes } from "test/support/application";

jutest("HomePage", s => {
  s.test("is rendered at root when user is signed in", async t => {
    signIn();
    let app = renderAppAt(routes.rootPath());
    t.assert(app.queryByTestId('home-page'));
  });
});
