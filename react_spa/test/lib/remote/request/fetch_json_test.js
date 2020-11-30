import jutest from "test/browser_jutest";
import fetchJSON from "remote/request/fetch_json";

jutest("fetchJSON()", s => {
  s.test("adds JSON headers", async t => {
    fetch.mock('/test', { request: { headers: {'content-type': 'application/json'} } });
    let response = await fetchJSON('/test');

    t.equal(response.status, 200);
  });

  s.test("respects existing headers", async t => {
    fetch.mock('/test', { request: { headers: {'content-type': 'application/json', 'foo': 'bar'} } });
    let response = await fetchJSON('/test', { headers: { 'foo': 'bar' } });

    t.equal(response.status, 200);
  });

  s.test("stringifies request body", async t => {
    fetch.mock('/test', { request: { body: { foo: 'bar' } } });
    let response = await fetchJSON('/test', { body: { foo: 'bar' }, method: 'POST' });

    t.equal(response.status, 200);
  });
});
