import jutest from "test/browser_jutest";
import { composeRoutes } from "broutes";
import mockRoute from "support/api/expectation/mock_route";

jutest("api/expectation/mock_fetch", s => {
  s.test("defines fetch expectation", async t => {
    mockRoute('/test');
    let response = await fetch('/test');

    t.equal(response.status, 200);
  });

  s.test("converts response body to JSON", async t => {
    mockRoute('/test', { response: { body: { a: 1 } } });
    let response = await fetch('/test');

    t.same(await response.json(), { a: 1 });
  });

  s.test("uses dynamic path matcher", async t => {
    mockRoute('/users/:id');
    let response = await fetch('/users/123');

    t.equal(response.status, 200);
  });

  s.test("can be used to match dynamic routes", async t => {
    let { userPath } = composeRoutes(r => r.route('/users/:id', { name: "user" }));
    mockRoute(userPath);

    let error = await fetch('/users').catch(e => e);
    t.match(error, /Unexpected fetch/);

    let response = await fetch(userPath({id: 123}));
    t.equal(response.status, 200);
  });
});
