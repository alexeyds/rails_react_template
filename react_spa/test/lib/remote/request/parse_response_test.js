import jutest from "test/browser_jutest";
import parseResponse from "remote/request/parse_response";

jutest("parseResponse()", s => {
  function fetchResponse(response) {
    fetch.mock('/test-response-parser', { response });
    return fetch('/test-response-parser').then(parseResponse);
  }

  s.test("returns successful response details", async t => {
    let response = await fetchResponse({ body: 'hello' });

    t.equal(response.success, true);
    t.equal(response.status, 200);
    t.equal(response.body, 'hello');
  });

  s.test("returns failed response details", async t => {
    let response = await fetchResponse({ body: 'bye', status: 404 });

    t.equal(response.success, false);
    t.equal(response.status, 404);
    t.equal(response.body, 'bye');
  });

  s.test("tries to parse response body as JSON", async t => {
    let response = await fetchResponse({ body: JSON.stringify({foo: 'bar'}) });

    t.same(response.body, {foo: 'bar'});
  });

  s.test("camelizes response body keys", async t => {
    let response = await fetchResponse({ body: JSON.stringify({foo_bar: 'baz'}) });

    t.same(response.body, {fooBar: 'baz'});
  });
});
