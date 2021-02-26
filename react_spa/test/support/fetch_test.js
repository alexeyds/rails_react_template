import jutest from "test/browser_jutest";
import { fetchResponse, expectJSON, fetchAPIResponse } from "support/fetch";

jutest("support/fetch", s => {
  s.describe("fetchResponse", s => {
    s.test("fetches blank response", async t => {
      let response = await fetchResponse();

      t.equal(response.status, 200);
      t.equal(await response.text(), '');
    });

    s.test("accepts response details", async t => {
      let response = await fetchResponse({ status: 404, body: 'test' });
      
      t.equal(response.status, 404);
      t.equal(await response.text(), 'test');
    });
  });

  s.describe("expectJSON()", s => {
    s.test("works like fetch.mock()", async t => {
      expectJSON('/test');
      let response = await fetch('/test');

      t.equal(response.status, 200);
      t.equal(await response.text(), '');
    });

    s.test("converts response body to JSON", async t => {
      expectJSON('/test', { response: { body: { foo: 'bar' } } });
      let response = await fetch('/test');

      t.same(await response.json(), { foo: 'bar' });
    });

    s.test("preserves all other options", async t => {
      expectJSON('/test', { response: { status: 404 }, request: { credentials: 'include' } });

      let error = await fetch('/test').catch(e => e);
      t.match(error, /Unexpected/);

      let response = await fetch('/test', { credentials: 'include' });
      t.equal(await response.text(), '');
      t.equal(response.status, 404);
    });

    s.test("adds content-type to response headers", async t => {
      expectJSON('/test');
      let response = await fetch('/test');

      t.equal(response.headers.get('Content-Type'), 'application/json');
    });
  });

  s.describe("fetchAPIResponse", s => {
    s.test("fetches response using JSON connection", async t => {
      let response = await fetchAPIResponse();

      t.equal(response.status, 200);
      t.same(response.body, {});
      t.equal(response.error, null);
    });

    s.test("accepts response details", async t => {
      let response = await fetchAPIResponse({ status: 404, body: { a: 1 } });
      
      t.equal(response.status, 404);
      t.same(response.body, { a: 1 });
    });
  });
});
