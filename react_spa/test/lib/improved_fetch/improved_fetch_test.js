import test from "test/browser_tape";
import { fetchJSON } from "improved_fetch";

test("improved_fetch", function(t) {
  t.test("fetchJSON()", function(t) {
    t.test("adds JSON headers", async function(t) {
      fetch.mock('/test', { request: { headers: {'content-type': 'application/json'} } });
      let response = await fetchJSON('/test');

      t.equal(response.status, 200);
      t.equal(response.parsedBody, '');
    });

    t.test("respects existing headers", async function(t) {
      fetch.mock('/test', { request: { headers: {'content-type': 'application/json', 'foo': 'bar'} } });
      let response = await fetchJSON('/test', { headers: { 'foo': 'bar' } });

      t.equal(response.status, 200);
    });

    t.test("parses response body right away", async function(t) {
      fetch.mock('/test', { response: { body: JSON.stringify({ hi: 'hello' }) } });
      let response = await fetchJSON('/test');

      t.equal(response.status, 200);
      t.equal(response.ok, true);
      t.same(response.parsedBody, { hi: 'hello' });
      t.notEqual(response.headers, undefined);
    });

    t.test("adds credentials: include by default", async function(t) {
      fetch.mock('/test', { request: { credentials: 'include' } });
      let response = await fetchJSON('/test');

      t.equal(response.status, 200);
    });

    t.test("stringifies request body", async function(t) {
      fetch.mock('/test', { request: { body: { foo: 'bar' } } });
      let response = await fetchJSON('/test', { body: { foo: 'bar' }, method: 'POST' });

      t.equal(response.status, 200);
    });
  });
});
