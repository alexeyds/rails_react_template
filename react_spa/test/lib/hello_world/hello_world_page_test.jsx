import jutest from "test/browser_jutest";
import expectations from "test/support/remote/expectations";
import { signIn, renderAppAt, nextTick, routes } from "test/support/application";

jutest("HelloWorldPage", s => {
  s.test("fetches api version", async t => {
    signIn();
    expectations.helloWorld.expectApiVersion(
      expectations.helloWorld.apiVersionFixture({version: 'v3', locale: 'fr'}),
    );

    let page = renderAppAt(routes.helloWorldPath());
    await nextTick();

    t.equal(page.getByTestId('api-version').textContent, 'v3');
    t.equal(page.getByTestId('api-locale').textContent, 'fr');
  });
});
