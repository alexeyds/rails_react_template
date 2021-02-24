import jutest from "test/browser_jutest";
import { expectations } from "support/api";
import { asyncRenderAppAt, routes } from "support/application";
import { signIn } from "support/session";

jutest("HelloWorldPage", s => {
  s.setup(() => signIn());

  s.test("fetches api version", async t => {
    let { apiVersion, locale } = expectations.helloWorld.show();

    let page = await asyncRenderAppAt(routes.helloWorldPath());

    t.assert(page.getByText(apiVersion));
    t.assert(page.getByText(locale));
  });

  s.test("handles response errors", async () => {
    expectations.helloWorld.show.flowError();
    await asyncRenderAppAt(routes.helloWorldPath());
  });
});
