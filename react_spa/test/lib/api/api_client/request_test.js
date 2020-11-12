import jutest from "test/browser_jutest";
import { fetchJSON } from "api/api_client/request";

jutest("api_client/request", function(t) {
  t.describe("fetchJSON()", function(t) {
    t.test("adds JSON headers", async function(t) {
      fetch.mock('/test', { request: { headers: {'content-type': 'application/json'} } });
      let response = await fetchJSON('/test');

      t.equal(response.status, 200);
    });

    t.test("respects existing headers", async function(t) {
      fetch.mock('/test', { request: { headers: {'content-type': 'application/json', 'foo': 'bar'} } });
      let response = await fetchJSON('/test', { headers: { 'foo': 'bar' } });

      t.equal(response.status, 200);
    });

    t.test("stringifies request body", async function(t) {
      fetch.mock('/test', { request: { body: { foo: 'bar' } } });
      let response = await fetchJSON('/test', { body: { foo: 'bar' }, method: 'POST' });

      t.equal(response.status, 200);
    });
  });
});
