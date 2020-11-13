import jutest from "test/browser_jutest";
import expectationsClient from "test/api_expectations/expectations_client";

jutest("expectations_client", function(t) {
  t.describe("expectRequest()", function(t) {
    t.test("defines fetch expectation", async function(t) {
      expectationsClient.expectRequest('/test');
      let response = await fetch('/test');

      t.equal(response.status, 200);
    });

    t.test("stringifies response body", async function(t) {
      expectationsClient.expectRequest('/test', { response: { body: {a: 1} } });
      let body = await fetch('/test').then(r => r.json());

      t.same(body, { a: 1 });
    });

    t.test("preserves other fetch.mock options", async function(t) {
      expectationsClient.expectRequest('/test', { 
        response: { body: {a: 1}, status: 404 },
        request: { credentials: 'include' }
      });

      let response = await fetch('/test', { credentials: 'include' });

      t.equal(response.status, 404);
    });
  });

  t.test("has shortcuts for common http methods", async function(t) {
    expectationsClient.expectPost('/test', { request: { body: {a: 1} } });
    let response = await fetch('/test', { 
      method: 'POST', 
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({a: 1})
    });

    t.equal(response.status, 200);
  });
});